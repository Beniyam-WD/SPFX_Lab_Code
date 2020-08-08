import * as React from 'react';
import styles from './PnPspCurdOperations.module.scss';
import { IPnPspCurdOperationsProps } from './IPnPspCurdOperationsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IPnPspCurdOperationsState } from './IPnPspCurdOperationsState';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import {sp} from "@pnp/sp";
import {autobind} from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as moment from 'moment';
import NewForm from './NewForm';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

import {DefaultButton} from 'office-ui-fabric-react/lib/Button';

export default class PnPspCurdOperations extends React.Component<IPnPspCurdOperationsProps,IPnPspCurdOperationsState, {}> {
  constructor(props:IPnPspCurdOperationsProps, state:IPnPspCurdOperationsState){
    super(props);
    sp.setup({
      spfxContext:this.props.context
    });

    var _viewFields: IViewField[] =[
      {
        name:"ID",
        displayName:"ID",
        isResizable:true,
        sorting:true,
        minWidth:10,
        maxWidth:40
      },
      {
        name:"Title",
        displayName:"Event Name",
        isResizable:true,
        sorting:true,
        minWidth:10,
        maxWidth:100
      },
      {
        name:"EventDetails",
        displayName:"Event Details",
        isResizable:true,
        sorting:true,
        minWidth:10,
        maxWidth:150
      },
      {
        name:"EventDate",
        displayName:"Event Date",
        isResizable:true,
        sorting:true,
        minWidth:10,
        maxWidth:50,
        render:(item:any) => {
          const _EventDate = item["EventDate"];
          if(_EventDate){
            const eventDate = moment(_EventDate);
          return <span>{eventDate.format('MM/DD/YYYY')}</span>;
          }
        }
      },
      {
        name:"Organizer.Title",
        displayName:"Organizer",
        isResizable:true,
        sorting:true,
        minWidth:10,
        maxWidth:100
      },
      {
        name:"EventType",
        displayName:"Event Type",
        isResizable:true,
        sorting:true,
        minWidth:10,
        maxWidth:100
      },
      {
        name:"EventType1.Title",
        displayName:"Event Type1",
        isResizable:true,
        sorting:true,
        minWidth:10,
        maxWidth:100
      }
    ];
    this.state = {items:[],viewFields:_viewFields,selectedItem:[],ID:0,isOpen:false};
    this._getLists();
  }
  public render(): React.ReactElement<IPnPspCurdOperationsProps> {
    return (
      <div className={ styles.pnPspCurdOperations }>
        <div>
          <DefaultButton text="New Item" onClick={this.openPanel.bind(this)} /> <span>   </span>
          <DefaultButton text="Edit Item"  onClick={this.openPanel.bind(this)} /> <span>   </span>
          <DefaultButton text="Delete Item" onClick={this._deleteItem.bind(this)} />
        </div>
        <hr></hr>
        <ListView
          items={this.state.items}
          viewFields={this.state.viewFields}
          selectionMode={SelectionMode.single}
          selection={this._getSelectedItem.bind(this)}
          compact={true}
          showFilter={true}
          />
        <Panel
          headerText = "List Form"
          isOpen={this.state.isOpen}
          onDismiss = {this.dismissPanel.bind(this)}
          closeButtonAriaLabel="Close"
          type={PanelType.medium}
          >
            <NewForm context={this.props.context} items={this.state.selectedItem} />
            </Panel>
      </div>
    );
  }

  private dismissPanel(event):void{
    this.setState({
        isOpen:false
    });
  }

  private openPanel(event):void{
    this.setState({
      isOpen:true,
  });

  }

  private async _deleteItem()
  {
    if(this.state.selectedItem)
    {
      var ID = this.state.selectedItem[0].ID;
      await sp.web.lists
      .getByTitle('SPFxEvents')
      .items.getById(ID).delete();

      this._getLists();
      alert("Deleted Sucessfully");
    }

  }


  private _getSelectedItem(items:any[]):void{
      this.setState({
        selectedItem:items
      });
  }

  private async _getLists(){
    const allitems: any[] = await sp.web.lists
          .getByTitle("SPFxEvents")
          .items
          .select("ID","Title","EventDetails","EventDate","EventType", "Organizer/Title","EventType1/Title")
          .expand("Organizer","EventType1")
          .top(15)
          .filter("(Title ne '')")
          .orderBy("ID")
          .usingCaching()
          .get();

    this.setState({items:allitems});
  }
}
