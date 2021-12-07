import { Component, OnInit } from '@angular/core';
import { CrabsService } from './services/crabs.service';
import { DiagnosticService } from './services/diagnostic.service';
import { DiveService } from './services/dive.service';
import { LanternService } from './services/latern.service';

@Component({
  selector: 'app-submarine',
  templateUrl: 'submarine.component.html',
  providers: [ DiveService, DiagnosticService ]
})

export class SubmarineComponent implements OnInit {
  constructor(private _cs: CrabsService) { }

  public click(): void {
    // this._bs.nextInput();
  }

  // private doDive(): void {
  //   this._ds.executeCommands();
  //   this._ds.printResult();
  // }

  // private doDiagnostics(): void {
  //   this._dia.execute();
  //   this._dia.printResult();
  // }

  // private doBingo(): void {
  //   this._bs.read();
  // }

  // private hydro(): void {
  //   this._hts.draw();
  //   this._hts.printResult();
  // }

  // private latern(): void {
  //   this._ls.execute();
  // }

  ngOnInit() {
    // this.hydro();
    // this.latern();
    // this.doBingo();
    // this.doDive();
    // this.doDiagnostics();
  }
}
