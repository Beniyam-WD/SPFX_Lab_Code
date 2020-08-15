import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ICustomersDataProvider } from '../sharePointDataProvider/ICustomersDataProvider';
import { ICustomer } from '../Models/ICustomer';
import { CustomersDataProvider } from '../sharePointDataProvider/CustomersDataProvider';
import { PanelType, Panel } from 'office-ui-fabric-react';
import FormCustomerCreate from '../create/FormCustomerCreate';
export interface ICommandBarCustomerState {
  isVisible: boolean;
  customer: ICustomer;
  messageSended: boolean;
  customersDataProvider:ICustomersDataProvider;
  _goBack:VoidFunction;
  _reload:VoidFunction;
}
export class CommandBarCustomers extends React.Component<{}, ICommandBarCustomerState> {

  private  _customersDataProvider:ICustomersDataProvider;
  private  _customer:ICustomer;
  /**
   *Cosnstructor og CommandBarCustomers
   */
  constructor(props) {
    super(props);
    this._customersDataProvider=new CustomersDataProvider({});
    this.state = {
      isVisible: false,
      customer: this._customer,
      customersDataProvider: this._customersDataProvider,
      messageSended: false,
      _goBack:this._hidePanel,
      _reload:props.state._goBack,
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <CommandBar
          items={this.getItems()}
          overflowItems={this.getOverlflowItems()}
          overflowButtonProps={{ ariaLabel: 'More commands' }}
          farItems={this.getFarItems()}
          ariaLabel={'Use left and right arrow keys to navigate between commands'}
        />
        <Panel isOpen={this.state.isVisible} onDismiss={this._hidePanel} type={PanelType.medium} headerText={"New Customer"}>
        <FormCustomerCreate {...this}  />
        </Panel>
      </div>
    );
  }

  // Data for CommandBar
  private getItems = () => {
    return [
      {
        key: 'newItem',
        name: 'New',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New',
        subMenuProps: {
          items: [
            {
              key: 'customerItem',
              name: 'New Item',
              iconProps: {
                iconName: 'SwayLogo16'
              },
              ['data-automation-id']: 'newEmailButton',
              onClick: () => {

                  this.setState( {isVisible:true});

              }
            }
          ]
        }
      },
      {
        key: 'share',
        name: 'Menu 1',
        iconProps: {
          iconName: 'Share'
        },
        onClick: () => alert('menu 1')
      },
      {
        key: 'share',
        name: 'Menu 2',
        iconProps: {
          iconName: 'Share'
        },
        onClick: () => alert('menu 2')
      }
    ];
  }

  private getOverlflowItems = () => {
    return [
      {
        key: 'move',
        name: 'Move to...',
        onClick: () => alert('Move to'),
        iconProps: {
          iconName: 'MoveToFolder'
        }
      },
      {
        key: 'copy',
        name: 'Copy to...',
        onClick: () => alert('Copy to'),
        iconProps: {
          iconName: 'Copy'
        }
      },
      {
        key: 'rename',
        name: 'Rename...',
        onClick: () => alert('Rename'),
        iconProps: {
          iconName: 'Edit'
        }
      }
    ];
  }

  private getFarItems = () => {
    return [
      {
        key: 'sort',
        name: 'Sort',
        ariaLabel: 'Sort',
        iconProps: {
          iconName: 'SortLines'
        },
        onClick: () => alert('Sort')
      },
      {
        key: 'tile',
        name: 'Grid view',
        ariaLabel: 'Grid view',
        iconProps: {
          iconName: 'Tiles'
        },
        iconOnly: true,
        onClick: () => alert('Tiles')
      },
      {
        key: 'info',
        name: 'Info',
        ariaLabel: 'Info',
        iconProps: {
          iconName: 'Info'
        },
        iconOnly: true,
        onClick: () => alert('Info')
      }
    ];
  }
  private _hidePanel = () => {
    this.setState({ isVisible: false });
  }


}
