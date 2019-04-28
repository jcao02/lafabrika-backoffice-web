<template>
<div class="admin">
  <!-- Children routes -->
  <router-view/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Admin extends Vue {}
</script>

<style>
.admin {
  flex-grow: 1;
}
</style>
