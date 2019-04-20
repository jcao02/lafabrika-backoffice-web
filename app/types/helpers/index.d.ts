declare module 'lafabrika-helpers' {
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
}
