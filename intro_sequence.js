const HOST = "cpsc484-04.yale.internal:8888";
const COUNTDOWN_DURATION = 4;
let in_countdown;

$(document).ready(function () {
    twod.start();
    frames.start();
});

var i = 0;
var state = 0;
function startIcebreakerIntro() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                icebreakerIntro();
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
    state = "icebreakerIntro";
}
function icebreakerIntro() {
    document.getElementById("instruction").innerHTML = "Now let's break the ice."
    document.getElementById("gif").style.display = "none";
    document.getElementById("myBar").style.display = "none";
    document.getElementById("instruction2").style.display = "none";
    document.getElementById("exitInstruction").style.display = "none";
    //document.getElementById("btn").style.display = "none";
    state = "beginIcebreaker";
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
        player = frame.people[0]
        if (is_hand_raised(player, 'left') && is_hand_raised(player, 'right')) {
            if (state == ""){
                startIcebreakerIntro();
            }else if (state == "icebreakerIntro"){
                icebreakerIntro();
            }else if (state == "beginIcebreaker"){
                window.location.href = "./icebreaker.html"
            }
            
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