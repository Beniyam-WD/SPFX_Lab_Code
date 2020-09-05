import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import {sp, List} from "@pnp/sp";


import * as strings from 'SpecificListViewCsCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpecificListViewCsCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'SpecificListViewCsCommandSet';

export default class SpecificListViewCsCommandSet extends BaseListViewCommandSet<ISpecificListViewCsCommandSetProperties> {

  private enabled:boolean;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized SpecificListViewCsCommandSet');
    sp.setup({
      spfxContext:this.context
    });
    return this.isCommandSetEnabled();
  }

  private isCommandSetEnabled():Promise<void>{
    let listId = "08548537-e11c-481b-9005-ec8ef90a704f";
    return sp.web.select("AllProperties").expand("AllProperties").get().then(props=>{
        return sp.web.getList(this.context.pageContext.list.serverRelativeUrl).select("Id").get().then(list=>{
         // let lists:any[] = (props["AllProperties"]["spfxcmdsetlists"] as string).split(',');

          console.log(listId);
          console.log(list.Id);

          if(listId === list.Id)
          {
            console.log(listId);
            console.log(list.Id);
            this.enabled = true;
          }
          else{
            this.enabled = false;
          }

          //this.enabled = lists.indexOf(list.Id) > -1;
        });
    });
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    const compareTwoCommand: Command = this.tryGetCommand('COMMAND_2');

    if(this.enabled)
    {
      if (compareOneCommand) {
        // This command should be hidden unless exactly one row is selected.
        compareOneCommand.visible = event.selectedRows.length === 1;
      }
    }
    else{
      compareOneCommand.visible = false;
      compareTwoCommand.visible = false;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        Dialog.alert(`${this.properties.sampleTextOne}`);
        break;
      case 'COMMAND_2':
        Dialog.alert(`${this.properties.sampleTextTwo}`);
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
