import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PlannetWebPartWebPart.module.scss';
import * as strings from 'PlannetWebPartWebPartStrings';

import * as plannets from './Plannet/GetPlannetInfo';


export interface IPlannetWebPartWebPartProps {
  description: string;
}

export default class PlannetWebPartWebPart extends BaseClientSideWebPart <IPlannetWebPartWebPartProps> {

  public render(): void {
    let getPlannet = new plannets.getplannetinfo();
    let plannetNames:string[] = getPlannet.listAllplannets();

    let listplannetNames:string ="<ul>";
    for(let i=0;i<plannetNames.length;i++)
    {
      listplannetNames += '<li><button type=button id="btn" class="btn" value=' + plannetNames[i] + '>' + plannetNames[i] +'</button></li>';
    }
    listplannetNames += "</ul>";

    this.domElement.innerHTML = `
      <div class="${ styles.plannetWebPart }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">Welcome to Plannets </span>
          <span class="${ styles.title }">${listplannetNames}</span>
          <div id="plannetDetails"></div>
          </div>
          </div>
          </div>
          </div>`;

          this._setButtonEventHandlers();
  }

  private _setButtonEventHandlers():void{

    let getPlannet = new plannets.getplannetinfo();

   /* const button = document.querySelector('#btn');
    button.addEventListener('click',event =>{
      getPlannet.getPlannetDetails('Mercury');
    });*/

    document.querySelectorAll('.btn').forEach(item => {
      let plannetName:string = item.innerHTML;
      item.addEventListener('click', event =>{
        getPlannet.getPlannetDetails(plannetName);
      });
    });
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
