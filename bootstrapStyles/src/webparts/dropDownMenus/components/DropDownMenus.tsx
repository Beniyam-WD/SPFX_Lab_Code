import * as React from 'react';
import styles from './DropDownMenus.module.scss';
import { IDropDownMenusProps } from './IDropDownMenusProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {ContextualMenuDefaultExample} from './DropDownMenuComponent';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export default class DropDownMenus extends React.Component<IDropDownMenusProps, {}> {
  public render(): React.ReactElement<IDropDownMenusProps> {
    return (
      <div className={ styles.dropDownMenus }>
        <ContextualMenuDefaultExample/>
        <br/>
        <DefaultButton text="My Button" ></DefaultButton>
      </div>
    );
  }
}
