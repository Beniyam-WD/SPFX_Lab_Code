import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

import * as plannets from './Planets/GetPlanets';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart <IHelloWorldWebPartProps> {

  public render(): void {
    let getplanet = new plannets.getPlannets();
    let plannetNames:string[] = getplanet.listAllPlannets();


    let listplannetnames:string = "<ul>";
    for (let i = 0; i < plannetNames.length; i++) {
      listplannetnames += '<li><button type=button id="btn" class="btn" value=' + plannetNames[i] +'>' + plannetNames[i] + '</button></li>';
    }
    listplannetnames += "</ul>";

    this.domElement.innerHTML = `
      <div class="${ styles.helloWorld }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">${listplannetnames}</span>
          <div id=details></div>
          </div>
          </div>
          </div>
          </div>`;

          this._setButtonEventHandlers();
  }

  private _setButtonEventHandlers(): void {
    //const button:HTMLButtonElement = document.querySelector(".btn");
    //let getplanet = new plannets.getPlannets();
    //let plannetname : string = button.value;
    //button.addEventListener("click", () => {getplanet.getPlannetDetails(plannetname);});

    let getplanet = new plannets.getPlannets();
    document.querySelectorAll('.btn').forEach(item => {
      let plannetname : string = item.innerHTML;
      item.addEventListener('click', event => {
        getplanet.getPlannetDetails(plannetname);
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
