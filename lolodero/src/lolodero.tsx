import React, {useCallback, useEffect} from 'react';
import {FC, useState} from 'react';
import {RunningTimer} from './runningTimer';
import {TimerSetup} from './timerConfig';
import {initRunningState, initTimerConfig, RunningTimerState, TimerConfig, TimerState, updateRunningTimer} from './timerService';

export const Lolodero: FC = () => {
  const [timerConfigs, setTimerConfigs] = useState<readonly TimerConfig[]>([
    {duration: 10, index: 0},
    {duration: 10, index: 1},
    {duration: 10, index: 2}
  ]);
  const [runningTimer, setRunningTimer] = useState<RunningTimerState | undefined>();

  const addTimer = useCallback(() => {
    setTimerConfigs((timers) => {
      return [...timers, initTimerConfig(timers)];
    });
  }, [setTimerConfigs]);

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('TICK', runningTimer);

      if (!runningTimer)
        return;

      const newRunningTimer = updateRunningTimer(runningTimer);
      setRunningTimer(newRunningTimer);
    }, 500);

    return () => clearInterval(timerId);
  });

  const startTimer = useCallback(() => {
    setRunningTimer(initRunningState(timerConfigs));
  }, [timerConfigs, setRunningTimer]);

  const resetTimer = useCallback(() => {
    setRunningTimer(undefined);
  }, [setRunningTimer]);

  return (
    <div>
      {runningTimer && renderTimers(runningTimer)}
      {!runningTimer && renderSetup(timerConfigs)}
      <button onClick={addTimer}>ADD TIMER</button>
      <button onClick={startTimer}>START</button>
      {runningTimer && <button onClick={resetTimer}>RESET TIMER</button>}
    </div>
    );
};

function renderSetup(timerConfigs: readonly TimerConfig[]) {
  return timerConfigs.map(config => (<TimerSetup key={config.index} config={config} />));
}

function renderTimers(runningState: RunningTimerState) {
  return runningState.timers.map(timerState => (<RunningTimer key={timerState.index} timer={timerState} />));
}
