import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IProjectDetailsProps } from './IProjectDetailsProps';
import { IProjectDetailsState } from './IProjectDetailsState';
import { IProjects } from './IProjects';

import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator';

const paginationOptions = {
  sizePerPage:10,
  hideSizePerPage:true,
  hidePageListOnlyonePage:true
};

const ItemTableColumns = [
  {
    dataField:"ProjectCode",
    text: "Project Code",
    heaserStyle:{backgroundColor: '#d42aca'},
    sort:true
  },
  {
    dataField:"ProjectName",
    text: "Project Name",
    heaserStyle:{backgroundColor: '#d42aca'},
    sort:true
  },
  {
    dataField:"Description",
    text: "Description",
    heaserStyle:{backgroundColor: '#d42aca'},
    sort:true
  }
];


export interface SPFXProjectProps{
  currentURl:string;
  spHttpClient:SPHttpClient;
}

export class SPFxProject extends React.Component<SPFXProjectProps,IProjectDetailsState, {}>
{
  constructor(props: SPFXProjectProps) {
    super(props);
    this.state = { projects: [] };
  }

  private getProjectsfromSPlist(): Promise<IProjects[]> {
    return new Promise<IProjects[]>((resolve, reject) => {
      const URL: string = `${this.props.currentURl}/_api/lists/getbyTitle('SPFXProjects')/items?$select=Id,Title,ProjectName,Description1,ProjectStatus,ManagerId,DueDate1`;
      this.props.spHttpClient.get(URL, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((responseval: any) => {
          let spProjectslist: IProjects[] = [];
          for (let i = 0; i < responseval.value.length; i++) {
            spProjectslist.push({
              id: "#/ProjectView/" + responseval.value[i].Id,
              ProjectCode: responseval.value[i].Title,
              ProjectName: responseval.value[i].ProjectName,
              Description: responseval.value[i].Description1,
              Manager: responseval.value[i].ManagerId,
              Status:responseval.value[i].ProjectStatus,
              Duedate:responseval.value[i].DueDate1
            });
            resolve(spProjectslist);
          }
        });
    });
  }

  public componentWillMount(): void {
    this.getProjectsfromSPlist()
      .then((spprojectlist: IProjects[]) => {
        this.setState({ projects: spprojectlist });
      });
  }

  public render(): React.ReactElement<IProjectDetailsProps> {
    return (
      <div>
        <BootstrapTable keyField='id' data={this.state.projects} columns={ItemTableColumns} pagination = {paginationFactory(paginationOptions)} />
        All My Project
        <table>
          <tr>
            <th>Project Code</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Manager</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>view</th>
          </tr>
          {
            this.state.projects.map(project => (
              <tr>
                <td>{project.ProjectCode}</td>
                <td>{project.ProjectName}</td>
                <td>{project.Description}</td>
                <td>{project.Manager}</td>
                <td>{project.Duedate}</td>
                <td>{project.Status}</td>

                <td><a href={project.id}>view</a></td>
              </tr>
            ))

          }

        </table>
      </div >
    );
  }
}
