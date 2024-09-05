var mc = new Hammer.Manager(document.querySelector(".map"))
var pinch = new Hammer.Pinch()

mc.add([pinch])

mc.on("pinch", function(ev) {
    document.querySelector(".hi").innerText = Object.keys(ev.scale).length
})