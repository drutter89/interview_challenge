#!/usr/bin/env node

console.log('Localytics Code Challenge');

// Here I'm creating two variables to bring in our JSON information to be able to be used in functions here in index.js
const eventJSON = require('../data/events.json');
const userJSON = require('../data/users.json');

const events = JSON.stringify(eventJSON);
const users = JSON.stringify(userJSON);

const eventObj = JSON.parse(events);
const express = require('express');
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static('data'));

// const eventObj = JSON.parse(eventJSON);
// const userObj = JSON.parse(userJSON);

// console.log('checkign 1', eventJSON);

// console.log('checking 2', userJSON);


// 1. How many events were recorded?
let eventTotal = 0;
function eventCount(){
    for(const element of events){
        eventTotal++;
    }
    console.log("checking event total here", eventTotal, events);
}
eventCount();
//  2. What is the average age of all distinct users who visited the home page?
function ageAverage(){

}
//  3. What is the overall conversion rate of a user visiting the home page and then purchasing an item? Note: if a user purchases multiple times, only count him/her once.  Note 2: The events are unordered.
//  4. After a user visits the home page, what are the 3 most frequent things s/he would do next?
//  5. After a user visits a blog post, what is the most frequent path of events s/he will follow to purchase the items in his/her cart? State any assumptions that you make.





