import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    home,
  },
});

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./modules/home'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    // 加载新模块
    store.hotUpdate({
      modules: {
        home: require('./modules/home').default,
      },
    });
  });
}

export default store;
