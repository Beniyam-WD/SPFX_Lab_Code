import * as React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './IAvatarProps';
import { IAvatarState } from './IAvatarState';

export default class UserAvatar extends React.Component<IAvatarProps,IAvatarState,{}>{
  public render():React.ReactElement<IAvatarProps>{
    return(
      <img className={styles.useravatar}
      alt="user avatar"
      src={this.props.user.avatar}/>
    );
  }
}
