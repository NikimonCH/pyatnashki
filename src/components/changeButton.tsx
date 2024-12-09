"use client";
import React from "react";
import styles from "@/styles/pyatnashki.module.scss";
import { board } from "./script";

const ChangeAmountButton = () => {
  return (
    <div className={styles.changeAmountButton}>
      <div className={styles.rad}>
        <input
          type="radio"
          name="amount"
          value="4"
          onClick={() => {
            board.setBoardSize(4);
          }}
        ></input>
        <span>{4}</span>
      </div>
      <div className={styles.rad}>
        <input
          type="radio"
          name="amount"
          value="5"
          onClick={() => {
            board.setBoardSize(5);
          }}
        ></input>
        <span>{5}</span>
      </div>
      <div className={styles.rad}>
        <input
          type="radio"
          name="amount"
          value="6"
          onClick={() => {
            board.setBoardSize(6);
          }}
        ></input>
        <span>{6}</span>
      </div>
    </div>
  );
};

export default ChangeAmountButton;
