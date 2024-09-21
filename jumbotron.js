


import addslide from "./assets/tools/addslide.js";
import imglist from "./assets/tools/imglist.js";
addslide(imglist)
const slides = document.querySelectorAll('.slide')
const buttons = document.querySelectorAll(".slider-btn")
let currentSlide = 0;
let enablePlayer;
if (sessionStorage.getItem("cgd_enableplayer") === null) {
    sessionStorage.setItem("cgd_enableplayer", "true")
}
enablePlayer = sessionStorage.getItem("cgd_enableplayer")==="true"
console.log(`Hey hacky guy! \nThis website uses sessionstorage: cgd_enableplayer for slide animation purposes\nthe value type is boolean: ${enablePlayer}`)
let player; let repeater;
const repeaterfn = function () {
    if (!enablePlayer && plctrlDoneClicked) return
    player = setTimeout(
        function () {
            autosl()
            repeater()
        }, 5000)
}
const autosl = function () {
    manualNav(currentSlide)
    currentSlide++
    if (slides.length == currentSlide) currentSlide = 0
    if (currentSlide >= slides.length) return
}
const repeat = function () {
    repeater = repeaterfn
    repeater()
}
const manualNav = function (manual, resetPlayer = false) {
    if (resetPlayer && enablePlayer) player = clearTimeout(player)
    let activeS = document.querySelectorAll(".slide.active");
    [...activeS].forEach((activeSlide) => {
        if (activeSlide.classList.contains("active")) activeSlide.classList.remove("active")
    })
    let activeT = document.querySelectorAll(".slide-text.active");
    [...activeT].forEach((each) => {
        if (each.classList.contains("active")) each.classList.remove("active")
    })
    const s = slides[manual];
    [...s.children].forEach((el) => {
        if (!el.classList.contains("slide-text")) return;
        el.classList.add("active")
    })
    buttons.forEach((el)=>{if (el.classList.contains("active")) el.classList.remove("active")})
    buttons[manual].classList.add("active")
    s.classList.add("active")
    if (resetPlayer && enablePlayer) repeat()
}
buttons.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
        manualNav(i, true);
        currentSlide = i
    })
})
const playerControl = document.getElementById("plctrl")
if (!enablePlayer) playerControl.classList.add("stop")
playerControl.removeAttribute("id")
let plctrlDoneClicked = false
let plctrlClTgl = true
const runplctrl = function () {
    if (!plctrlClTgl) return
    if (plctrlDoneClicked) {
        enablePlayer = !enablePlayer
        sessionStorage.setItem("cgd_enableplayer", enablePlayer?"true":"false")
    }
    if (enablePlayer) {
        if (playerControl.classList.contains("stop") && plctrlClTgl) playerControl.classList.remove("stop")
        repeat()
    } else {
        if (!playerControl.classList.contains("stop") && plctrlClTgl) playerControl.classList.add("stop")
        player = clearTimeout(player)
    }
    plctrlClTgl = false
    if (!plctrlDoneClicked) plctrlDoneClicked = true
}
playerControl.addEventListener("click", function () {
    plctrlClTgl = true
    runplctrl()
})

let mm = gsap.matchMedia();
mm.add("(min-width: 601px)", () => {
    plctrlClTgl = true
    enablePlayer = true
    playerControl.classList.remove("stop")
    runplctrl()
});

mm.add("(max-width: 600px)", () => {
  console.log("Converting to mobile...")
  plctrlClTgl = true
  enablePlayer = false
  playerControl.classList.add("stop")
  runplctrl()
});
