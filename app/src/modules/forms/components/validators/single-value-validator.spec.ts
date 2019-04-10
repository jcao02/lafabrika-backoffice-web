import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';

import SingleValueValidator from './single-value-validator.vue';
import { RequiredValidator } from '../../classes/validators/required-validator';
import { RequiredValidationError } from '../../classes/errors/required-validation-error';

describe('SingleValueValidator.vue', () => {
  it('should mount the component', () => {
    const wrapper = shallowMount(SingleValueValidator);
    // tslint:disable-next-line: no-unused-expression
    expect(wrapper.vm).not.to.be.undefined;
  });

  describe('slot', () => {
    it('should render a slot within a span', () => {
      const slot = '<input type="text">';
      const wrapper = shallowMount(SingleValueValidator, {
        slots: { default: slot }
      });

      expect(wrapper.html()).to.equal(`<span>${slot}</span>`);
    });
    it('should pass error, errorMessages and validatefn to scoped-slot', () => {
      const parent = {
        name: 'validator-parent',
        template: `
          <SingleValueValidator v-slot="slotProps">
            {{ slotProps.error }} {{ slotProps.errorMessages }} {{ slotProps.validatefn }}
          </SingleValueValidator>
        `,
        components: { SingleValueValidator }
      };

      const wrapper = mount(parent);
      const child = wrapper.find(SingleValueValidator).vm;
      expect(wrapper.html()).to.contain(`${child.$data.error}`);
      expect(wrapper.html()).to.contain(`${child.$data.errorMessages}`);
      expect(wrapper.html()).to.contain(`${( child as any ).validate}`);
    });
  });

  describe('validate()', () => {
    const controlState = {
      touched: true,
      dirty: true,
      value: 'myValue'
    };
    it('should set errors to false and empty messages when no validators', () => {
      const wrapper = mount(SingleValueValidator);
      wrapper.setProps({ validators: [] });

      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.$data.error).to.be.false;
      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.$data.errorMessages).to.be.empty;
    });
    it('should set error and messages when validation is not passed', () => {
      const validator = new RequiredValidator();
      const error = new RequiredValidationError();
      const errorsDictionary = { [error.name]: 'My Error' };
      const wrapper = mount(SingleValueValidator);
      wrapper.setProps({ validators: [validator], errorsDictionary });

      const value = '';
      wrapper.setData({ controlState: { ...controlState, value } });
      ( wrapper.vm as any ).validate(value);

      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.$data.error).to.be.true;
      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.$data.errorMessages).to.eql([errorsDictionary[error.name]]);
    });
    it('should set error to false and empty messages when validation is passed', () => {
      const validator = new RequiredValidator();
      const error = new RequiredValidationError();
      const errorsDictionary = { [error.name]: 'My Error' };
      const wrapper = mount(SingleValueValidator);
      wrapper.setProps({ validators: [validator], errorsDictionary });
      wrapper.setData({ controlState });


      const value = 'some value';
      ( wrapper.vm as any ).validate(value);

      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.$data.error).to.be.false;
      // tslint:disable-next-line: no-unused-expression
      expect(wrapper.vm.$data.errorMessages).to.be.empty;
    });
  });
});
