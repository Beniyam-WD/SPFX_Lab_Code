import * as React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './IAvatarProps';
import { IAvatarState } from './IAvatarState';

import UserStats from './UserStats';

export default class Sidebar extends React.Component<IAvatarProps,IAvatarState,{}>{
  public render():React.ReactElement<IAvatarProps>{
    return(
      <div className={styles.sidebar}>
        <img src="https://jpower4mvp.sharepoint.com/sites/SPFxTraining/Shared%20Documents/img1.png" width="400px" />
      </div>
    );
  }
}
