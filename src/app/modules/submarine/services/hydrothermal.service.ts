import { Injectable } from '@angular/core';
import { lines } from '../vars/hydrothermal';

interface IPoint {
  x: number;
  y: number;
}

class Line {
  public begin: IPoint;
  public end: IPoint;
  public angle: 'vertical' | 'horizontal' | 'diagonal' = 'horizontal';
  public direction:  1 | -1 = -1;

  public xDirection: 1 | -1 = -1;
  public yDirection: 1 | -1 = -1;

  constructor(raw: string) {
    const splitted = raw.split(' -> ');
    this.begin = {
      x: Number(splitted[0].split(',')[0]),
      y: Number(splitted[0].split(',')[1])
    }

    this.end = {
      x: Number(splitted[1].split(',')[0]),
      y: Number(splitted[1].split(',')[1])
    }
  }

  public lineLength(): number {
    const x = this.begin.x - this.end.x;
    const y = this.begin.y - this.end.y;

    if (x === 0) {
      this.angle = 'vertical';
      return this.calcNormal(x, y);
    } else if (y === 0) {
      this.angle = 'horizontal';
      return this.calcNormal(x, y);
    } else {
      this.angle = 'diagonal';
      return this.calcDiagonal(x, y);
    }
  }

  private calcDiagonal(x: number, y: number): number {
    if (x < 0) {
      this.xDirection = 1;
    }
    if (y < 0) {
      this.yDirection = 1;
    }

    const result = x;

    if (result < 0) {
      return result * -1 + 1;
    }

    return result + 1;
  }

  private calcNormal(x: number, y: number): number {
    const result = x + y;
    if (result < 0) {
      this.direction = 1;
      return result * -1 + 1;
    }

    return result + 1;
  }
}

@Injectable({providedIn: 'root'})
export class HydroThermalService {
  private board: number[][] = [];
  private lines: Line[] = [];

  constructor() {
    this.setup();
    this.read();
    console.log('lines', this.lines);
    // console.log('board', this.board);
  }

  public printResult() {
    let count = 0;
    this.board.forEach((x) => {
      x.forEach((y) => {
        if (y >= 2) {
          count++;
        }
      });
    });

    console.log('result', count);
  }

  public draw(): void {
    this.lines.forEach((line , index) => {
      // if (index > 5) {
      //   return;
      // }
      // if (line.begin.x === line.end.x || line.begin.y === line.end.y) {
        const length = line.lineLength();
        console.log('lien', line, length)
        if (length === 0) {
          return;
        }
        for (let i = 0; i < length; i++) {
          if (line.angle === 'horizontal') {
            // console.log('this.board[line.begin.x + i][line.begin.y]', this.board[line.begin.x + i][line.begin.y])
            this.board[line.begin.x + (i * line.direction)][line.begin.y] = this.board[line.begin.x + (i * line.direction)][line.begin.y] +1;
          } else if (line.angle === 'vertical') {
            this.board[line.begin.x][line.begin.y + (i * line.direction)] = this.board[line.begin.x][line.begin.y + (i * line.direction)] +1;
          } else {
            // console.log('x,y', line.begin.x + (i * line.xDirection), line.begin.y +(i * line.yDirection))
            this.board[line.begin.x + (i * line.xDirection)][line.begin.y + (i * line.yDirection)] =  this.board[line.begin.x + (i * line.xDirection)][line.begin.y + (i * line.yDirection)] +1;
          }
        }
      // }


    });

    console.log('board', this.board);
  }
  
  private setup(): void {
    for (let i = 0; i < 1100; i++) {
      let buffer = [];
      for (let j = 0; j < 1100; j++) {
        buffer.push(0);
      }
      this.board.push(buffer);
    }
  }

  private read(): void {
    const buffer = lines.split('\n');

    buffer.forEach((sea) => {
      this.lines.push(new Line(sea));
    });
  }

}