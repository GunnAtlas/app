let icons = document.querySelectorAll(".icon")

for (let i = 0; i < icons.length; i++) {
    icons[i].onclick = function() {
        if(!icons[i].classList.contains("selected")) {
            for (let o = 0; o < icons.length; o++) {
                icons[o].classList.remove("selected")
            }
            icons[i].classList.add("selected")
        }
    }
}

addEventListener("beforeinstallprompt", (event) => {
    alert("INSTALL THIS APP EHHEHEH")
})