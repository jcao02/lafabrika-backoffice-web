<template>
  <v-list subheader two-line>
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
          <v-list-tile-sub-title v-html="user.role"></v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn class="user-action" flat :to="'/admin/users/edit/' +  user.id">
            <v-icon color="primary">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-btn class="user-action" flat>
            <v-icon color="primary">delete</v-icon>
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
  min-width: 30px;
}
</style>
