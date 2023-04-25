# HCI33

## Dependencies
There are no dependencies required for this project to run. All files are HTML/CSS/JS.

## How to Run
To run the project (on a laptop or on the TV Display), you must run a live web server to allow for the local brick breaker assets to be loaded.

To do so, type one of these command in terminal (depends on OS and python installation, and the port doesn't matter):

python -m http.server -b 127.0.0.1 5500

OR 

python3 -m http.server -b 127.0.0.1 5500

The initial page should be 'index.html'

## Project Description
Our project is a two-part icebreaker-teamwork challenge which has an icebreaker portion and a co-op gameplay portion. The first part consists of finding a person nearby to be a teammate. This will be followed up by an icebreaker portion where the two players will introduce themselves to each other. The two players will be prompted with a question in the form of: "Do you prefer X or Y?" where X and Y are two randomly chosen things like "apples" or "pears". The two players will then vote by raising left or right hand. If they disagree, they must discuss with one another until they come to a compromise to advance forward with the game. Once both players vote for the same option, it will go for the instruction page for 2-player cooperative brick breaker. Once the players understand the instructions, they will go ahead and play the game. Once the game finishes, they will go to the leaderboard page where they will have the option to either play again or exit.

## Tasks Addresed By Our Prototype
The first task that our prototype addresses is user introductions. The icebreaker portion of our installation requires the two users to introduce themselves to one another, and possibly discuss the "X or Y" topic at hand. This aspect of the installation helps spark conversation between the two. The second task that our prototype addresses is interaction through gameplay. This is because the brick breaker game is co-operative and the two players must work together to win as there are 2 paddles and 2 balls. This encourages the players to interact not just in real life but within the installation activity as well. A third task that our prototype addresses is friendly competition. This is accomplished via the leaderboard screen where you can see how well you and your partner did in the game compared to other teams. This can encourage re-playing the game which will further increase community building!

## Constraints from Deployment Environment
The deployment environment must allow for Kinect Skeleton tracking. In particular, the nodes for the right hand, left hand, shoulder, and neck must be visible in front of the display. These are the particular body parts that our installation uses within its internal logic. The deployment environment must also have enough space to allow for 2 people in front of the display. The deployment environment must also allow enough space for the 2 players to move left and right for the brick breaker game. This is because every step of the installation requires 2 players to agree to proceed forward due to its cooperative nature.

## Collaboration Record
Matthew Qiu - msq7: I improved the entire brick breaker game portion with the Phaser 3 library by adding score-keeping for the brick breaker game in addition to converting the game assets from being remotely fetched to locally fetched since the Phaser 3 website is temporarily down. I also integrated the brick breaker portion with the leaderboard portion of the project by designing the local storage schema for the team name and score data so that it can be displayed accurately on the leaderboard page. I also ensured that the score data for these teams persisted across sessions. I also helped code up the instruction page that explains how to play the brick breaker game. Furthermore, I wrote up the details about the project in the README file. I also contributed to the testing of our project by going to TV4 at HLH17 and testing our project using the remote display control, and fixing bugs related to discrepancies between the laptop and TV versions of our project.

Ben Wonderlin - bmw49: I wrote and stylized the leaderboard page, the instruction page, and a significant portion of
icebreaker page. I also wrote the logic for how we process gestures, execute countdowns, and abort the game.
Lastly, I spent a significant amount of time testing and debugging with Matthew in HLH17.
 
Teo Falk - tef25: I improved the icebreaker portion of the application by adding a functionality that randomly selects two options from a randomly selected category (fruit/vegetables, animals, and types of food). Based on what option the users select, a team name is then created by concatenating a randomly selected adjective with the selected option. I also added storing the generated team name in the browser's storage, to then be used for leaderboard purposes once the users complete the game. Aside from the functionality of the icebreaker, I also made some minor aesthetic changes.

Cindy Hernandez - cmh239 : I connected the intro sequence screens to work with the motion sensor as I only had the front-end before. I also removed some of the intro sequence, speficially finding a partner that "likes X" since I didn't make as much sense with our application anymore.
