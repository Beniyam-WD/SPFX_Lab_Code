import * as React from 'react';
import styles from './Firstreactrouter.module.scss';
import {IFirstreactrouterProps} from './IFirstreactrouterProps';

export default class Aboutus extends React.Component<IFirstreactrouterProps, {}>{

  public render(): React.ReactElement<IFirstreactrouterProps>{
    return(
        <div className={styles.firstreactrouter}>
         <h1>ABOUT US</h1>
         <p>
         We Launched by the middle of the year 2019 with a team of five to provide a world class cloud based services to the customers with a very economical prices.Yes, we are a cloud based application services company incubated by few IT techies who had a dream to lead a company that provides end to end cloud based solutions to the customers.
         </p>
        </div>
    );
  }
}
