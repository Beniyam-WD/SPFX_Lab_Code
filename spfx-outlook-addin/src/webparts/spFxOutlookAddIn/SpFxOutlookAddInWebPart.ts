import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxOutlookAddInWebPart.module.scss';
import * as strings from 'SpFxOutlookAddInWebPartStrings';

export interface ISpFxOutlookAddInWebPartProps {
  description: string;
}

export default class SpFxOutlookAddInWebPart extends BaseClientSideWebPart <ISpFxOutlookAddInWebPartProps> {

  public render(): void {

    let title:string = "";
    let subtitle:string = "";
    let EmailID:string = "";
    let myName:string = "";

    if(this.context.sdks.office)
    {
      myName = this.context.sdks.office.context.mailbox.userProfile.displayName;
      title = "Welcome " + myName +"to SPFx Outlook!";
      subtitle = "Extending SharePoiyn Framework to Outlook";
      EmailID = "Email Id : " + this.context.sdks.office.context.mailbox.userProfile.emailAddress;
    }
    else
    {
        title = "Welcome to SharePoint!";
        subtitle = "Customize SharePoint experiences using Web Parts";
        EmailID = "SharePoint Site : " + this.context.pageContext.web.title;
    }


    this.domElement.innerHTML = `
      <div class="${ styles.spFxOutlookAddIn }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">${title}</span>
  <p class="${ styles.subTitle }">${subtitle}</p>
    <p class="${ styles.description }">${EmailID}</p>

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
