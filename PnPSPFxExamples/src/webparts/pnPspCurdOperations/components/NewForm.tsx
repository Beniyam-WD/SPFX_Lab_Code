import * as React from 'react';

import { INewFormProps } from './INewFormProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import { sp } from "@pnp/sp";
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as moment from 'moment';
import { INewFormState } from './INewFormState';

export default class NewForm extends React.Component<INewFormProps, INewFormState, {}>
{
  constructor(props: INewFormProps, state: INewFormState) {
    super(props);
    if (this.props.items.length > 0) {
      this.setState({
        ID: this.props.items[0].ID,
        Title: this.props.items[0].Title,
        EventDetails: this.props.items[0].EventDetails,
        EventDate: this.props.items[0].EventDate,
        Organizer: this.props.items[0].Organizer,
        OrganizerId: this.props.items[0].OrganizerId,
        EventType: this.props.items[0].EventType,
      });
    }
    else
    {
      this.setState({
        ID: 0,
        Title: "",
        EventDetails: "",
        EventDate: null,
        Organizer: "",
        OrganizerId: 0,
        EventType: "",
      });
    }
  }

  public render(): React.ReactElement<INewFormProps> {

    return (
      <div>
        <div>Welcome to New Form</div>
        <TextField
          label="Event Name"
          required
          placeholder="Please enter event name..."
          title={this.state.Title}
          onChange={(event, value) => { this.setState({ Title: value }); }}
        />
        <TextField
          label="Event Details"
          multiline
          rows={3}
          placeholder="Please enter event details..."
          title={this.state.EventDetails}
          onChange={(event, value) => { this.setState({ EventDetails: value }); }}
        />
        <label>Event Date</label>
        <DatePicker
          placeholder="Select a date"
          onSelectDate={date => this.setState({ EventDate: date })}
        />
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
        <TextField label="Event Type"
          required
          placeholder="Please enter event Type..."
          title={this.state.EventType}
          onChange={(event, value) => { this.setState({ EventType: value }); }}
        ></TextField>
        <DefaultButton text="Submit" onClick={this._SubmitListItem.bind(this)} />
      </div>
    );
  }

  private _getPeoplePickerItems(items: any[]) {

  }

  private async _SubmitListItem(event) {
    if (this.props.items) //Edit Item
    {
      /* await sp.web.lists.
       getByTitle('SPFxEvents')
       .items
       .getById(ID)
       .update({ "Title"= this.state.Title,});*/

    }
    else //New Item
    {
      /*await sp.web.lists
      .getByTitle('SPFxEvents')
      .items
      .add({ "Title"= this.state.Title, });*/

    }
  }
}
