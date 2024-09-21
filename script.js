
/** @typedef {await import("gsap")} */
/** @typedef {await import("jquery")} */
async function run(){
  // nah ini nihh 
  // ngebug bat
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, RoughEase, ExpoScaleEase);
    console.log(gsap)
let tw = gsap.to(".profiles", {
    y:250,
    ease:'ease-in-out',
    scrollTrigger: {
      trigger:'aside',
      start:'top top+40%',
      end:'bottom bottom',
      scrub: 2
    }
  });
/** @typedef gsap.core.Tween */
let backup;
  

document.querySelectorAll("li").forEach(function(el){
    const link = el.attributes.getNamedItem('href')
    if (link === null) return;
    const a = document.createElement("a")
    a.href = link.value
    const inner = el.innerHTML
    el.innerHTML = ""
    a.innerHTML = inner
    el.appendChild(a)
})
// FREE PALESTINEEEE
// (typo lagi tadi)
// let flagjson = {}
// try {
// const l = localStorage.getItem("cgdflags")
// flagjson = l || await (await fetch("https://flagcdn.com/en/codes.json")).json()
// if (l===null) localStorage.setItem("cgdflags", flagjson)
// } catch (_) {}
// const flagimgs = Array.from(document.querySelectorAll("img")).filter((el)=>{if (el.attributes.getNamedItem("flagid")) return el});
// for (const each of flagimgs) {
//     const flag = each.attributes.getNamedItem("flagid").value
//     if (typeof flagjson[flag] === "undefined") continue;
//     each.src="https://flagcdn.com/"+flag+".svg"
// }
// console.log('Okeh')
$(globalThis).on('resize', function(e){

})
}

        document.addEventListener("DOMContentLoaded", (event) => {
            run().catch((e)=>console.error(e)).then(()=>{})
           });

let mark = document.querySelector(".info.marker")
mark.innerHTML = "x"
mark.addEventListener("click", ()=>{
  mark.parentElement.remove()
})