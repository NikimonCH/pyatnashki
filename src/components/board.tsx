"use client";
import React, { useEffect } from "react";
import styles from "@/styles/pyatnashki.module.scss";
import { board } from "./script";
import { useEventEmitter } from "@/utils/eventEmitter";

export default function Board() {
  useEventEmitter(board);
  useEffect(() => {
    board.start();
  }, []);

  return (
    <div className={`${styles.board} ${styles[`board__${board.boardSize}`]}`}>
      {board.tiles.map((element) => (
        <div
          className={`${styles.tile} ${element.isEmpty ? styles.empty : ``}`}
          key={element.num}
          onClick={() => {
            board.move(element);
          }}
        >
          {element.num.toString()}
        </div>
      ))}
    </div>
  );
}
