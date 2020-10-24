import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import {SPFxRisks} from './SPFxRisks';
import {SPFxIssues} from './SPFxIssues';

export interface ISPFxViewProps{
  currentURl:string;
  spHttpClient:SPHttpClient;
}

export class SPFxView extends React.Component<ISPFxViewProps,{}>
{

  public render():React.ReactElement<ISPFxViewProps>
  {
    const ProjectID:any  = this.props["match"]["params"]["ID"];
    return(
      <div>
        Welcome to Project Detail View page
        <h6>Project Name : {this.props["match"]["params"]["ID"]}</h6>
        <SPFxIssues currentURl={this.props.currentURl} spHttpClient={this.props.spHttpClient} ID={ProjectID} ></SPFxIssues>
        <SPFxRisks currentURl={this.props.currentURl} spHttpClient={this.props.spHttpClient} ID={ProjectID}></SPFxRisks>

        <h6><a href="#/">Back</a></h6>
      </div>
    );
  }
}
