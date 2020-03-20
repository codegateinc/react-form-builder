"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEvents = void 0;

var _useBlur = require("./useBlur");

var _useChange = require("./useChange");

const useEvents = () => {
  const {
    onInputBlur
  } = (0, _useBlur.useBlur)();
  const {
    onInputChange,
    onCheckboxChange,
    onPickerChange
  } = (0, _useChange.useChange)();
  return {
    input: {
      onBlur: onInputBlur,
      onChange: onInputChange
    },
    checkBox: {
      onChange: onCheckboxChange
    },
    picker: {
      onChange: onPickerChange
    }
  };
};

exports.useEvents = useEvents;