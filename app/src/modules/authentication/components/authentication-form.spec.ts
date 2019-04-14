import { expect } from 'chai';
import sinon, { SinonStub, SinonSpy } from 'sinon';
import { shallowMount } from '@vue/test-utils';

import AuthenticationForm from './authentication-form.vue';

/**
 * Helper interface for stubs
 */
interface SubmitStubs {
  authenticate: SinonStub | SinonSpy;
  handleUser: SinonStub | SinonSpy;
  persistToken: SinonStub | SinonSpy;
  decode: SinonStub | SinonSpy;
  setError: SinonStub | SinonSpy;
}

/**
 * Stubs the methods called in the submit method
 * @param returnValues to set in the spies
 */
function stubSubmitMethods(returnValues: Record<string, any>): SubmitStubs {
  const methods: Array<keyof SubmitStubs> = [ 'authenticate', 'decode', 'persistToken', 'setError' ];

  const stubs: Partial<SubmitStubs> = {};
  methods.forEach(m => {
    stubs[m] = m in returnValues ? sinon.fake(() => returnValues[m]) : sinon.stub();
  });

  return stubs as SubmitStubs;
}

type SpyExpectation = [SinonStub | SinonSpy, string[] | null, 'true' | 'false'];

/**
 * Adds expectations to spies depending on configuration
 * @param spies to add expectations to
 */
function expectSubmitMethods(spies: Record<string, SpyExpectation>): void {
  const spyNames = Object.keys(spies);

  spyNames.forEach(sn => {
    const spy = spies[sn][0];
    const args = spies[sn][1];
    const result = spies[sn][2];

    if (args === null) {
      // No args
      // tslint:disable-next-line: no-unused-expression
      expect(spy.called).to.be[result];

    } else {
      // Called with args
      // tslint:disable-next-line: no-unused-expression
      expect(spy.calledWith(...args)).to.be[result];
    }
  });
}



describe('AuthenticationForm.vue', () => {
  it('should mount the component', () => {
    const wrapper = shallowMount(AuthenticationForm);
    // tslint:disable-next-line: no-unused-expression
    expect(wrapper.vm).not.to.be.undefined;
  });

  describe('onSubmit()', () => {
    const email = 'jon@example.com';
    const password = 'myPassword';
    const user = { id: '1', email };
    const token = 'myToken';
    const $router: { push?: SinonStub } = { };

    beforeEach(() => { $router.push = sinon.stub(); });

    it('should set current-user, token and navigate on success', done => {
      (async () => {
        const wrapper = shallowMount(AuthenticationForm, {
          data: () => ({ email, password }),
          mocks: { $router }
        });

        const response = { status: 201, data: { token } };
        const { authenticate, decode, handleUser, persistToken, setError } = stubSubmitMethods({
          authenticate: Promise.resolve(response),
          decode: user
        });

        wrapper.setMethods({ handleUser, persistToken, authenticate, decode, setError });

        try {
          await ( wrapper.vm as any ).onSubmit(new Event('submit'));

          expectSubmitMethods({
            authenticate: [authenticate, [email, password], 'true'],
            persistToken: [persistToken, null, 'true'],
            handleUser: [handleUser, null, 'true'],
            decode: [decode, [token], 'true'],
            setError: [setError, null, 'false'],
            router: [$router.push!, ['/'], 'true']
          });

        // tslint:disable-next-line: no-empty
        } catch (err) { }
      })();

      done();
    });
    it('should set generalError when server throws 401', done => {
      (async () => {
        const wrapper = shallowMount(AuthenticationForm, {
          data: () => ({ email, password }),
          mocks: { $router }
        });

        const response = { status: 401 };
        const { authenticate, decode, handleUser, persistToken, setError } = stubSubmitMethods({
          authenticate: Promise.reject(response),
          decode: user
        });

        wrapper.setMethods({ handleUser, persistToken, authenticate, decode, setError });

        try {
          await ( wrapper.vm as any ).onSubmit(new Event('submit'));

          expectSubmitMethods({
            authenticate: [authenticate, [email, password], 'true'],
            handleUser: [handleUser, null, 'false'],
            decode: [decode, null, 'false'],
            setError: [setError, null, 'true'],
            router: [$router.push!, null, 'false']
          });

        // tslint:disable-next-line: no-empty
        } catch (err) { }
      })();

      done();

    });
    it('should set generalError when server throws any other error', done => {
      (async () => {
        const wrapper = shallowMount(AuthenticationForm, {
          data: () => ({ email, password }),
          mocks: { $router }
        });

        const response = { status: 500 };
        const { authenticate, decode, handleUser, persistToken, setError } = stubSubmitMethods({
          authenticate: Promise.reject(response),
          decode: user
        });

        wrapper.setMethods({ handleUser, persistToken, authenticate, decode, setError });

        try {
          await ( wrapper.vm as any ).onSubmit(new Event('submit'));

          expectSubmitMethods({
            authenticate: [authenticate, [email, password], 'true'],
            handleUser: [handleUser, null, 'false'],
            decode: [decode, null, 'false'],
            setError: [setError, null, 'true'],
            router: [$router.push!, null, 'false']
          });

        // tslint:disable-next-line: no-empty
        } catch (err) { }
      })();

      done();
    });
  });
});
