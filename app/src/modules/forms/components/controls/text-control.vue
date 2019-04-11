<template>
  <v-text-field
    :error="error"
    :error-messages="errorMessages"
    :value="value"
    :label="label"
    :type="type"
    :placeholder="placeholder"
    @input="input"
    @blur="blur"
  ></v-text-field>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { AbstractControlComponent } from './abstract-control-component';

@Component
export default class TextControl extends AbstractControlComponent {}
</script>