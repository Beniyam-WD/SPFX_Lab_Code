import * as React from 'react';
import Welcome from './Welcome';
import Electronics from './Electronics';

export default class Products extends React.Component
{
  public render()
  {
    return <div>
      <Welcome name="Products dyanmic data"/>
      <Electronics description="Product Description" />
    </div>;
  }
}
