#!/usr/bin/env node

console.log('Localytics Code Challenge');

const express = require('express');
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static('data'));

// Here I'm creating two variables to bring in our JSON information to be able to be used in functions here in index.js
const eventJSON = require('../data/events.json');
const userJSON = require('../data/users.json');

const eventData = JSON.stringify(eventJSON);
const userData = JSON.stringify(userJSON);

const eventObj = JSON.parse(eventData);
const userObj = JSON.parse(userData);

// const singleEvent = eventJSON.events[i];
console.log(eventJSON.events[0]);

// console.log('checking 2', userJSON);




// 1. How many events were recorded?

// First I create a variable, eventTotal, to be my counter and set it to zero. I narrowed down that each event in the object returned in JSON was 
// eventJSON.events[i]. This would be for in a loop where "i" is representative of the index, or single event, we are looking at. So I created a
// function called eventCount that loops through all of the events object and says hey, if there is an event add 1 to eventTotal. Which in the end 
//returned 39938 events.

let eventTotal = 0;
function eventCount(){

    for (var i = 0; i < eventJSON.events.length; i++){
        if (eventJSON.events[i]){
            eventTotal++;
        }
    }
    console.log("THIS IS THE EVENT TOTAL",eventTotal);
    console.log("------------------");
}
eventCount();

//  2. What is the average age of all distinct users who visited the home page?
function ageAverage(){

}
//  3. What is the overall conversion rate of a user visiting the home page and then purchasing an item? Note: if a user purchases multiple times, only count him/her once.  Note 2: The events are unordered.
//  4. After a user visits the home page, what are the 3 most frequent things s/he would do next?
//  5. After a user visits a blog post, what is the most frequent path of events s/he will follow to purchase the items in his/her cart? State any assumptions that you make.





