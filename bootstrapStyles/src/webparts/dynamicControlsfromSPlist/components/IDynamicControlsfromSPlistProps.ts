import { SPHttpClient } from '@microsoft/sp-http';
export interface IDynamicControlsfromSPlistProps {
  description: string;
  spHttpClient:SPHttpClient;
  currentURL:string;
}

import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import {ISPFxLinks} from './ISPFxLinks';
export interface IDynamicControlsfromSPlistState {
  items:IContextualMenuItem[];
  links?:ISPFxLinks[];
  controlName?:string[];
}
