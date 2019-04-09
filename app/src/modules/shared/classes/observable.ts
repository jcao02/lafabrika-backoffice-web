import { Observer } from './observer';

export interface Observable {
  subscribe(obs: Observer): void;
  unsubscribe(obs: Observer): void;
  notify(): void;
}
