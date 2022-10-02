//INDEX
function willAdd() {
  document.getElementById("resultado").innerHTML =
    "We will add these options soon!" + " " + "Thank You.";
}
// SWITCH DARK MODE

const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnSwitch.classList.toggle("active");

  //se guarda modo en localstorage.
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "true");
  } else {
    localStorage.setItem("darkMode", "false");
  }
});

//obtenemos el modo actual en el cual nos encontramos
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  btnSwitch.classList.add("active");
} else {
  document.body.classList.remove("dark");
  btnSwitch.classList.remove("active");
}

// TESTIMONIALS AND RESOURCES

ScrollReveal().reveal(".carousel-inner");
ScrollReveal().reveal(".testimonio1", { delay: 300 });
ScrollReveal().reveal(".testimonio2", { delay: 300 });
ScrollReveal().reveal(".testimonio3", { delay: 300 });

// PRODUCTOS Y CARRITO (PROGRAMS)

let cart = [];
let productsglobal = [];

function setCategoryFilter() {
  fetch("../json/products.json")
    .then((res) => res.json())
    .then((category) => {
      // products = [...productsCopy];
      if (
        category == "Standard" ||
        category == "Medium" ||
        category == "Small"
      ) {
        products = category.filter((item) => item.category == category);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  renderProducts();
}

function renderProducts() {
  fetch("../json/products.json")
    .then((res) => res.json())
    .then((products) => {
      productsglobal = products;
      let html = "";
      for (let i = 0; i < products.length; i++) {
        html =
          html +
          `<div class ="d-flex justify-content-center">
      <div class="card bg-dark text-white " style="width: 42rem; text-align:center">
        <img src="${products[i].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${products[i].name}</h5>
          <p class="card-text">${products[i].info}</p>
        </div>
        <ul id="ulrender" class="list-group list-group-flush ">
          <li class="list-group-item bg-dark text-white ">Trading Period: ${
            products[i].duration
          } </li>
          <li class="list-group-item bg-dark text-white ">${
            products[i].category
          }</li>
          <li class="list-group-item bg-dark text-white"> U$D ${
            products[i].price
          }</li>
        </ul>
        <div class="card-body">
        <div class="col text-white bg-dark"><a onclick='addToCart(${JSON.stringify(
          products[i]
        )});' class="btn btn-success">Add to Cart 🛒</a></div>
        </div>
      </div>
      </div> `;
      }
      document.getElementById("div-products").innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}

function setCategoryFilter() {
  fetch("../json/products.json")
    .then((res) => res.json())
    .then((category) => {
      // products = [...productsCopy];
      if (
        category == "Standard" ||
        category == "Medium" ||
        category == "Small"
      ) {
        productsglobal = productsglobal.filter(
          (item) => item.category == category
        );
      }
    })
    .catch((e) => {
      console.log(e);
    });

  renderProducts();
}

function renderCart() {
  if (cart.length == 0) {
    document.getElementById("div-cart").innerHTML =
      "<h3>The Cart is Currently empty</h3>";
  } else {
    let html = "";
    for (let i = 0; i < cart.length; i++) {
      html =
        html +
        `<div class="cart-flex d-flex justify-content-center">
        <div class="card bg-dark text-white" style="width: 42rem; text-align:center;">
        <img src="${cart[i].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${cart[i].name}</h5>
          <p class="card-text">${cart[i].info}</p>
        </div>
        <ul class="list-group list-group-flush ">
          <li class="list-group-item bg-dark text-white ">Trading Period: ${cart[i].duration} </li>
          <li class="list-group-item bg-dark text-white ">${cart[i].category}</li>
          <li class="list-group-item bg-dark text-white "> U$D ${cart[i].price}</li>
        </ul>
        <div class="card-body">
        <div class="col text-white bg-dark"><a onclick='removeFromCart(${i});' class="btn btn-danger">Remove from Cart 🗑️</a></div>
        </div>
      </div>
      </div>
     `;
    }
    html =
      html +
      ` <div id="fondoBotonDePago" class="col text-white "><a onclick='checkout(); redirect();' class="btn btn-primary">Procced With Payment💳</a></div>`;
    document.getElementById("div-cart").innerHTML = html;
  }
}

function addToCart(product) {
  // const foundProduct = products.find((item) => item.id == id);
  // cart.push(foundProduct);
  // renderCart();
  // const foundProduct = products.find((item) => item.id == id);
  cart.push(product);
  renderCart();
}

function removeFromCart(id) {
  cart.splice(id, 1);
  renderCart();
}

renderProducts();

function checkout() {
  let timerInterval;
  Swal.fire({
    title: "You are just one step away!",
    html: "You will be redirected to our checkout page in <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}

function redirect() {
  setTimeout(function () {
    window.open("Pages/Checkout.html", "_blank");
  }, 2000);
}
// window.location.href = ""

// HELP

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
