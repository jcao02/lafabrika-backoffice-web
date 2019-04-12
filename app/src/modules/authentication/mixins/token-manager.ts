import Vue from 'vue';
import Component from 'vue-class-component';
import { decode } from 'jsonwebtoken';
import { User } from '@/modules/shared/classes/resources/user';

@Component
export class TokenManager extends Vue {
  decode(token: string): User | null {
    return decode(token, { json: true }) as User | null;
  }
}
