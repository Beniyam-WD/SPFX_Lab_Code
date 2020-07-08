import * as React from 'react';
import styles from './ReactComponents.module.scss';
import { IReactComponentsProps } from './IReactComponentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Welcome from './Welcome';
import Products from './Products';
import Orders from './Orders';
import MyCart from './MyCart';



export default class ReactComponents extends React.Component<IReactComponentsProps, {}> {
  public render(): React.ReactElement<IReactComponentsProps> {
    return (
      <div className={ styles.reactComponents }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <Welcome name="JPOWER4 Shopping Cart!"/>
              <Products/>
              <Orders/>
              <MyCart/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
