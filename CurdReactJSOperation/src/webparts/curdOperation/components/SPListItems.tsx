import * as React from 'react';
import {IListItem} from './IListItem';
import { List } from '@fluentui/react/lib/List';

export interface IListItemsProps{
  spItems:IListItem[];
}

export class SPListItems extends React.Component<IListItemsProps,{}>{
  public render():React.ReactElement<IListItemsProps>{
    return(
      <div>
        <List items={this.props.spItems} onRenderCell={this.onRenderCell}/>
        <ul>
          {/*
            this.props.spItems.map(spitem =>(
              <li>
                ID: {spitem.Id} - Event Name : {spitem.Title} - EventDate : {spitem.EventDate} - EventType: {spitem.EventType}
              </li>
            ))
            */}
        </ul>
        </div>
    );
  }

  private onRenderCell = (items:IListItem, index:number |undefined):JSX.Element=>
  {
    return(<div>
      {items.Id} {items.Title} {items.EventDetails} {items.EventDate} {items.Organizer} {items.EventType}
    </div>);
  }
}
