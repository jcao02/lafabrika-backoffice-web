<template>
 <v-navigation-drawer permanent absolute>
  <v-toolbar flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">
          La Fábrika
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>

  <v-divider></v-divider>

  <v-list>
    <v-list-tile to="/">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>Inicio</v-list-tile-title>
    </v-list-tile>

    <!-- Users section -->
    <v-list-group prepend-icon="account_circle" value="true">
      <template v-slot:activator>
        <v-list-tile>
          <v-list-tile-title>Usuarios</v-list-tile-title>
        </v-list-tile>
      </template>

      <!-- Admin section -->
      <v-list-group no-action sub-group value="true" v-if="isAdmin" >

        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile class="menu-item" v-for="(admin, i) in admins" :key="i" :to="admin[2]">
          <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>

      </v-list-group>
      <!-- End Admin Section -->

    </v-list-group>
    <!-- End Users Section -->

  </v-list>


 </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class NavigationDrawer extends Vue {
  @Prop() isAdmin!: boolean;

  admins = [
    ['Añadir Usuario', 'add', '/admin/users/new'],
    ['Lista de Usuarios', 'people_outline', '/admin']
  ];
}
</script>

<style>

.menu-item {
  cursor: pointer;
}

</style>

