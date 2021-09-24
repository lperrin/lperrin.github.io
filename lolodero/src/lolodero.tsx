import React, {useCallback, useEffect} from 'react';
import {FC, useState} from 'react';
import styled from 'styled-components';
import {RunningTimer} from './runningTimer';
import {TimerSetup} from './timerSetup';
import {initRunningState, initTimerConfig, RunningTimerState, TimerConfig, TimerState, updateRunningTimer} from './timerService';
import {Handler, HandlerOf, replaceInArray} from './util';

const StyledDiv = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
`;

export const Lolodero: FC = () => {
  const [timerConfigs, setTimerConfigs] = useState<readonly TimerConfig[]>([
    {duration: 10, index: 0},
    {duration: 10, index: 1},
    {duration: 10, index: 2}
  ]);
  const [runningTimer, setRunningTimer] = useState<RunningTimerState | undefined>();

  const onConfigUpdated = useCallback((config: TimerConfig) => {
    setTimerConfigs(timerConfigs => replaceInArray(timerConfigs, config))
  }, [setTimerConfigs]);

  const addTimer = useCallback(() => {
    setTimerConfigs((timers) => {
      return [...timers, initTimerConfig(timers)];
    });
  }, [setTimerConfigs]);

  useEffect(() => {
    let isMounted = true;

    function runner() {
      if (!isMounted)
        return;

      if (!runningTimer)
        return;

      const newRunningTimer = updateRunningTimer(runningTimer);
      setRunningTimer(newRunningTimer);

      requestAnimationFrame(runner);
    }

    requestAnimationFrame(runner);

    return () => {
      isMounted = false
    };
  });

  const startTimer = useCallback(() => {
    setRunningTimer(initRunningState(timerConfigs));
  }, [timerConfigs, setRunningTimer]);

  const resetTimer = useCallback(() => {
    setRunningTimer(undefined);
  }, [setRunningTimer]);

  return (
    <StyledDiv>
      {runningTimer && renderTimers(runningTimer, resetTimer)}
      {!runningTimer && renderSetup(timerConfigs, onConfigUpdated, addTimer, startTimer)}
    </StyledDiv>
    );
};

function renderSetup(timerConfigs: readonly TimerConfig[], onConfigUpdated: HandlerOf<TimerConfig>, addTimer: Handler, startTimer: Handler) {
  return (
    <>
      {timerConfigs.map(config => (<TimerSetup key={config.index} config={config} onConfigUpdated={onConfigUpdated} />))}
      <button onClick={addTimer}>ADD TIMER</button>
      <button onClick={startTimer}>START</button>
    </>
  );
}

function renderTimers(runningState: RunningTimerState, resetTimer: Handler) {
  return (
    <>
      {runningState.timers.map(timerState => (<RunningTimer key={timerState.index} timer={timerState} />))}
      <button onClick={resetTimer}>STOP</button>
    </>
  );
}
