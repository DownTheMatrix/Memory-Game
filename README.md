# Memory-Game

A simple Memory Game project for the Udacity FEND Scholarship 2017

## How to run the game

+ Clone the repo to your local machine
+ Don't alter the folder/file disposition
+ Click on the index.html file top open the app in your browser

### Rules

There are 16 cards in total, the player must find all the 8 pairs and match them together. 
To do so, simply click on a card to reveal the hidden image. If the cards match, they will stay open.
If not, they will flip back. 

The number of **moves** (clicks) are tracked in the score panel on top of the grid containing the cards. 
A **timer** will start as soon as the page loads. Both the number of moves and the timer will be reset when the player clicks on the **restart** button on the top-right corner of the score panel.

The number of moves affects the final **score**, which is represented by 3 stars. The best score is achieved with 3 stars, the worst with 1. 
All the game stats (moves, time and star rating) are summed up in the final congratulation modal which pops up upon game completion.

#### Known issues

This is my first full-fledged web project involving html, css and javascript. As such, it lacks structure and it doesn't address code readability and responsiveness in the best possible way. That being said, I plan to improve the code as soon as my skills progress.

##### Code Dependencies

The app is built without using any framework, and it relies on the CSS Grid system and Vanilla JS only. 

#### Acknowledgements

+ [Udacity](https://eu.udacity.com/), for the great challenge
+ [Font Awesome](https://fontawesome.com/), for the cool icon(s)
+ [Stackoverflow](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976), for the Fisher-Yates Shuffle Algorithm
+ [LucasArts/Disney](http://www.starwars.com/), for the awesome Star Wars universe
+ [Google Images](https://images.google.com/), for the nice images I used for the cards
