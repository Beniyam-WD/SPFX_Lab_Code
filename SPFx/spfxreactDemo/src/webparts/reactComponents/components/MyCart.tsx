import * as React from 'react';
import Welcome from './Welcome';

export default class MyCart extends React.Component
{
  public render()
  {
    return <div><Welcome name="My Cart dynamic data"/></div>;
  }
}
