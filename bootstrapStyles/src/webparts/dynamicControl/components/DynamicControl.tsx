import * as React from 'react';
import styles from './DynamicControl.module.scss';
import { IDynamicControlProps } from './IDynamicControlProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { ISPFxLinks } from './ISPFxLinks';
import { IDynamicControlState } from './IDynamicControlState';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import { ContextualMenu, ContextualMenuItemType, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useConst } from '@uifabric/react-hooks';
import { IOptions } from './IOptions';

/*const menuProps = useConst<IContextualMenuProps>(() => ({
  shouldFocusOnMount: true,
  items:this.state.linkOptions
}));*/

export default class DynamicControl extends React.Component<IDynamicControlProps, IDynamicControlState, {}> {
 //private menuProps;
  constructor(props: IDynamicControlProps) {
    super(props);
    this.state = {
      links: [],
      linkOptions: [
        { key: 'linkNoTarget', text: 'Link same window', href: 'http://bing.com' },
        { key: 'linkNoTarget1', text: 'Link same window1', href: 'http://bing.com' },
      ]
    };
  }


  private getlinksfromSP(): Promise<ISPFxLinks[]> {
    return new Promise<ISPFxLinks[]>((resolve, reject) => {
      const url: string = `${this.props.currentURL}/_api/lists/getbytitle('SPFxLinks')/items?$select=Id,Title,URL,ControlType,ControlName&$groupby=ControlName&$filter=ControlName eq 'First Control'`;
      this.props.spHttpClient.get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonresponse: any) => {
          let splistItemlinks: ISPFxLinks[] = [];

          for (let i = 0; i < jsonresponse.value.length; i++) {
            splistItemlinks.push({
              id: jsonresponse.value[i].Id,
              Title: jsonresponse.value[i].Title,
              URL: jsonresponse.value[i].URL,
              ControlType: jsonresponse.value[i].ControlType,
              ControlName: jsonresponse.value[i].ControlName
            });
            resolve(splistItemlinks);
          }
        });
    });
  }

  public componentWillMount(): void {
    this.getlinksfromSP()
      .then((splinks: ISPFxLinks[]) => {
        /*let linkOptionsval: IOptions[] = [];
        for (let i = 0; i < splinks.length; i++) {
          linkOptionsval.push({
            key: splinks[i].id,
            text: splinks[i].Title,
            href: splinks[i].URL,
            target: '_blank'
          });
        }*/
       /* this.menuProps = useConst<IContextualMenuProps>(() => ({
          shouldFocusOnMount: true,
          items: linkOptionsval
        }));*/
        this.setState({ links: splinks}); //,linkOptions: linkOptionsval });
      });
    }

  public render(): React.ReactElement<IDynamicControlProps> {

    let menuProps = useConst<IContextualMenuProps>(() => ({
      shouldFocusOnMount: false,
      items: this.state.linkOptions
    }));

    return (<div>
      <PrimaryButton text="First Column" menuProps={menuProps}/>
    </div>);
  }
}
