// let fingersOnScreen = 0
// let canUpscale = false

// setInterval(function() {
//     if (fingersOnScreen == 0) {
//         canUpscale = true
//     }
//     if (canUpscale) {
//         canUpscale = false
//         document.querySelector(".mapContainer").innerHTML += " "
//     }
// }, 10)

// document.ontouchstart = function() {
//     fingersOnScreen++
//     document.querySelector(".hi").innerText = fingersOnScreen
// }

// document.ontouchend = function() {
//     fingersOnScreen--
//     document.querySelector(".hi").innerText = fingersOnScreen
// }
const oldSVG = -(parseInt(document.querySelector(".map").getAttribute('height')) * 1) / 2
const oldSVG2 = -(parseInt(document.querySelector(".map").getAttribute('width')) * 1) / 2
const midScreenHeight = window.innerHeight / 4

document.querySelector(".map").style = "top: " + midScreenHeight + "px; left: 0;"

function resize(svg, scale) {
    let svgWidth = parseInt(svg.getAttribute('width'));
    svg.setAttribute('width', `${(-(oldSVG2 * 2) * scale)}px`);
    let svgHeight = parseInt(svg.getAttribute('height'));
    svg.setAttribute('height', `${(-(oldSVG * 2) * scale)}px`);
    svg.setAttribute("style", `top: ${(-(-(oldSVG * 2) * scale) / 2) - oldSVG + midScreenHeight}px; left: ${(-(-(oldSVG2 * 2) * scale) / 2) - oldSVG2}px; touch-action: none; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);`)
}
function test() {
    let elm = document.querySelector(".map")
    resize(elm, 1)
    elm.style.webkitTransform = "translate3d(0, 0, 0) scale3d(2, 2, 8)"
    setTimeout(() => {
        resize(elm, 2)
        elm.style.webkitTransform = "translate3d(0, 0, 0) scale3d(1, 1, 8)"
        console.log("?")
    }, 500)
}
function hammerIt(elm) {
    hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });
    let enabled = true
    var posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
        transform = "",
        el = elm;

    hammertime.on('doubletap pan pinch panend pinchend', function(ev) {
        if (!enabled) {return}
        //pan    
        if (scale != 1) {
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
            if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
        }


        //pinch
        if (ev.type == "pinch") {
            scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
        }
        if(ev.type == "pinchend"){
            last_scale = scale
            resize(elm, scale)
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(1, 1, 8)";
            elm.style.webkitTransform = transform
        }

        //panend
        if(ev.type == "panend"){
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
            resize(elm, scale)
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(1, 1, 8)";
            elm.style.webkitTransform = transform
        }

        if (scale != 1) {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(" + scale + ", " + scale + ", 8)";
        }

        if (transform) {
            elm.style.webkitTransform = transform
        }
    })
}

hammerIt(document.querySelector(".map"))