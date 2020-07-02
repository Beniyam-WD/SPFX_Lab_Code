import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneCheckbox,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneButtonType,
  PropertyPaneLabel,
  PropertyPaneToggle,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneHorizontalRule,
  PropertyPaneDropdownOptionType,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropertyPaneWebPart.module.scss';
import * as strings from 'PropertyPaneWebPartStrings';

//import { scopeexample } from './../common';

export interface IPropertyPaneWebPartProps {
  description: string;
  name:string;
  Imageurl:string;
  slider:string;
  toggle:string;
  checkbox:string;
  dropdown:string;
  geturl:string;

}



export default class PropertyPaneWebPart extends BaseClientSideWebPart <IPropertyPaneWebPartProps> {



  public render(): void {


    this.domElement.innerHTML = `
      <div class="${ styles.propertyPane }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
  <p class="${ styles.description }">Name : ${escape(this.properties.name)}</p>
  <p class="${ styles.description }">Description : ${escape(this.properties.description)}</p>
  <p class="${ styles.description }">Name : <img src=${escape(this.properties.Imageurl)}></p>
  <p class="${ styles.description }">Age : ${escape(this.properties.slider)}</p>
  <p class="${ styles.description }">Status : ${escape(this.properties.toggle)}</p>
  <p class="${ styles.description }">select Item : ${escape(this.properties.dropdown)}</p>
  <p class="${ styles.description }">IsValid : ${escape(this.properties.checkbox)}</p>

      <a href="https://aka.ms/spfx" class="${ styles.button }">
        <span class="${ styles.label }">Learn more</span>
          </a>
          </div>
          </div>
          </div>
          </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  private validateName(value: string): string {
    if(value === null || value.trim().length === 0)
    {
     return "Please enter the name";
    }

    if(value.length>10)
    {
      return 'Name should not be longer than 10 characters';
    }

      return '';
  }

  private fetchOptionsSimple(): Array<IPropertyPaneDropdownOption> {
    var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
    options.push( { key: 'Added1', text: 'Added from code 1' });
    options.push( { key: 'Added2', text: 'Added from code 2' });
    return options;
  }

  private pushdatatoDropDown(): Array<IPropertyPaneDropdownOption>{
    let options:Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
    options.push({key:'Item1 dyn', text:'Item 1 dyn text'});
    options.push({key:'Item2 dyn', text:'Item 2 dyn text'});
    options.push({key:'Item3 dyn', text:'Item 3 dyn text'});
    options.push({key:'Item4 dyn', text:'Item 4 dyn text'});
    return options;
  }

  private ButtonClick(value:string)
  {
    //window.location.href = "https://jpower4mvp.sharepoint.com/";
    window.open('https://jpower4mvp.sharepoint.com/', '_blank');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let fetchedOptions: Array<IPropertyPaneDropdownOption> = this.fetchOptionsSimple();

    let getOptions: Array<IPropertyPaneDropdownOption> = this.pushdatatoDropDown();
    return {
    pages: [
      {//Page 1
        header: {
          description: "Page 1 name and description"
        },
        groups: [
          {
            groupName: "Group One",
            groupFields: [
              PropertyPaneTextField('name',{
                label: "Name *",
                multiline:false,
                resizable:false,
                onGetErrorMessage:this.validateName.bind(this),
                placeholder: "Please enter your name"
              }),
              PropertyPaneTextField('description', {
                label: "Description",
                multiline:true,
                resizable:true,
                placeholder:"Please enter description"
              }),
              PropertyPaneTextField('Imageurl', {
                label: "Image URL",
                multiline:true,
                resizable:true,
                placeholder:"Please enter image url"
              })
            ]
          }
        ]
      },
      {//Page 2
          header:{
            description: "Page 2 Slider, DropDown, Checkbox and Toggle"
          },
          displayGroupsAsAccordion:true,
          groups: [
            {
              groupName: "Page 2 Group one Slider and Toggle",
              isCollapsed:true,
              groupFields:[
                PropertyPaneSlider('slider',
                {
                  label:"Slider Control", min:1,max:50
                }),
                PropertyPaneToggle('toggle',
                {
                    label:"Toggle"
                })
              ]
            },
            {
              groupName:"Page 2 Group Two Dropdown and Checkbox",
              isCollapsed:false,
              groupFields:[
                PropertyPaneDropdown('dropdown',{
                    label:'Drop Down Example',
                    selectedKey:"Item3",
                    options:[
                      {key: '', text:''},
                      {key: 'Item1', text:'Item1'},
                      {key: 'Item2', text:'Item2'},
                      {key: 'Item3', text:'Item3'},
                      {key: 'Item4', text:'Item4'},
                    ]
                }),
                PropertyPaneCheckbox('checkbox',{
                  text: 'Yes/No',

                })
              ]
            }
          ]
      },
      {//page 3
          header:{
            description:" Page 3 with hyperlink"
          },
          groups:[
            {
              groupName: "",
              groupFields:[
                PropertyPaneLink('url',
                {
                  text:"My blog Page", href:this.properties.Imageurl, target:''
                }),
                PropertyPaneButton('button',
                {
                  text: "ClickHere",
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.ButtonClick.bind(this)
                }
                )
              ]
            }
          ]

      },
       {//page 4
        header:{
          description:" Page 4 with hyperlink"
        },
        groups:[
          {
            groupName:"Group one Page 4",
            groupFields:[
              PropertyPaneTextField('geturl',
              {
               label:"Enter the URL",
               resizable:true,
               multiline:true,
               placeholder:"Enter the URL"
              }),
              PropertyPaneLink('link',{
                  text:"My link", href:this.properties.geturl,target:'_blank'
                }),
              PropertyPaneDropdown('dropdown1',{
                label:"Dynamic DropDown",
                options:getOptions
              }
              )

            ]
          }]
        }
    ]
  };
}
}
