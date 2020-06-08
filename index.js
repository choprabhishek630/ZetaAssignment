const App = (function() {
  function start() {
    let root = document.getElementById("root");
    root.innerHTML = '<my-app></my-app>';
  }


  function defineComponents() {
    customElements.define("my-app", MyAppComponent);
    customElements.define("my-employees", MyEmployeesComponent);
    customElements.define("my-view-employee", ViewEmployeeComponent);
    customElements.define("my-create-employee", CreateEmployeeComponent)
    customElements.define("my-header", MyHeaderComponent);
    customElements.define("my-custom-input", CustomTextInputComponent);
    customElements.define('my-date-input', CustomDateInputComponent)
  }

  defineComponents();

  return {
    start: start
  }
})();


var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
var phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}[\s.-]\d{7}$/;
var firstNameRegex = /^[a-zA-Z]{3,20}$/;
console.log(firstNameRegex.test('asaj'));
console.log(phoneRegex.test("008-1234567"));







window.addEventListener('DOMContentLoaded', (event) => {
    App.start();
});