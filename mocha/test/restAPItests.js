const request = require("request");

const expect = require('chai').expect;
const assert = require('chai').assert;


describe("Блок теста REST-API", () => {



  before(function(done) {

    this.timeout(15000);
    require('../api/restAPI.js');
    done();
  });

  it("POST /user/ - проверка итерации id", (done) => {

    request.post({
      url: 'http://localhost:1335/apiCRUD/users/',
      form:  {name: 'test', score: 777}
      },
      (err, response) => {
        assert.equal(response.statusCode, 200);
        assert.equal('5', JSON.parse(response.body).id);
        done();
    });
  });

  it("POST /user/ - проверка соответствия заданному имени", (done) => {

    request.post({
      url: 'http://localhost:1335/apiCRUD/users/',
      form:  {name: 'test', score: 777}
      },
      (err, response) => {
        assert.equal(response.statusCode, 200);
        assert.equal('test', JSON.parse(response.body).name);
        done();
    });
  });

  it("POST /user/ - добавление пользователя с лишними параметрами, ожидаем что API их проигнорирует", (done) => {

    request.post({
      url: 'http://localhost:1335/apiCRUD/users/',
      form:  {name: 'test', score: 777, newParam: 'testParam'}
      },
      (err, response) => {
        assert.equal(response.statusCode, 200);
        assert.notProperty(JSON.parse(response.body), 'testParam');
        done();
    });
  });




  it("DELETE /user/:id Ожидаем сообщения с подтверждением удаления", (done) => {

    request.delete('http://localhost:1335/apiCRUD/users/1', (err, response) => {
      assert.equal(response.statusCode, 200);
      assert.equal('user deleted', (response.body));
      done();
    });

  });

  it("DELETE /user/:id Передаем id, которого нет в списке", (done) => {

    request.delete('http://localhost:1335/apiCRUD/users/777', (err, response) => {
      assert.equal(response.statusCode, 282);
      assert.equal('user not found', (response.body));
      done();
    });

  });

});