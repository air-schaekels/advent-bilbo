import { Injectable } from '@angular/core';
import { dive } from '../vars/dive';

interface IDiveCommand {
  command: string;
  motion: number;
}

@Injectable()
export class DiveService {
  private commands: IDiveCommand[] = [];

  private horizontalPosition = 0;
  private depth = 0;
  private aim = 0;

  constructor() { }
  
  public executeCommands(): void {
    this.retrieveData();
    this.calculateMotions();
  }

  public printResult(): void {
    console.log('horizontalPosition', this.horizontalPosition);
    console.log('depth', this.depth);
    console.log('multiply', this.depth * -1 * this.horizontalPosition);
  }

  private retrieveData(): void {
    const buffer = dive.split('\n');
    this.commands = buffer.map((g) => {
      const split = g.split(' ');
      return {
        command: split[0],
        motion: Number(split[1])
      }
    });
  }

  private calculateMotions(): void {
    this.commands.forEach((passion) => {
      (this as any)[passion.command](passion.motion);
    });
  }

  private forward(val: number): void {
    this.horizontalPosition = this.horizontalPosition + val;
    this.depth += this.aim * val;
  }

  private down(val: number): void {
    this.aim = this.aim - val;
  }

  private up(val: number): void {
    this.aim = this.aim + val;
  }
}