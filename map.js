let fingersOnScreen = 0

setInterval(function() {

}, 10)

document.ontouchstart = function() {
    fingersOnScreen++
    document.querySelector(".hi").innerText = fingersOnScreen
}

document.ontouchend = function() {
    fingersOnScreen--
    document.querySelector(".hi").innerText = fingersOnScreen
}

function hammerIt(elm) {
    hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });
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

    hammertime.on('pan pinch panend pinchend', function(ev) {
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
            scale = Math.max(.999, Math.min(last_scale * (ev.scale), 20));
        }
        if(ev.type == "pinchend"){last_scale = scale;}

        //panend
        if(ev.type == "panend"){
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale != 1) {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) "
        }
        function resize(scale) {
            let svgWidth = parseInt(elm.getAttribute('width'));
            elm.setAttribute('width', `${(svgWidth * scale)}`);
            let svgHeight = parseInt(elm.getAttribute('height'));
            elm.setAttribute('height', `${(svgHeight * scale)}`);
        }

        if (transform) {
            el.style.webkitTransform = transform;
            resize(scale)
        }
    });
}

hammerIt(document.querySelector(".map"))