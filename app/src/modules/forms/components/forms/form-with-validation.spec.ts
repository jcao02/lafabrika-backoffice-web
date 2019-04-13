import { shallowMount, mount } from '@vue/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

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

      const expected = { [( validatorWrapper.vm as any ).vid]: validatorWrapper.vm };
      expect(form.$data.validatorsMap).to.eql(expected);
    });
  });

  describe('valid()', () => {
    it('should return true if no errors in validation map', () => {
      const wrapper = shallowMount(FormWithValidation);
      wrapper.setData({ validatorsMap: { 1: { error: false }, 2: { error: false } }});

      // tslint:disable-next-line: no-unused-expression
      expect(( wrapper.vm as any).valid).to.be.true;
    });
    it('should return false if there are errors in validation map', () => {
      const wrapper = shallowMount(FormWithValidation);
      wrapper.setData({ validatorsMap: { 1: { error: false }, 2: { error: true } }});

      // tslint:disable-next-line: no-unused-expression
      expect(( wrapper.vm as any).valid).to.be.false;
    });
  });

  describe('validate()', () => {
    it('should call validate in all inner validators and return result', () => {
      const vid = 1;
      const validate = sinon.stub();
      const error = false;
      const validator: SingleValueValidator = shallowMount(SingleValueValidator, {
        data: () => ({ vid, error }),
        methods: { validate }
      }).vm;
      const form: FormWithValidation = shallowMount(FormWithValidation, {
        data: () => ({ validatorsMap: { [vid]: validator} }
      )}).vm;

      const expected = !error;
      const result = ( form as any ).validate();
      expect(result).to.eql(expected);
      // tslint:disable-next-line: no-unused-expression
      expect(validate.called).to.be.true;
    });
  });
});
