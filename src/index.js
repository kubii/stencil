'use strict';

Object.defineProperties(module.exports, {

  build: {
    get: function() {
      var compiler = require('./compiler/index');
      return compiler.build;
    }
  },

  createRenderer: {
    get: function() {
      var server = require('./server/index');
      return server.createRenderer;
    }
  },

  Component: {
    value: require('./testing/index').Component
  },

  Prop: {
    value: require('./testing/index').Prop
  },

  PropWillChange: {
    value: require('./testing/index').PropWillChange
  },

  PropDidChange: {
    value: require('./testing/index').PropDidChange
  },

  State: {
    value: require('./testing/index').State
  },

  Element: {
    value: require('./testing/index').Element
  }

});