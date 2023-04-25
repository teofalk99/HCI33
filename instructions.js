const HOST = "cpsc484-04.yale.internal:8888";
const COUNTDOWN_DURATION = 4;
let in_countdown;

let votes = {  //dict to keep track of user votes
    'p1_left': 0, 
    'p1_right': 0, 
    'p2_left': 0, 
    'p2_right': 0
}; 

$(document).ready(function () {
    twod.start();
    frames.start();
    in_countdown = 0;
});


let update_votes = function(player, raised_hand){

    let other_hand = (raised_hand == 'left') ? 'right' : 'left'
    votes["p" + player + "_" + raised_hand] = 1;
    votes["p" + player + "_" + other_hand] = 0;
    
}

let is_hand_raised = function(person, hand) {

    wristID = (hand == "right") ? 14 : 7;
    shoulderID = (hand == "right") ? 5 : 12;

    wrist_y = person.joints[wristID].position.y;
    shoulder_y = person.joints[shoulderID].position.y;

    if(wrist_y < shoulder_y){
        return true;
    }
    return false;

}

let do_countdown = function(destination_html, secondary_text){

    in_countdown = 1;
    let seconds_remaining = COUNTDOWN_DURATION;

    let countdown_interval = setInterval(function(){

        if (seconds_remaining == 0){
            clearInterval(countdown_interval);
            window.location.href = destination_html;
        }
        
        $('#countdown-secondary-text').html(secondary_text);
        $('#countdown-primary-text').html(seconds_remaining);
        seconds_remaining -= 1

    }, 1000)

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

        if (frame.people.length != 2){
            $('#header-secondary-text').html('<span style = "color: red; font-weight: bold;"> Please make sure two players are in the camera\'s field! </span>');
        }
        else if (in_countdown){

        }
        else {

            $('#header-secondary-text').html("Instructions for " + localStorage.getItem("currteamname") + "'s");

            //make sure leftmost player is always player 1
            let players = (frame.people[0].x_pos <= frame.people[1].x_pos) ? [frame.people[0], frame.people[1]] : [frame.people[1], frame.people[0]]

            players.forEach((player, i) => {
                if ( is_hand_raised(player, 'left') && is_hand_raised(player, 'right') ){
                    do_countdown("./index.html", "Aborting game...");
                }
                else if (is_hand_raised(player, 'left')){
                    update_votes(i+1, 'left');
                }
                else if (is_hand_raised(player, 'right')){
                    update_votes(i+1, 'right');
                }
            });

            //just check right
            if (votes['p1_right'] == 1 && votes['p2_right'] == 1){
                do_countdown("./game.html", "Starting game...");
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