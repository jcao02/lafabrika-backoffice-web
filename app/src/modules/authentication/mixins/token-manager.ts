import Vue from 'vue';
import Component from 'vue-class-component';
import { decode } from 'jsonwebtoken';
import { set, remove, get } from 'js-cookie';
import { User } from 'lafabrika-resources';

const TOKEN_KEY = 'token';

@Component
export class TokenManager extends Vue {
  /**
   * Decodes a JWT token
   * @param token to be decoded
   */
  decode(token: string): User | null {
    return decode(token, { json: true }) as User | null;
  }

  /**
   * Persist the token in the cookies
   * @param token to be persisted
   */
  persistToken(token: string) {
    set(TOKEN_KEY, token, {expires: 365});
  }

  /**
   * Removes token from cookies
   */
  removeToken() {
    remove(TOKEN_KEY);
  }

  /**
   * Gets token from cookies
   */
  getToken(): string | null {
    const tokenOrUndefined = get(TOKEN_KEY);
    return !!tokenOrUndefined ? tokenOrUndefined : null;
  }
}
