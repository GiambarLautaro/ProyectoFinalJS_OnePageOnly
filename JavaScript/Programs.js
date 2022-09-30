let products = [
  {
    id: 0,
    duration: "6 months",
    name: "Instant Funding ",
    price: 600,
    categogy: "Standard",
    img: "https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0040/3221/como-empezar-estudiar-trading.jpg?1603188525",
    info: "The most comfortable way to pass a propietary trading evaluation, no pressure, no second phase exam, just reach target and start trading like a Pro",
  },
  {
    id: 1,
    duration: "3 months",
    name: "To The Moon ",
    price: 2500,
    categogy: "Standard",
    img: "https://bpcdn.co/images/2017/12/24014435/bitcoin-to-the-moon.png",
    info: "info del examen",
  },
  {
    id: 2,
    duration: "12 months",
    name: "Bootcamp ",
    price: 80,
    categogy: "Standard",
    img: "https://inversionesytrading.com/wp-content/uploads/2020/10/bootcamp-fondo6.jpg",
    info: "info del examen",
  },

  {
    id: 3,
    duration: "6 months",
    name: "Instant Funding (M)",
    price: 500,
    categogy: "Medium",
    img: "https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0040/3221/como-empezar-estudiar-trading.jpg?1603188525",
    info: "info del examen",
  },
  {
    id: 4,
    duration: "3 months",
    name: "To The Moon (M)",
    price: 1800,
    categogy: "Medium",
    img: "https://bpcdn.co/images/2017/12/24014435/bitcoin-to-the-moon.png",
    info: "info del examen",
  },
  {
    id: 5,
    duration: "12 months",
    name: "Bootcamp (M)",
    price: 50,
    categogy: "Medium",
    img: "https://inversionesytrading.com/wp-content/uploads/2020/10/bootcamp-fondo6.jpg",
    info: "info del examen",
  },
  {
    id: 6,
    duration: "6 months",
    name: "Instant Funding (S)",
    price: 270,
    categogy: "Small",
    img: "https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0040/3221/como-empezar-estudiar-trading.jpg?1603188525",
    info: "info del examen",
  },
  {
    id: 7,
    duration: "3 months",
    name: "To The Moon (S)",
    price: 1500,
    categogy: "Small",
    img: "https://bpcdn.co/images/2017/12/24014435/bitcoin-to-the-moon.png",
    info: "info del examen",
  },
  {
    id: 8,
    duration: "12 months",
    name: "Bootcamp (S)",
    price: 30,
    categogy: "Small",
    img: "https://inversionesytrading.com/wp-content/uploads/2020/10/bootcamp-fondo6.jpg",
    info: "This is the perfet exam type if you are a begginer in the trading world",
  },
];
const productsCopy = [...products];
let cart = [];

function setCategoryFilter(categogy) {
  products = [...productsCopy];
  if (categogy == "Standard" || categogy == "Medium" || categogy == "Small") {
    products = products.filter((item) => item.categogy == categogy);
  }

  renderProducts();
}

function renderProducts() {
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
        <ul class="list-group list-group-flush ">
          <li class="list-group-item bg-warning">Trading Period: ${products[i].duration} </li>
          <li class="list-group-item bg-warning">${products[i].categogy}</li>
          <li class="list-group-item bg-warning"> U$D ${products[i].price}</li>
        </ul>
        <div class="card-body">
        <div class="col text-white bg-dark"><a onclick='addToCart(${products[i].id});' class="btn btn-success">Add to Cart 🛒</a></div>
        </div>
      </div>
      </div> `;
  }
  document.getElementById("div-products").innerHTML = html;
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
          <li class="list-group-item bg-warning">Trading Period: ${cart[i].duration} </li>
          <li class="list-group-item bg-warning">${cart[i].categogy}</li>
          <li class="list-group-item bg-warning"> U$D ${cart[i].price}</li>
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
      ` <div class="col text-white " style="padding-top:10px; padding-bottom:10px; background-color:#560b47"><a onclick='checkout(); redirect();' class="btn btn-primary">Procced With Payment💳</a></div>`;
    document.getElementById("div-cart").innerHTML = html;
  }
}

function addToCart(id) {
  const foundProduct = products.find((item) => item.id == id);
  cart.push(foundProduct);
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
    window.open("../Pages/Checkout.html", "_blank");
  }, 2000);
}

// window.location.href = ""
