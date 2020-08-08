import * as React from 'react';
import styles from './SpFxConsumeDatafromSp.module.scss';
import { ISpFxConsumeDatafromSpProps } from './ISpFxConsumeDatafromSpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {ISpFxConsumeDatafromSpState} from './ISpFxConsumeDatafromSpState';
import {MSGraphClient} from '@microsoft/sp-http';
import {IListItem} from './IListItem';

import {
  autobind,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  CheckboxVisibility,
}
from 'office-ui-fabric-react';

let _listItemColumns=[
  {
    key:'ContactName',
    name:'Contact Name',
    fieldName:'ContactName',
    minWidth:50,
    maxWidth:200,
    isresizable:true,
  },
  {
    key:'ContactNumber',
    name:'Contact Number',
    fieldName:'ContactNumber',
    minWidth:50,
    maxWidth:200,
    isresizable:true
  },
  {
    key:'CompanyName',
    name:'Company Name',
    fieldName:'CompanyName',
    minWidth:50,
    maxWidth:200,
    isresizable:true
  },
  {
    key:'Country',
    name:'Country',
    fieldName:'Country',
    minWidth:50,
    maxWidth:200,
    isresizable:true
  }
];

export default class SpFxConsumeDatafromSp extends React.Component<ISpFxConsumeDatafromSpProps,ISpFxConsumeDatafromSpState, {}> {

  constructor(props: ISpFxConsumeDatafromSpProps, state:ISpFxConsumeDatafromSpState){
    super(props);
    this.state ={
      lists:[]
    };
  }

  public componentDidMount(){
    this.props.context.msGraphClientFactory
    .getClient()
    .then((client:MSGraphClient):void =>{
        client
        .api("sites('jpower4mvp.sharepoint.com,d23ab611-4170-4420-80bd-280cfee90c39,74a98147-7e90-4660-90c4-7b6a9b804f25')/lists('SPFxContacts')/items?expand=fields")
        .version("v1.0")
        .get((err,res)=>{
          if(err){
            console.log(err);
            return;
          }
          var _lists:Array<IListItem> = new Array<IListItem>();
          res.value.map((item:any)=>{
            _lists.push({
                ContactName:item.fields.Title,
                ContactNumber:item.fields.ContactNumber,
                CompanyName:item.fields.CompanyName,
                Country:item.fields.Country
            });
          });
          this.setState(
            {
              lists:_lists
            }
          );
    });
  });
  }


  public render(): React.ReactElement<ISpFxConsumeDatafromSpProps> {
    return (
      <div className={ styles.spFxConsumeDatafromSp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>

              {
                (this.state.lists!=null && this.state.lists.length >0)?
                <p className={styles.form}>
                  <span className={ styles.title }>List all my contacts</span>
                  <DetailsList
                    items={this.state.lists}
                    columns={_listItemColumns}
                    setKey='set'
                    checkboxVisibility={CheckboxVisibility.always}
                    selectionMode={SelectionMode.multiple}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    compact={true}
                    />
                </p>
                :<p>
                  <span className={ styles.title }>No data available</span>
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
