const HOST = "cpsc484-04.yale.internal:8888";
const COUNTDOWN_DURATION = 4;
let in_countdown;

$(document).ready(function () {
    twod.start();
    frames.start();
});

var state = "";
var i = 0;
function move() {
    if (state == "") {
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = 1;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                    beginGame();
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }
        }
    } else if (state == "icebreaker") {
        document.getElementById("instruction").innerHTML =
            "Good Job." + "<br />" + "<br />" + "Now let's break the ice."
        document.getElementById("instruction2").style.display = "none";
        document.getElementById("exitInstruction").style.display = "none";
        document.getElementById("btn").style.display = "none";
        window.location.href = "./icebreaker.html";
    }
}

var result = document.getElementById("result");
var upper = document.getElementById("upper");
function findPartner() {
    document.getElementById("instruction").innerHTML =
        "Your task:" + "<br />" + "Find a teammate who...";
    document.getElementById("instruction2").style.display = "block";
    document.getElementById("exitInstruction").style.display = "block";
    document.getElementById("btn").style.display = "block";
    document.getElementById("btn").innerHTML = "Both wave when ready";
}
function beginGame() {
    var btn = document.getElementById("btn");
    btn.style.display = "none";
    document.getElementById("gif").style.display = "none";
    document.getElementById("myBar").style.display = "none";
    document.getElementById("exitInstruction").style.display = "none";
    //document.getElementById('instruction').style.display = 'none'
    document.getElementById("instruction").innerHTML =
        " First, let's find a teammate.";
    setTimeout(findPartner, 2000);
    state = "icebreaker";
    //upper.innerHTML = " The previous image is replaced by the new image as you click the button. <br> ";
}

let is_hand_raised = function (person, hand) {

    wristID = (hand == "right") ? 14 : 7;
    shoulderID = (hand == "right") ? 5 : 12;

    wrist_y = person.joints[wristID].position.y;
    shoulder_y = person.joints[shoulderID].position.y;

    if (wrist_y < shoulder_y) {
        return true;
    }
    return false;

}

let frames = {
    socket: null,

    start: function () {
        var url = "ws://" + HOST + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        if (is_hand_raised(player, 'left') && is_hand_raised(player, 'right')) {
            move();
        }
    }

}

let twod = {
    socket: null,

    // create a connection to the camera feed
    start: function () {
        var url = "ws://" + HOST + "/twod";
        twod.socket = new WebSocket(url);

        // whenever a new frame is received...
        twod.socket.onmessage = function (event) {

            // parse and show the raw data
            twod.show(JSON.parse(event.data));
        }
    },

    // show the image by adjusting the source attribute of the HTML img object previously created
    show: function (twod) {
        $('img.twod').attr("src", 'data:image/pnjpegg;base64,' + twod.src);
    },
};