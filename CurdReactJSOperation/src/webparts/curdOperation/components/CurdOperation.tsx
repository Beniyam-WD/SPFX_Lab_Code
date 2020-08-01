import * as React from 'react';
import styles from './CurdOperation.module.scss';
import { ICurdOperationProps } from './ICurdOperationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICurdOperationState } from './ICurdOperationState';
import {IListItem} from './IListItem';
import {SPListItems} from './SPListItems';

import {PrimaryButton} from '@fluentui/react/lib/Button';
import {NewForm} from './NewForm';


import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

export default class CurdOperation extends React.Component<ICurdOperationProps,ICurdOperationState, {}> {

  constructor(props:ICurdOperationProps, state:ICurdOperationState)
  {
    super(props);
    this.state={
      spItems:[],
      showNewForm:false
    };
  }

  public componentWillMount():void{
    this.getItems()
    .then((_items:IListItem[])=>{
      this.setState({
        spItems:_items
      });
    });
  }

  public render(): React.ReactElement<ICurdOperationProps> {

    return (
      <div className={ styles.curdOperation }>
        <div className={ styles.container }>

          <div className={ styles.row }>
            <div className={ styles.column }>
              <div className={`ms-grid-row`}>
              <span className={ styles.title }>Crud Operations</span>
              <SPListItems spItems={this.state.spItems} />
              </div>
            </div>
            </div>

            <div className={ styles.row }>
            <div className={ styles.column }>
            <div>
               <PrimaryButton text="New Item" onClick={this.showNewForm.bind(this)}/>
               {this.state.showNewForm? <NewForm siteUrl={this.props.siteUrl} spHttpClient={this.props.spHttpClient}/>: null }
            </div>
            </div>
            </div>

          </div>
      </div>
    );
  }

  private showNewForm(event):void{
    this.setState({
      showNewForm:true
    });
  }
  public hideNewForm(event):void{
    this.setState({
      showNewForm:false
    });
  }

private getItems():Promise<IListItem[]>{
  return new Promise<IListItem[]>((resolve,reject)=>{
    const url:string = `${this.props.siteUrl}/_api/lists/getbytitle('SPFxEvents')/items?select=Id,Title,Event Date,Organizer,Event Details,Event Type`;
      console.log(url);
      this.props.spHttpClient.get(url,SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
    .then((response:SPHttpClientResponse)=>{
      return response.json();
    },(error:any):void=>{
      reject(error);
    }
    )
    .then((jsonresponse:any)=>{
      let splistItems:IListItem[]=[];
      console.log(jsonresponse.value.length);
      if(jsonresponse.value.length ==0)
      {
        console.log('No records found');
      }
      else{
        console.log('Count : '+ jsonresponse.value.length);
      }

      for(let i=0;i<jsonresponse.value.length;i++)
      {
        splistItems.push({
        Id:jsonresponse.value[i].Id,
        Title:jsonresponse.value[i].Title,
        EventDate:jsonresponse.value[i].EventDate,
        Organizer:jsonresponse.value[i].Organizer,
        EventDetails:jsonresponse.value[i].EventDetails,
        EventType:jsonresponse.value[i].EventType
        });
        resolve(splistItems);
      }
    });
  });
}


}
