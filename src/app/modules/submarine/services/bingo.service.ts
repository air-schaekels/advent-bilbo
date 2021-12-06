import { Injectable } from '@angular/core';
import { BingoBoard, bingoInput } from '../vars/bigno';

class Board {
  private inputBoard = [[-1,-1,-1,-1,-1], [-1,-1,-1,-1,-1], [-1,-1,-1,-1,-1], [-1,-1,-1,-1,-1], [-1,-1,-1,-1,-1]];
  private disbaleWin = false;

  constructor(public board: Number[][]) {}

  public input(n: number): void {

    this.board.forEach((row, ri) => {
      row.forEach((entry, ci) => {
        if (entry === n) {
          this.inputBoard[ri][ci] = n;
        }
      });
    });
  }

  public checkWon(): boolean {
    if (this.disbaleWin === true) {
      return false;
    }

    const isWon = this.checkWonRows();

    if (isWon) {
      return true;
    }

    return this.checkWonCols();
  }

  public calcWinSum(lastNumber: number): number {
    this.disbaleWin = true;
    let sum = 0;
    this.inputBoard.forEach((row, ri) => {
      row.forEach((col, ci) => {
        if (col === -1) {
          sum = sum + (this.board[ri][ci] as number);
        }
      });
    });
    return sum * lastNumber;
  }

  private checkWonCols(): boolean {
    let isWon = false;

    for (let i = 0; i < 5; i++) {
      let isWonCol = true;
      for (let j = 0; j < 5; j++) {
        if (this.inputBoard[j][i] === -1) {
          isWonCol = false;
        }
      }

      if (isWon !== true) {
        isWon = isWonCol;
      }
    }

    return isWon;
  }

  private checkWonRows(): boolean {
    let isWon = false;
    this.inputBoard.forEach((row) => {
      let isWonRow = true;
      row.forEach((c) => {
        if(c === -1) {
          isWonRow = false;
        }
      });

      if (isWon !== true) {
        isWon = isWonRow;
      }
    });

    return isWon;
  }
}

@Injectable({providedIn: 'root'})
export class BingoService {
  private _inputs: number[] = [];
  private _currentPosition = 0;

  public board: Board[] = [];

  constructor() { }

  public nextInput(): void {
    for (let i = this._currentPosition * 5; i < this._currentPosition * 5 + 5; i++) {
      this.board.forEach((board, index) => {
        board.input(this._inputs[i]);
        if (board.checkWon() === true) {
          console.log('result', board.calcWinSum(this._inputs[i]));
          console.log('index', index);
          console.log('last number', this._inputs[i]);
        }
      });
    }


    this._currentPosition++;

    console.log('board', this.board)
  }

  public read(): void {
    this._inputs = bingoInput.split(',').map((d) => { return Number(d) });
    this.createBoards();
    console.log(this._inputs);
  }

  private createBoards(): void {
    const buffer = BingoBoard.split('\n');
    let realB: number[][] = [];

    for(let j = 0; j < buffer.length; j++) {
      if (buffer[j] === '') {
        this.board.push(new Board(realB));
        realB = [];
      } else {
        const splits: number[] = [];

        for(let i = 0; i < 5; i++) {
          splits.push(Number(buffer[j].substring(i * 3, i * 3 + 3)));
        }
        
        realB.push(splits);
      }
    }

    this.board.push(new Board(realB));
  }
  
}