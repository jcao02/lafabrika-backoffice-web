import { expect } from 'chai';
import { replace, fake, SinonSpy, restore, spy } from 'sinon';
import { shallowMount, mount } from '@vue/test-utils';
import { AbstractControlComponent } from './abstract-control-component';

describe('AbstractControlComponent', () => {
  afterEach(() => {
    restore();
  });
  describe('state', () => {
    it('should set dirty to true if the input changes its value', () => {
      const wrapper = shallowMount(AbstractControlComponent);
      const value = 'myValue';
      wrapper.setProps({ value });

      const diffValue = 'diffValue';
      ( wrapper.vm as any ).input(diffValue);

      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.dirty).to.be.true;
    });
    it('should not set dirty to true if the input does not change its value', () => {
      const wrapper = shallowMount(AbstractControlComponent);
      const value = 'myValue';
      wrapper.setProps({ value });

      ( wrapper.vm as any ).input(value);

      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.dirty).to.be.false;

    });
    it('should set touched to true if the input emits blur', () => {
      const wrapper = shallowMount(AbstractControlComponent);
      /** Using Event because FocusEvent is not defined in testing mode */
      ( wrapper.vm as any ).blur(new Event('blur'));

      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.touched).to.be.true;
    });
    it('should not set touched to true if the input does not emit blur', () => {
      const wrapper = shallowMount(AbstractControlComponent);
      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.touched).to.be.false;
    });

    it('should set the value in the state when value prop changes', () => {
      const wrapper = shallowMount(AbstractControlComponent);
      const value = 'myValue';
      wrapper.setProps({ value });
      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.state.value).to.eql(value);
    });
  });
  describe('subscribe()', () => {
    it('should subscribe observer on creation', () => {
      const iObserver = { update() { /** NOOP */ } };
      const parent = {
        name: 'validator-parent',
        template: `
          <AbstractControlComponent >
          </AbstractControlComponent>
        `,
        provide: { iObserver },
        components: { AbstractControlComponent }
      };

      const wrapper = mount(parent);
      const child = wrapper.find(AbstractControlComponent).vm;

      expect(( child as any ).observers).to.eql([iObserver]);
    });
    it('should not call subscribe if observer is null', () => {
      const wrapper = shallowMount(AbstractControlComponent);
      expect(wrapper.vm.observers).to.eql([]);
    });
  });
  describe('unsubscribe()', () => {
    it('should unsubscribe observer on component destroy', () => {
      const iObserver = { update() { /** NOOP */ } };
      const parent = {
        name: 'validator-parent',
        template: `
          <AbstractControlComponent >
          </AbstractControlComponent>
        `,
        provide: { iObserver },
        components: { AbstractControlComponent }
      };

      const wrapper = mount(parent);
      const child = wrapper.find(AbstractControlComponent);
      child.destroy();

      expect(( child.vm as any ).observers).to.eql([]);
    });
    it('should not call unsubscribe if observer is null', () => {
      const wrapper = shallowMount(AbstractControlComponent);
      replace(wrapper.vm, 'unsubscribe', fake());

      wrapper.destroy();
      // tslint:disable-next-line: no-unused-expression
      expect(( wrapper.vm.unsubscribe as SinonSpy).notCalled).to.be.true;
    });
  });
  describe('notify()', () => {
    it('should notify on input event', () => {
      const update = fake();
      const iObserver = { update };
      const parent = {
        name: 'validator-parent',
        template: `
          <AbstractControlComponent >
          </AbstractControlComponent>
        `,
        provide: { iObserver },
        components: { AbstractControlComponent }
      };

      const wrapper = mount(parent);
      const child = wrapper.find(AbstractControlComponent);

      const value = 'myValue';
      ( child.vm as any ).input(value);

      expect(update.calledWith(( child.vm as any ).state));
    });
    it('should notify on blur event', () => {
      const update = fake();
      const iObserver = { update };
      const parent = {
        name: 'validator-parent',
        template: `
          <AbstractControlComponent >
          </AbstractControlComponent>
        `,
        provide: { iObserver },
        components: { AbstractControlComponent }
      };

      const wrapper = mount(parent);
      const child = wrapper.find(AbstractControlComponent);

      const value = 'myValue';
      ( child.vm as any ).blur(value);

      expect(update.calledWith(( child.vm as any ).state));
    });
  });
});
