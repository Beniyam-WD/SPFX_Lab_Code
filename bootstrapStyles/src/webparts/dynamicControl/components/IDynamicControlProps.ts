import { SPHttpClient } from '@microsoft/sp-http';
export interface IDynamicControlProps {
  description: string;
  spHttpClient:SPHttpClient;
  currentURL:string;
}
