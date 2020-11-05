import * as React from 'react';
import { ContextualMenuItemType, IContextualMenuProps, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { useConst } from '@uifabric/react-hooks';

import { IDynamicControlsfromSPlistProps } from './IDynamicControlsfromSPlistProps';

export interface IContextualProps {
  items: IContextualMenuItem[];
  controlName:string;
}

export const ContextualMenuDefaultExample: React.FunctionComponent<IContextualProps> = (props) => {

  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    items: props.items
  }));

  return <PrimaryButton text={props.controlName} menuProps={menuProps} />;
};
