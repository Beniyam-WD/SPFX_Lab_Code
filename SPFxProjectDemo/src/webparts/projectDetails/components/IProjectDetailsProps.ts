import {SPHttpClient} from "@microsoft/sp-http";
export interface IProjectDetailsProps {
  description: string;
  spHttpClient:SPHttpClient;
  currentsiteURL:string;
}
