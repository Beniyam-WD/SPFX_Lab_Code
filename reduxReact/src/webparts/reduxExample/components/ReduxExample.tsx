import * as React from 'react';
import styles from './ReduxExample.module.scss';
import { IReduxExampleProps } from './IReduxExampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IApplicationState } from './IApplicationState';

import { increment, decrement} from './Action';
import NewComponent from './NewComponent';

export default class ReduxExample extends React.Component<IReduxExampleProps, {}> {

  private store = this.props.store;

   public render(): React.ReactElement<IReduxExampleProps> {
    return (
      <div>
      <div className={ styles.counter }>
        <h2>Counter</h2>
        <div>
          <button onClick = {() =>{this.store.dispatch(decrement());}}>-</button>
          <span>{this.store.getState().count}</span>
          <button onClick = {() =>{this.store.dispatch(increment());}}>+</button>
        </div>
      </div>
      <NewComponent store={this.store}></NewComponent>
      </div>
    );
  }
}
