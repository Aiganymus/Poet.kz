let loginForm = document.getElementsByTagName('form')[0];
let registerForm = document.getElementsByTagName('form')[1];

let firstRow = document.getElementsByClassName('row')[0];
let secondRow = document.getElementsByClassName('row')[1];
secondRow.style.display = 'none';

loginForm.addEventListener('submit', (e) => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(username == '' || password == '') {
        $("#myModal").modal();
        $(".modal-body").empty();
        $(".modal-body").append("<p>Please, fill out all inputs.</p>");
    }
    else if (password === localStorage.getItem(username)) {
        sessionStorage.setItem("username", username);
        window.location.replace('http://127.0.0.1:5500/main.html');
    }
    else if (localStorage.getItem(username) === null) {
        $("#myModal").modal();
        $(".modal-body").empty();
        $(".modal-body").append("<p>Account doesn\'t exist.</p>");
    }
    else {
        $("#myModal").modal();
        $(".modal-body").empty();
        $(".modal-body").append("<p>Wrong username or password. Please, try again.</p>");
    }
    e.preventDefault();
});

registerForm.addEventListener('submit', (e) => {
    let username = document.getElementById('newUsername').value;
    let password = document.getElementById('newPassword').value;
    if(username == '' || password == '') {
        $("#myModal").modal();
        $(".modal-body").empty();
        $(".modal-body").append("<p>Please, fill out all inputs.</p>");
    }
    else if(localStorage.getItem(username) === null) {
        localStorage.setItem(username, password);
        sessionStorage.setItem("username", username);
        window.location.replace('http://127.0.0.1:5500/main.html');
    } else {
        $("#myModal").modal();
        $(".modal-body").empty();
        $(".modal-body").append("<p>Account already exists.</p>");
    }
    e.preventDefault();
});

function toggleRegister() {
    $('#first').hide(500);
    secondRow.style.display = 'flex';
}

function toggleLogin() {
    $('#first').show(700);
    secondRow.style.display = 'none';
}


