<template>
  <v-container>
    <v-layout row justify-center align-content-center>
      <v-flex xs5>
        <UserList :users="users" />
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-card>
          <v-img width="100%" :src="require('@/assets/meninas.jpg')"></v-img>
          <v-card-title primary-title>
            <h1>Panel de Usuarios</h1>
          </v-card-title>
          <v-card-text>
            En este panel podrás ver un listado de los usuarios del sistema.
            A través de este listado podrás administrar los usuarios: crear nuevos usuarios, modificar
            e incluso eliminar existentes.
          </v-card-text>
          <v-card-text>
            Esto es únicamente visible para los administradores
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Mutation, Getter } from 'vuex-class';

import { UserList } from '../components';
import { UserListManager } from '../mixins';

import { User } from '@/modules/shared/classes/resources/user';
import { ADD_USERS, AddUsersPayload } from '@/modules/store/data-store/mutations';

@Component({
  components: {
    UserList
  }
})
export default class UserPanel extends mixins(UserListManager) {
  @Getter('getAllUsers') users!: User[];
  @Mutation(ADD_USERS) addUsers!: (payload: AddUsersPayload) => void;

  async created() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const limit = 12;
      const offset = 0;
      const response = await this.getUsers({ params: { limit, offset }, baseURL: process.env.VUE_APP_USERS_BASE_URL});
      this.addUsers({ users: response.data });
    } catch (err) {
      this.$toast.error('Hubo un error. Intenta más tarde');
    }
  }
}
</script>
