import React from 'react';
import {FC} from 'react';
import styled, {css} from 'styled-components';
import {ProgressBar} from './progressBar';
import {getTimerStatus, RunningTimerStatuses, TimerState} from './timerService';
import {seconds} from './util';

export interface RunningTimerProps {
  timer: TimerState;
}

interface TimerStyleProps {
  $status: RunningTimerStatuses;
}

const StyledDiv = styled.div<TimerStyleProps>`
  height: 40px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #444;

  ${p => addStatusStyle(p.$status)}
`;



function addStatusStyle(status: RunningTimerStatuses) {
  switch (status) {
    case RunningTimerStatuses.WAITING:
      return css`
        background-color: #aaa;
      `;

    case RunningTimerStatuses.ACTIVE:
      return css`
        background-color: #eee;
      `;

  case RunningTimerStatuses.ENDED:
    return css`
      background-color: #888;
    `;

    default:
      return null;
  }
}

export const RunningTimer: FC<RunningTimerProps> = props => {
  const {timer} = props;
  const status = getTimerStatus(timer);

  return (
    <StyledDiv $status={status}>
      {renderContent(timer, status)}
    </StyledDiv>
  );
};

function renderContent(timer: TimerState, status: RunningTimerStatuses) {
  switch (status) {
    case RunningTimerStatuses.WAITING:
      return 'WAITING';

    case RunningTimerStatuses.ACTIVE:
      return <ProgressBar timer={timer} />;

    case RunningTimerStatuses.ENDED:
      return 'DONE';
  }
}