#!/usr/bin/env node

console.log('Localytics Code Challenge');

const express = require('express');
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static('data'));

// Here I'm creating two variables to bring in our JSON information to be able to be used in functions here in index.js
const eventJSON = require('../data/events.json');
// was just making sure I could access the JSON info here with both files by console logging them. Worked and returned an object with an array of events and an object filled with nested objects of users.
// console.log('checking 1', eventJSON);
const userJSON = require('../data/users.json');
// console.log('checking 2', userJSON);

// creating a shortcut variables for shorter notation later on
const userObj = userJSON.users;
// const userIds = Object.keys(userObj);

console.log('======================================');
console.log('======================================');

// 1. How many events were recorded?

// First I create a variable, eventTotal, to be my counter and set it to zero. I narrowed down that each event in the object returned in JSON was 
// eventJSON.events[i] inside of my loop. This would be for in a loop where "i" is representative of what point we are currently looking at in the loop.
// Aka the differnece between the value during the first iteration of loop vs the second and so on until the loop is completed. So I created a
// function called eventCount that loops through all of the events object and says hey, if there is an event add 1 to eventTotal. Which in the end 
//returned 39938 events.

let eventTotal = 0;
function eventCount(){

    for (var i = 0; i < eventJSON.events.length; i++){
        if (eventJSON.events[i]){
            eventTotal++;
        }
    }
    console.log("THERE WAS A TOTAL OF", eventTotal, "EVENTS RECORDED");
    console.log("---------------------------------------------------");
}
eventCount();

//  2. What is the average age of all distinct users who visited the home page?

// This here is just an example of how to traverse down to the age of the first user in the JSON file provided
// console.log("LOOKING HERE",userObj['f57f6dfd-72a6-4b93-99c8-9c388586e5de']);
// This gives me a list of each key for the user object so I can access each users age and other info which I should be able to use when looping through the object with a for in loop
// console.log(Object.keys(userObj));


// Since I alreayd had the object of Users I could actually just loop through each "key" and then look at the point in the object that key is referncing while looping through the object
function homePageAverage(){
    let ageTotal = 0;
    let userTotalNum = 0;
    let homePageUserTotal = 0;
    for (var i = 0; i < eventJSON.events.length; i++){

        // here I was making sure the loop was properly targeting the event so we can count how many of them were home page visits.
        // console.log("WHAT AM I LOOKING AT HERE", eventJSON.events[i].name);

        //This will reference the name in the event. This is where we are looking for "Visited home page"
        let eventName = eventJSON.events[i].name;
        //This will reference the unique user ID tied to each event entry.   
        let eventID = eventJSON.events[i].user_id;

        //Now here I use a for in loop to iterate through my nested users objects.
        //First I just tally each user entry and iterate userTotalNum to track each entry in the UserObj
        //Next I begin to check the conditions for the question. Since I've looped through both sets of Data inside of this double loop I can reference both sets of data.
        //So I begin an if statement saying if the key, or the ID listed in the user object, matches the unique_id listed in the events object AND also that the name of the event
        // is "Visited home page" then we increment our homePageUserTotal and we at the age of that home page visit entry to the total to average out in the end.
        //Saving the overall user entries logged in the beginning just helps illustrate in the end that the number of matched entries with unique IDs and a home page visits is different.
        // In the end you have 6741 users who visited the home page with a combined age of 199488. When you divide that up it returns an average age of 29.593235425011127.

        for (const key in userObj){
            if (userObj[key]){
                userTotalNum++;
            }

            if (key === eventID && eventName === "Visited home page") {
                // I leave in a console log like this when the script takes a second just to feel smart and watch something fly through the console while I wait.
                console.log('Checking key here', key);
                homePageUserTotal++;
                ageTotal += userObj[key].age;
            }

        // here I was making suer I could access the keys then use them to make sure I could narrow down each specific user entry. Then tested to make sure I could access the age of each specific user.
        // console.log("checking keys", key);
        // console.log("MORE TESTING", userObj[key]);
        // console.log("TRYING TO NARROW DOWN TO THE AGE", userObj[key].age);

        }
    }
    console.log('=+=+=+=+=+=+=+=+=+==+=+=++=+++==++++++++======+++=+=+=+=+');
    console.log('CHECKING TOTAL NUMBER OF ALL USERS ENTRIES',userTotalNum);
    console.log('CHECKING ONLY HOME PAGE VISITS COUNT',homePageUserTotal);
    console.log('CHECKING COMBINED AGE OF ALL HOMEPAGE USERS',ageTotal);
    console.log("THIS SHOULD BE THE AVERAGE AGE OF USERS WHO VISITED THE HOMEPAGE", ageTotal / homePageUserTotal);
}
    homePageAverage();

//  3. What is the overall conversion rate of a user visiting the home page and then purchasing an item? Note: if a user purchases multiple times, only count him/her once.  Note 2: The events are unordered.
//  4. After a user visits the home page, what are the 3 most frequent things s/he would do next?
//  5. After a user visits a blog post, what is the most frequent path of events s/he will follow to purchase the items in his/her cart? State any assumptions that you make.





