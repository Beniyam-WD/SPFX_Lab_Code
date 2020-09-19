import * as React from 'react';
import styles from './Firstreactrouter.module.scss';
import {IFirstreactrouterProps} from './IFirstreactrouterProps';

export default class CustomerDetails extends React.Component<IFirstreactrouterProps, {}>{

  public render(): React.ReactElement<IFirstreactrouterProps>{
    return(
        <div className={styles.firstreactrouter}>
          <h3>Selected Customer ID is : <span style={{color:'red'}}>{this.props["match"]["params"]["id"]}</span></h3>
          <p>The SharePoint Framework is a Web Part for Office 365 & SharePoint that enables client-side development for building SharePoint experiences. It facilitates easy integration with the SharePoint data, and provides support for open source tooling of development.</p>
          <p>Microsoft Teams is a collaboration workspace in Office 365 that integrates with apps and services people use to get work done together. We develop custom applications for Microsoft Teams and help the customer to upgrade from Skype for Business.</p>
        </div>

    );
  }
}
