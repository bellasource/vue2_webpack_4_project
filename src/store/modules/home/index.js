import API from '@src/api';
import types from './types';

const example = {
  namespaced: true,
  state: {
    msg: '',
  },
  mutations: {
    [types.SET_MSG](state, payload) {
      state.msg = payload;
    },
  },
  actions: {
    getMsg({ commit }, params) {
      API.home.example1(params).then((data) => commit(types.SET_MSG, data.msg));
    },
  },
  getters: {},
};

export default example;
