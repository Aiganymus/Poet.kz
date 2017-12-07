$('.profile-username').html(sessionStorage.getItem("username"));
$('select').material_select();

function logout() {
    sessionStorage.clear();
    window.location.replace('http://127.0.0.1:5500/index.html');
}

let tips = [
    "What is that you express in your eyes? It seems to me more than all the print I have read in my life.",
    "Let our scars fall in love.",
    "We love the things we love for what they are."
];

setInterval(function () {
    let i = Math.round((Math.random()) * tips.length);
    if (i == tips.length) --i;
    $(".text").html('' + tips[i] + '').hide(0).fadeIn("slow").fadeIn("slow");;
}, 10000);

//  let testObject = [{
//          'id': 1,
//          "title": "Goodbye",
//          "author": "Rick",
//          "date": new Date(Date.now()).toLocaleString(),
//          "genre": "epic",
//          "poem": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//      },
//      {
//          'id': 2,
//          "title": "Hello hello",
//          "author": "Me",
//          "date": new Date(Date.now()).toLocaleString(),
//          "genre": "jazz",
//          "poem": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//      },
//      {
//          'id': 3,
//          "title": "Say hi",
//          "author": "You",
//          "date": new Date(Date.now()).toLocaleString(),
//          "genre": "graphic",
//          "poem": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//      }
//  ]
//  localStorage.setItem("poems", JSON.stringify(testObject))

let poems = JSON.parse(localStorage.getItem('poems'));
let size = Object.keys(poems).length;
console.log(poems)
for (let i = 0; i < poems.length; i++) {
    let obj = poems[i];
    if (obj != null) create(obj['title'], obj['poem'], obj['id']);
}

function create(title, poem, key) {
    let div = document.createElement('div');

    div.className = 'col s12 m6';
    div.setAttribute('data-anijs', 'if: scroll, on: window, do: rollIn animated');

    let div2 = document.createElement('div');
    div2.setAttribute('class', 'card green darken-2');

    let div3 = document.createElement('div');
    div3.setAttribute('class', 'card-content white-text');

    let span = document.createElement('span');
    span.setAttribute('class', 'card-title');
    span.innerHTML = title;

    let p = document.createElement('p');
    p.innerHTML = poem.substr(0, 100) + "...";

    let div4 = document.createElement('div');
    div4.setAttribute('class', 'card-action');

    let a = document.createElement('a');
    a.setAttribute('onclick', 'display(' + key + ')');
    a.innerHTML = "See details"

    div4.appendChild(a);
    div3.appendChild(span);
    div3.appendChild(p);
    div2.appendChild(div3);
    div2.appendChild(div4);
    div.appendChild(div2);

    $('.list').append(div);
}

function display(id) {
    let obj;
    for (let i = 0; i < poems.length; i++) {
        obj = poems[i];
        if (obj != null && obj['id'] == id) break;
    }
    $('.content').empty();

    let p = document.createElement('p');
    p.innerHTML = "Title: " + obj['title']
    $('.content').append(p)

    let p1 = document.createElement('p');
    p1.innerHTML = "Author: " + obj['author']
    $('.content').append(p1)

    let p2 = document.createElement('p');
    p2.innerHTML = "Genre: " + obj['genre']
    $('.content').append(p2)

    let p3 = document.createElement('p');
    p3.innerHTML = "Date: " + obj['date']
    $('.content').append(p3)

    let p4 = document.createElement('p');
    p4.innerHTML = "Text:<br>" + obj['poem']
    $('.content').append(p4)
}

function search() {
    $('.list').empty();
    let bool = document.getElementById('filled-in-box').checked;
    let e = document.getElementById("sel1");
    let strUser = e.options[e.selectedIndex].value;
    let result = [];
    if (strUser != '') {
        for (let i = 0; i < poems.length; i++) {
            let obj = poems[i];
            if (obj != null && obj['genre'] == strUser)
                result.push(obj);
        }
    } else {
        for (let i = 0; i < poems.length; i++) {
            let obj = poems[i];
            if (obj != null) result.push(obj);
        }
    }
    if (bool) {
        result.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }
    for (let i = 0; i < result.length; i++) {
        let obj = result[i];
        create(obj['title'], obj['poem'], obj['id']);
    }
}

$("#submitPoem").submit(function (e) {
    let el = document.getElementById("sel2");
    let strUser = el.options[el.selectedIndex].value;
    let title = document.getElementById('title').value;
    let poem = document.getElementById('poem').value;
    if (title.trim() == '' || poem.trim() == '' || strUser == '')
        alert('Fill all the inputs!')
    else {
        let obj = {
            'id': ++poems.length,
            'title': title,
            'poem': poem,
            'author': sessionStorage.getItem("username"),
            "date": new Date(Date.now()).toLocaleString(),
            'genre': strUser
        }
        poems.push(obj);
        localStorage.setItem('poems', JSON.stringify(poems));
        window.location.replace('http://127.0.0.1:5500/profile.html');
    }
    e.preventDefault();
});

function savePass() {
    let newP = document.getElementById('pass').value
    if (newP.trim() == '')
        alert('Fill the input.')
    else {
        localStorage.setItem(sessionStorage.getItem("username"), newP);
        alert('Password was changed successfully.')
    }
}

function displayMyPoems(title, poem, key, date) {
    let div = document.createElement('div');

    div.className = 'col s6';
    div.setAttribute('data-anijs', 'if: scroll, on: window, do: rollIn animated');
    div.id = key;

    let div2 = document.createElement('div');
    div2.setAttribute('class', 'card green darken-2');

    let div3 = document.createElement('div');
    div3.setAttribute('class', 'card-content white-text');

    let span = document.createElement('span');
    span.setAttribute('class', 'card-title');
    span.innerHTML = title;

    let p = document.createElement('p');
    p.innerHTML = poem;

    let div4 = document.createElement('div');
    div4.setAttribute('class', 'card-action');

    let a = document.createElement('a');
    a.innerHTML = date

    let a1 = document.createElement('a');
    a1.className = "btn-floating halfway-fab waves-effect waves-light orange";
    a1.innerHTML = '<i class="material-icons">delete_sweep</i>';
    a1.setAttribute('onclick', 'deletePoem(' +key+')');

    div4.appendChild(a);
    div2.appendChild(a1)
    div3.appendChild(span);
    div3.appendChild(p);
    
    div2.appendChild(div3);
    div2.appendChild(div4);
    div.appendChild(div2);

    $('#myPosts').append(div);
}

for (let i = 0; i < poems.length; i++) {
    let obj = poems[i];

    if (obj != null && obj['author'] == sessionStorage.getItem("username")) {
        displayMyPoems(obj['title'], obj['poem'], obj['id'], obj['date']);
    }
}

function deletePoem(id) {
    $('#'+id).remove();
    let result = [];
    for (let i = 0; i < poems.length; i++) {
        let obj = poems[i];
        if(obj != null && obj['id'] != id) result.push(obj);
    }
    localStorage.setItem('poems', JSON.stringify(result));
}