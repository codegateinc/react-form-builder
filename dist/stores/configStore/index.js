"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configStore = require("./configStore");

Object.keys(_configStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _configStore[key];
    }
  });
});