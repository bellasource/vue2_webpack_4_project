const delay = require('mocker-api/lib/delay');
const Mock = require('mockjs');

const mockProxy = {
  [`GET /mock/test/get-data`]: (req, res) => {
    return res.json(
      Mock.mock({
        code: 0,
        'data|100': [
          {
            name: '@string("upper", 5)',
            'age|18-55': 19,
            time: '@datetime',
          },
        ],
      })
    );
  },
};
module.exports = delay(mockProxy, 1000);
