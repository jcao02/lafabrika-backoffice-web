import Vue from 'vue';
import Component from 'vue-class-component';
import { decode } from 'jsonwebtoken';
import { set, remove } from 'js-cookie';
import { User } from '@/modules/shared/classes/resources/user';

const TOKEN_KEY = 'AUTH_TOKEN';

@Component
export class TokenManager extends Vue {
  decode(token: string): User | null {
    return decode(token, { json: true }) as User | null;
  }

  persistToken(token: string) {
    set(TOKEN_KEY, token, {expires: 365});
  }

  removeToken(token: string) {
    remove(TOKEN_KEY);
  }
}
