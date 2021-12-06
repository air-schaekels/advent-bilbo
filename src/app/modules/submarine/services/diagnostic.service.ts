import { Injectable } from '@angular/core';
import { diagnostics } from '../vars/diagnositcs';

interface ICalcDiagnostic {
  0: number;
  1: number;
}

@Injectable()
export class DiagnosticService {
  private rawDiagnostics: string[] = [];

  private gamma = 0;
  private eplision = 0;

  private oxygen = '';
  private co = '';

  private oxygenNumber = 0;
  private coNumber = 0;

  constructor() { }
  
  public printResult(): void {
    console.log('gamma decimal', this.gamma);
    console.log('eplsion decimal', this.eplision);
    console.log('power cosumption', this.gamma * this.eplision);
    console.log('oxygen', this.oxygenNumber);
    console.log('co', this.coNumber);
    console.log('life support', this.coNumber * this.oxygenNumber);
  }

  public execute(): void {
    this.retrieveData();
    this.calc();
    this.calcOxygen(this.rawDiagnostics);
  }

  private getDifferenceByPosoiton(arr: string[], pos: number): ICalcDiagnostic {
    const buffer = { 0: 0, 1: 0 };

    arr.forEach((v) => {
      if (v.charAt(pos) === '0') {
        buffer[0]++;
      } else {
        buffer[1]++;
      }
    });

    return buffer;
  }

  private calcOxygen(arr: string[]): void {
    const buffer = this.getDifferenceByPosoiton(arr, 0);

    let checker = '';
    if (buffer[0] > buffer[1]) {
      checker = '0';
    } else {
      checker = '1';
    }

    const o2: string[] = [];
    const co2: string[] = [];


    arr.forEach((v) => {
      if (v.charAt(0) === checker) {
        o2.push(v);
      } else {
        co2.push(v);
      }
    });

    this.calcrecurs(o2, 1, 'oxygen');
    this.calcrecursco(co2, 1);

    this.coNumber = parseInt(this.co, 2);
    this.oxygenNumber = parseInt(this.oxygen, 2);
  }

  private calcrecursco(co: string[], pos: number): void {
    if (co.length === 1) {
      this.co = co[0];
      return;
    }

    const buffer = this.getDifferenceByPosoiton(co, pos);
    let checker = '';

    if (buffer[0] > buffer[1]) {
      checker = '1';
    } else {
      checker = '0';
    }

    const newCO: string[] = [];

    co.forEach((v) => {
      if(v.charAt(pos) === checker) {
        newCO.push(v);
      }
    });

    pos++;
    this.calcrecursco(newCO, pos);
  }

  private calcrecurs(o: string[], pos: number, propertyName: string): void {
    if (o.length === 1) {
      (this as any)[propertyName] = o[0];
      return;
    }

    const buffer = this.getDifferenceByPosoiton(o, pos);
    let checker = '';

    if (buffer[0] > buffer[1]) {
      checker = '0';
    } else {
      checker = '1';
    }

    const newO: string[] = [];

    o.forEach((v) => {
      if(v.charAt(pos) === checker) {
        newO.push(v);
      }
    });

    pos++;
    this.calcrecurs(newO, pos, propertyName);
  }

  private calc(): void {
    const arr = this.fillArray();

    this.rawDiagnostics.forEach((v) => {
      for(let i = 0; i < v.length; i++) {
        if (v.charAt(i) === '0') {
          arr[i][0]++;
        } else {
          arr[i][1]++;
        }
      }
    });

    this.getGammaAndEplision(arr);
  }

  private getGammaAndEplision(arr: ICalcDiagnostic[]) {
    let gammeBits = '';
    let eplisionBits = '';

    arr.forEach((val) => {
      if (val[0] > val[1]) {
        gammeBits += '0';
        eplisionBits += '1';
      } else {
        gammeBits += '1';
        eplisionBits += '0';
      }
    });

    this.gamma = parseInt(gammeBits, 2);
    this.eplision = parseInt(eplisionBits, 2);
  }

  private fillArray(): ICalcDiagnostic[] {
    const result: ICalcDiagnostic[] = [];
    const l = this.rawDiagnostics[0].length;
    for (let i = 0; i < l; i++) {
      result.push({ 0: 0, 1: 0});
    }
    return result;
  }

  private retrieveData(): void {
    this.rawDiagnostics = diagnostics.split('\n');
  }
}