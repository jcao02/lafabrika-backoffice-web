<template>
  <v-text-field :value="this.value" @input="this.emitInput"></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AbstractControl } from '../interfaces/abstract-control';

export default class TextControl extends AbstractControl {}
</script>