import * as React from 'react';
import styles from './PnPControls.module.scss';
import { IPnPControlsProps } from './IPnPControlsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class PnPControls extends React.Component<IPnPControlsProps, {}> {
  public render(): React.ReactElement<IPnPControlsProps> {
    return (
      <div className={styles.pnPControls}>
        <div className={styles.container}>

          <Pivot aria-label="Tab Example" linkFormat={PivotLinkFormat.tabs} >
            <PivotItem
              headerText="Tab 1"
              headerButtonProps={{
                'data-order': 1,
                'data-title': 'Tab 1 title',
              }}
            >
              <PeoplePicker
            context={this.props.context}
            titleText="JPOWER4 People Picker"
            personSelectionLimit={3}
            //groupName={"Team Site Owners"} // Leave this blank in case you want to filter from all users
            showtooltip={true}
            isRequired={true}
            disabled={false}
            selectedItems={this._getPeoplePickerItems}
            showHiddenInUI={true}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />

            </PivotItem>
            <PivotItem headerText="Tab 2">
              <TextField required label="MY Text Field"/>
            </PivotItem>
            <PivotItem headerText="Tab 3">
              <Label styles={labelStyles}>Tab 3</Label>
            </PivotItem>
          </Pivot>


        </div>
      </div>
    );
  }
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }
}
