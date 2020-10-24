import * as React from 'react';
import styles from './ProjectDetails.module.scss';
import { IProjectDetailsProps } from './IProjectDetailsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { HashRouter, Route} from "react-router-dom";

import {SPFxProject} from './SPFxProject';
import {SPFxView} from './SPFxView';

export default class ProjectDetails extends React.Component<IProjectDetailsProps, {}> {
  public render(): React.ReactElement<IProjectDetailsProps> {
    return (
      <div className={ styles.projectDetails }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to My Project!</span>
            </div>
          </div>
        </div>

        <HashRouter>
        <Route path="/" exact render={(props) =><SPFxProject currentURl={this.props.currentsiteURL} spHttpClient={this.props.spHttpClient}></SPFxProject>}></Route>
        <Route path="/ProjectView/:ID" exact render={(props) => <SPFxView {...props} currentURl={this.props.currentsiteURL} spHttpClient={this.props.spHttpClient}></SPFxView>}></Route>
        </HashRouter>
      </div>
    );
  }
}
