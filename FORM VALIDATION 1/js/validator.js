
function Validator(formSelector) {
  var formRules = {};

  /** Quy uoc tao rule:
   * Neu co loi thi return errorMessage
   * Neu khong co loi thi return 'undefined'
   */

  var validatorRules = {
    required: function (value) {

    }
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
