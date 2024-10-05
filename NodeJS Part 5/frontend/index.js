import "./index.scss";
import axios from "axios";

import * as animation from "./src/animation";
import * as utils from "./src/utils";

import {
  loginBtn,
  registerBtn,
  username,
  password,
  new_username,
  password_one,
  password_two,
  signOutBtn,
  welcomeUsername,
  toRegisterBtn,
  toLoginBtn,
} from "./src/dom";

const backendPath = import.meta.env.VITE_BACKEND_PATH;

loginBtn.addEventListener("click", login);
registerBtn.addEventListener("click", register);
signOutBtn.addEventListener("click", signOut);

async function login(event) {
  event.preventDefault();
  if (utils.checkInputEmpty([username, password])) {
    animation.showError();
    return;
  }

  try {
    const response = await axios
      .post(`${backendPath}/api/login`, {
        username: username.value,
        password: password.value,
      })
      .then((res) => res.data);

    if (response.code === 0) {
      welcomeUsername.textContent = username.value;
      utils.clearDomValue([username, password]);
      animation.showCorrect();
      animation.LoginToWelcome();
      response.token &&
        localStorage.setItem("token", response.token);
    }

    console.log(response);
  } catch (err) {
    console.log(err?.response?.data);
    const code = err?.response?.data?.code;

    switch (code) {
      case 1:
        animation.showError();
        break;
      case 2:
        animation.showUnknown();
        break;
      default:
        animation.showUnknown();
        break;
    }
  }
}

async function register(event) {
  event.preventDefault();
  if (
    utils.checkInputEmpty([
      new_username,
      password_one,
      password_two,
    ])
  ) {
    animation.showError();
    return;
  } else if (password_one.value !== password_two.value) {
    animation.showError();
    return;
  } else {
    let errResponse = null;
    const response = await axios
      .post(`${backendPath}/api/register`, {
        username: new_username.value,
        password: password_one.value,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err?.response?.data);
        errResponse = err?.response?.data;
      });

    switch (Number(response?.code || errResponse?.code)) {
      case 0:
        animation.showCorrect();
        utils.clearDomValue([
          new_username,
          password_one,
          password_two,
        ]);
        animation.RegisterToLogin();
        break;
      case 1:
        console.log("username already exist");
        animation.showUnknown();
        break;
      case 2:
        animation.showError();
        break;
      default:
        animation.showUnknown();
        break;
    }
  }
}

async function signOut(event) {
  event.preventDefault();
  utils.clearDomValue([
    username,
    password,
    welcomeUsername,
  ]);
  animation.WelcomeToLogin();
  localStorage.removeItem("token");
}

toRegisterBtn.addEventListener(
  "click",
  animation.LoginToRegister
);
toLoginBtn.addEventListener(
  "click",
  animation.RegisterToLogin
);

async function checkToken() {
  const token = localStorage.getItem("token");
  if (!token) return;

  // 此处为重点，一定要加上请求头
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios
      .post(
        `${backendPath}/api/loginToken`,
        { test: "hello" },
        configuration
      )
      .then((res) => res.data);

    if (response.code === 0) {
      welcomeUsername.textContent = response.user.username;
      animation.LoginToWelcome();
      response.token &&
        localStorage.setItem("token", response.token);
    }
  } catch (err) {
    console.log(err);
  }
}

checkToken();
