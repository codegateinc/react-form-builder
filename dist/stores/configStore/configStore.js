"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configStore = void 0;

var _react = require("react");

const configStore = () => {
  const [configStore, setConfig] = (0, _react.useState)({});
  return {
    actions: {
      setConfig: (key, newConfig) => setConfig(prevState => ({ ...prevState,
        [key]: newConfig
      })),
      clearConfigStore: formKey => setConfig(prevState => ({ ...prevState,
        [formKey]: {}
      }))
    },
    state: {
      configStore
    }
  };
};

exports.configStore = configStore;