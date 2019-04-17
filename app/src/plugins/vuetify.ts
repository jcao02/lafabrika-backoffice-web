import Vue from 'vue';
import Vuetify, { VSnackbar } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar';
import 'vuetify/src/stylus/app.styl';

import theme from './lafabrika-theme';


Vue.use(Vuetify, {
  iconfont: 'md',
  theme,
  components: {
    VSnackbar
  }
});

Vue.use(VuetifyToast, {
  x: 'center',
  y: 'top'
});
