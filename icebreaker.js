//const HOST = "cpsc484-04.yale.internal:8888"; // live input
const HOST = "127.0.0.1:4444"; // use for debugging
const COUNTDOWN_DURATION = 4;
const CATEGORIES = ['fruitveg', 'animals', 'food']
const OPTIONS = {
    'fruitveg': ["Apples", "Artichokes", "Asparagus", "Avocados", "Bananas", "Beets", "Blackberries", "Blueberries", "Broccoli", "Brussels sprouts", "Cantaloupes", "Carrots", "Cauliflowers", "Cherries", "Coconuts", "Corn", "Cranberries", "Cucumbers", "Dates", "Eggplants", "Figs", "Grapes", "Grapefruits", "Guavas", "Honeydews", "Kiwis", "Leeks", "Lemons", "Limes", "Mangos", "Mulberries", "Mushrooms", "Nectarines", "Okras", "Olives", "Onions", "Oranges", "Papayas", "Peaches", "Pears", "Peppers", "Pineapples", "Plums", "Pomegranates", "Potatoes", "Pumpkins", "Quinces", "Raspberries", "Rhubarbs", "Spinach", "Squash", "Strawberries", "Sweet potatoes", "Tangerines", "Tomatoes", "Turnips", "Watermelons", "Yams", "Zucchinis", "Amaranths", "Artichoke hearts", "Brinjals", "Capers", "Chayotes", "Chickpeas", "Chokos", "Endives", "Fennels", "Garlics", "Gingers", "Kales", "Kohlrabis", "Lentils", "Mung beans", "Parsnips", "Snow peas"],
    'animals': ["Antelopes", "Bears", "Beavers", "Bison", "Camels", "Cats", "Cheetahs", "Chickens", "Cows", "Coyotes", "Crocodiles", "Deer", "Dogs", "Dolphins", "Donkeys", "Dragons", "Ducks", "Eagles", "Elephants", "Elk", "Falcons", "Ferrets", "Fish", "Flamingos", "Foxes", "Geese", "Giraffes", "Goats", "Gorillas", "Hamsters", "Hawks", "Hedgehogs", "Hippopotamuses", "Horses", "Hyenas", "Jaguars", "Kangaroos", "Koalas", "Lemurs", "Leopards", "Lions", "Llamas", "Lynxes", "Mice", "Moose", "Narwhals", "Octopuses", "Owls", "Pandas", "Panthers", "Parrots", "Penguins", "Pigs", "Polar bears", "Porcupines", "Rabbits", "Raccoons", "Rats", "Reindeer", "Rhinos", "Seals", "Sharks", "Sheep", "Snakes", "Squirrels", "Tigers", "Turtles", "Walruses", "Wolves", "Zebras"],
    'food': [ "Bagels", "Bacon", "Bulgogi", "Biscuits", "Brisket", "Brownies", "Burgers", "Burritos", "Cake", "Candy", "Cheese", "Chicken", "Chips", "Churros", "Clams", "Cookies", "Corn", "Crab", "Croissants", "Curry", "Donuts", "Eggs", "Enchiladas", "Falafel", "Fries", "Gumbo", "Hotdogs", "Icecream", "Jambalaya", "Kebab", "Lasagna", "Lobster", "Macaroni", "Meatballs", "Mushrooms", "Nachos", "Noodles", "Omelettes", "Paella", "Pancakes", "Pasta", "Pizza", "Popcorn", "Pretzels", "Quesadillas", "Salad", "Salmon", "Sandwiches", "Sausages", "Shrimp", "Sushi", "Tacos", "Tofu", "Waffles", "Wings", "Yogurt"],
    'adjectives': ["Abundant", "Adaptable", "Adorable", "Adventurous", "Affable", "Affectionate", "Agile", "Agreeable", "Alert", "Ambitious", "Amiable", "Amusing", "Appealing", "Appreciative", "Artistic", "Assertive", "Astute", "Attractive", "Authentic", "Awesome", "Balanced", "Beautiful", "Blissful", "Bountiful", "Brave", "Bright", "Brilliant", "Bubbly", "Buoyant", "Calm", "Capable", "Captivating", "Carefree", "Caring", "Celestial", "Charismatic", "Charming", "Cheerful", "Cherished", "Chirpy", "Classy", "Clean", "Clear", "Clever", "Colorful", "Comfortable", "Comical", "Compassionate", "Confident", "Congenial", "Connected", "Considerate", "Content", "Convivial", "Cool", "Cooperative", "Courageous", "Creative", "Credible", "Cuddly", "Curious", "Daring", "Dazzling", "Delightful", "Dependable", "Desirable", "Determined", "Devoted", "Dignified", "Diligent", "Dynamic", "Eager", "Earnest", "Easygoing", "Eccentric", "Efficient", "Elegant", "Eloquent", "Energetic", "Enlightened", "Enthusiastic", "Exciting", "Exotic", "Exquisite", "Exuberant", "Fabulous", "Fantastic", "Fascinating", "Fearless", "Feminine", "Fertile", "Flourishing", "Focused", "Fond", "Friendly", "Fun", "Funny", "Gallant", "Generous", "Genuine", "Glorious", "Glowing", "Graceful", "Gracious", "Grateful", "Great", "Happy", "Harmonious", "Healthy", "Hearty", "Heavenly", "Helpful", "Heroic", "High-spirited", "Honest", "Honorable", "Hopeful", "Humorous", "Idealistic", "Imaginative", "Impressive", "Incredible", "Innovative", "Inquisitive", "Inspiring", "Intelligent", "Intense", "Interesting", "Inventive", "Invigorating", "Jolly", "Joyful", "Joyous", "Jubilant", "Just", "Kind", "Lively", "Lovely", "Loving", "Lucky", "Luxuriant", "Magical", "Magnificent", "Marvelous", "Mellow", "Merry", "Mesmerizing", "Miraculous", "Motivated", "Nimble", "Noble", "Nurturing", "Optimistic", "Passionate", "Peaceful", "Perceptive", "Persevering", "Persuasive", "Playful", "Pleasant", "Pleasing", "Plucky", "Polite", "Positive", "Powerful", "Practical", "Precious", "Precise", "Productive", "Prosperous", "Proud", "Pure", "Radiant", "Rational", "Reasonable", "Reassuring"]
}

let optionA;
let optionB;
let seconds_remaining = COUNTDOWN_DURATION;
let error = 0;
let votes = {  //dict to keep track of user votes
    'p1_left': 0, 
    'p1_right': 0, 
    'p2_left': 0, 
    'p2_right': 0
}; 

let update_votes = function(player, raised_hand){

    let other_hand = (raised_hand == 'left') ? 'right' : 'left'
    votes["p" + player + "_" + raised_hand] = 1;
    votes["p" + player + "_" + other_hand] = 0;
    
    $('#' + raised_hand + "-p" + player + "-vote-marker").css("opacity", "1.0");
    $('#' + other_hand  + "-p" + player + "-vote-marker").css("opacity", "0.0");
    
}


$(document).ready(function () {

    frames.start();
    twod.start(); // comment out to hide live feed

    var category = CATEGORIES[Math.floor(Math.random() * 3)]
    var opt = OPTIONS[category]

    optionA = opt[Math.floor(Math.random() * opt.length)];
    optionB = optionA

    //just to avoid the case where option A and B are the same
    while (optionA === optionB){
        optionB = opt[Math.floor(Math.random() * opt.length)];
    }

    $('#header-primary-text').html('Do you prefer <b>' + optionA.toLowerCase() + '</b> or <b>' + optionB.toLowerCase() + '</b>?');
    $('#left-option-primary-text').html(optionA.toLowerCase());
    $('#right-option-primary-text').html(optionB.toLowerCase());

});


$('#advance-button').click(() => advance());

let advance = function(){

    // set teamname and decide which box to change color
    teamname = (votes['p1_left'] + votes['p2_left'] >= votes['p1_right'] + votes['p2_right']) ? optionA : optionB;
    choice = (teamname == optionB) ? "right" : "left";


    // add random adjective to beginning of choice
    teamname = "The " + OPTIONS['adjectives'][Math.floor(Math.random() * OPTIONS['adjectives'].length)] + " " + teamname;

    //update interface
    $('#' + choice + '-answer-box').css("backgroundColor", "rgb(254, 215, 102)");
    $('#header-primary-text').html('Great! Your team name will be <b>' + teamname  + '!</b>');

    //start countdown then redirect to game
    var cd = setInterval(function(){

        if (seconds_remaining == 0){
            clearInterval(cd);
            localStorage.teamName = teamname //placeholder for brickbreaker game
            localStorage.setItem(teamname, 0);
            window.location.href = './game.html';
        }
        
        $('#header-secondary-text').html('GAME STARTS IN ' + seconds_remaining + "...");
        seconds_remaining -= 1

    }, 1000)
}



let is_hand_raised = function(person, hand) {

    wristID = (hand == "right") ? 7 : 14;
    shoulderID = (hand == "right") ? 12 : 5;

    wrist_y = person.joints[wristID].position.y;
    shoulder_y = person.joints[shoulderID].position.y;

    if(wrist_y < shoulder_y){
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

        // console.log(frame)

        //check for correct number of players
        if (frame.people.length != 2)
        {
            $('#header-secondary-text').html('<span style = "color: red; font-weight: bold;"> Please make sure two players are in the camera\'s field! </span>');
            //*TODO*
        }
        else
        {

            //make sure leftmost player is always player 1
            let players = (frame.people[0].x_pos <= frame.people[1].x_pos) ? [frame.people[0], frame.people[1]] : [frame.people[1], frame.people[0]]


            players.forEach((player, i) => {
                if ( is_hand_raised(player, 'left') && is_hand_raised(player, 'right') ){
                    console.log('QUIT')
                    alert('QUIT/RESTART FUNCTIONALITY HERE');
                }
                else if (is_hand_raised(player, 'left')){
                    update_votes(i+1, 'left');
                }
                else if (is_hand_raised(player, 'right')){
                    update_votes(i+1, 'right');
                }
            });

            //if a decision has been made, advance to next part of app - will need to pass a team name here
            //in the final product
            // also should make sure they match for an extended period of time
            if ( (votes['p1_left'] == 1 && votes['p2_left'] == 1) || (votes['p1_right'] == 1 && votes['p2_right'] == 1)){

                setInterval(function(){
                    if (votes['p1_left'] != votes['p2_left']){
                        return;
                    }
                }, 1000)


                advance();
            }

        }
          
    }

}

// for displaying feed
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