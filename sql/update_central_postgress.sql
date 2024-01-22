
/* Logon to pgAdmin and connect to qp_central*/

INSERT INTO applications
(id,branch_app,is_distributed,enabled,icon_url,url,version,view_index)
VALUES ('qmaticHardwareManagement', true, false, 1, NULL, 'qmaticHardwareManagement', 1, 101);

INSERT INTO application_modules
(id,is_distributed,enabled,icon_url,privilege_level,url,view_index,application_id)
VALUES ('qmaticHardwareManagement', 0, 0, NULL, 20, NULL, 0, 'qmaticHardwareManagement');

commit;
