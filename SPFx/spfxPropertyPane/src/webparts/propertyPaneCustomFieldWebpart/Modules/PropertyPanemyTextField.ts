import { IMobilePreviewDimensionInputProps } from './../../../../temp/workbench-packages/@microsoft_sp-webpart-workbench/lib/components/mobilePreview/mobilePreviewDimensionInput/MobilePreviewDimensionInput.d';

import { IPropertyPaneField, IPropertyPaneCustomFieldProps, PropertyPaneFieldType } from '@microsoft/sp-property-pane';

export interface PropertyPanemyTextFieldProps {
  properties:any;
  label:string;
  description?:string;
  color?:string;
  backgroundcolor?:string;
  defaultvalue?:string;
}

export class PropertyPanemyTextField implements IPropertyPaneField<IPropertyPaneCustomFieldProps>{

  public type: any = PropertyPaneFieldType.Custom;
  public targetProperty:string;
  public properties: IPropertyPaneCustomFieldProps;
  private config : PropertyPanemyTextFieldProps;
  private currentValue:string = "";

  constructor(targetProperty:string,
    config : PropertyPanemyTextFieldProps,
    context?:any)
    {
    this.targetProperty = targetProperty;
    this.properties = {
      key: "MyCustomControl",
      context: context,
      onRender : this.render.bind(this),
      onDispose : this.dispose.bind(this)
    };
    this.config = config;
  }

  private render(element:HTMLElement,
    context:any,
    changeCallback:(targetProperty:string, newValue:any)=>void)
  {
    this.currentValue = this.config.properties[this.targetProperty];
    let html =
    `<div style="background-color:${this.config.backgroundcolor}">
      <div class="ms-TextField">
      <div class="ms-TextField-wrapper" style="padding:5px">
        <label class="ms-Label" style="color:${this.config.color || "gray"};">${this.config.label}</label>
        <div class="ms-TextField-fieldGroup" style="padding:5px">
          <input class="ms-TextField-field" style="width:100%" type="text" value="${this.currentValue || this.config.defaultvalue}">
        </div>
      <div>
      <span class="description">${this.config.description||""}</span>
      </div>
    </div>`;
    element.innerHTML = html;

    this.addEvents(element, changeCallback);
  }
  private addEvents(element:HTMLElement, callback:(targetProperty:string, newValue:any)=>void ){
    let inputTextElement : HTMLInputElement = element.getElementsByTagName('input')[0];

    inputTextElement.onchange=()=>{
      this.applyChanges(element, inputTextElement, callback);
    };
}

private applyChanges(element: HTMLElement, inputTextElement : HTMLInputElement, callback:(targetProperty:string, newValue:any)=>void ){
  let newValue = inputTextElement.value;
  callback(this.targetProperty, newValue);
}

  private dispose(element:HTMLElement){
   element.innerHTML="";
  }
}
