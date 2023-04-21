// var host = "cpsc484-04.yale.internal:8888";
var host = "127.0.0.1:4444"; // use for debugging
var countdown = 4;

const categories = ['fruitveg', 'animals', 'food']
const options = 
{
    'fruitveg': ["Apples", "Artichokes", "Asparagus", "Avocados", "Bananas", "Beets", "Blackberries", "Blueberries", "Broccoli", "Brussels sprouts", "Cantaloupes", "Carrots", "Cauliflowers", "Cherries", "Coconuts", "Corn", "Cranberries", "Cucumbers", "Dates", "Eggplants", "Figs", "Grapes", "Grapefruits", "Guavas", "Honeydews", "Kiwis", "Leeks", "Lemons", "Limes", "Mangos", "Mulberries", "Mushrooms", "Nectarines", "Okras", "Olives", "Onions", "Oranges", "Papayas", "Peaches", "Pears", "Peppers", "Pineapples", "Plums", "Pomegranates", "Potatoes", "Pumpkins", "Quinces", "Raspberries", "Rhubarbs", "Spinach", "Squash", "Strawberries", "Sweet potatoes", "Tangerines", "Tomatoes", "Turnips", "Watermelons", "Yams", "Zucchinis", "Amaranths", "Artichoke hearts", "Brinjals", "Capers", "Chayotes", "Chickpeas", "Chokos", "Endives", "Fennels", "Garlics", "Gingers", "Kales", "Kohlrabis", "Lentils", "Mung beans", "Parsnips", "Snow peas"],
    'animals': ["Antelopes", "Bears", "Beavers", "Bison", "Camels", "Cats", "Cheetahs", "Chickens", "Cows", "Coyotes", "Crocodiles", "Deer", "Dogs", "Dolphins", "Donkeys", "Dragons", "Ducks", "Eagles", "Elephants", "Elk", "Falcons", "Ferrets", "Fish", "Flamingos", "Foxes", "Geese", "Giraffes", "Goats", "Gorillas", "Hamsters", "Hawks", "Hedgehogs", "Hippopotamuses", "Horses", "Hyenas", "Jaguars", "Kangaroos", "Koalas", "Lemurs", "Leopards", "Lions", "Llamas", "Lynxes", "Mice", "Moose", "Narwhals", "Octopuses", "Owls", "Pandas", "Panthers", "Parrots", "Penguins", "Pigs", "Polar bears", "Porcupines", "Rabbits", "Raccoons", "Rats", "Reindeer", "Rhinos", "Seals", "Sharks", "Sheep", "Snakes", "Squirrels", "Tigers", "Turtles", "Walruses", "Wolves", "Zebras"],
    'food': [ "Bagels", "Bacon", "Bulgogi", "Biscuits", "Brisket", "Brownies", "Burgers", "Burritos", "Cake", "Candy", "Cheese", "Chicken", "Chips", "Churros", "Clams", "Cookies", "Corn", "Crab", "Croissants", "Curry", "Donuts", "Eggs", "Enchiladas", "Falafel", "Fries", "Gumbo", "Hotdogs", "Icecream", "Jambalaya", "Kebab", "Lasagna", "Lobster", "Macaroni", "Meatballs", "Mushrooms", "Nachos", "Noodles", "Omelettes", "Paella", "Pancakes", "Pasta", "Pizza", "Popcorn", "Pretzels", "Quesadillas", "Salad", "Salmon", "Sandwiches", "Sausages", "Shrimp", "Sushi", "Tacos", "Tofu", "Waffles", "Wings", "Yogurt"],
    'adjectives': ["Abundant", "Adaptable", "Adorable", "Adventurous", "Affable", "Affectionate", "Agile", "Agreeable", "Alert", "Ambitious", "Amiable", "Amusing", "Appealing", "Appreciative", "Artistic", "Assertive", "Astute", "Attractive", "Authentic", "Awesome", "Balanced", "Beautiful", "Blissful", "Bountiful", "Brave", "Bright", "Brilliant", "Bubbly", "Buoyant", "Calm", "Capable", "Captivating", "Carefree", "Caring", "Celestial", "Charismatic", "Charming", "Cheerful", "Cherished", "Chirpy", "Classy", "Clean", "Clear", "Clever", "Colorful", "Comfortable", "Comical", "Compassionate", "Confident", "Congenial", "Connected", "Considerate", "Content", "Convivial", "Cool", "Cooperative", "Courageous", "Creative", "Credible", "Cuddly", "Curious", "Daring", "Dazzling", "Delightful", "Dependable", "Desirable", "Determined", "Devoted", "Dignified", "Diligent", "Dynamic", "Eager", "Earnest", "Easygoing", "Eccentric", "Efficient", "Elegant", "Eloquent", "Energetic", "Enlightened", "Enthusiastic", "Exciting", "Exotic", "Exquisite", "Exuberant", "Fabulous", "Fantastic", "Fascinating", "Fearless", "Feminine", "Fertile", "Flourishing", "Focused", "Fond", "Friendly", "Fun", "Funny", "Gallant", "Generous", "Genuine", "Glorious", "Glowing", "Graceful", "Gracious", "Grateful", "Great", "Happy", "Harmonious", "Healthy", "Hearty", "Heavenly", "Helpful", "Heroic", "High-spirited", "Honest", "Honorable", "Hopeful", "Humorous", "Idealistic", "Imaginative", "Impressive", "Incredible", "Innovative", "Inquisitive", "Inspiring", "Intelligent", "Intense", "Interesting", "Inventive", "Invigorating", "Jolly", "Joyful", "Joyous", "Jubilant", "Just", "Kind", "Lively", "Lovely", "Loving", "Lucky", "Luxuriant", "Magical", "Magnificent", "Marvelous", "Mellow", "Merry", "Mesmerizing", "Miraculous", "Motivated", "Nimble", "Noble", "Nurturing", "Optimistic", "Passionate", "Peaceful", "Perceptive", "Persevering", "Persuasive", "Playful", "Pleasant", "Pleasing", "Plucky", "Polite", "Positive", "Powerful", "Practical", "Precious", "Precise", "Productive", "Prosperous", "Proud", "Pure", "Radiant", "Rational", "Reasonable", "Reassuring"]
}

var optionA;
var optionB;

$(document).ready(function () {
    frames.start();
    twod.start();

    var category = categories[Math.floor(Math.random() * 3)]
    var opt = options[category]

    optionA = opt[Math.floor(Math.random() * opt.length)]
    optionB = optionA

    //just to avoid the case where option A and B are the same
    while (optionA === optionB)
    {
        optionB = opt[Math.floor(Math.random() * opt.length)]
    }

    $('#info').html('ICEBREAKER: Do you prefer ' + optionA + ' or ' + optionB + '?')
    $('#leftopt').html('raise your left hand for ' + optionA)
    $('#rightopt').html('raise your right hand for ' + optionB)



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

    // set teamname and decide which box to change color
    teamname = (votes['left1'] + votes['left2'] >= votes['right1'] + votes['right2']) ? optionA : optionB
    choice = (teamname == optionB) ? "left" : "right";


    // add random adjective to beginning of choice
    teamname = options['adjectives'][Math.floor(Math.random() * options['adjectives'].length)] + teamname

    //update interface
    $('#' + choice + 'box').css({backgroundColor: '#025808'});
    $('#info').html('Great! Your team name will be <b>' + teamname  + '!</b>');

    //start countdown then redirect to game
    var cd = setInterval(function(){

        console.log(countdown)
        if (countdown == 0)
        {
            clearInterval(cd);
            //placeholder for brickbreaker game
            localStorage.teamName = teamname
            window.location.href = './game.html';
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