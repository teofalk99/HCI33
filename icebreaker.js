var host = "cpsc484-04.yale.internal:8888";

$(document).ready(function () {
    frames.start();
});

$('#bruh').click(function(){advance('left')})

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

let advance = function(choice)
{
    //need to do this one more time for some reason to make the styling in the right order
    togglevote(choice,1)
    togglevote(choice, 2)

    teamname = (choice == 'left') ? 'A' : 'B'


    $('#' + choice + 'box').css({backgroundColor: '#025808'});

    $('#info').html('Great! Your team name will be <b>The X + ' + teamname  + 's!</b>');

    var countdown = 4

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
    wristID = (hand == "left") ? 7 : 14
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
                if (votes['left1'] && votes['left2'])
                {
                    advance('left');
                }
                else if (votes['right1'] && votes['right2'])
                {
                    advance('right');
                }

            }
            

            
        
    }

}