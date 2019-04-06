<template>
  <v-text-field :value="this.value" @input="this.emitInput"></v-text-field>
</template>

<script lang="ts">
import { AbstractControlComponent } from '../interfaces/abstract-control-component';

export default class TextControl extends AbstractControlComponent {}
</script>