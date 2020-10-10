import * as React from 'react';
import styles from './Counter.module.scss';
import { ICounterProps } from './ICounterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import CounterComp from './CounterComp';

export default class Counter extends React.Component<ICounterProps, {}> {
  public render(): React.ReactElement<ICounterProps> {
    return (
      <div>
        <CounterComp></CounterComp>
      </div>
    );
  }
}
