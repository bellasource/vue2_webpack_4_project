import request from '@src/utils/axios';

export default {
  /* 示例 */
  example1: (args) =>
    request({
      method: 'GET',
      url: '/api/query1',
      params: args,
    }),
  example2: (args) =>
    request({
      method: 'GET',
      url: '/api/query2',
      params: args,
    }),
};
