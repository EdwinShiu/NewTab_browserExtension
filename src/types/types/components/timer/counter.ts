export type CounterType = {
  second: number;
  setSecond: Function;
};

export type TimerListType = {
  setSecond: Function,
  timers: number[],
  addTimer: Function,
}