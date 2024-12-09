import { useEffect, useState, useRef } from "react";

export type Callback = () => void;
export class EventEmitter {
  listeners: Callback[];
  constructor() {
    this.listeners = [];
  }

  addListener(listener: Callback) {
    this.listeners.push(listener);
  }

  removeListener(listenerToRemove: Callback) {
    this.listeners = this.listeners.filter(
      (listener) => listenerToRemove !== listener
    );
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  getListeners() {
    return this.listeners;
  }
}

export const useEventEmitter = (instance: EventEmitter) => {
  const [, forceUpdate] = useState(0); // <-- Simply incrementing a counter will cause a re-render
  const listenerRef = useRef<Callback>(null); // <-- Hold a reference to the current listener function across renders

  useEffect(() => {
    const newListener = () => {
      forceUpdate((prev) => prev + 1);
    };

    // Remove any existing listeners
    if (listenerRef.current) {
      instance.removeListener(listenerRef.current);
    }

    // Add the listener
    listenerRef.current = newListener;
    instance.addListener(newListener);

    // Cleanup listener and remove on unmount
    return () => {
      instance.removeListener(newListener);
    };
  }, [instance]);

  return instance;
};
