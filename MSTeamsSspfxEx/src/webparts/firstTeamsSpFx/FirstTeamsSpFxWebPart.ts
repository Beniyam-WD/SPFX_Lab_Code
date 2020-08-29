import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FirstTeamsSpFxWebPart.module.scss';
import * as strings from 'FirstTeamsSpFxWebPartStrings';

export interface IFirstTeamsSpFxWebPartProps {
  description: string;
}

export default class FirstTeamsSpFxWebPart extends BaseClientSideWebPart <IFirstTeamsSpFxWebPartProps> {

  public render(): void {

    let title: string = "";
    let subTitle: string = "";
    let description: string ="";

    if(this.context.sdks.microsoftTeams)
    {
      title = "Welcome to Microsoft Teams!";
      subTitle = "This is the SPFx webpart as tab in Teams";
      description = "Team Name : " + this.context.sdks.microsoftTeams.context.teamName;
    }
    else
    {
      title="Welcome to SharePoint!";
      subTitle = "Customize SharePoint experiences using Web Parts";
      description = "Site Name : " + this.context.pageContext.web.title;
    }


    this.domElement.innerHTML = `
      <div class="${ styles.firstTeamsSpFx }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">${title}</span>
  <p class="${ styles.subTitle }">${subTitle}</p>
    <p class="${ styles.description }">${description}</p>

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
