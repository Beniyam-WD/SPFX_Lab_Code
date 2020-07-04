import { Version, Validate } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneLabel, //Label
  PropertyPaneTextField, //Textbox
  PropertyPaneLink, //Link
  PropertyPaneDropdown, //Dropdown
  PropertyPaneCheckbox, //Checkbox
  PropertyPaneChoiceGroup, //Choice
  PropertyPaneToggle, //Toggle
  PropertyPaneSlider, //Slider
  PropertyPaneButton, //Button
  PropertyPaneButtonType, //Button Types
  PropertyPaneHorizontalRule //HorizontalRule
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OobPropertyPaneWebPart.module.scss';
import * as strings from 'OobPropertyPaneWebPartStrings';

export interface IOobPropertyPaneWebPartProps {
  name: string; //Single line textbox
  description: string; //multiple line textbox
  url: string; // link
  dropdown: string; //dropdown
  checkbox: string; //checkbox
  toggle: string; //toggle
  slider: string; //slider
  radiobutton:string; //radiobutton
  radiobuttonfiletype:string; //radiobutton with office image
  radiobuttonLayout:string; //radiobutton with layout image
  radiobuttonicons:string;
}

export default class OobPropertyPaneWebPart extends BaseClientSideWebPart <IOobPropertyPaneWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.oobPropertyPane }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to Property Pane!</span>
          <p class="${ styles.description }"> Name : ${escape(this.properties.name)}</p>
          <p class="${ styles.description }">Description : ${escape(this.properties.description)}</p>
          <p class="${ styles.description }">DropDown : ${escape(this.properties.dropdown)}</p>
          <p class="${ styles.description }">Checkbox : ${escape(this.properties.checkbox)}</p>
          <p class="${ styles.description }">Slider : ${escape(this.properties.slider)}</p>
          <p class="${ styles.description }">Toggle : ${escape(this.properties.toggle)}</p>
          <p class="${ styles.description }">Choice : ${escape(this.properties.radiobutton)}</p>
          <p class="${ styles.description }">Office Image : ${escape(this.properties.radiobuttonfiletype)}</p>
          <p class="${ styles.description }">Layout Image : ${escape(this.properties.radiobuttonLayout)}</p>
          <p class="${ styles.description }">Icon Image : ${escape(this.properties.radiobuttonicons)}</p>
          </div>
          </div>
          </div>
          </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  private validatetextcontrol()
  {

  }
  private ButtonClick(text:any)
  {
    alert(text);
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: "Page 1"
        },
        displayGroupsAsAccordion:true,
        groups: [
          {
            groupName: "Group 1 - Label, Textbox, Multiline textbox",
            isCollapsed:true,
            groupFields: [
              PropertyPaneLabel('label',{
                text: "Label PropertyPaneLabel",
                required:true
              }),
              PropertyPaneTextField('name', {
                label: "Name PropertyPaneTextField",
                deferredValidationTime:250,
                description:"Description Field",
                disabled:false,
                maxLength:20,
                multiline:false,
                onGetErrorMessage:this.validatetextcontrol.bind(this),
                placeholder:"Enter name please",
                resizable:false,
                value:"Default value"
              }),
              PropertyPaneTextField('description', {
                label: "Multiline PropertyPaneTextField",
                multiline:true,
                rows:10
              })
            ]},
            {
            groupName: "Group 2 - Link, Drop Down, Check box",
            isCollapsed:true,
            groupFields: [
              PropertyPaneLink('url', {
                text:'URL - PropertyPaneLink',
                href:"http://jenkinsblogs.com",
                disabled:false,
                target:"_blank"
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneDropdown('dropdown',{
                label:"Drop Down PropertyPaneDropdown",
                ariaLabel:"dropdown arial label",
                disabled:false,
                options:[
                  {key: 'Drop key 1', text:'Drop Down 1'},
                  {key: 'Drop key 2', text:'Drop Down 2'},
                  {key: 'Drop key 3', text:'Drop Down 3'}
                ],
                selectedKey: 'Drop key 2',
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneCheckbox('checkbox', {
                text: "Yes/No",
                checked:true,
                disabled:false
              })
            ]
          }
        ]
      },
      {
        header: {
          description: "Page 2 - slider, toggle, button and Horizontal rule"
        },
        groups: [
          {
            groupName: "Group 1 - Slide, toggle and horizontalrule",
            groupFields: [
              PropertyPaneSlider('slider', {
                label: "Slider",
                min:1,
                max:10,
                disabled:false,
                value:2,
                showValue:true
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneToggle('toggle', {
                label: "Toggle",
                checked:true,
                disabled:false,
                key:"toggle1",
                offText:"Off text",
                onText:"On text"
              })
            ]
          },
          {
            groupName: "Group 2 -Button",
            groupFields: [
              PropertyPaneButton('nButton', {
                text: "Normal button",
                buttonType: PropertyPaneButtonType.Normal,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                description:"button desc",
               }),
               PropertyPaneHorizontalRule(),
               PropertyPaneButton('pButton', {
                text: "Primary button",
                buttonType: PropertyPaneButtonType.Primary,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                description:"button desc",
               }),
               PropertyPaneHorizontalRule(),

               PropertyPaneButton('cButton', {
                text: "Compound button",
                buttonType: PropertyPaneButtonType.Compound,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                description:"button desc",
               }),
               PropertyPaneHorizontalRule(),

               PropertyPaneButton('iButtonAdd', {
                text: "Add Button",
                buttonType: PropertyPaneButtonType.Icon,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                icon:'Add', //https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
                description:"button desc",
               }),
               PropertyPaneButton('iButtonCancel', {
                text: "Add Button",
                buttonType: PropertyPaneButtonType.Icon,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                icon:'PageLink', //https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
                description:"button desc",
               }),
               PropertyPaneButton('iButtonEdit', {
                text: "Add Button",
                buttonType: PropertyPaneButtonType.Icon,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                icon:'BlockedSite', //https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
                description:"button desc",
               }),
               PropertyPaneHorizontalRule(),

               PropertyPaneButton('commandButton', {
                text: "Command button",
                buttonType: PropertyPaneButtonType.Command,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                description:"button desc",
               }),
               PropertyPaneHorizontalRule(),

               PropertyPaneButton('hButtonAdd', {
                text: "Hero button",
                buttonType: PropertyPaneButtonType.Hero,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                icon:'Add',
                description:"button desc",
               }),
               PropertyPaneButton('hButtonEdit', {
                text: "Hero button",
                buttonType: PropertyPaneButtonType.Hero,
                onClick: this.ButtonClick.bind(this),
                disabled:false,
                icon:'Edit',
                description:"button desc",
               }),
               PropertyPaneHorizontalRule()
            ]
          }
        ]
      },
      {
        header:{
          description:"Page 3 - Radio Buttons"
        },
        displayGroupsAsAccordion:true,
        groups:[
          {
            groupName:"Radio Buttons",
              isCollapsed:true,
              groupFields: [
                PropertyPaneChoiceGroup('radiobutton', {
                  label: 'Choices',
                    options: [
                      { key: 'Choice 1', text: 'Choice 1' },
                      { key: 'Choice 2', text: 'Choice 2', checked: true },
                      { key: 'Choice 3', text: 'Choice 3' }
                    ]
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneChoiceGroup('radiobuttonfiletype', {
                  label: 'Image Choices :',
                  options: [
                    { key: 'Word', text: 'Word',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/docx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/docx_32x1.png'
                    },
                    { key: 'Excel', text: 'Excel',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/xlsx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/xlsx_32x1.png'
                    },
                    { key: 'PowerPoint', text: 'PowerPoint',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/pptx_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/pptx_32x1.png'
                    },
                    { key: 'OneNote', text: 'OneNote',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/one_32x1.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/one_32x1.png'
                    }
                  ]
                }),
                PropertyPaneHorizontalRule()
              ]},
              {
                groupName:"Layout & Icons",
                  isCollapsed:false,
                  groupFields: [
                  PropertyPaneChoiceGroup('radiobuttonLayout', {
                  label: 'Layout',
                  options: [
                    { key: 'Grid', text: 'Grid',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/grid.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/grid.png'
                    },
                    { key: 'List', text: 'List',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/list.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/list.png'
                    },
                    { key: 'Carousel', text: 'Carousel',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/Carousel.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/Carousel.png'
                    },
                    { key: 'Filmstrip', text: 'Filmstrip',
                      imageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/Filmstrip.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://jpower4mvp.sharepoint.com/Shared%20Documents/Filmstrip.png'
                    }
                  ]
                }),
                PropertyPaneHorizontalRule(),

                PropertyPaneChoiceGroup('radiobuttonicons', {
                  label: 'Select Chart Type',
                  options: [
                    {
                      key: 'chart',
                      text: 'Chart',
                      iconProps: {
                        officeFabricIconFontName: 'Chart'
                      }
                    },
                    {
                      key: 'barchart',
                      text: 'Column chart',
                      iconProps: {
                        officeFabricIconFontName: 'BarChart4'

                      }
                    },
                    {
                      key: 'Pie',
                      text: 'Pie chart',
                      iconProps: {
                        officeFabricIconFontName: 'PieDouble'
                      }
                    },
                    {
                      key: 'donutchart',
                      text: 'Donut chart',
                      iconProps: {
                        officeFabricIconFontName: 'DonutChart'
                      }//https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
                    },
                    {
                      key: 'Badge',
                      text: 'Badge icon',
                      iconProps: {
                        officeFabricIconFontName: 'Badge'
                      }//https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
                    }
                  ]
                })
              ]
          }
        ]
      }
    ]
  };
}
}
