export let FormFieldType;

(function (FormFieldType) {
  FormFieldType[FormFieldType["Input"] = 0] = "Input";
  FormFieldType[FormFieldType["Picker"] = 1] = "Picker";
  FormFieldType[FormFieldType["CheckBox"] = 2] = "CheckBox";
})(FormFieldType || (FormFieldType = {}));