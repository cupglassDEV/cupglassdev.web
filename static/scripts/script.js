import { Elemxx } from "./elemxx.js";
const socials = {
    github: "https://github.com/vintheweirdass",
    bluesky: "https://vintheweirdass.bsky.social",
    instagram: "https://instagram.com/vintheweirdass",
    discord: "https://discord.com/users/999863217557880842",
    mail: "mailto:hi@vtwa.is-a.dev"
}
const style = document.createElement("style")
style.innerHTML = `body {
    font-family: monospace;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: darkgray;
    gap:30px;
}
* {cursor: none;}    
`
document.body.appendChild(style)

customElements.define("v-root", class extends Elemxx {
    static css = `
        :me {
           display:flex;
           flex-direction:column;
           align-items:center;
           justify-content:center;
        }
    `
})

customElements.define("v-badge", class extends Elemxx {
    static css = `
        :me > div > p {
            position: absolute;
            transform-origin: 30% -100%;
            transform: rotate(90deg) translate(45%, 90%);
            font-size: 70px;
            background: linear-gradient(200deg,#ff6600,#8a0c0c,#ffb600);
            background-size: 180% 180%;
            background-clip: text;
            color: transparent;
            animation: gradient-animation 5s ease infinite;
        }
        
        @keyframes gradient-animation {
            0% {
                background-position: 0% 50%;
            }
        
            50% {
                background-position: 100% 50%;
            }
        
            100% {
                background-position: 0% 50%;
            }
        }
    `
    constructor() { super() }
    onMount() {
        const div = document.createElement("div")
        const span = document.createElement("p")
        span.innerText = "vin(cent)"
        div.appendChild(span)
        this.appendChild(div)
    }
})

customElements.define("v-list", class extends Elemxx {
    static css = `
        :me {
           display:flex;
           flex-direction:column;
           align-items:center;
           justify-content:center;
        }
    `
})

customElements.define("v-social", class extends Elemxx {
    static attrList = ["name"]
    static css = `
        :me {
           display:flex;
           flex-direction:column;
           font-size:80px;
        }
        :me > a {
           color:black;
           text-decoration:none;
           transition: all 0.3s ease-in-out
        }
        :me > a:hover {
           color:#8a0c0c;
        }
    `
    onMount() {
        const a = document.createElement("a")
        a.href = socials[this.attrs.name.value]
        const i = document.createElement("i")
        i.classList.add(`ri-${this.attrs.name.value}-line`)
        a.appendChild(i)
        this.appendChild(a)
    }
})

customElements.define("v-cursor", class extends Elemxx {
    static css = `
        :me {
            position: fixed;
            width: 20px;
            height: 20px;
            background-color: #ff6600;
            border-radius: 50% 50% 0 50%;
            pointer-events: none;
            transition: transform 0.1s ease;
            z-index: 9999;
        }
    `
    constructor() {
        super()
        document.addEventListener('DOMContentLoaded', () => {
            if (!matchMedia("(hover: hover) and (pointer: fine)")) return;
            const cursor = this
            let lastX = 0;
            let lastY = 0;
            let rotation = 0;
            function updateCursor(e) {
                const deltaX = e.clientX - lastX;
                const deltaY = e.clientY - lastY;

                // Calculate rotation based on movement direction
                const targetRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                // Smooth out the rotation
                rotation += (targetRotation - rotation) * 0.2;

                // Offset the cursor element so its tip aligns with the mouse pointer
                const offsetX = -290;
                const offsetY = -305;

                cursor.style.transform = `translate(${e.clientX + offsetX}px, ${e.clientY + offsetY}px) rotate(${rotation}deg)`;

                lastX = e.clientX;
                lastY = e.clientY;
            }
            document.body.addEventListener("dragstart", () => {
                this.style.display = "none"
                document.removeEventListener("mousemove", updateCursor)
            })
            document.body.addEventListener("dragend", () => {
                this.style.display = "inherit"
                document.addEventListener("mousemove", updateCursor)
            })
            document.addEventListener('mousemove', updateCursor);
        });
    }
})
