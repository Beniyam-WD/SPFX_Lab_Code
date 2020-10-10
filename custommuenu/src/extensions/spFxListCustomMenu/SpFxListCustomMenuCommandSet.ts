import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'SpFxListCustomMenuCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpFxListCustomMenuCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'SpFxListCustomMenuCommandSet';

export default class SpFxListCustomMenuCommandSet extends BaseListViewCommandSet<ISpFxListCustomMenuCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized SpFxListCustomMenuCommandSet');

    let listName: string = this.context.pageContext.list.title;
    //Dialog.alert(listName);


    let newbutton: any = document.getElementsByName("New")[0] || document.documentElement;
    newbutton.style.display = "none";

    let quickedit: any = document.getElementsByName("Quick edit")[0] || document.documentElement;
    quickedit.style.display = "none";

    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('New');
    //Dialog.alert(event.selectedRows.length.toString());
    if (compareOneCommand) {
      if (event.selectedRows.length === 0) {
        compareOneCommand.visible = true;
      }
    }

    const compareTwoCommand: Command = this.tryGetCommand('Edit');
    if (compareTwoCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareTwoCommand.visible = event.selectedRows.length > 0;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'New':
        window.open("https://jpower4mvp.sharepoint.com/sites/SPFxtraining01/Lists/CommandSetEx/newform.aspx");
        //Dialog.alert(`${this.properties.sampleTextOne}`);
       // const element:Rea
        break;
      case 'Edit':
        let ID: string = event.selectedRows[0].getValueByName("ID");
        window.open("https://jpower4mvp.sharepoint.com/sites/SPFxtraining01/Lists/CommandSetEx/editform.aspx?ID=" + ID);
        //Dialog.alert(`${this.properties.sampleTextTwo}`);
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
