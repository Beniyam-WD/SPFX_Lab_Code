import * as React from 'react';
import styles from './Avatar.module.scss';
import { IAvatarProps } from './IAvatarProps';
import { IAvatarState } from './IAvatarState';

import Sidebar from './Sidebar';
import Content from './Content';

export default class BContent extends React.Component<IAvatarProps,IAvatarState,{}>{
  public render():React.ReactElement<IAvatarProps>{
    return(
      <div className={styles.body}>
        <Sidebar user={this.props.user}></Sidebar>
        <Content user={this.props.user}></Content>
      </div>
    );
  }
}
