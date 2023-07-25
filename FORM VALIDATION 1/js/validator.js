
function Validator(formSelector) {
  var _this = this;
  var formRules = {};

  function getParentElement(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

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

      //Lang nghe su kien de validate (blur, change, ...)
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

    //ham thuc hien validate
    function handleValidate(e) {
      var rules = formRules[e.target.name];
      var errorMessage;

      for (var rule of rules) {
        errorMessage = rule(e.target.value);
        if (errorMessage) break;
      }

      //Neu co loi thi hien thi loi ra UI
      if (errorMessage) {
        var formGroup = getParentElement(e.target, '.form-group');
        if (formGroup) {
          formGroup.classList.add('invalid');

          var formMessage = formGroup.querySelector('.form-message');
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;
    }

    //HAM clear messageError
    function handleClearError(e) {
      var formGroup = getParentElement(e.target, '.form-group');
      if (formGroup.classList.contains('invalid')) {
        formGroup.classList.remove('invalid');

        var formMessage = formGroup.querySelector('form-message');
        if (formMessage) {
          formMessage.innerText = '';
        }
      }
    }

    //Xu ly hanh vi summit mac dinh
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var inputs = formElement.querySelectorAll('[name][rules]');
      var isValid = true;

      for (var input of inputs) {
        if (!handleValidate({target: input})) {
          isValid = false;
        }
      }

      //Khi khong co loi thi submit form
      if (isValid) {
        if (typeof _this.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]');
          var formValues = Array.from(enableInputs).reduce(function (values, input) {

            switch (input.type) {
              case 'radio':
                values[input.name] = formElement.querySelector('input[name= " ' + input.name + ' "]:checked').value;
                break;

              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = '';
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;

              case 'file':
                values[input.name] = input.files;
                break;

              default:
                values[input.name] = input.value;
            }

            return values;

          }, {});

          //Goi lai ham onSubmit va tra ve kem gia tri cua form dc nhap vao
          _this.onSubmit(formValues);

        } else {
          formElement.submit();
        }
      }
    }
  }
}
