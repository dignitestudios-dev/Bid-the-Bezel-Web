// use-now.ts

import { useSyncExternalStore } from "react";

let now = Date.now(); // stable value between ticks

const subscribe = (cb: () => void) => {
  const id = setInterval(() => {
    now = Date.now(); // update ONLY on tick
    cb();
  }, 1000);
  return () => clearInterval(id);
};

const getSnapshot = () => now; // returns same value between ticks ✅

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot);
}