import * as React from 'react';

import {INewFormProps} from './INewFormProps';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import {sp} from "@pnp/sp";
import {autobind} from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as moment from 'moment';

export default class NewForm extends React.Component<INewFormProps, {}>
{
  constructor(props:INewFormProps)
  {
    super(props);
  }

  public render(): React.ReactElement<INewFormProps>{

    return(
        <div>
          <div>Welcome to New Form</div>
          <TextField label="Event Name" required></TextField>
          <TextField label="Event Details" multiline rows={3}></TextField>
          <label>Event Date</label>
          <DatePicker />
          <PeoplePicker
            context={this.props.context}
            titleText="JPOWER4 People Picker"
            personSelectionLimit={3}
            showtooltip={true}
            isRequired={true}
            disabled={false}
            selectedItems={this._getPeoplePickerItems}
            showHiddenInUI={true}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />
          <TextField label="Event Type" required></TextField>
          <DefaultButton text="Submit" onClick={this._SubmitListItem.bind(this)}/>
        </div>
    );
  }

  private _getPeoplePickerItems(items: any[]){

  }

  private async _SubmitListItem(event)
  {
      if(this.props.items) //Edit Item
      {
            await sp.web.lists.
            getByTitle('SPFxEvents')
            .items
            .getById(ID)
            .update({ "Title"= this.state.Title,});

      }
      else //New Item
      {
          await sp.web.lists
          .getByTitle('SPFxEvents')
          .items
          .add({ "Title"= this.state.Title, });

      }
  }
}
