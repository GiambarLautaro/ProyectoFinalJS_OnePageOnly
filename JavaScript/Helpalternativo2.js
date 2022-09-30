let nameError = document.getElementById("name-error");
let phoneError = document.getElementById("phone-error");
let emailError = document.getElementById("email-error");
let messageError = document.getElementById("message-error");
let submitError = document.getElementById("submit-error");

function validateName() {
  let name = document.getElementById("contact-name").value;

  if (name.lenght == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write Full Name";
    return false;
  }
  nameError.innerHTML = "OK";
  return true;
}

function validatePhone() {
  let phone = document.getElementById("contact-phone").value;

  if (phone.lenght == 0) {
    phoneError.innerHTML = "Phone number is required";
    return false;
  }

  if (phone.lenght < 13) {
    phoneError.innerHTML = "At least 13 digits ";
    return false;
  }

  if (!phone.match(/^[0-9]{13}$/)) {
    phoneError.innerHTML = "only digits please";
    return false;
  }

  phoneError.innerHTML = "valid";
  return true;
}

function validateEmail() {
  let email = document.getElementById("contact-email").value;

  if (email.lenght == 0) {
    emailError.innerHTML = "Email is required";
    return false;
  }

  if (!email.match(/^[A-Za-z]\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.innerHTML = "Email Invalid";
    return false;
  }

  emailError.innerHTML = "Ok";
  return true;
}

function validateMessage() {
  let message = document.getElementById("contact-message").value;
  let required = 30;
  let left = required - message.lenght;

  if (left > 0) {
    messageError.innerHTML = left + "more characters required";
    return false;
  }

  messageError.innerHTML = "Ok";
  return true;
}

function validateForm() {
  if (
    !validateName() ||
    !validateForm() ||
    !validateEmail() ||
    !validateMessage()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix errror to submit";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
}
