import * as React from 'react';
import styles from './PnPspCurdOperations.module.scss';
import { IPnPspCurdOperationsProps } from './IPnPspCurdOperationsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IPnPspCurdOperationsState } from './IPnPspCurdOperationsState';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { sp } from "@pnp/sp";
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as moment from 'moment';
import NewForm from './NewForm';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { CommandButton, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';
const addIcon: IIconProps = { iconName: 'Add' };

export default class PnPspCurdOperations extends React.Component<IPnPspCurdOperationsProps, IPnPspCurdOperationsState, {}> {

  constructor(props: IPnPspCurdOperationsProps, state: IPnPspCurdOperationsState) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });

    var _viewFields: IViewField[] = [
      {
        name: "ID",
        displayName: "ID",
        isResizable: true,
        sorting: true,
        minWidth: 10,
        maxWidth: 40
      },
      {
        name: "Title",
        displayName: "Event Name",
        isResizable: true,
        sorting: true,
        minWidth: 10,
        maxWidth: 100
      },
      {
        name: "EventDetails",
        displayName: "Event Details",
        isResizable: true,
        sorting: true,
        minWidth: 10,
        maxWidth: 150
      },
      {
        name: "EventDate",
        displayName: "Event Date",
        isResizable: true,
        sorting: true,
        minWidth: 10,
        maxWidth: 50,
        render: (item: any) => {
          const _EventDate = item["EventDate"];
          if (_EventDate) {
            const eventDate = moment(_EventDate);
            return <span>{eventDate.format('MM/DD/YYYY')}</span>;
          }
        }
      },
      {
        name: "Organizer.Title",
        displayName: "Organizer",
        isResizable: true,
        sorting: true,
        minWidth: 10,
        maxWidth: 100
      },
      {
        name: "EventType",
        displayName: "Event Type",
        isResizable: true,
        sorting: true,
        minWidth: 10,
        maxWidth: 100
      },
      {
        name: "EventType1.Title",
        displayName: "Event Type1",
        isResizable: true,
        sorting: true,
        minWidth: 10,
        maxWidth: 100
      },
      {
        name: "ID",
        displayName: "Edit",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 100,
        render: (item: any) => {
          return <span><DefaultButton text="Edit" onClick={this.openPanel.bind(this, "update", item["ID"])} /></span>;
        }
      },
      {
        name: "ID",
        displayName: "Delete",
        isResizable: true,
        sorting: true,
        minWidth: 100,
        maxWidth: 100,
        render: (item: any) => {
          return <span><DefaultButton text="Delete" onClick={this._deleteItem.bind(this, item["ID"])} /></span>;
        }

      }
    ];
    this.state = { items: [], viewFields: _viewFields, selectedItem: [], ID: 0, isOpen: false };
  }

  public componentWillMount(): void {
    this._getLists();
  }

  private listItem: any[] = [];

  public render(): React.ReactElement<IPnPspCurdOperationsProps> {
    return (
      <div className={styles.pnPspCurdOperations}>
        <div>
          <DefaultButton text="New Item" onClick={this.openNewPanel.bind(this)} />
        </div>
        <hr></hr>
        <ListView
          key="listview"
          items={this.state.items}
          viewFields={this.state.viewFields}
          iconFieldName="edit"
          //selectionMode={SelectionMode.single}
          //selection={this._getSelectedItem.bind(this)}
          compact={true}
          showFilter={true}
        />
        <Panel
          headerText="List Form"
          isOpen={this.state.isOpen}
          onDismiss={this.dismissPanel.bind(this)}
          closeButtonAriaLabel="Close"
          type={PanelType.medium}
        >
          <NewForm context={this.props.context} items={this.state.selectedItem} />
        </Panel>
      </div>
    );
  }

  private dismissPanel(event): void {
    this.setState({
      isOpen: false
    });
  }

  private openNewPanel(event):void{
    this.setState({
      isOpen: true
    });
  }

  private openPanel(type, ID,event):void{
    /*if (type == "new") {
      this.listItem = [];
    }*/
    this.setState({
      isOpen: true
     // selectedItem: this.listItem
    });

  }

  private async _deleteItem(ID, event) {
    var _validate = confirm("Are you sure you want to delete?");
    if (_validate) {
      await sp.web.lists
        .getByTitle('SPFxEvents')
        .items.getById(ID).delete().then(()=>{
          alert("Deleted Sucessfully");
        });

    }
  }


  private _getSelectedItem(items: any[]): void {
    this.listItem = items;
    /*await this.setState({
      selectedItem: items
    });*/

  }

  private async _getLists() {
    const allitems: any[] = await sp.web.lists
      .getByTitle("SPFxEvents")
      .items
      .select("ID", "Title", "EventDetails", "EventDate", "EventType", "Organizer/Title", "EventType1/Title")
      .expand("Organizer", "EventType1")
      .top(15)
      .filter("(Title ne '')")
      .orderBy("ID")
      .usingCaching()
      .get();

    this.setState({ items: allitems });
  }
}
