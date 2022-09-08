/* jslint node: true, sub: true */
/* global describe: false, it: false */
'use strict';

var weather = require('../'),
    expect  = require('chai').expect;

// Tests

describe('weather', function() {

  // find
  describe('find()', function() {
    it('should find a location with weather information', function(done) {
      weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
        if(err) return done(err);

        expect(err).to.be.equal(null);

        expect(result).to.be.a('array');
        expect(result).to.have.property('length').to.be.equal(1);
        expect(result[0]).to.be.a('object');

        expect(result[0]).to.have.property('location').to.be.a('object');
        expect(result[0]['location']).to.have.property('name', 'San Francisco, CA');
        expect(result[0]['location']).to.have.property('lat', '37.777');
        expect(result[0]['location']).to.have.property('long', '-122.42');
        expect(result[0]['location']).to.have.property('timezone').to.be.a('string');
        expect(result[0]['location']).to.have.property('alert').to.be.a('string');
        expect(result[0]['location']).to.have.property('degreetype', 'F');
        expect(result[0]['location']).to.have.property('imagerelativeurl').to.be.a('string');

        expect(result[0]).to.have.property('current').to.be.a('object');
        expect(result[0]['current']).to.have.property('temperature');
        expect(result[0]['current']).to.have.property('temperature');
        expect(result[0]['current']).to.have.property('temperature');
        expect(result[0]['current']).to.have.property('skycode');
        expect(result[0]['current']).to.have.property('skytext');
        expect(result[0]['current']).to.have.property('date');
        expect(result[0]['current']).to.have.property('observationtime');
        expect(result[0]['current']).to.have.property('observationpoint');
        expect(result[0]['current']).to.have.property('feelslike');
        expect(result[0]['current']).to.have.property('humidity');
        expect(result[0]['current']).to.have.property('winddisplay');
        expect(result[0]['current']).to.have.property('day');
        expect(result[0]['current']).to.have.property('shortday');
        expect(result[0]['current']).to.have.property('windspeed');
        expect(result[0]['current']).to.have.property('imageUrl');

        expect(result[0]).to.have.property('forecast').to.be.a('array');
        expect(result[0]['forecast']).to.have.property('length').to.be.above(0);
        expect(result[0]['forecast'][0]).to.be.a('object');
        expect(result[0]['forecast'][0]).to.have.property('low');
        expect(result[0]['forecast'][0]).to.have.property('high');
        expect(result[0]['forecast'][0]).to.have.property('skycodeday');
        expect(result[0]['forecast'][0]).to.have.property('skytextday');
        expect(result[0]['forecast'][0]).to.have.property('date');
        expect(result[0]['forecast'][0]).to.have.property('day');
        expect(result[0]['forecast'][0]).to.have.property('shortday');
        expect(result[0]['forecast'][0]).to.have.property('precip');

        done();
      });
    });

    it('should find multiple locations with weather information', function(done) {
      weather.find({search: 'Washington', degreeType: 'F'}, function(err, result) {
        if(err) return done(err);

        expect(err).to.be.equal(null);
        expect(result).to.be.a('array');
        expect(result).to.have.property('length').to.be.above(1);
        done();
      });
    });

    it('should fail to find a location (missing options)', function(done) {
      weather.find(null, function(err, result) {
        if(!err) return done('No error!');

        expect(result).to.be.equal(undefined);
        done();
      });
    });

    it('should not return any address (bad address)', function(done) {
      weather.find({search: '.'}, function(err, result) {
        if(err) return done(err);

        expect(err).to.be.equal(null);
        expect(result).to.be.a('array');
        expect(result).to.have.property('length').to.be.equal(0);
        done();
      });
    });
  });

});