import { shallowMount, mount } from '@vue/test-utils';
import { expect } from 'chai';

import FormWithValidation from './form-with-validation.vue';
import SingleValueValidator from '../validators/single-value-validator.vue';

describe('FormWithValidation.vue', () => {
  it('should mount the component', () => {
    const wrapper = shallowMount(FormWithValidation);
    // tslint:disable-next-line: no-unused-expression
    expect(wrapper.vm).not.to.be.undefined;
  });

  describe('update()', () => {
    it('should update the validation map with validator vid and error properties', () => {
      const form: FormWithValidation = shallowMount(FormWithValidation).vm;
      const validatorWrapper = mount(SingleValueValidator);
      validatorWrapper.setData({ error: true });

      ( form as any ).update(validatorWrapper.vm);

      const expected = { [( validatorWrapper.vm as any ).vid]: ( validatorWrapper.vm as any ).error };
      expect(form.$data.validationMap).to.eql(expected);
    });
  });

  describe('valid()', () => {
    it('should return true if no errors in validation map', () => {
      const wrapper = shallowMount(FormWithValidation);
      wrapper.setData({ validationMap: { 1: false, 2: false }});

      // tslint:disable-next-line: no-unused-expression
      expect(( wrapper.vm as any).valid).to.be.true;
    });
    it('should return false if there are errors in validation map', () => {
      const wrapper = shallowMount(FormWithValidation);
      wrapper.setData({ validationMap: { 1: false, 2: true }});

      // tslint:disable-next-line: no-unused-expression
      expect(( wrapper.vm as any).valid).to.be.false;
    });
  });
});
