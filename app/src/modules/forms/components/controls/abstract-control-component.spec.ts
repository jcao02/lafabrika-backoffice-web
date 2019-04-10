import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { AbstractControlComponent } from './abstract-control-component';

describe('AbstractControlComponent', () => {
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
});
