import * as React from 'react';
import styles from './Counter.module.scss';
import { ICounterProps } from './ICounterProps';
import { ICounterState } from './ICounterState';

export default class CounterComp extends React.Component<ICounterProps,ICounterState,{}>
{
  constructor(props:ICounterProps,state:ICounterState)
  {
    super(props);
    this.state={
      count:0
    };
  }

  private decrement = () =>{
    this.setState({
      count: this.state.count - 1
    });
  }

  private increment = () =>{
    this.setState({
      count: this.state.count + 1
    });
  }



  public render(): React.ReactElement<ICounterProps>{

    return (
      <div className={styles.counter}>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.state.count}</span>
          <button onClick={this.increment}>+</button>
        </div>

      </div>
    );
  }
}
