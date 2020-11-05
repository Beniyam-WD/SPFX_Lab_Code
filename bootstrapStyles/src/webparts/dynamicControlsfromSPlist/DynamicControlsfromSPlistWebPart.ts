import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DynamicControlsfromSPlistWebPartStrings';
import DynamicControlsfromSPlist from './components/DynamicControlsfromSPlist';
import { IDynamicControlsfromSPlistProps } from './components/IDynamicControlsfromSPlistProps';

export interface IDynamicControlsfromSPlistWebPartProps {
  description: string;
}

export default class DynamicControlsfromSPlistWebPart extends BaseClientSideWebPart <IDynamicControlsfromSPlistWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDynamicControlsfromSPlistProps> = React.createElement(
      DynamicControlsfromSPlist,
      {
        description: this.properties.description,
        spHttpClient:this.context.spHttpClient,
        currentURL:this.context.pageContext.web.absoluteUrl
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
