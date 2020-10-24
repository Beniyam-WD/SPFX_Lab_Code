import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IRisks{
  id:number;
  Projectname:string;
  Title:string;
  desc:string;
}
export interface IRisksProps{
  currentURl:string;
  spHttpClient:SPHttpClient;
  ID:string;
}

export interface IRisksState{
  risks:IRisks[];
}

export class SPFxRisks extends React.Component<IRisksProps,IRisksState,{}>
{

  constructor(props: IRisksProps) {
    super(props);
    this.state = { risks: [] };
  }

  private getRisksfromSPlist(): Promise<IRisks[]> {
    return new Promise<IRisks[]>((resolve, reject) => {
      const URL: string = `${this.props.currentURl}/_api/lists/getbyTitle('Risks')/items?$filter=Project_x0020_NameId eq `+ this.props.ID;
      this.props.spHttpClient.get(URL, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((responseval: any) => {
          let spriskslist: IRisks[] = [];
          for (let i = 0; i < responseval.value.length; i++) {
            spriskslist.push({
              id: responseval.value[i].Id,
              Projectname:responseval.value[i].Project_x0020_NameId,
              Title:responseval.value[i].Title,
              desc: responseval.value[i].Description
            });
            resolve(spriskslist);
          }
        });
    });
  }

  public componentWillMount(): void {
    this.getRisksfromSPlist()
      .then((spriskslist: IRisks[]) => {
        this.setState({ risks: spriskslist });
      });
  }


  public render():React.ReactElement<IRisksProps>
  {
    return(
      <div>My Risks
        <table>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Risk Title</th>
            <th>Description</th>
          </tr>
          {
            this.state.risks.map(risk => (
              <tr>
                <td>{risk.id}</td>
                <td>{risk.Projectname}</td>
                <td>{risk.Title}</td>
                <td>{risk.desc}</td>
              </tr>
            ))

          }

        </table>

      </div>
    );
  }
}
