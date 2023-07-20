
function validator(options) {

  //HAM THUC HIEN VALIDATE
  function validate (inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
    var errorMessage = rule.test(inputElement.value);

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add('invalid');
    } else {
      errorElement.innerText = '';
      inputElement.parentElement.classList.remove('invalid');
    }
  }

  //LAY ELEMENT CUA FORM CAN VALIDATE
  var formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        // Logic in case of user blur out of input
        inputElement.onblur = function () {
          //get value by inputElement.value
          //Check error by test function: rule.test (argument is value of inputElement)
          validate(inputElement, rule);
        }

        //Logic in case of user enter in input form
        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid');
        }
      }
    });
  }
}

//Rules define:
//1. Error: return error message
//2. Valid: No return (undefined)
validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
        return value.trim() ? undefined : "Please enter this information";
    }
  }
}

validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Check email type
        return regex.test(value) ? undefined : "Please enter your email";
    }
  }
}

validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : `Please enter minimum ${min} word`;
    }
  }
}

