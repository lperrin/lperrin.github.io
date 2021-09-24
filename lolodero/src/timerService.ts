import {last} from 'lodash';
import {milliseconds, replaceInArray, seconds} from './util';

export interface TimerConfig {
  index: number;
  duration: number;
}

export function initTimerConfig(timerConfigs: readonly TimerConfig[]): TimerConfig {
  const lastConfig = last(timerConfigs);

  const duration = lastConfig ? lastConfig.duration : 10;

  return {duration, index: timerConfigs.length};
}

export interface TimerState extends TimerConfig {
  index: number;
  isStarted: boolean;
  isEnded: boolean;
  elapsed: number;
}

export interface RunningTimerState {
  timers: readonly TimerState[];
  lastStartAt: number;
  updatedAt: number;
  isEnded: boolean;
}

export function initRunningState(timerConfigs: readonly TimerConfig[]): RunningTimerState {
  const now = Date.now();

  return {
    timers: timerConfigs.map(initTimerState),
    lastStartAt: now,
    updatedAt: now,
    isEnded: false
  };
}

function initTimerState(config: TimerConfig): TimerState {
  return {
    ...config,
    index: config.index,
    isStarted: config.index === 0,
    isEnded: false,
    elapsed: 0
  };
}

export function updateRunningTimer(state: RunningTimerState): RunningTimerState {
  const now = Date.now();
  const delta = seconds(now - state.updatedAt);

  const newTimers = applyDelta(state.timers, delta);
  const isEnded = !findActiveTimer(newTimers);

  return {
    ...state,
    timers: newTimers,
    updatedAt: now,
    isEnded
  };
}

function findActiveTimer(timers: readonly TimerState[]) {
  return timers.find(timer => !timer.isEnded);
}

function applyDelta(timers: readonly TimerState[], delta: number): readonly TimerState[] {
  const activeTimer = findActiveTimer(timers);
  if (!activeTimer)
    return timers;

  const [newTimer, newDelta] = updateTimer(activeTimer, delta);
  const newTimers = replaceInArray(timers, newTimer);

  if (newDelta > 0)
    return applyDelta(newTimers, newDelta);

  return newTimers;
}

function updateTimer(timer: TimerState, delta: number): [TimerState, number] {
  const elapsed = timer.elapsed + delta;
  const isEnded = elapsed >= timer.duration;

  if (isEnded) {
    const endedTimer = {...timer, isStarted: true, isEnded: true, elapsed: timer.duration};
    return [endedTimer, elapsed - timer.duration];
  }

  const continuingTimer = {...timer, isStarted: true, isEnded: false, elapsed};
  return [continuingTimer, 0];
}

export enum RunningTimerStatuses {
  WAITING = 'waiting',
  ACTIVE = 'active',
  ENDED = 'ended'
}

export function getTimerStatus(timer: TimerState) {
  if (!timer.isStarted)
    return RunningTimerStatuses.WAITING;

  return timer.isEnded ? RunningTimerStatuses.ENDED : RunningTimerStatuses.ACTIVE;
}