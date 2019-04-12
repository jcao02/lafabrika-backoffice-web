import { User } from '@/modules/shared/classes/resources/user';

export interface DataState {
  users: Record<string, User>;
}
