import { Injectable } from '@angular/core';
import { fishes } from '../vars/latern';


@Injectable({providedIn: 'root'})
export class LanternService {
  private fishes: number[] = [];
  private realFishes: number[] = [];

  constructor() { 
    this.read();
  }

  public execute(): void {
    for (let i = 0; i < 256; i++) {
      const zeroBoys = this.realFishes.shift() as number;
      this.realFishes.push(zeroBoys);
      this.realFishes[6] = this.realFishes[6] + zeroBoys;
    }

    let count = 0;

    this.realFishes.forEach((x) => {
      count = count + x;
    });
  }
  
  private read(): void {
    this.fishes = fishes.split(',').map((x) => { return Number(x); });
    this.createRealFishes();
    this.putFishesInTank();
    console.log('weird fishes', this.realFishes)
  }

  private putFishesInTank(): void {
    this.fishes.forEach((blub) => {
      this.realFishes[blub] = this.realFishes[blub] + 1;
    });
  }

  private createRealFishes(): void {
    for (let i = 0; i < 9; i++) {
      this.realFishes.push(0);
    }
  }

}