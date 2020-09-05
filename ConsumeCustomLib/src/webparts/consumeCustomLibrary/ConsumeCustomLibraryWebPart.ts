import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ConsumeCustomLibraryWebPart.module.scss';
import * as strings from 'ConsumeCustomLibraryWebPartStrings';

import * as mylibrary from 'custom-library';

export interface IConsumeCustomLibraryWebPartProps {
  description: string;
}

export default class ConsumeCustomLibraryWebPart extends BaseClientSideWebPart <IConsumeCustomLibraryWebPartProps> {

  public render(): void {

    const myobj = new mylibrary.CustomlibraryLibrary();

    this.domElement.innerHTML = `
      <div class="${ styles.consumeCustomLibrary }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">${myobj.getCurrentTime()}</p>
    <p class="${ styles.description }">My theme color : ${myobj.getMyThemeColor()}</p>

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
