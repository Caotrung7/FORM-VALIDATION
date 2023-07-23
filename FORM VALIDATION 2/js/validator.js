
function Validator(formSelector) {
  var formRules = {};

  /** Quy uoc tao rule:
   * Neu co loi thi return errorMessage
   * Neu khong co loi thi return 'undefined'
   */

  var validatorRules = {
    required: function (value) {
      return value ? undefined : 'Vui lòng nhập trường này';
    },

    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Check email type
      return regex.test(value) ? undefined : 'Vui lòng nhập email';
    },

    min: function (min) {
      return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
    },

    max: function (max) {
      return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự`;
    },
  }

  //Lay ra form element trong DOM theo 'formSelector'
  var formElement = document.querySelector(formSelector);

  //Chi xu ly khi co element trong DOM
  if (formElement) {
    var inputs = formElement.querySelectorAll('[name][rules]');
    for (var input of inputs) {
      formRules[input.name] = input.getAttribute('rules');
    }
    console.log(formRules);
  }
}
