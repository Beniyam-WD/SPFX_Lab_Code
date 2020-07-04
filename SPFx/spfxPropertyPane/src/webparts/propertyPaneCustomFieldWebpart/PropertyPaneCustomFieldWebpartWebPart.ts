import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropertyPaneCustomFieldWebpartWebPart.module.scss';
import * as strings from 'PropertyPaneCustomFieldWebpartWebPartStrings';

import {PropertyPanemyTextField} from './Modules/PropertyPanemyTextField';

export interface IPropertyPaneCustomFieldWebpartWebPartProps {
  description: string;
  mycustomcontrol:string;
}

export default class PropertyPaneCustomFieldWebpartWebPart extends BaseClientSideWebPart <IPropertyPaneCustomFieldWebpartWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.propertyPaneCustomFieldWebpart }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
    <p class="${ styles.description }">${escape(this.properties.description)}</p>
    <p class="${ styles.description }">${escape(this.properties.mycustomcontrol)}</p>
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
              }),
              new PropertyPanemyTextField('mycustomcontrol',
              {
                label:"My Custon Control",
                description:"Please enter name",
                color:"red",
                backgroundcolor:"yellow",
                properties: this.properties,
                defaultvalue:"default value"
              })
            ]
          }
        ]
      }
    ]
  };
}
}
