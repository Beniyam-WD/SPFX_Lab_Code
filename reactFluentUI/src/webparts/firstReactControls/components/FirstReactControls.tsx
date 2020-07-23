import * as React from 'react';
import styles from './FirstReactControls.module.scss';
import { IFirstReactControlsProps } from './IFirstReactControlsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Depths } from '@uifabric/fluent-Theme/lib/fluent/FluentDepths';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TestImages } from '@uifabric/example-data';

import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { IStackTokens, Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';

const stackStyles: Partial<IStackStyles> = { root: { height: 200 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

export interface ISliderVerticalExampleState {
  value: number;
}

const options: IChoiceGroupOption[] = [
  {
    key: 'bar',
    imageSrc: TestImages.choiceGroupBarUnselected,
    imageAlt: 'Bar chart icon',
    selectedImageSrc: TestImages.choiceGroupBarSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Clustered bar chart', // This text is long to show text wrapping.
  },
  {
    key: 'pie',
    imageSrc: TestImages.choiceGroupBarUnselected,
    selectedImageSrc: TestImages.choiceGroupBarSelected,
    imageSize: { width: 32, height: 32 },
    text: 'Pie chart',
  }
];

export default class FirstReactControls extends React.Component<IFirstReactControlsProps, {}> {
  public render(): React.ReactElement<IFirstReactControlsProps> {
    return (


              <div >
               <ChoiceGroup label="Pick one image" defaultSelectedKey="bar" options={options} />;
               <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Slider // prettier-ignore
        label="Basic"
        min={1}
        max={5}
        step={1}
        defaultValue={2}
        showValue
        vertical
      />
      <Slider // prettier-ignore
        label="Disabled"
        min={50}
        max={500}
        step={50}
        defaultValue={300}
        showValue
        vertical
        disabled
      />
      <Slider // prettier-ignore
        label="Controlled"
        max={10}
        vertical
        showValue
      />
      <Slider // prettier-ignore
        label="Formatted value"
        max={100}
        valueFormat={(value: number) => `${value}%`}
        showValue
        vertical
      />
      <Slider // prettier-ignore
        label="Origin from zero"
        min={-5}
        max={15}
        step={1}
        defaultValue={5}
        showValue
        vertical
        originFromZero
      />
      <label >End</label>
    </Stack>
              </div>

    );
  }
}
