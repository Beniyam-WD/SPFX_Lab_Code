import * as React from 'react';
import styles from './SpFxReactwithSPlistdata.module.scss';
import { ISpFxReactwithSPlistdataProps } from './ISpFxReactwithSPlistdataProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IProducts } from './IProducts';
import { ProductList, IProductListProps } from './ProductList';
import {SPHttpClient, SPHttpClientResponse} from "@microsoft/sp-http";
import {ISpFxReactwithSPlistdataState} from './ISpFxReactwithSPlistdataState';



export default class SpFxReactwithSPlistdata extends React.Component<ISpFxReactwithSPlistdataProps,ISpFxReactwithSPlistdataState, {}> {
  private _products:IProducts[]= [
    {id:1,Title:"Laptop"},
    {id:2,Title:"Mobile"},
    {id:3,Title:"Phone"},
    {id:4,Title:"HeadPhone"},
    {id:5,Title:"Desktop"},
  ];

  constructor(props:ISpFxReactwithSPlistdataProps){
    super(props);
    this.state= {products:[]};
  }

  private getProductsFromSpList():Promise<IProducts[]>{
    return new Promise<IProducts[]>((resolve,reject) => {
      const endpoint: string = `${this.props.currentsiteURL}/_api/lists/getbytitle('MyProducts')/items?$select=Id,Title`;
      this.props.spHttpClient.get(endpoint,SPHttpClient.configurations.v1)
      .then((response:SPHttpClientResponse)=>{
        return response.json();
      })
      .then((jsonResponse:any)=>{
        let splistItemProducts:IProducts[]=[];

        for(let index=0;index<jsonResponse.value.length; index++){
          splistItemProducts.push({
            id: jsonResponse.value[index].Id,
            Title: jsonResponse.value[index].Title,
          });
          resolve(splistItemProducts);
        }
      });
    });
  }

  public componentWillMount():void{
    this.getProductsFromSpList()
    .then((splistproducts:IProducts[]) =>{
      this.setState({products:splistproducts});
    });
  }

  public render(): React.ReactElement<ISpFxReactwithSPlistdataProps> {
    return (
      <div className={ styles.spFxReactwithSPlistdata }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <ProductList products={this.state.products} onRemoveProduct={this._removeProduct}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _removeProduct = (productToRemove:IProducts):void=>{
    const newProducts = this.state.products.filter(product => product != productToRemove);
    this.setState({products:newProducts});
    this.deleteProductFromSPList(productToRemove.id);
  }

  private deleteProductFromSPList(id:number):Promise<IProducts[]>{
      return new Promise<IProducts[]>((resolve,reject) => {
        const endpoint: string = `${this.props.currentsiteURL}/_api/lists/getbytitle('MyProducts')/items(${id})`;
        this.props.spHttpClient.post(endpoint,SPHttpClient.configurations.v1,{
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
            'IF-MATCH': '*',
            'X-HTTP-Method': 'DELETE'
          }
        })
        .then((response:SPHttpClientResponse):void =>{
          alert(`Item with ID: ${id} successfully Deleted`);
        },(error: any): void => {
          alert(`${error}`);

        });
      });
  }
}
