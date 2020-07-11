import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxReactwithSPlistdataWebPartStrings';
import SpFxReactwithSPlistdata from './components/SpFxReactwithSPlistdata';
import { ISpFxReactwithSPlistdataProps } from './components/ISpFxReactwithSPlistdataProps';

export interface ISpFxReactwithSPlistdataWebPartProps {
  description: string;
}

export default class SpFxReactwithSPlistdataWebPart extends BaseClientSideWebPart <ISpFxReactwithSPlistdataWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxReactwithSPlistdataProps> = React.createElement(
      SpFxReactwithSPlistdata,
      {
        description: this.properties.description,
        spHttpClient:this.context.spHttpClient,
        currentsiteURL:this.context.pageContext.web.absoluteUrl
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
