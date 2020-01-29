import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';

@Injectable({
  providedIn: 'root'
})
export class BluetoothLEService {

  constructor(
    public ble : BLE
  ) { }

  testFunct(){
    this.ble.startScan([]).subscribe((device) => {alert(device)});
  }
}
