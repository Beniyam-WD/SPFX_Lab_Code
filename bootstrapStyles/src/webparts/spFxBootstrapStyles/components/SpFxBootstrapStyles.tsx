import * as React from 'react';
import styles from './SpFxBootstrapStyles.module.scss';
import { ISpFxBootstrapStylesProps } from './ISpFxBootstrapStylesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import * as bootstrap from "bootstrap";
require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
import { IContacts } from './IContacts';
import { ISpFxBootstrapStylesState } from './ISpFxBootstrapStylesState';
import { createPopper } from '@popperjs/core';

export default class SpFxBootstrapStyles extends React.Component<ISpFxBootstrapStylesProps, ISpFxBootstrapStylesState, {}> {

  constructor(props: ISpFxBootstrapStylesProps) {
    super(props);
    this.state = { contacts: [] };
  }

  private getContactsfromSP(): Promise<IContacts[]> {
    return new Promise<IContacts[]>((resolve, reject) => {
      const URL: string = `${this.props.currentsiteURl}/_api/lists/getbytitle('SPFxContacts')/items?select=Id,Title,ContactNumber, CompanyName, Country,Department`;
      this.props.spHttpClient.get(URL, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((resvalues: any) => {
          let spContacts: IContacts[] = [];
          for (let i = 0; i < resvalues.value.length; i++) {
            spContacts.push({
              id: resvalues.value[i].Id,
              ContactName: resvalues.value[i].Title,
              ContactNumber: resvalues.value[i].ContactNumber,
              CompanyName: resvalues.value[i].CompanyName,
              Country: resvalues.value[i].Country,
              Department: resvalues.value[i].Department
            });
            resolve(spContacts);
          }
        });
    });
  }

  public componentWillMount(): void {
    this.getContactsfromSP()
      .then((splistscontacts: IContacts[]) => {
        this.setState({ contacts: splistscontacts });
      });
  }

  public render(): React.ReactElement<ISpFxBootstrapStylesProps> {
    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Contact Name</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Company Name</th>
              <th scope="col">Country</th>
              <th scope="col">Department</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map(contact => (
              <tr>
                <th scope="row">{contact.id}</th>
                <td>{contact.ContactName}</td>
                <td>{contact.ContactNumber}</td>
                <td>{contact.CompanyName}</td>
                <td>{contact.Country}</td>
                <td>{contact.Department}</td>
                <td><a href="https://jpower4mvp.sharepoint.com/sites/SPFxTraining/Lists/SPFxContacts/dispform.aspx?ID="${...contact.id}>view</a></td>
              </tr>
            ))
            }
          </tbody>
        </table>
        <br />


        </div>

    );
  }
}
