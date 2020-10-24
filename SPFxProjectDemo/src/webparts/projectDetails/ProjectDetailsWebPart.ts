import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ProjectDetailsWebPartStrings';
import ProjectDetails from './components/ProjectDetails';
import { IProjectDetailsProps } from './components/IProjectDetailsProps';

export interface IProjectDetailsWebPartProps {
  description: string;

}

export default class ProjectDetailsWebPart extends BaseClientSideWebPart <IProjectDetailsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProjectDetailsProps> = React.createElement(
      ProjectDetails,
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
