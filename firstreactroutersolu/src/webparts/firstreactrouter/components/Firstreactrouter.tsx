import * as React from 'react';
import styles from './Firstreactrouter.module.scss';
import { IFirstreactrouterProps } from './IFirstreactrouterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Aboutus from './Aboutus';
import Customer from './Customer';
import CustomerDetails from './CustomerDetails';

import { HashRouter, Route } from "react-router-dom";
import { Nav, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

const navstyles: Partial<INavStyles> = { root: { width: 300 } };
const stackTokens: IStackTokens = { childrenGap: 40 };

const navLinkGroups: INavLinkGroup[] = [
  {
    name:'Router Menu',
    links: [
      {
        key: 'Customers',
        name: 'Customers',
        url:'#/'
      },
      {
        key: 'CustomerDetails',
        name: 'Customer Details',
        url:'#/Customer/188281'
      },
      {
        key: 'About',
        name: 'About us',
        url:'#/about'
      },
      {
        key: 'Inline Component',
        name: 'Inline',
        url:'#/Inline'
      }
    ]
  }
];

export default class Firstreactrouter extends React.Component<IFirstreactrouterProps, {}> {

  public render(): React.ReactElement<IFirstreactrouterProps> {
    return (
      <div className={styles.firstreactrouter}>
        <Stack horizontal tokens={stackTokens}>
          <Nav styles={navstyles} ariaLabel="Navigation"  groups={navLinkGroups}/>

          <HashRouter>
            <Route path="/" exact component={Customer}></Route>
            <Route path="/Customer/:id" exact component={CustomerDetails}></Route>
            <Route path="/about" exact component={Aboutus}></Route>
            <Route path='/Inline' exact render = {
              () => {return (<div>Hello inline component</div>

              );}
            }></Route>
          </HashRouter>

        </Stack>
      </div>
    );
  }
}
