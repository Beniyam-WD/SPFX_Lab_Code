import * as React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './IAvatarProps';
import { IAvatarState } from './IAvatarState';

import { escape } from '@microsoft/sp-lodash-subset';

import Nav from './Nav';
import BContent from './BContent';

export default class Avatar extends React.Component<IAvatarProps, IAvatarState, {}> {

  constructor(props: IAvatarProps, state: IAvatarState) {
    super(props);
    this.state = {
      user: {
        avatar: "https://pbs.twimg.com/profile_images/1068848971592933376/FnJHqWaC_400x400.jpg",
        name: "Jenkins NS",
        followers: 652,
        following: 965
      }
    };
  }

  public render(): React.ReactElement<IAvatarProps> {
    const { user } = this.state;

    return (
      <div className={styles.app}>
        <Nav user={user}></Nav>
        <BContent user={user}></BContent>
      </div>
    );
  }
}
