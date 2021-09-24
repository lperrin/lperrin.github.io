import React, {FC} from 'react';
import styled, {css} from 'styled-components';
import {TimerState} from './timerService';

export interface ProgressBarProps {
  timer: TimerState;
}

const StyledDiv = styled.div`
  height: 10px;
  border: 1px solid #3ac;
  width: 100%;
`;

const StyledBar = styled.div`
  background-color: #888;
  height: 100%;
`;

export const ProgressBar: FC<ProgressBarProps> = props => {
  const {timer} = props;
  const width = 100 * timer.elapsed / timer.duration;

  return (
    <StyledDiv>
      <StyledBar style={{width: `${width}%`}} />
      <span>{Math.floor(timer.elapsed)} / {timer.duration}</span>
    </StyledDiv>
  );
};