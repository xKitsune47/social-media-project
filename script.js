"use strict";

const loginRegisterButton = document.querySelector(".login__btn");
const loginRegisterSwap = document.querySelector(".register__swap__btn");

const labelSign = document.querySelector(".login__register__form__label");
const labelChangeSign = document.querySelector(".login__register__swap__label");

const appLoginPage = document.querySelector(".starter");
const appPage = document.querySelector(".app");

const inputUsername = document.querySelector(".login__register__username");
const inputPassword = document.querySelector(".login__register__password");

const accounts = [
    {
        username: "fc",
        passwd: "1",
    },
    {
        username: "lc",
        passwd: "2",
    },
    {
        username: "oc",
        passwd: "3",
    },
    {
        username: "ac",
        passwd: "4",
    },
];

const posts = [
    {
        post_id: 1,
        text: "",
        image: "",
    },
];

// changing between login and register function
const changeType = function (swap) {
    if (swap) {
        labelSign.innerHTML = `<h2>Sign Up<h2>`;
        loginRegisterButton.textContent = `Sign Up`;
        labelChangeSign.textContent = `Have an account? Sign in here`;
        loginRegisterSwap.textContent = `Sign in here`;
    } else {
        labelSign.innerHTML = `<h2>Sign In<h2>`;
        loginRegisterButton.textContent = `Sign In`;
        labelChangeSign.textContent = `Don't have an account yet?`;
        loginRegisterSwap.textContent = `Sign up here`;
    }
};

// check user function
const checkUser = function (user, password) {
    currentAccount = accounts.find((acc) => acc.username === user);
    if (currentAccount?.passwd === password) {
        console.log("logged in");
        appLoginPage.style.opacity = 0;
        appPage.style.opacity = 1;
    } else {
        alert("username or password are incorrect");
    }
};

// create user function
const createUser = function (user, password) {
    if (
        inputUsername.value &&
        inputPassword.value &&
        !accounts.find((acc) => acc.username === user)
    ) {
        accounts.push({
            username: user,
            passwd: password,
        });
        inputPassword.value = inputUsername.value = "";
    }
    changeType(!swapState);
    swapState = !swapState;
};

// swapping login to register & register to login
let swapState = false;
loginRegisterSwap.addEventListener("click", function () {
    changeType(!swapState);
    swapState = !swapState;
    inputPassword.value = inputUsername.value = "";
});

// login button
let currentAccount;
loginRegisterButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (swapState === false && inputUsername.value && inputPassword.value) {
        checkUser(inputUsername.value, inputPassword.value);
        inputPassword.value = inputUsername.value = "";
    } else if (swapState === true) {
        createUser(inputUsername.value, inputPassword.value);
    }
});

// TO REMOVE LATER
// currentAccount = accounts[1];
// appLoginPage.style.opacity = 0;
// appPage.style.opacity = 1;
// TO REMOVE LATER
