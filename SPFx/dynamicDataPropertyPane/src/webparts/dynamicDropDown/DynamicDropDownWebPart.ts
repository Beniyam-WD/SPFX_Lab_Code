import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './DynamicDropDownWebPart.module.scss';
import * as strings from 'DynamicDropDownWebPartStrings';

export interface IDynamicDropDownWebPartProps {
  description: string;
  dropdown1:string;
}

export interface ISPItems{
  value:ISPItem[];
}
export interface ISPItem{
  Title:string;
  Id:string;
}

export default class DynamicDropDownWebPart extends BaseClientSideWebPart <IDynamicDropDownWebPartProps> {
  private _options:Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.dynamicDropDown }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to SharePoint!</span>
  <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
    <p class="${ styles.description }">${escape(this.properties.description)}</p>
      <a href="https://aka.ms/spfx" class="${ styles.button }">
        <span class="${ styles.label }">Learn more</span>
          </a>
          </div>
          </div>
          </div>
          </div>`;
          this.getDatatoDropDown();
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

private getDatatoDropDown()
{
  let url:string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('SPfxDemoList')/items";
  this.GetListData(url).then((response)=>{
    this.renderlistData(response.value);
  });
}

private GetListData(url:string):Promise<ISPItems>{
  return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1)
  .then((response:SPHttpClientResponse)=>
  {
    return response.json();
  });
}

private renderlistData(listItems:ISPItem[])
{
  let options:Array<IPropertyPaneDropdownOption>=new Array<IPropertyPaneDropdownOption>();
  if(listItems)
  {
    listItems.forEach((listItem:ISPItem)=>
    {
      let _title:string = listItem.Title;
      let _id:string = listItem.Id;
      options.push({key:_title,text:_title});
    });
  }
  this._options = options;
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
              }),
              PropertyPaneDropdown('dropdown1',{
                label:"Data from SharePoint",
                selectedKey:"Item 03",
                options:this._options
              }
              )
            ]
          }
        ]
      }
    ]
  };
}
}
