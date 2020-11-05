import { ISPFxLinks } from './ISPFxLinks';
import {IOptions} from './IOptions';
import { ContextualMenuItemType, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';

export interface IDynamicControlState{
  links:ISPFxLinks[];
  linkOptions:IOptions[];
}
