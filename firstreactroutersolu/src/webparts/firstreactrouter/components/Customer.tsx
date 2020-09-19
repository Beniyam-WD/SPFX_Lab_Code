import * as React from 'react';
import styles from './Firstreactrouter.module.scss';
import {IFirstreactrouterProps} from './IFirstreactrouterProps';

export default class Customer extends React.Component<IFirstreactrouterProps, {}>{

  public render(): React.ReactElement<IFirstreactrouterProps>{
    return(
        <div className={styles.firstreactrouter}>
          <h1>Click Here to get Customer details</h1>
          <h6><a href="#Customer/233232">Custmer ID : 233232</a></h6>
          <h6><a href="#Customer/342333">Custmer ID : 342333</a></h6>
          <h6><a href="#Customer/444422">Custmer ID : 444422</a></h6>
          <h6><a href="#Customer/456564">Custmer ID : 456564</a></h6>
          <h6><a href="#Customer/123122">Custmer ID : 123122</a></h6>
          <h6><a href="#Customer/212121">Custmer ID : 212121</a></h6>
          <h6> <a href="#Customer/899898">Custmer ID : 899898</a></h6>
        </div>
    );
  }
}
