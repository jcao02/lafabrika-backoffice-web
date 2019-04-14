import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

import theme from './lafabrika-theme';


Vue.use(Vuetify, {
  iconfont: 'md',
  theme
});
