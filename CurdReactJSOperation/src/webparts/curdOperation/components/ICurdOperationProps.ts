import {SPHttpClient} from '@microsoft/sp-http';

export interface ICurdOperationProps {
  description: string;
  siteUrl:string;
  spHttpClient:SPHttpClient;
}
