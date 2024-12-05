//CLOCK
function run() {
    const date = new Date();
    let hour = date.getHours();
    const meridiem = hour > 12 ? `PM` : `AM`;
    hour = (hour % 12).toString().padStart(2, 0);
    const minuites = date.getMinutes().toString().padStart(2, 0);
    const day = date.getDay();
    document.getElementById('time').textContent = `${hour}:${minuites} ${meridiem}`;
    switch (day) {
        case 1: document.getElementById('day').textContent = `Monday`;
            break;
        case 2: document.getElementById('day').textContent = `Tuesday`;
            break;
        case 3: document.getElementById('day').textContent = `Wesnesday`;
            break;
        case 4: document.getElementById('day').textContent = `Thursday`;
            break;
        case 5: document.getElementById('day').textContent = `Friday`;
            break;
        case 6: document.getElementById('day').textContent = `Saturday`;
            break;
        case 7: document.getElementById('day').textContent = `Sunday`;
            break;
    }
}

run();
setInterval(run, 1000);


//For the Slider
const slides = document.querySelectorAll('.slides img');
let slideIndex = 0;
let intervalId = null;

document.addEventListener('DOMContentLoaded', initiaizeSlider);

function initiaizeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add('displaySlide');
        intervalId = setInterval(nextslide, 3000);
    }
}

function prev() {
    slideIndex--;
    showSlide(slideIndex);
    clearInterval(intervalId);
}

function next() {
    slideIndex++;
    showSlide(slideIndex);
    clearInterval(intervalId);
}

function nextslide() {
    slideIndex++;
    showSlide(slideIndex);
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    }
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove('displaySlide');
    })
    slides[slideIndex].classList.add('displaySlide');
}


//For Cookies

function createCookie(key, value, expire) {
    const date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    const expired = "expires=" + date.toUTCString();
    document.cookie = `${key}=${value};${expired};path=/`;
}

function submitCookie(){
    const key = document.getElementById('key').value;
    const Value = document.getElementById('value').value;
    createCookie(key, Value, 360);
}

function deleteCookie() {
    const dCookie = document.getElementById('dCookie');
    createCookie(dCookie.value, null, null);
    window.alert(`Cookie Deleted`);
    showCookie();
    dCookie.value = "";
}

function showCookie() {
    createCookie('ext_name', null, null);
    if (document.cookie == '') {
        window.alert(`No Cookies are saved`);
    } else {
        window.alert(document.cookie);
    }
}


//For POkemon finder API

async function fetchData() {
    try {
        const input = document.getElementById('input').value.toLowerCase();
        const pokemonSprite = document.getElementById('pokemonSprite');
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (!response.ok) {
            pokemonSprite.src = "Images/error-404-not-found-symbol-logo-design-vector-40706560-removebg-preview.png";
            pokemonSprite.style.display = "block";
        }

        const data = await response.json();

        pokemonSprite.src = data.sprites.front_default;
        pokemonSprite.style.display = "block";
    }
    catch (error) {
        console.error(error);
    }
}


//Window Alert
function openPrompt() {
    let a = window.prompt("This is a Prompt.. Type Something!");
    document.getElementById('show-prompt').style.visibility = `visible`;
    document.getElementById('show-prompt').textContent = `You typed ${a}`;
}


//DOM objects

document.getElementById('buttonColor').addEventListener('input', () => {
    const color = document.getElementById('buttonColor').value;

    //const temp = document.styleSheets[0].cssRules[27];
    //temp.style.backgroundColor = `${color}`;

    const buttons = document.getElementsByTagName('button');
    Array.from(buttons).forEach(button => {
        button.style.backgroundColor = `${color}`;
        //button.classList.add('tempClass');
    });
})

document.getElementById('headerColor').addEventListener('input', () => {
    const color = document.getElementById('headerColor').value;

    const header = document.getElementsByTagName('h1');
    Array.from(header).forEach(button => {
        button.style.color = `${color}`;
    });
})


//Event Listener
const button = document.getElementById('movableButton');
let move = 10;
let x = 0;
let y = 0;

function handleKeyDown(event) {
    if (event.key.startsWith('Arrow')) {
        switch (event.key) {
            case "ArrowUp":
                y >= -90 ? y -= move : y = -100;
                break;
            case "ArrowDown":
                y <= 20 ? y += move : y = 30;
                break;
            case "ArrowLeft":
                x >= -430 ? x -= move : x = -440;
                break;
            case "ArrowRight":
                x <= 430 ? x += move : x = 440;
                break;
        }
        button.style.top = `${y}px`
        button.style.left = `${x}px`
        console.log(button.style.top)
        console.log(button.style.left)
        if (x == 440 || x == -440 || y == -100 || y == 30) {
            button.textContent = `😖`;
        }
        else {
            button.textContent = `😀`;
        }
    }
}
document.getElementById('moveEnable').onclick = function () {
    if (document.getElementById('moveEnable').checked) {
        document.addEventListener('keydown', handleKeyDown);
    }
    else {
        document.removeEventListener('keydown', handleKeyDown);
    }
}

