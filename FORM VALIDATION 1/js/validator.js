
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
      return function (value) {
        return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
      }
    },

    max: function (max) {
      return function (value) {
        return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự`;
      }
    },
  }

  //Lay ra form element trong DOM theo 'formSelector'
  var formElement = document.querySelector(formSelector);

  //Chi xu ly khi co element trong DOM
  if (formElement) {
    var inputs = formElement.querySelectorAll('[name][rules]');
    for (var input of inputs) {
      var rules = input.getAttribute('rules').split('|');
      for (var rule of rules) {

        var ruleInfo;
        var isRuleHasValue = rule.includes(':');

        if (isRuleHasValue) {
          ruleInfo = rule.split(':');
          rule = ruleInfo[0];
        }
        var ruleFunc = validatorRules[rule];

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }
    }
    console.log(formRules);
  }
}
