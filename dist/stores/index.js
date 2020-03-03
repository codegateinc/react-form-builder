"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formStore", {
  enumerable: true,
  get: function () {
    return _formStore.formStore;
  }
});
Object.defineProperty(exports, "configStore", {
  enumerable: true,
  get: function () {
    return _configStore.configStore;
  }
});
exports.formBuilderStores = void 0;

var _formStore = require("./formStore");

var _configStore = require("./configStore");

const formBuilderStores = [_configStore.configStore, _formStore.formStore];
exports.formBuilderStores = formBuilderStores;