import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { crabs } from '../vars/crabs';

@Injectable({providedIn: 'root'})
export class CrabsService {
  private _crabs: number[] = [];

  constructor() { 
    this.read();
    const med = this.calcMedian();
    this.calcFuelMedian(med);
  }
  
  private read(): void {
    this._crabs = crabs.split(',').map((x) => { return Number(x); });
  }

  private calcMedian(): number {
    this._crabs = this._crabs.sort((a, b) => { 
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    let total = 0;
    this._crabs.forEach((d) => {
      total = total + d;
    });

    return Math.round(total / this._crabs.length);
  }

  private calcFuelMedian(med: number): void {
    let fuel = 0;

    this._crabs.forEach((c) => {
      let dif = 0;
      if (c > med) {
        dif = c - med; 
      } else {
        dif = med - c;
      }

      for (let i = 1; i <= dif; i++) {
        fuel = fuel + i;
      }
    });

    console.log('fuel', fuel);
  }
}