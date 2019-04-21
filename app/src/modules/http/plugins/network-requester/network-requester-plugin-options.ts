import { Requester } from '../../interfaces';

type RequesterClass = new() => Requester;

// tslint:disable-next-line: no-empty-interface
export interface NetworkRequesterPluginOptions  {
  Requester: RequesterClass;
}
