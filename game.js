const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 490
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

var config = {
    type: Phaser.AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
var host = "cpsc484-04.yale.internal:8888"; 
var latest_frame;         

var frames = {
    socket: null,
    
    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            latest_frame = JSON.parse(event.data);
            // frames.show(latest_frame);
        }
    },

    show: function (frame) {
        console.log(frame);
    }
};

// Switch between laptop asset url and tv asset url depending on which screen you are testing
// Assets will only load with a local live server/python http server for laptop
LAPTOP_ASSET_URL = 'http://127.0.0.1:4444/' 
TV_ASSET_URL = '/project/HCI33'

function preload ()
{
    this.load.setBaseURL(TV_ASSET_URL)
    // These assets are from the Phaser3 library
    this.load.image('paddle1', 'assets/paddle1.png');
    this.load.image('ball1', 'assets/ball1.png');
    this.load.image('paddle2', 'assets/paddle2.png');
    this.load.image('ball2', 'assets/ball2.png');
    this.load.image('brick', 'assets/green1.png');
    this.load.image('background', 'assets/pixelback1.jpg');
}

// Game Objects
var paddle1;
var paddle2;
var ball1;
var ball2;

// Important Coords

// var paddle_Y_fixed = screen.height/1.95; // For running on laptop
var paddle_Y_fixed = screen.height/2.5; // For running on TV display
var origin = [DEFAULT_WIDTH/2, 0];

// Win/Loss Condition Info
var live_ball_count = 2;
var bricks_left_count = 10;
var game_score = 0;

function finishGame(){
    // Create teamdata array in local storage if it does not exist
    if(localStorage.getItem("teamdata") === null){
        localStorage.setItem("teamdata", JSON.stringify({}));
    }
    // Add Current Game Score
    localStorage.setItem("currgamescore", game_score);
    // Get Team Data JSON
    teamdata = JSON.parse(localStorage.getItem("teamdata"));
    // Add new team-score pair
    teamdata[localStorage.currteamname] = game_score;
    // Restore as string
    localStorage.setItem("teamdata", JSON.stringify(teamdata));
    // Redirect
    window.location.href = './leaderboard.html';
}

function create ()
{
    
    // Background
    this.add.image(500, 300, "background");

    // Add Bricks
    let bricks = this.physics.add.group(
        {
            key: 'brick',
            quantity: bricks_left_count,
            immovable: true,
            setScale: {
                x: 1.5,
                y: 1.5
            }
        }
    );
    Phaser.Actions.GridAlign(bricks.getChildren(), 
        {
            width: 5,
            height: 2,
            cellWidth: 120,
            cellHeight: 65,
            x: DEFAULT_WIDTH/4+40,
            y: 60
        }
    );

    // Add Paddles
    let paddles = this.physics.add.group(
        {
            immovable: true,
        }
    );
    paddle1 = paddles.create(origin[0] - 100, paddle_Y_fixed, 'paddle1');
    paddle1.setScale(1.5);
    paddle2 = paddles.create(origin[0] + 100, paddle_Y_fixed, 'paddle2');
    paddle2.setScale(1.5);


    // Add Balls
    let balls = this.physics.add.group(
        {
            collideWorldBounds: true,
            bounceX: 1,
            bounceY: 1
        }
    );
    ball1 = balls.create(paddle1.x+20, paddle1.y-20, 'ball1');
    ball1.setScale(1.5);
    ball1.body.onWorldBounds = true;
    ball2 = balls.create(paddle2.x-20, paddle1.y-20, 'ball2');
    ball2.setScale(1.5);
    ball2.body.onWorldBounds = true;

    // Set Up Collisions for Balls+Paddles, Balls+Bricks
    this.physics.add.collider(balls, paddles);
    this.physics.add.collider(balls, bricks, function(ball, brick)
        {
            brick.destroy()
            bricks_left_count -= 1;
            game_score += 1;
            // Game Won (0 Bricks Left)
            if (bricks_left_count === 0){
                ball1.body.destroy();
                ball2.body.destroy();

                game.destroy(true, true);
                finishGame(); //Game finishing logic
            }
        }
    );

    // Set Up Game Over
    this.physics.world.on('worldbounds', function(body, up, down, left, right){   
            if (down){
                body.destroy();
                live_ball_count -= 1;
                // Both Balls Lost
                if (live_ball_count === 0){
                    game.destroy(true, true); //Uncomment this when you want game over to close game screen
                    finishGame(); //Game finishing logic
                }
            }
        }
    );

    // Initial Ball Velocity at the very end
    ball1.setVelocity(-125, -150)  
    ball2.setVelocity(125, -150) 
    frames.start()
}

function update ()
{   
    if (latest_frame && latest_frame.people.length >= 1){

        // 1 Person Tracked
        if (latest_frame.people.length === 1){
            const person1 = latest_frame.people[0]
            // Person is on left side from user perspective -> Paddle1
            if (person1.joints[3].position.x > 0){
                paddle1.x = -1.0 * person1.joints[3].position.x/2.0 + origin[0];
            }  
            // Person is on right side from user perspective -> Paddle2
            else {
                paddle2.x = -1.0 * person1.joints[3].position.x/2.0 + origin[0];
            }
        // 2 People Tracked
        } else {
            const person1 = latest_frame.people[0]
            const person2 = latest_frame.people[1]
    
            person1_neck_coord = -1.0 * person1.joints[3].position.x/2.0 + origin[0]
            person2_neck_coord = -1.0 * person2.joints[3].position.x/2.0 + origin[0]
    
            // Check if person 1 is on the left side from viewer perspective (player1=left, player2=right)
            if (person1_neck_coord < person2_neck_coord){
                paddle1.x = person1_neck_coord;
                paddle2.x = person2_neck_coord;
            } else {
                paddle1.x = person2_neck_coord;
                paddle2.x = person1_neck_coord;
            }
        }
    }
}