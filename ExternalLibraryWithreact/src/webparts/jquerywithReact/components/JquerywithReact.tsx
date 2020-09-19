import * as React from 'react';
import styles from './JquerywithReact.module.scss';
import { IJquerywithReactProps } from './IJquerywithReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

import Feedback from './Feedback';

export default class JquerywithReact extends React.Component<IJquerywithReactProps, {}> {
  public render(): React.ReactElement<IJquerywithReactProps> {
    return (
      <div className={ styles.jquerywithReact }>
        <div className="container-fluid">
          <Feedback></Feedback>
        </div>
      </div>
    );
  }
}
