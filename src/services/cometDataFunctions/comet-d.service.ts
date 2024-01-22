import { Injectable } from '@angular/core';
import { CometData } from './comet-data';

@Injectable({
  providedIn: 'root',
})
export class CometDService {
  public cometd: any;
  public lib: any;
  public handShakeCheck: any = false;
  public subscribeChannel: any;

  constructor(private cometData: CometData) {
    this.configureCometD();
  }

  configureCometD() {
    // Obtain the CometD APIs.
    this.lib = require('cometd');
    // Create the CometD object.
    this.cometd = new this.lib.CometD();

    // Set transport type
    var transport = new this.lib.Transport();
    transport.registered('long-polling', this.cometd);
    this.cometd.websocketEnabled = false;
    this.cometd.transport = transport;

    // Configure the CometD object.
    this.cometd.configure({
      url: window.location.origin + '/cometd',
      useWorkerScheduler: false,
    });
  }

  startConnection(): void {
    this.cometd.handshake((handshakeResult: any) => {
      if (handshakeResult.successful) {
        this.handShakeCheck = true;
        console.log('CometD handshake successful!');
      } else {
        this.handShakeCheck = false;
        console.error('CometD handshake failed:', handshakeResult);
      }
    });
  }

  initializeCometD(branchPrefix:any) {
    let bp = branchPrefix;
    let UID = bp + ':DeviceConfiguration:80:1'
    this.subscribe(bp);
    var initCmd = {
      M: 'C',
      C: {
        CMD: 'INIT',
        TGT: 'CFM',
        PRM: {
          uid: UID,
          type: 67,
          encoding: 'QP_JSON',
        },
      },
      N: 5,
    };

    this.cometd.publish('/events/INIT', initCmd, (m: any) => {});
  }

  subscribe(bp: any) {
    var chanel = bp + '/DeviceConfiguration/80/1';

    this.subscribeChannel = this.cometd.subscribe(
      '/events/' + chanel,
      (m: any) => {
      }
    );

    this.cometd.addListener('/events/' + chanel, '', (msg: any) => {
      this.cometData.receiveEvent(msg);
    });
  }

  unsubscribe(){
    if(this.subscribeChannel){
      this.cometd.unsubscribe(this.subscribeChannel, function(m:any){

      })
      this.cometd.clearListeners();
    }
  }
}
