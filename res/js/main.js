const cookie = document.getElementById("cookie");
const cookiesCount = document.getElementById("cookiesCount");
const cursorUpgrade = document.getElementById("cursorUpgrade");
const grandmaUpgrade = document.getElementById("grandmaUpgrade");
const farmUpgrade = document.getElementById("farmUpgrade");
const upgr1 = document.getElementById("upgr1");
const upgr2 = document.getElementById("upgr2");

let cookies = 0;
let currentAdd = 1;
let grandmas = 0;
let farms = 0;
let cursors = 0;
let cursorPrice = 15;
let grandmaPrice = 100;
let farmPrice = 1100;
let autoClickBoost = 0;
let upgrader1Price = 100;
let upgrader2Price = 500;

function setupMid() {
    if(grandmas == 0) document.getElementById("mid1").style.visibility  = "hidden";
    else {
        document.getElementById("mid1").style.visibility  = "visible";
        for(var i = 0; i < Math.min(grandmas, 40); i++) {
            document.getElementById("grandma" + i).style.visibility = "visible";
        }
    }
    if(farms == 0) document.getElementById("mid2").style.visibility  = "hidden";
    else {
        document.getElementById("mid2").style.visibility  = "visible";
        for(var i = 0; i < Math.min(farms, 40); i++) {
            document.getElementById("farm" + i).style.visibility = "visible";
        }
    }
}

upgr1.onclick = () => {
    if(cookies >= upgrader1Price) {
        cookies -= upgrader1Price;
        upgrader1Price *= 2.5;
        currentAdd *= 2;
        updateCookies();
    }
}

upgr2.onclick = () => {
    if(cookies >= upgrader2Price) {
        cookies -= upgrader2Price;
        upgrader2Price *= 6;
        currentAdd *= 5;
        updateCookies();
    }
}

function autoClick() {
    cookies += autoClickBoost;
    updateCookies();
    setTimeout(autoClick, 1000);
}

cursorUpgrade.onclick = () => {
    if(cookies >= cursorPrice) {
        cookies -= cursorPrice;
        cursorPrice *= 1.2;
        autoClickBoost += 1;
        cursors++;
        cursorPrice = Math.round(cursorPrice);
        setupUpgrades();
        updateCookies();
    }
}

grandmaUpgrade.onclick = () => {
    if(cookies >= grandmaPrice) {
        cookies -= grandmaPrice;
        grandmaPrice *= 1.2;
        autoClickBoost += 5;
        grandmas++;
        grandmaPrice = Math.round(grandmaPrice);
        setupUpgrades();
        updateCookies();
        setupMid();
    }
}

farmUpgrade.onclick = () => {
    if(cookies >= farmPrice) {
        cookies -= farmPrice;
        farmPrice *= 1.2;
        autoClickBoost += 35;
        farms++;
        farmPrice = Math.round(farmPrice);
        setupUpgrades();
        updateCookies();
        setupMid();
    }
}

function updateCookies() {
    document.title = cookies.toLocaleString("en-US") + " cookies - Cookie Clicker";
    cookiesCount.innerHTML = cookies.toLocaleString("en-US");
}

function setupUpgrades() {
    document.getElementById("price1").innerHTML = cursorPrice;
    document.getElementById("price2").innerHTML = grandmaPrice;
    document.getElementById("price3").innerHTML = farmPrice;
    document.getElementsByClassName("upgradeAmount")[0].innerHTML = cursors;
    document.getElementsByClassName("upgradeAmount")[1].innerHTML = grandmas;
    document.getElementsByClassName("upgradeAmount")[2].innerHTML = farms;
}

cookie.onclick = (e) => {
    cookies += currentAdd;
    updateCookies();
    addClickInfo(e.x, e.y);
}

function makeObjects(name, parentName) {
    const parent = document.getElementById(parentName);
    for(var i = 0; i < 50; i++) {
        const element = document.createElement('div');
        element.id = name + i;
        element.classList.add(name);
        element.style.visibility = "hidden";
        element.style.left = 10 + (15 * i) + parent.style.marginLeft + "px";
        element.style.top = 40 + (30 * (i % 2)) + "px";
        parent.appendChild(element);
    }
}

function addClickInfo(x, y) {
    for(let i = 0; i < 40; i++) {
        const element = document.getElementById("cookie" + i);
        if(element.style.visibility == "hidden") {
            element.style.visibility = "visible";
            element.style.left = x + "px";
            element.style.top = y + "px";
            element.innerText = "+" + currentAdd;
            element.classList.add("animate");
            setTimeout(function () {
                removeTextShow("cookie" + i);   
            }, 500)
            break;
        }
    }
}

function removeTextShow(id) {
    const element = document.getElementById(id);
    element.classList.remove("animate");
    element.style.visibility = "hidden";
}

document.body.onload = () => {
    for(let x = 0; x < 40; x++) {
        const status = document.createElement('div');
        status.style.visibility = "hidden";
        status.style.position = "absolute";
        status.id = "cookie" + x;
        status.innerText = "+4";
        document.getElementById("cookiesClick").appendChild(status);
    }
    autoClick();
    makeObjects("grandma", "grandmaBar");
    makeObjects("farm", "farmBar");
    setupMid();
    setupUpgrades();
}