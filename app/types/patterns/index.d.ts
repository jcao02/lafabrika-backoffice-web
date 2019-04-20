declare module 'lafabrika-patterns' {
  export interface Observer {
    update(value: any): void;
  }
  export interface Observable {
    subscribe(obs: Observer): void;
    unsubscribe(obs: Observer): void;
    notify(): void;
  }
}
