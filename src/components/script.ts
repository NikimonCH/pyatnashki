"use client";
import { EventEmitter } from "@/utils/eventEmitter";

interface Point {
  x: number;
  y: number;
}

class Tile {
  constructor(
    public num: number,
    public coordinates: Point = { x: 0, y: 0 },
    public idx: number = 0
  ) {}

  setIndex(newIdx: number) {
    this.idx = newIdx;
  }
  setCoordinates(boardSize: number) {
    this.coordinates = {
      x: this.idx % boardSize,
      y: Math.floor(this.idx / boardSize),
    };
  }
  setNum(newNum: number) {
    this.num = newNum;
  }
  get isEmpty(): boolean {
    return this.num === 0;
  }

  move(emptyCoords: Point) {
    if (this.canMove(emptyCoords)) {
      const bckp = structuredClone(this.num);
      this.num = 0;
    }
  }
  canMove(emptyCoords: Point) {
    return (
      (Math.abs(emptyCoords.x - this.coordinates.x) === 1 &&
        Math.abs(emptyCoords.y - this.coordinates.y) === 0) ||
      (Math.abs(emptyCoords.x - this.coordinates.x) === 0 &&
        Math.abs(emptyCoords.y - this.coordinates.y) === 1)
    );
  }
}

class Board extends EventEmitter {
  boardSize = 4;
  emptyCoords: Point = { x: this.boardSize, y: this.boardSize };
  tiles: Tile[] = [];

  // constructor() {
  //   // this.start();
  // }

  start() {
    const amount = this.boardSize * this.boardSize;
    this.tiles.length = 0;
    for (let i = 0; i < amount; i++) this.tiles.push(new Tile(i));
    this.tiles.sort(() => Math.random() - 0.5);
    for (let idx = 0; idx < amount; idx++) {
      this.tiles[idx].setIndex(idx);
      this.tiles[idx].setCoordinates(this.boardSize);
    }
    this.emptyCoords = this.tiles.find(({ num }) => num === 0)?.coordinates;
    this.notify();
  }

  setBoardSize(size: number) {
    this.boardSize = size;
    this.start();
  }

  move(tile: Tile) {
    if (tile.canMove(this.emptyCoords)) {
      const tempEmptyCoords = this.emptyCoords;
      const tempTileNum = tile.num;
      this.tiles
        .find(({ coordinates }) => coordinates === tempEmptyCoords)
        ?.setNum(tempTileNum);
      tile.move(this.emptyCoords);

      this.emptyCoords = tile.coordinates;
      this.notify();
    }
  }
}

export const board = new Board();
