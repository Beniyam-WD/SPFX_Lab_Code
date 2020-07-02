import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './LoadSharePointDataWebPart.module.scss';
import * as strings from 'LoadSharePointDataWebPartStrings';
import {SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface ILoadSharePointDataWebPartProps {
  listname: string;
  checkbox1:boolean;
  checkbox2:boolean;
}

export interface ISPListItems{
  value: ISPListItem[];
}

export interface ISPListItem
{
  Title: string;
  Id: string;
  Created: string;
  Author:{
    Title:string;
  };
}

export default class LoadSharePointDataWebPart extends BaseClientSideWebPart <ILoadSharePointDataWebPartProps> {
  private listName: string = "";
  private checkbox1Property: string = "Created";
  private checkbox2Property: string = "Author";

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.loadSharePointData }">
        <div class="${styles.Table}">
        <div class = "${styles.Heading}">
          <div class="${styles.cell}">Title</div>

       </div>
        </div>
      </div>`;

    this.listName = this.properties.listname;
    this.loadData();
  }

  private loadData(): void{
    let url:string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + this.listName +"')/items?select=Title";
    //let url:string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('" + this.listName +"')/items";

    if(this.properties.checkbox1)
    {
      url += ",Created";
      this.domElement.querySelector("." + styles.Heading).innerHTML += `<div class="${styles.cell}">Created</div>`;
    }

    if(this.properties.checkbox2)
    {
      url += ",Author/Title&$expand=Author";
      this.domElement.querySelector("." + styles.Heading).innerHTML += `<div class="${styles.cell}">Author</div>`;
    }

    this.GetListData(url).then((response)=> {
      this.RenderListData(response.value);
    });
  }

  private GetListData(url:string):Promise<ISPListItems>{
    return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1)
    .then((response:SPHttpClientResponse) =>{
      return response.json();
    });
  }

  private RenderListData(listItems:ISPListItem[]):void{
    let strHtml:string = "";

    if(listItems)
    {
      listItems.forEach((listItem:ISPListItem)=>{
        let itemcreatedstr:string = listItem.Created;
        let itemTime:Date = new Date(itemcreatedstr);

        strHtml += `<div class="${styles.row1}">`;
        strHtml += `<div class="${styles.cell}"><p>${listItem.Title}</p></div>`;
        if(this.properties.checkbox1)
        {
          strHtml += `<div class="${styles.cell}"><p>${listItem.Created}</p></div>`;
        }
        if(this.properties.checkbox2)
        {
          strHtml += `<div class="${styles.cell}"><p>${listItem.Author.Title}</p></div>`;
        }

        strHtml += `</div>`;
      });
    }

    this.domElement.querySelector("." + styles.Table).innerHTML += strHtml;
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
              PropertyPaneTextField('listname', {
                label: "List Name"
              }),
              PropertyPaneCheckbox('checkbox1',{
                text:this.checkbox1Property
              }),
              PropertyPaneCheckbox('checkbox2',{
                text:this.checkbox2Property
              })
            ]
          }
        ]
      }
    ]
  };
}
}
