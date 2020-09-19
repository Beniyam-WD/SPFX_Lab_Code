import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FirstreactrouterWebPartStrings';
import Firstreactrouter from './components/Firstreactrouter';
import { IFirstreactrouterProps } from './components/IFirstreactrouterProps';

export interface IFirstreactrouterWebPartProps {
  description: string;
}

export default class FirstreactrouterWebPart extends BaseClientSideWebPart <IFirstreactrouterWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFirstreactrouterProps> = React.createElement(
      Firstreactrouter,
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
