import * as React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './IAvatarProps';
import { IAvatarState } from './IAvatarState';

import UserStats from './UserStats';

export default class Content extends React.Component<IAvatarProps,IAvatarState,{}>{
  public render():React.ReactElement<IAvatarProps>{
    return(
      <div className={styles.content}>
        <UserStats user={this.props.user}></UserStats>
      </div>
    );
  }
}
