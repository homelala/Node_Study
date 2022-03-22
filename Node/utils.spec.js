const utils = require('./utils.js');
const should = require('should');

describe('utils.js모듈의 capitialize 함수는', () => {
  it('문자열의 첫번째 문자를 대문자로 변환한다.', () => {
    let result = utils.capitialize('hello');
    result.should.be.equal('Hello');
  });
});
