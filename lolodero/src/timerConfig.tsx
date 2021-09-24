import React, {ChangeEvent, useCallback} from 'react';
import {FC} from 'react';
import {TimerConfig} from './timerService';
import {HandlerOf} from './util';

export interface TimerSetupProps {
  config: TimerConfig;
  onConfigUpdated?: HandlerOf<TimerConfig>;
}

export const TimerSetup: FC<TimerSetupProps> = props => {
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log('VALUE', event.target.value);
  }, []);

  return (
    <div>
      <span>TIMER</span>
      <input type="text" onChange={onChange} value={props.config.duration}></input>
    </div>
  );
};