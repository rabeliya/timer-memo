import Vue from 'vue'
import Vuetify from 'vuetify'
import StorageMock from '@/test/mock/Storage';

// Vuetify
Vue.use(Vuetify)

// LocalStorage
global.localStorage = new StorageMock();

// window confirm
global.confirm = () => true