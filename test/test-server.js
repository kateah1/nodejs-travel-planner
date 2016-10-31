var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('nodejs-travel-planner', function () {
  it('should list ALL trips on / GET', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  it('should add a SINGLE blob on / POST', function (done) {
    chai.request(server)
      .post('/')
      .send({'id': 101, 'name': 'test', 'destination': 'test', 'startDate': 'test', 'endDate': 'test'})
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });
  it('should list a SINGLE trip on /:id GET', function (done) {
    chai.request(server)
      .get('/101')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should update a SINGLE trip on /:id PUT', function (done) {
    chai.request(server)
      .put('/101')
      .send({'name': 'change', 'destination': 'change', 'startDate': 'change', 'endDate': 'change'})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should delete a SINGLE trip on /:id DELETE', function (done) {
    chai.request(server)
      .delete('/101')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
});
