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
        liked_posts: [1, 3, 5],
    },
    {
        username: "lc",
        passwd: "2",
        liked_posts: [1, 2, 3],
    },
    {
        username: "oc",
        passwd: "3",
        liked_posts: [2, 3, 4],
    },
    {
        username: "ac",
        passwd: "4",
        liked_posts: [2, 5],
    },
];

const loremPostContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a scelerisque augue. Aliquam erat volutpat. Aliquam erat volutpat. Cras rutrum ipsum vitae erat posuere, a luctus augue lobortis. Sed non lacinia tortor.
`;

const posts = [
    {
        post_id: 1,
        post_creator: "",
        post_date: "",
        text: loremPostContent,
        image: "photo1.avif",
        likes: 0,
    },
    {
        post_id: 2,
        post_creator: "",
        post_date: "",
        text: loremPostContent,
        image: "photo2.avif",
        likes: 0,
    },
    {
        post_id: 3,
        post_creator: "",
        post_date: "",
        text: loremPostContent,
        image: "photo3.avif",
        likes: 0,
    },
    {
        post_id: 4,
        post_creator: "",
        post_date: "",
        text: loremPostContent,
        image: "photo4.avif",
        likes: 0,
    },
    {
        post_id: 5,
        post_creator: "",
        post_date: "",
        text: loremPostContent,
        image: "photo5.avif",
        likes: 0,
    },
];

const dateToday = new Date();

// adding random date to each post (max 7 days ago) and random post creator
posts.forEach((post) => {
    const randomDate = new Date(
        dateToday.getTime() -
            Math.floor(Math.random(0, 1) * 7) * 24 * 60 * 60 * 1000
    );
    const randomUser = Math.floor(Math.random(0, 1) * accounts.length);
    post.post_creator = accounts[randomUser].username;
    post.post_date = randomDate.toISOString();
});

// calculting likes count for each post (spaghetti code innit)
accounts.forEach((acc) => {
    acc.liked_posts.forEach((like) => {
        posts.forEach((post) => {
            if (post.post_id === like) {
                post.likes += 1;
            }
        });
    });
});

console.log(posts);

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

const showPosts = function (acc) {
    posts.forEach((post) => {
        console.log(post);
    });
};

// check user function
const checkUser = function (user, password) {
    currentAccount = accounts.find((acc) => acc.username === user);
    if (currentAccount?.passwd === password) {
        console.log("logged in");
        appLoginPage.style.opacity = 0;
        appPage.style.opacity = 1;
        showPosts(currentAccount);
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
