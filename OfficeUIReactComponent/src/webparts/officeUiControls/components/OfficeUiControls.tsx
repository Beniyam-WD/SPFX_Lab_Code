import * as React from 'react';
import styles from './OfficeUiControls.module.scss';
import { IOfficeUiControlsProps } from './IOfficeUiControlsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {TextField, ITextFieldStyles} from 'office-ui-fabric-react/lib/TextField';
const myTextFieldStyles: Partial<ITextFieldStyles>={
  fieldGroup:{width:300}
};

import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
const options: IDropdownOption[] = [
  {key:"FirstHeader",text:'Fruits',itemType:DropdownMenuItemType.Header},
  {key:"apple",text:'Apple'},
  {key:"orange",text:'Orange'},
  {key:"FirstHeader",text:'First Header',itemType:DropdownMenuItemType.Divider},
  {key:"banana",text:'Banana'},
  {key:"grape",text:'Grape'},
  {key:"SecondHeader",text:'Vegetables',itemType:DropdownMenuItemType.Header},
  {key:"carrot",text:'Carrot'},
  {key:"broccoli",text:'broccoli'},
];
const myDropDownStyles:Partial<IDropdownStyles>={
  dropdown:{width:300,color:'red'}
};

const options1:IDropdownOption[]=[
  {key:"apple",text:'Apple'},
  {key:"orange",text:'Orange'},
  {key:"carrot",text:'Carrot'},
  {key:"broccoli",text:'broccoli'},
];

const curDate:Date = new Date();

import {DatePicker, IDatePickerStrings} from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets, PrimaryButton} from 'office-ui-fabric-react/';

const controlClass = mergeStyleSets({
  control:{
    margin:'0 0 15px 0',
    maxWidth:'300px'
  },
  example:{
    color:'Green'
  }
});

import {DocumentCard,DocumentCardPreview,DocumentCardTitle,DocumentCardActivity,IDocumentCardPreviewProps} from 'office-ui-fabric-react/lib/DocumentCard';


export default class OfficeUiControls extends React.Component<IOfficeUiControlsProps, {}> {
  public render(): React.ReactElement<IOfficeUiControlsProps> {
    const previewProps: IDocumentCardPreviewProps ={
      previewImages:[
        {
        previewImageSrc:String(require('./../Images/Laptop1.jpg')),
        iconSrc:String(require('./../Images/icon-ppt.png')),
        width:300,
        height:200,
        accentColor:'#ce4b1f'

        }
      ]
    };


    return (
      <div>
        <TextField label="Enter your Name" styles={myTextFieldStyles}></TextField>
        <TextField label="Enter the description" multiline rows={4} styles={myTextFieldStyles}></TextField>

        <Dropdown
        placeHolder="Select"
        label = "Please Select the fruits or Vegetables"
        options={options}
        styles={myDropDownStyles}
        />
        <Dropdown
        label="No Header"
        options={options1}
        styles={myDropDownStyles}
        />
        <DatePicker
        label="Select Date"
        value= {curDate}
        className={controlClass.control}
        />


        <PrimaryButton text="Submit" onClick={this.onClicked}></PrimaryButton>

      <DocumentCard onClickHref="http://jenkinsblogs.com"  >
        <DocumentCardPreview {...previewProps}  />
        <DocumentCardTitle title='Document Card title' />
        <DocumentCardActivity
          activity="Created on Jul 16 2020"

          people={
            [
              { name: 'Jenkins NS', profileImageSrc:String(require('./../Images/avatar-kat.png'))}
            ]
          }
          />
      </DocumentCard>
      </div>
    );
  }
  private onClicked()
  {
    alert('Primary Button Cliked');
  }
}
