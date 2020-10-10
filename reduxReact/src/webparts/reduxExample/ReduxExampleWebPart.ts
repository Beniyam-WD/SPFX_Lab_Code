
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReduxExampleWebPartStrings';
import ReduxExample from './components/ReduxExample';
import { IReduxExampleProps } from './components/IReduxExampleProps';

import { IApplicationState } from './components/IApplicationState';
import {createStore, Store} from 'redux';
import reducer from  './components/Reducer';

export interface IReduxExampleWebPartProps {
  description: string;
}

export default class ReduxExampleWebPart extends BaseClientSideWebPart <IReduxExampleWebPartProps> {

  private store:Store<IApplicationState>;

  protected onInit():Promise<void>{

    this.store = createStore(reducer);
    this.store.subscribe(this.render);
    this.getStore = this.getStore.bind(this);
    return super.onInit();
  }

  private getStore():Store<IApplicationState>{
    return this.store;
  }


  public render(): void {
    const element: React.ReactElement<IReduxExampleProps> = React.createElement(
      ReduxExample,
      {
        store:this.getStore()
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
