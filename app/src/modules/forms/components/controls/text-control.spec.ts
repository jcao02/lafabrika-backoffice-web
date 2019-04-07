import { expect } from 'chai';
import { shallowMount, NameSelector, mount } from '@vue/test-utils';
import TextControl from './text-control.vue';
import { VTextField } from 'vuetify/lib';

describe('TextControl.vue', () => {
  it('should mount the component', () => {
    const wrapper = shallowMount(TextControl);
    // tslint:disable-next-line: no-unused-expression
    expect(wrapper.vm).not.to.be.undefined;
  });

  describe('props', () => {
    it('should pass the value prop to the child component', () => {
      const wrapper = mount(TextControl);

      const value = 'myValue';
      wrapper.setProps({ value });
      expect(wrapper.find(VTextField as NameSelector).vm.$props.value).to.eql(value);
    });
    it('should pass the error prop to the child component', () => {
      const wrapper = mount(TextControl);

      const error = 'myValue';
      wrapper.setProps({ error });
      expect(wrapper.find(VTextField as NameSelector).vm.$props.error).to.eql(error);
    });
    it('should pass the errormessages prop to the child component', () => {
      const wrapper = mount(TextControl);

      const errorMessages = [ 'myValue' ];
      wrapper.setProps({ errorMessages });
      expect(wrapper.find(VTextField as NameSelector).vm.$props.errorMessages).to.eql(errorMessages);
    });
  });

  describe('events', () => {
    it('should emit input event when child emits it', () => {
      const wrapper = mount(TextControl);

      const payload = 'myValue';
      wrapper.find(VTextField as NameSelector).vm.$emit('input', payload);

      expect(wrapper.emitted().input.length).to.equal(1);
      expect(wrapper.emitted().input[0]).to.eql([payload]);
    });
    it('should emit blur event when child emits it', () => {
      const wrapper = mount(TextControl);

      const payload = 'myValue';
      wrapper.find(VTextField as NameSelector).vm.$emit('blur', payload);

      expect(wrapper.emitted().blur.length).to.equal(1);
      expect(wrapper.emitted().blur[0]).to.eql([payload]);
    });
  });
});
