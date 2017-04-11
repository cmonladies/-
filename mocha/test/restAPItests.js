const request = require("request");

const expect = require('chai').expect;
const assert = require('chai').assert;


describe("Блок теста REST-API", () => {



  before(function(done) {

    this.timeout(15000);
    require('../api/restAPI.js');
    done();
  });

  it("Добавит нового пользователя и вернет его id, равный длине списка, увеличенной на 1", (done) => {

    request.post({
      url: 'http://localhost:1335/apiCRUD/users/',
      form:  {name: 'test', score: 777}
      },
      (err, response) => {

        let checkId = JSON.parse(response.body).id;
        let checkCtatusCode = response.statusCode;

        assert.equal(checkCtatusCode, 200);
        assert.equal('5', checkId);
        done();
    });
  });

  it("Добавит нового пользователя и вернет его имя", (done) => {

    request.post({
      url: 'http://localhost:1335/apiCRUD/users/',
      form:  {name: 'test', score: 777}
      },
      (err, response) => {

        let checkName = JSON.parse(response.body).name;
        let checkCtatusCode = response.statusCode;

        assert.equal(checkCtatusCode, 200);
        assert.equal('test', checkName);
        done();
    });
  });

  it("Добавит пользователя с избыточными параметрами, при этом сервер проигнорирует их", (done) => {

    request.post({
      url: 'http://localhost:1335/apiCRUD/users/',
      form:  {name: 'test', score: 777, newParam: 'testParam'}
      },
      (err, response) => {

        let checkCtatusCode = response.statusCode;
        let checkUser = JSON.parse(response.body);

        assert.equal(checkCtatusCode, 200);
        assert.notProperty(checkUser, 'testParam');
        done();
    });
  });




  it("Удалит пользователя и вернет сообщение 'user deleted'", (done) => {

    request.delete('http://localhost:1335/apiCRUD/users/1', (err, response) => {

      let checkCtatusCode = response.statusCode;
      let checkText = response.body;

      assert.equal(checkCtatusCode, 200);
      assert.equal('user deleted', checkText);
      done();
    });

  });

  it("Попытается удалить пользователя по id, которого нет на сервере. Вернет сообщение об ошибке 'user not found'", (done) => {

    request.delete('http://localhost:1335/apiCRUD/users/777', (err, response) => {

      let checkCtatusCode = response.statusCode;
      let checkText = response.body;


      assert.equal(checkCtatusCode, 282);
      assert.equal('user not found', checkText);
      done();
    });

  });

});