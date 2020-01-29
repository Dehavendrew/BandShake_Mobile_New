import { Component } from '@angular/core';
import { BluetoothLEService } from '../bluetooth-le/bluetooth-le.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public bleService: BluetoothLEService,
  ) {}

  connect(){
    this.bleService.testFunct()
  }

}
