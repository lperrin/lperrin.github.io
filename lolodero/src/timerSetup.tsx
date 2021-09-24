import React, {ChangeEvent, useCallback} from 'react';
import {FC} from 'react';
import styled from 'styled-components';
import {TimerConfig} from './timerService';
import {HandlerOf} from './util';

export interface TimerSetupProps {
  config: TimerConfig;
  onConfigUpdated: HandlerOf<TimerConfig>;
  onConfigDeleted: HandlerOf<TimerConfig>;
}

const StyledDiv = styled.div`
  width: 100%;
  height: 60px;
`;

export const TimerSetup: FC<TimerSetupProps> = props => {
  const {config, onConfigUpdated, onConfigDeleted} = props;
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onConfigUpdated({
      ...config,
      duration: Number(event.target.value)
    })
  }, []);

  const onDelete = useCallback(() => onConfigDeleted(config), [onConfigDeleted]);

  return (
    <StyledDiv>
      <span>TIMER</span>
      <input type="range" min="5" max="100" onChange={onChange} value={props.config.duration}></input>
      <span>{config.duration}</span>
      <button onClick={onDelete}>X</button>
    </StyledDiv>
  );
};