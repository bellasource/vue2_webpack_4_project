import request from '@src/utils/axios';
export default {
  /* 示例 */
  example1: (args) =>
    request({
      method: 'GET',
      url: '/test/get-data',
      params: args,
    }),
  example2: () =>
    request({
      method: 'GET',
      url: '/test/get-data1',
    }),
};
