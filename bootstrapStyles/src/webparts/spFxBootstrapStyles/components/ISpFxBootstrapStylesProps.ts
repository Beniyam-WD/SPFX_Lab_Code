import {SPHttpClient} from "@microsoft/sp-http";

export interface ISpFxBootstrapStylesProps {
  description: string;
  spHttpClient:SPHttpClient;
  currentsiteURl:string;
}
