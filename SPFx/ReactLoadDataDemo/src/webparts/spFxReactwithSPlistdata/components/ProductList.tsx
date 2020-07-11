import * as React from 'react';
import {IProducts} from './IProducts';

export type RemoveProductCallback = (products:IProducts)=>void;

export interface IProductListProps{
  products:IProducts[];
  onRemoveProduct:RemoveProductCallback;
}

export class ProductList extends React.Component<IProductListProps,{}>
{
  public render():React.ReactElement<IProductListProps>
  {
    return(<ul>
      {
        this.props.products.map(product => (
        <li>{product.Title}
          <button type="button" id={product.id.toString()} onClick={ ()=>this.OnButtonClick(product)}>Delete</button>
        </li>
      ))
      }
      </ul>
      );
  }

  private OnButtonClick(product:IProducts):void{
    //alert("Title : " + product.Title + " - ID: " + product.id);
    if (window.confirm('Are you sure you want to delete the latest item?')) {
      this.props.onRemoveProduct(product);
     }
  }
}
