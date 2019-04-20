declare module 'lafabrika-resources' {
  export interface User {
    id: string;
    email: string;
    role: string;
  }

  export interface Authentication {
    token: string;
  }
}
