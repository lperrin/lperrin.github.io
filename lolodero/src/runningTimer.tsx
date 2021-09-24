import React from 'react';
import {FC} from 'react';
import styled, {css} from 'styled-components';
import {getTimerStatus, RunningTimerStatuses, TimerState} from './timerService';
import {seconds} from './util';

export interface RunningTimerProps {
  timer: TimerState;
}

interface TimerStyleProps {
  $status: RunningTimerStatuses;
}

const StyledDiv = styled.div<TimerStyleProps>`
  padding: 10px;
  border: 1px solid #444;

  ${p => addStatusStyle(p.$status)}
`;



function addStatusStyle(status: RunningTimerStatuses) {
  switch (status) {
    case RunningTimerStatuses.WAITING:
      return css`
        background-color: #a00;
      `;

    case RunningTimerStatuses.ACTIVE:
      return css`
        background-color: #0a0;
      `;

  case RunningTimerStatuses.ENDED:
    return css`
      background-color: #00a;
    `;

    default:
      return null;
  }
}

export const RunningTimer: FC<RunningTimerProps> = props => {
  return (
    <StyledDiv $status={getTimerStatus(props.timer)}>
      <div>RUNNING TIMER</div>
      <div>index: {props.timer.index}</div>
      <div>elapsed: {seconds(props.timer.elapsed)} / {props.timer.duration}</div>
      <div>isStarted: {props.timer.isStarted}</div>
      <div>isEnded: {props.timer.isEnded}</div>
    </StyledDiv>
  );
};