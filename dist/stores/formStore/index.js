"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formStore = require("./formStore");

Object.keys(_formStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formStore[key];
    }
  });
});