import * as React from 'react';

export interface IWelcomeProps{
  name:string;
}

export default class Welcome extends React.Component<IWelcomeProps,{}>
{
  public render():React.ReactElement<IWelcomeProps>
  {
    return <div>Welcome to {this.props.name}</div>;
  }
}
