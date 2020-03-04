"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _outstated = require("outstated");

var _stores = require("./stores");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FormProvider = ({
  children
}) => <_outstated.Provider stores={_stores.formBuilderStores}>
        {children}
    </_outstated.Provider>;

exports.FormProvider = FormProvider;