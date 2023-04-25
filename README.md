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
The deployment environment must allow for Kinect Skeleton tracking. In particular, the nodes for the right hand, left hand, shoulder, and neck must be visible in front of the display. These are the particular body parts that our installation uses within its internal logic. The deployment environment must also have enough space to allow for 2 people in front of the display. This is because every step of the installation requires 2 players to agree to proceed forward due to its cooperative nature.

## Collaboration Record
Matthew Qiu - msq7: