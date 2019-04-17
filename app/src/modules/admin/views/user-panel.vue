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
import { UserList } from '../components';
import { User } from '@/modules/shared/classes/resources/user';

@Component({
  components: {
    UserList
  }
})
export default class UserPanel extends Vue {
  users: User[] = [
    { id: '1', email: 'jon@example.com', role: 'admin' },
    { id: '2', email: 'dan@example.com', role: 'user' }
  ];
}
</script>
