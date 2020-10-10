import * as React from 'react';
import styles from './ReduxExample.module.scss';

import {IReduxExampleProps} from './IReduxExampleProps';
import {IApplicationState} from './IApplicationState';

export default class NewComponent extends React.Component<IReduxExampleProps,IApplicationState,{}>{
  private store = this.props.store;

  public render(): React.ReactElement<IReduxExampleProps>{
    return (
      <div>
        <h2>New component executed</h2>
        <h3>Counter value : {this.store.getState().count}</h3>
      </div>
    );
  }
}
