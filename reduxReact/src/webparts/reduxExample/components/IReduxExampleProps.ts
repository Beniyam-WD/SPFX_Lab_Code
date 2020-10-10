import { IApplicationState } from './IApplicationState';
import {Store} from 'redux';

export interface IReduxExampleProps {
  store:Store<IApplicationState>;
}
