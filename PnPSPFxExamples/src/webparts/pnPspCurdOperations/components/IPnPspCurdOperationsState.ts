import {IViewField} from '@pnp/spfx-controls-react/lib/ListView';

export interface IPnPspCurdOperationsState
{
  items:any[];
  viewFields:IViewField[];
  selectedItem:any[];
  ID:number;
  isOpen:boolean;

}
