import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DropDownMenusWebPartStrings';
import DropDownMenus from './components/DropDownMenus';
import { IDropDownMenusProps } from './components/IDropDownMenusProps';

export interface IDropDownMenusWebPartProps {
  description: string;
}

export default class DropDownMenusWebPart extends BaseClientSideWebPart <IDropDownMenusWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDropDownMenusProps> = React.createElement(
      DropDownMenus,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
