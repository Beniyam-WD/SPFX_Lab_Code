import * as React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './IAvatarProps';
import { IAvatarState } from './IAvatarState';

import UserAvatar from './UserAvatar';

export default class UserStats extends React.Component<IAvatarProps,IAvatarState,{}>{
  public render():React.ReactElement<IAvatarProps>{
    return(
      <div className={styles.userstats}>
        <div>
          <UserAvatar user={this.props.user}/>
            {this.props.user.name}
        </div>
        <div className={styles.stats}>
          <div>Followers : {this.props.user.followers}</div>
          <div>Following : {this.props.user.following}</div>
        </div>
      </div>
    );
  }
}



