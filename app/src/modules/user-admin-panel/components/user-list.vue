<template>
  <v-list subheader>
    <v-subheader>Todos los usuarios</v-subheader>

    <template v-for="( user, index ) in users">
      <v-list-tile
        :key="user.email"
        avatar
      >
        <v-list-tile-avatar>
          <v-icon class="account_circle">account_circle</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.email"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn flat :to="'/admin/users/edit/' +  user.id">
            <v-icon class="user-action" color="primary">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider :key="index"></v-divider>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/modules/shared/classes/resources/user';

@Component
export default class UserList extends Vue {
  @Prop() users!: User[];
}
</script>

<style>
.user-action {
  cursor: pointer;
}
</style>
