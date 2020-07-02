import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,// Checkbox
  PropertyPaneLabel,// Label
  PropertyPaneLink,//Link
  PropertyPaneSlider,//Slider
  PropertyPaneToggle,//Toggle
  PropertyPaneDropdown //Dropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropertyPaneWebPart.module.scss';
import * as strings from 'PropertyPaneWebPartStrings';

export interface IPropertyPaneWebPartProps {
  name: string;
  description: string;
  Slider:string;
  Toggle:string;
  dropdowm:string;
  checkbox:string;
  URL:string;
  textbox:string;
}

export default class PropertyPaneWebPart extends BaseClientSideWebPart <IPropertyPaneWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.propertyPane }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to Propert Pane!</span>
          <p class="${ styles.description }">${escape(this.properties.name)}</p>
          <p class="${ styles.description }">${escape(this.properties.description)}</p>

          <p class="${ styles.description }">${escape(this.properties.Slider)}</p>
          <p class="${ styles.description }">${escape(this.properties.Toggle)}</p>
          <p class="${ styles.description }">${escape(this.properties.dropdowm)}</p>
          <p class="${ styles.description }">${escape(this.properties.checkbox)}</p>

          <p class="${ styles.description }">${escape(this.properties.URL)}</p>
          <p class="${ styles.description }">${escape(this.properties.textbox)}</p>

          </div>
          </div>
          </div>
          </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

private validateName(value: string): string {
  if (value === null ||
    value.trim().length === 0) {
    return 'Provide a name';
  }

  if (value.length > 10) {
    return 'Name should not be longer than 20 characters';
  }

  return '';
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      { //Page 1
        header: {
          description: "Page 1"
        },
        groups: [
          {
            groupName: "Group 1",
            groupFields: [
              PropertyPaneTextField('name', {
                label: 'Name',
                multiline:false,
                resizable:false,
                onGetErrorMessage:this.validateName.bind(this),
                //errorMessage:"Please enter atleast five charactors",
                //deferredValidationTime:5000,
                placeholder: "Please enter name"
              }),
              PropertyPaneTextField('description', {
                label:"Description",
                multiline:true,
                resizable:true,
                placeholder:"Please enter descriotion"

              })
            ]
          }
        ]
      },
      { //Page 2
        header: {
          description: "Page 2"
        },
        groups: [
          {
            groupName: "Group 1",
            groupFields: [
              PropertyPaneSlider('Slider', {
                label:'Slider',min:1,max:10
              }),
              PropertyPaneToggle('Toggle', {
              label: ''
              })
            ]
          },
          {
            groupName: "Group Two",
            groupFields: [
              PropertyPaneDropdown('dropdowm', {
                label:'Drop Down',
                options: [
                  { key: 'Item1', text: 'Item 1' },
                  { key: 'Item2', text: 'Item 2' },
                  { key: 'Item3', text: 'Item 3' }
                ]
              }),
              PropertyPaneCheckbox('checkbox',
                { text: 'Yes/No'})
            ]
          }
        ]
      },
      {//page 3
        header: {
          description: "Page 3 "
        },
        groups: [
          {
            groupName: "Group One",
            groupFields: [
              PropertyPaneLink('URL',
              { text:"My Blog Page", href:'http://www.jenkinsblogs.com',target:'_blank'}),
               PropertyPaneLabel('label',
              { text:'Please Enter designation',required:true}),
               PropertyPaneTextField('textbox',{})
            ]
          }
        ]
      }



    ]


  };
}
}
