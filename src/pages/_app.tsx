"use client";
import React from "react";
import Board from "@/components/board";
import ChangeSizeButton from "@/components/changeButton";

export default function Pyatnashki() {
  return (
    <div>
      {ChangeSizeButton()}
      <Board />
    </div>
  );
}

// export default Pyatnashki;
