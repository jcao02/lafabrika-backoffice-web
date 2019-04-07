<template>
  <v-text-field
    :error="this.error"
    :error-messages="this.errormessages"
    :value="this.value"
    @input="this.input"
  ></v-text-field>
</template>

<script lang="ts">
import { AbstractControlComponent } from '../interfaces/abstract-control-component';

export default class TextControl extends AbstractControlComponent {}
</script>