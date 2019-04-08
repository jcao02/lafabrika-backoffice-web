<template>
  <v-text-field
    :error="error"
    :error-messages="errorMessages"
    :value="value"
    @input="input"
    @blur="blur"
  ></v-text-field>
</template>

<script lang="ts">
import { AbstractControlComponent } from './abstract-control-component';

export default class TextControl extends AbstractControlComponent {}
</script>