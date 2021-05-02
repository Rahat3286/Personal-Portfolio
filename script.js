const textDisplay = document.getElementById('type-writer');
const phrases = ['Web Developer', 'Programmer', 'Web Designer'];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
    isEnd = false;
    textDisplay.innerHTML = currentPhrase.join('');

    if (i < phrases.length) {

        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j])
            j++
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j])
            j--
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (j == phrases[i].length) {
            isEnd = true
            isDeleting = true
        }

        if (isDeleting && j === 0) {
            currentPhrase = []
            isDeleting = false
            i++
            if (i === phrases.length) {
                i = 0
            }
        }
    }
    const spedUp = Math.random() * (60 - 50) + 50;
    const normalSpeed = Math.random() * (250 - 200) + 100;
    const time = isEnd ? 2500 : isDeleting ? spedUp : normalSpeed;
    setTimeout(loop, time)
}

loop();

window.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("status");
    function success() {
        form.reset();
        status.classList.add("success");
        status.innerHTML = "Thanks for your message. I'll get you as soon as possible.";
    }

    function error() {
        status.classList.add("error");
        status.innerHTML = "Oops!!";
    }


    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}