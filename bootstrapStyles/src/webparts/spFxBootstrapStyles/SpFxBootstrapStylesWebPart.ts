import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxBootstrapStylesWebPartStrings';
import SpFxBootstrapStyles from './components/SpFxBootstrapStyles';
import { ISpFxBootstrapStylesProps } from './components/ISpFxBootstrapStylesProps';

export interface ISpFxBootstrapStylesWebPartProps {
  description: string;

}

export default class SpFxBootstrapStylesWebPart extends BaseClientSideWebPart <ISpFxBootstrapStylesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxBootstrapStylesProps> = React.createElement(
      SpFxBootstrapStyles,
      {
        description: this.properties.description,
        spHttpClient:this.context.spHttpClient,
        currentsiteURl:this.context.pageContext.web.absoluteUrl
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
