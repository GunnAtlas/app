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
            // let newSVG = document.createElement("img")
            // newSVG.src = "assets/images/map.svg"
            // newSVG.style.webkitTransform = el.style.webkitTransform
            // newSVG.classList.add("map")
            // el.remove()
            // document.querySelector(".mapContainer").appendChild(el)
            // document.querySelector(".hi").innerText = "PINCH ENDED"
            // hammerIt(newSVG)
            // enabled = false
            // return
        }

        //panend
        if(ev.type == "panend"){
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale != 1) {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(" + scale + ", " + scale + ", 1)";
        }

        if (transform) {
            el.style.webkitTransform = transform;
        }
    })
}

hammerIt(document.querySelector(".map"))