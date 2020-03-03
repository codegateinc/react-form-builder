"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useEvents = require("./useEvents");

Object.keys(_useEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useEvents[key];
    }
  });
});

var _useForm = require("./useForm");

Object.keys(_useForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useForm[key];
    }
  });
});