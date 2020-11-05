import * as React from 'react';
import styles from './DynamicControlsfromSPlist.module.scss';
import { IDynamicControlsfromSPlistProps, IDynamicControlsfromSPlistState } from './IDynamicControlsfromSPlistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ContextualMenuDefaultExample } from './DropDownMenuComponent';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ISPFxLinks } from './ISPFxLinks';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

let currentItems: ISPFxLinks[] = [];

export default class DynamicControlsfromSPlist extends React.Component<IDynamicControlsfromSPlistProps, IDynamicControlsfromSPlistState, {}> {

  constructor(props: IDynamicControlsfromSPlistProps) {
    super(props);
    this.state = { items: [], controlName: [], links: [] };
  }

  private getlinksfromSP(): Promise<ISPFxLinks[]> {
    return new Promise<ISPFxLinks[]>((resolve, reject) => {
      const url: string = `${this.props.currentURL}/_api/lists/getbytitle('SPFxLinks')/items?$select=Id,Title,URL,ControlType,ControlName&$groupby=ControlName`;
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

        let _controlName = splinks.map(item => item.ControlName)
          .filter((value, index, self) => self.indexOf(value) === index);

        this.setState({ links: splinks, controlName: _controlName });
      });
  }

  public createControl(controlItems:ISPFxLinks[]) {
    let itemsval: IContextualMenuItem[] = [];
    controlItems.map(item => (
      itemsval.push({ key: item.id, text: item.Title, href: item.URL, target: '_blank'})
    ));
    if(controlItems[0].ControlType === "DropDown")
    {
      return (<div className={styles.bottomspace}><ContextualMenuDefaultExample items={itemsval} controlName={controlItems[0].ControlName} /></div>);
    }
    else if(controlItems[0].ControlType === "Button")
    {
      return (<div className={styles.bottomspace}><DefaultButton text={controlItems[0].ControlName}></DefaultButton></div>);
    }
  }

  public render(): React.ReactElement<IDynamicControlsfromSPlistProps> {

    return (
      <div className={styles.dynamicControlsfromSPlist}>
        {
          this.state.controlName.map(_controlName => (
            currentItems = this.state.links.filter(items => (items.ControlName === _controlName)),
            this.createControl(currentItems)
            ))
        }
      </div>
    );
  }
}
