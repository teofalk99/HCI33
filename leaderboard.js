const HOST = "cpsc484-04.yale.internal:8888"; // live input
//const HOST = "127.0.0.1:4444"; // use for debugging
const NUM_LEADERBOARD_ELEMENTS = 10;
const IGNORED_STORED_KEY = "teamName";

$(document).ready(function () {

    twod.start(); // comment out to hide live feed
    console.log(localStorage.getItem("teamdata"));// debug
    console.log(localStorage.getItem("currteamname"))
    console.log(localStorage.getItem("currgamescore"))
    teamdata = JSON.parse(localStorage.getItem("teamdata"));
    let stored_items = [];
    Object.keys(teamdata).forEach(function(key){
        stored_items.push([key, teamdata[key]]);
    })

    stored_items.sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < Math.min(NUM_LEADERBOARD_ELEMENTS, stored_items.length); i++){
        $( "#leaderboard-table" ).append( "<tr id = 'leaderboard-item'><td>" + (i+1) 
                                        + "</td><td>" + stored_items[i][0]
                                        + "</td><td>" + stored_items[i][1]  + "</td></tr>");
    }

    for (let i = stored_items.length; i < NUM_LEADERBOARD_ELEMENTS; i++){
        $( "#leaderboard-table" ).append("<tr id = 'leaderboard-item'><td>-</td><td>-</td><td>-</td></tr>");
    }

});


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