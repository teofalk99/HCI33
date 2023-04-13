// var host = "cpsc484-04.yale.internal:8888";
var host = "127.0.0.1:4444"; // use for debugging
var countdown = 4;

$(document).ready(function () {
    frames.start();
    twod.start();
});

$('#advance-button').click(function(){advance()})

var error = 0;
//dict to keep track of user votes
let votes = {'left1': 0, 'left2': 0, 'right1': 0, 'right2': 0}


//some real spaghetti code here sorry
let togglevote = function(item, player)
    {

        let other = (item == 'left') ? 'right' : 'left'
        votes[item + player] = 1;
        votes[other + player] = 0;
        console.log(votes)
        
        $('#' + item + 'p' + player).css('display', 'flex')
        $('#' + other + 'p' + player).hide();
    
    }

let advance = function()
{

    teamname = (votes['left1'] + votes['left2'] >= votes['right1'] + votes['right2']) ? 'A' : 'B'
    choice = (teamname == "A") ? "left" : "right";

    $('#' + choice + 'box').css({backgroundColor: '#025808'});
    $('#info').html('Great! Your team name will be <b>The X + ' + teamname  + 's!</b>');

    var cd = setInterval(function(){

        console.log(countdown)
        if (countdown == 0)
        {
            clearInterval(cd);
            //placeholder for brickbreaker game
            window.location.href = './placeholdergame.html';
        }
        
        $('#countdown').html('GAME STARTS IN ' + countdown)
        countdown -= 1


    }, 1000)
}

let is_hand_raised = function (person, hand){

    // NOTE: I swapped these because the right/left are inverted from the camera's POV. This seems to produce the intended behavior
    // (at least when looking at the live feed), but I may be missing something

    wristID = (hand == "right") ? 7 : 14
    shoulderID = (hand == "left") ? 5 : 12

    wrist_y = person.joints[wristID].position.y;
    shoulder_y = person.joints[shoulderID].position.y;

    if(wrist_y < shoulder_y){
        return true;
    }
    return false;

}

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {

            // console.log(frame)

            //check for correct number of players
            if (frame.people.length != 2)
            {
                $('#errorline').show();
                //*TODO*
            }
            else
            {
                $('#errorline').hide();

                //make sure leftmost player is always player 1
                let players = (frame.people[0].x_pos <= frame.people[1].x_pos) ? [frame.people[0], frame.people[1]] : [frame.people[1], frame.people[0]]


                players.forEach((player, i) =>{
                if (is_hand_raised(player, 'left') && is_hand_raised(player, 'right'))
                {
                    console.log('QUIT')
                    alert('QUIT/RESTART FUNCTIONALITY HERE');
                }
                else if (is_hand_raised(player, 'left'))
                {
                    togglevote('left', i+1);
                }
                else if (is_hand_raised(player, 'right'))
                {
                    togglevote('right', i+1);
                }
                })

                //if a decision has been made, advance to next part of app - will need to pass a team name here
                //in the final product
                // also should make sure they match for an extended period of time
                if ( (votes['left1'] == 1 && votes['left2'] == 1) || (votes['right1'] == 1 && votes['right2'] == 1))
                {
                    advance();
                }

            }
            

            
        
    }

}

var twod = {
    socket: null,

    // create a connection to the camera feed
    start: function () {
        var url = "ws://" + host + "/twod";
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