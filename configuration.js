const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "https://ducks-service-m9bg.onrender.com";

function getHost() {
  return mode == 0 ? host_local : host_remote;
}

function isLoggedIn() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

function getTheToken() {
  return localStorage.getItem("token");
}

function saveTheToken(token) {
  localStorage.setItem("token", token);
  updateTheNavigationBar();
}

function removeTheToken() {
  localStorage.removeItem("token");
  updateTheNavigationBar();
}

function addToBasket(order) {
  localStorage.setItem("order", order);
  updateTheNavigationBar();
}
function getTheBasket() {
  return JSON.parse(localStorage.getItem("order"));
}
function removeTheBasket() {
  localStorage.removeItem("order");
  updateTheNavigationBar();
}

let configuration = {
  isLoggedIn: () => isLoggedIn(),
  host: () => getHost(),
  token: () => getTheToken(),
};

updateTheNavigationBar();

async function updateTheNavigationBar() {
  let elementText = document.getElementById("cart-badge");
  if (localStorage.getItem("order") != null) {
    elementText.innerText = "1";
  } else {
    elementText.innerText = "0";
  }
}

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let customer = { email: email, password: password };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  try {
    let response = await fetch(getHost() + "/login", request);
    if (response.status == 200) {
      alert("The login was successful!");
      const token = await response.text();
      saveTheToken(token);
      const id = await fetchID(email);
      console.log(id);
      await storeID(id);
      window.history.go(-1);
    } else {
      console.log(`response status: ${response.txt}`);
      removeTheToken();
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    removeTheToken();
    alert("Something went wrong");
  }
}
async function signup() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let customer = { email: email, password: password };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  try {
    let response = await fetch(getHost() + "/signup", request);
    if (response.status == 200) {
      alert("The registration was successful!");
      const id = await fetchID(email);
      console.log(id);
      await storeID(id);
      window.history.go(-1);
    } else {
      console.log(`response status:${response.status}`);
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
}

async function storeID(id) {
  await localStorage.setItem("id", id);
}

function getStoredId() {
  return localStorage.getItem("id");
}

async function fetchID(email) {
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(getHost() + `/getId/${email}`, request);
  if (response.status == 200) {
    return await response.text();
  } else {
    console.log(`response status: ${response.txt}`);
    alert("Something went wrong!");
  }
}
function storeForm(orderDetails) {
  localStorage.setItem("form", orderDetails);
}
function getForm() {
  return JSON.parse(localStorage.getItem("form"));
}
async function logout() {
  removeTheToken();
}
