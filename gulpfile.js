var fs = require("fs");
var gulp = require("gulp");
var exit = require("process");
var zip = require("gulp-zip");
var ncmd = require("node-cmd");
var rimraf = require("rimraf");

require("events").EventEmitter.prototype._maxListeners = 100;

// Clean up tasks
gulp.task("clean:artifactory", function (cb) {
  rimraf("./dist/*", { glob: { dot: true, ignore: "./dist/*.zip" } }, cb);
});

gulp.task("clean:war", function (cb) {
  rimraf(
    "./dist/*",
    {
      glob: {
        dot: true,
        ignore: [
          "./dist/properties",
          "./dist/webapp",
          "./dist/doc",
          "./dist/release-notes",
          './dist/utt'
        ],
      },
    },
    cb
  );
});

// Copy properties files
gulp.task("create:properties", function () {
  return gulp.src(["./src/assets/i18n/*"]).pipe(gulp.dest("./dist/properties"));
});

// Copy release notes
gulp.task("create:release-notes", function () {
  return gulp.src(["release-notes/**"]).pipe(gulp.dest("dist/release-notes/"));
});

// Copy doc
gulp.task("create:doc", function () {
  return gulp.src(["doc/**"]).pipe(gulp.dest("dist/doc/"));
});

// Create war
gulp.task("create:war", function () {
  return gulp
    .src(["./dist/qmaticshow-admin/**/*"])
    .pipe(zip("qmaticShowConfiguration.war"))
    .pipe(gulp.dest("./dist/webapp/"));
});

// create QmaticShowConfiguration utt files
gulp.task('create:utt', function () {
  return gulp
    .src(['./utt/*'])
    .pipe(zip('QmaticShow_Configuration.utt'))
    .pipe(gulp.dest('./dist/utt/'));
});

gulp.task("create:artifactory:zip", function () {
  try {
    var appData = getVersionInfo();
    if (appData) {
      var version = appData.version;
      return gulp
        .src(["dist/**/*"])
        .pipe(zip("QmaticHardwareManagement-" + version + ".zip"))
        .pipe(gulp.dest("dist/"));
    }
  } catch (ex) {
    console.log(
      "There was an exception when trying to read the package.json! - " + ex
    );
    return false;
  }
});

// Write to manifest file
gulp.task("write:manifest", (done) => {
  try {
    var versionInfo = getVersionInfo();
    if (versionInfo) {
      var fileContent =
        "Build-Date: " + new Date().toISOString().substring(0, 10) + "\r\n";
      fileContent += "Product-Name: Qmatic Hardware Management" + "\r\n";
      fileContent += "Build-Version: " + versionInfo.versionPrefix + "\r\n";
      fs.writeFileSync("./src/META-INF/MANIFEST.MF", fileContent);
      done();
      return true;
    }
  } catch (ex) {
    console.log(
      "There was an exception when trying to read the package.json! - " + ex
    );
    return false;
  }
  done();
});

// Set app version ***************************************

gulp.task("set:appVersion", (done) => {
  setAppVersionInFile(
    "./src/app/components/presentational/qm-page-footer/qm-footer.component.html",
    false,
    done()
  );
  setLangFiles(done, false);
});

gulp.task("reset:appVersion", (done) => {
  resetAppVersionInFile(
    "./src/app/components/presentational/qm-page-footer/qm-footer.component.html",
    false,
    done()
  );
  setLangFiles(done, true);
});

gulp.task("set:langFiles", (done, isReset) => {
  fs.readdirSync("./src/assets/i18n").forEach((file) => {
    if (isReset) {
      resetAppVersionInFile("./src/assets/i18n/" + file, true, done);
    } else {
      setAppVersionInFile("./src/assets/i18n/" + file, true, done);
    }
  });
});

function setLangFiles(done, isReset) {
  fs.readdirSync("./src/assets/i18n").forEach((file) => {
    if (isReset) {
      resetAppVersionInFile("./src/assets/i18n/" + file, true, done);
    } else {
      setAppVersionInFile("./src/assets/i18n/" + file, true, done);
    }
  });
}

function setAppVersionInFile(location, versionOnly, done) {
  try {
    var pageData = fs.readFileSync(location);
    var versionInfo = getVersionInfo();
    if (versionInfo && pageData) {
      var title = " (QmaticHardwareManagement " + versionInfo.version + ") ";
      if (versionOnly) {
        title = "Version " + versionInfo.versionPrefix;
      }
      if (pageData.toString().indexOf("%APP_VERSION%") == -1) {
        console.log("Please recheck the app version in the appropriate places");
        exit;
      }
      pageData = pageData.toString().replace("%APP_VERSION%", title);
      fs.writeFileSync(location, pageData);
      done;
      return true;
    }
  } catch (ex) {
    console.log(
      "There was an exception when trying to read the property file or package.json - " +
        ex
    );
    done;
    return false;
  }
}

function resetAppVersionInFile(location, versionOnly, done) {
  try {
    var pageData = fs.readFileSync(location);
    var versionInfo = getVersionInfo();
    if (versionInfo && pageData) {
      var title = " (QmaticHardwareManagement " + versionInfo.version + ") ";
      if (versionOnly) {
        title = "Version " + versionInfo.versionPrefix;
        console.log('check:',title)
      }
      pageData = pageData.toString().replace(title, "%APP_VERSION%");
      fs.writeFileSync(location, pageData);
      done;
      return true;
    }
  } catch (ex) {
    console.log(
      "hello" +
        ex
    );
    done;
    return false;
  }
}

function getVersionInfo() {
  var appData = JSON.parse(fs.readFileSync("./package.json"));
  if (appData) {
    return {
      versionPrefix: appData.version,
      version: appData.version + "." + appData.build,
      build: appData.build,
    };
  }
  return null;
}

/**
 * Create Dev/Prod build war
 */

gulp.task(
  "build:war:properties",
  gulp.series(
    "create:war",
    "create:utt",
    "create:properties",
    "clean:war",
    "reset:appVersion"
  )
);

/**
 * Create Artifactory build
 */
gulp.task(
  "build:artifactory",
  gulp.series(
    "create:war",
    'create:utt',
    "create:properties",
    "create:doc",
    "create:release-notes",
    "clean:war",
    "create:artifactory:zip",
    "clean:artifactory",
    "reset:appVersion"
  )
);
