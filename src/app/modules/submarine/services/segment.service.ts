import { Injectable } from '@angular/core';
import { segments } from '../vars/segments';

@Injectable({providedIn: 'root'})
export class SegmentService {
  private delimters: string[][] = [];
  private decoders: string[][] = [];
  private numbers: number[] = [];

  constructor() {
    this.read();
    this.execute();
    this.executeReal();
  }

  private executeReal(): void {
    const decoded = this.decode();
    console.log('decoded', decoded);

    this.delimters.forEach((y, index) => {
      let concati = '';
      y.forEach((x) => {
        for (let i = 0; i < 10; i++) {
          if (x.split('').sort().join() === decoded[index][i].split('').sort().join()) {
            concati = concati + i;
          }
        }
      });
      this.numbers.push(Number(concati));
    });

    let sum = 0;
    this.numbers.forEach((x) => {
      sum = sum + x;
    });

    console.log('Totalli', sum);
  }

  private decode(): any[] {
    const result: any[] = [];

    this.decoders.forEach((y) => {
      const buff = {} as any;
      y.forEach((x) => {
        if (x.length === 2) { // 1
          buff[1] = x;
        } else if (x.length === 3) { // 7
          buff[7] = x;
        } else if (x.length === 4) { // 4
          buff[4] = x;
        } else if (x.length === 7) { // 8
          buff[8] = x;
        }
      });

      y.forEach((x) => {
        if (x.length === 5) { // 3 5 2
          if (x.indexOf(buff[1][0]) !== -1 && x.indexOf(buff[1][1]) !== -1) {
            // 3
            buff[3] = x;
          }
        } 
        // else if (x.length === 6) { // 6 9 0
        //   if (x.indexOf(buff[1][0]) !== -1 && x.indexOf(buff[1][1]) !== -1) {
        //     // 0 9
        //     buff[3] = x;
        //   }
        // }
      });


      // console.log('bff', buff);
      // find middle leg
      // remove all 7 legs from 3
      let buffer = '';
      for(let i = 0; i < buff[3].length; i++) {
        if (buff[7].indexOf(buff[3][i]) === -1) {
          buffer = buffer + buff[3][i];
        }
      }

      let middleLetter = '';
      for(let i = 0; i < buffer.length; i++) {
        if (buff[4].indexOf(buffer[i]) !== -1) {
          middleLetter = buffer[i];
        }
      }

      let leftUpLetter = '';
      for(let i = 0; i < buff[4].length; i++) {
        if (buff[1].indexOf(buff[4][i]) === -1 && buff[4][i] !== middleLetter) {
          leftUpLetter = buff[4][i];
        }
      }

      y.forEach((x) => {
        if (x.length === 5) { // 3 5 2
          if (x.indexOf(leftUpLetter) !== -1) {
            buff[5] = x;
          } else if(x !== buff[3] && x.indexOf(leftUpLetter) === -1) {
            buff[2] = x;
          }
        } else if (x.length === 6) { // 6 9 0
          if (x.indexOf(middleLetter) === -1) {
            buff[0] = x;
          } else {

            // match 1 compeltly
            let isMatch = true;
            for (let i = 0; i < buff[1].length; i++) {
              if(x.indexOf(buff[1][i]) === -1) {
                isMatch = false;
              }
            }

            if (isMatch === false) {
              buff[6] = x;
            } else {
              buff[9] = x;
            }
          }
        }
      });

      result.push(buff);
    });
    return result;
  }

  private read(): void {
    this.delimters = segments.split('\n').map((x) => {
      return x.split(' | ')[1];
    }).map((y) => { 
      return y.split(' ');
    });

    this.decoders = segments.split('\n').map((x) => {
      return x.split(' | ')[0];
    }).map((y) => { 
      return y.split(' ');
    });
  }

  private execute(): void {
    let count = 0;

    this.delimters.forEach((y) => {
      y.forEach((x) => {
        if (x.length === 2 || x.length === 3 || x.length === 4 || x.length === 7) {
          count++;
        }
      });

    });

    console.log('count', count);
  }
}