import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MyPrivateChannelWebPart.module.scss';
import * as strings from 'MyPrivateChannelWebPartStrings';

export interface IMyPrivateChannelWebPartProps {
  description: string;
}

export default class MyPrivateChannelWebPart extends BaseClientSideWebPart <IMyPrivateChannelWebPartProps> {

  public render(): void {

    let title = "";
    let TeamName = "";
    let ChannelName="";
    if(this.context.sdks.microsoftTeams)
    {
      title = "Welcome to Teams Private channel!";
      TeamName = " Team Name : " + this.context.sdks.microsoftTeams.context.teamName;
      ChannelName = " Channel Name : " + this.context.sdks.microsoftTeams.context.channelName;
    }
    else
    {
      title = "Welcome SharePoint for Private channel";
    }
    this.domElement.innerHTML = `
      <div class="${ styles.myPrivateChannel }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">${title}</span>
          <span class="${ styles.title }">${TeamName}</span>
          <span class="${ styles.title }">${ChannelName}</span>
          </div>
          </div>
          </div>
          </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}
