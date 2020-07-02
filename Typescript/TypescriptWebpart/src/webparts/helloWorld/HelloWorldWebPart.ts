import { IPerson } from './../../Components/IPerson';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

import * as employeeinfo from'./../../Components/module1';

export interface IHelloWorldWebPartProps {
  description: string;
}

const username = {
  fristname: "Jenkins",
  lastname: "NS"
};

export default class HelloWorldWebPart extends BaseClientSideWebPart <IHelloWorldWebPartProps> {

  public render(): void {
    let fullname = this.welcomeuser(username);
    let empinfo = new employeeinfo.employee('Oliver', 10);
    let empinforeturn = empinfo.displayEmployee();
    this.domElement.innerHTML = `
      <div class="${ styles.helloWorld }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
          <span class="${ styles.title }">${fullname}</span>
          <span class="${ styles.title }">${empinforeturn}</span><br>
          <span class="${ styles.title }">Age : ${employeeinfo.age}</span>
          <span class="${ styles.title }">String Value : ${employeeinfo.strval}</span>
          </div>
          </div>
          </div>
          </div>`;
  }

  protected welcomeuser(user: IPerson): string
  {
    console.log(`Hey ${user.fristname} ${user.lastname} - Welcome to SPFx training`);
    return `Hey ${user.fristname} ${user.lastname} - Welcome to SPFx training`;

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
