"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configStore = void 0;

var _react = require("react");

const configStore = () => {
  const [config, setConfig] = (0, _react.useState)();
  const [successFunction, setSuccessFunction] = (0, _react.useState)();
  const [errorFunction, setErrorFunction] = (0, _react.useState)();
  return {
    actions: {
      setConfig,
      setSuccessFunction,
      setErrorFunction
    },
    state: {
      config,
      successFunction,
      errorFunction
    }
  };
};

exports.configStore = configStore;