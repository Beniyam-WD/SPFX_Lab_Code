import * as React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './IAvatarProps';
import { IAvatarState } from './IAvatarState';

import  UserAvatar from './UserAvatar';

export default class Nav extends React.Component<IAvatarProps, IAvatarState, {}>{

  public render(): React.ReactElement<IAvatarProps> {
    return (
      <div className={styles.nav}>
        <UserAvatar user={this.props.user}></UserAvatar>
      </div>
    );
  }
}
