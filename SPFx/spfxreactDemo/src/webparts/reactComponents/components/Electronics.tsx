import * as React from 'react';
import { render } from 'react-dom';
import {IReactComponentsProps} from './IReactComponentsProps';

export interface IItemsProps{
  title:string;
  year:string;
  price:number;
}

export default class Electronics extends React.Component<IReactComponentsProps,IItemsProps, {}>
{
  constructor(props: IReactComponentsProps){
    super(props);
    let title = "Laptop";
    let year = "2020";
    let price = 700;
    this.state = { title, year, price };
  }

  private applydiscount():void
  {
    this.setState({
      price:250
    });
  }

  public render():React.ReactElement<IItemsProps>
  {
    const element = (
    <React.Fragment>
      <div>
      <ul>
            <li>
              <div>
                  <b>Book Name : {this.state.title}</b>
                  <p>Year : {this.state.year}</p>
                  <p>Price : {this.state.price}</p>
              </div>
            </li>
          </ul>
          <button onClick={() =>this.applydiscount()}>Apply discount</button>
      </div>
    </React.Fragment>
    );
    return element;

  }
}
