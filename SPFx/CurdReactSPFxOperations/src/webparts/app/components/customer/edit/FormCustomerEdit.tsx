import * as React from 'react';
import { IFormCustomerEditState } from './IFormCustomerEditState';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  TextField,
  DefaultButton,
  MessageBar,
  MessageBarType,
  MessageBarButton,
  Panel,
  PanelType,
  PrimaryButton,
  Link
} from 'office-ui-fabric-react';
import { CustomersDataProvider } from '../sharePointDataProvider/CustomersDataProvider';
import { ICustomer } from '../Models/ICustomer';
import { Separator } from 'office-ui-fabric-react/lib/Separator';

export default class FormCustomerEdit extends React.Component<{}, IFormCustomerEditState> {
  private _customersDataProvider: CustomersDataProvider;
  constructor(props) {
    super(props);

    this._customersDataProvider = new CustomersDataProvider({});
    this.state = {
      isBusy: false,
      customer: props.state.selectedCustomer,
      customersDataProvider: this._customersDataProvider,
      messageSended: false,
      showEditCustomerPanel: props.state.showEditCustomerPanel,
      _goBack: props.state._goBack,
    };
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        <TextField disabled={this.state.isBusy} label="First Name" name="text" value={this.state.customer.name}
          onChange={(event, value) => { const { customer } = this.state; customer.name = value; this.setState({ customer: customer }); }} />

        <TextField disabled={this.state.isBusy} label="Last Name" name="text" value={this.state.customer.value}
          onChange={(event, value) => { const { customer } = this.state; customer.value = value; this.setState({ customer: customer }); }} />

        <TextField disabled={this.state.isBusy} label="Contact Number" name="text" value={this.state.customer.contactnumber}
          onChange={(event, value) => { const { customer } = this.state; customer.contactnumber = value; this.setState({ customer: customer }); }} />

        <Separator />
        <div>
          <PrimaryButton disabled={this.state.isBusy} onClick={this._UpdateCustomer}>Save</PrimaryButton>
          <Separator />
          <DefaultButton onClick={this.state._goBack} >Cancel</DefaultButton>
        </div>
      </div>
    );
  }


  /*private _onChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {

    let value= event.target.value;
    const {customer}=   this.state;
    customer.name=value;
    this.setState({customer:customer});

  }*/

  private _UpdateCustomer = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {

    const { customer } = this.state;
    this.setState({ isBusy: true });
    this._customersDataProvider.updateItem(customer).then((customers: ICustomer[]) => {
      console.log("Updated:" + customer);

    });
    this.state._goBack();
  }
}

