"use strict";

const loginRegisterButton = document.querySelector(".login__btn");
const loginRegisterSwap = document.querySelector(".register__swap__btn");

const labelSign = document.querySelector(".login__register__form__label");
const labelChangeSign = document.querySelector(".login__register__swap__label");

const appLoginPage = document.querySelector(".starter");
const appPage = document.querySelector(".app");
const containerPosts = document.querySelector(".content");

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
const calculateLikes = function () {
    posts.forEach((post) => (post.likes = 0));
    accounts.forEach((acc) => {
        acc.liked_posts.forEach((like) => {
            posts.forEach((post) => {
                if (post.post_id === like) {
                    post.likes += 1;
                }
            });
        });
    });
};
calculateLikes();
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
    containerPosts.textContent = "";
    posts.forEach((post) => {
        const postId = post.post_id;
        const postUser = post.post_creator;
        const postImage = post.image;
        const postText = post.text;
        const postLikes = post.likes;

        const postDate = new Date(post.post_date).getTime();
        let daysAgo = (dateToday.getTime() - postDate) / (24 * 60 * 60 * 1000);
        if (daysAgo === 0) {
            daysAgo = "Today";
        } else if (daysAgo === 1) {
            daysAgo = `${daysAgo} day ago`;
        } else {
            daysAgo = `${daysAgo} days ago`;
        }

        let ifLiked;
        if (acc.liked_posts.includes(postId)) {
            ifLiked = `<svg xmlns="http://www.w3.org/2000/svg" fill="aliceblue" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                </svg>`;
        } else {
            ifLiked = `<svg xmlns="http://www.w3.org/2000/svg" fill="aliceblue" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg>`;
        }

        const content = `
            <div class="post">
                <div class="post__img">
                    <img
                        src="post_images/${postImage}"
                        class="post__img__class"
                        loading="lazy"
                    />
                </div>
                <div class="post__text">
                    <div class="post__title">
                        <div class="post__username">${postUser}</div>
                        <div class="post__date">${daysAgo}</div>
                    </div>
                    <div class="post__description">
                        ${postText}
                    </div>
                    <div class="post__likes">
                        <button onclick="likePost(${postId})" class="post__like__btn">${ifLiked}</button>
                        <span class="post__likes__count">${postLikes} 👍</span>
                    </div>
                </div>
            </div>
        `;

        containerPosts.insertAdjacentHTML("beforeend", content);
    });
};
// <input type="checkbox" ${ifLiked} onclick="likePost(${postId})" class="post__like__chckbx" />

// like/dislike a post
const likePost = function (postId) {
    const liked = currentAccount.liked_posts;
    if (liked.includes(postId)) {
        liked.splice(liked.indexOf(postId), 1);
    } else {
        liked.push(postId);
    }

    currentAccount.liked_posts = liked;
    calculateLikes();
    showPosts(currentAccount);
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
