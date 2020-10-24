import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IIssues {
  id: number;
  Projectname: string;
  Title: string;
  desc: string;
}
export interface IIssuesProps {
  currentURl: string;
  spHttpClient: SPHttpClient;
  ID: string;
}

export interface IIssuesState {
  issues: IIssues[];
}

export class SPFxIssues extends React.Component<IIssuesProps, IIssuesState, {}>
{

  constructor(props: IIssuesProps) {
    super(props);
    this.state = { issues: [] };
  }

  private getIssuesfromSPlist(): Promise<IIssues[]> {
    return new Promise<IIssues[]>((resolve, reject) => {
      const URL: string = `${this.props.currentURl}/_api/lists/getbyTitle('Issues')/items?$filter=Project_x0020_NameId eq ` + this.props.ID;
      this.props.spHttpClient.get(URL, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((responseval: any) => {
          let spissueslist: IIssues[] = [];
          for (let i = 0; i < responseval.value.length; i++) {
            spissueslist.push({
              id: responseval.value[i].Id,
              Projectname: responseval.value[i].Project_x0020_NameId,
              Title: responseval.value[i].Title,
              desc: responseval.value[i].Description
            });
            resolve(spissueslist);
          }
        });
    });
  }

  public componentWillMount(): void {
    this.getIssuesfromSPlist()
      .then((spissueslist: IIssues[]) => {
        this.setState({ issues: spissueslist });
      });
  }

  public render(): React.ReactElement<IIssuesProps> {
    let count: number = this.state.issues.length;

      return (
        <div>My Issues
          <table>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Issues Title</th>
              <th>Description</th>
            </tr>

          {
              this.state.issues.map(issue => (
                <tr>
                  <td>{issue.id}</td>
                  <td>{issue.Projectname}</td>
                  <td>{issue.Title}</td>
                  <td>{issue.desc}</td>
                </tr>
              ))

            }

          </table>
        </div>
      );
    }
  }
