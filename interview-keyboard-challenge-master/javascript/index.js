#!/usr/bin/env node

console.log("Localytics Code Challenge");

//turning on a server here tied to localhost 3000 and telling it to listen to the data folder to reference/serve the JSON files
const express = require("express");
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("data"));

// Here I'm creating two variables to bring in our JSON information to be able to be used in functions here in index.js
const eventJSON = require("../data/events.json");
// was just making sure I could access the JSON info here with both files by console logging them. Worked and returned an object with an array of events and an object filled with nested objects of users.
// console.log('checking 1', eventJSON);
const userJSON = require("../data/users.json");
// console.log('checking 2', userJSON);

// creating a shortcut variables for shorter notation later on
const userObj = userJSON.users;
const eventObj = eventJSON.events;
// const userIds = Object.keys(userObj);

console.log("======================================");
console.log("======================================");

// 1. How many events were recorded?

// First I create a variable, eventTotal, to be my counter and set it to zero. I narrowed down that each event in the object returned in JSON was
// eventJSON.events[i] inside of my loop. This would be for in a loop where "i" is representative of what point we are currently looking at in the loop.
// Aka the differnece between the value during the first iteration of loop vs the second and so on until the loop is completed. So I created a
// function called eventCount that loops through all of the events object and says hey, if there is an event add 1 to eventTotal. Which in the end
//returned 39938 events.

let eventTotal = 0;

function eventCount() {
    for (let i = 0; i < eventJSON.events.length; i++) {
        if (eventJSON.events[i]) {
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

// Since I already had the object of Users I could actually just loop through each "key" and then look at the point in the object that key is referncing while looping through the object

let distinctUsers = {};
let originalAgeTotal = 0;
let originalUserTotalNum = 0;
let homePageUserTotal = 0;
let uniqueUserCount = 0;

function addAllUsers() {
    //Now here I use a for in loop to iterate through my nested users objects.
    //First I just tally each user entry and iterate userTotalNum to track each entry in the UserObj
    for (const key in userObj) {
        let originalUserEntry = userObj[key];

        //   console.log(originalUserEntry.age);
        //   console.log(key);
        if (originalUserEntry) {
            originalUserTotalNum++;
            originalAgeTotal += originalUserEntry.age;
        }
    }
    console.log("THIS IS THE TOTAL OF ALL USER ENTRIES IN THE USER OBJ", originalUserTotalNum);
    console.log("THIS IS THE TOTAL AGE OF ALL ORIGINAL UNCHECKED USER ENTRIES", originalAgeTotal);
    console.log("THIS IS THE AVERAGE AGE OF ALL USERS TO COMPARE TO", originalAgeTotal)
}
addAllUsers();

function findDistinctUsers() {
    for (const key in userObj) {
        let originalUserEntry = userObj[key];
        let originalAge = originalUserEntry.age;
        // console.log("checking distinct age variable", originalAge);
        // console.log(originalUserEntry);
        //for (const key2 in distinctUsers) {
        // let distinctUserEntry = distinctUsers[key2];

        //if this this user isn't in the distinctUsers object push it over and add it to distinctUsers(this is what Im trying to put in the if statement below)
        //not sure why Im having a mental block on how to reference this I thought I could just say !distinctUsers[key] (to say if there is no distinctUsers to add the originalUserEntry)
        // to say that doesn't exist in the new object to then add it.
        // so here Im thinking Im in my double loop where in my first loop the first iteration of that originalUserEntry is looking to the distinctUsers obj
        // and then saying hey if this original user data from userObj doesn't exist inside of distinctUsers to then add that user entry to Distinct users.
        // then an else to say well if it does exist already is it a unique ID or does that unique key already exist within a user thats been added to Distinct Users.

        //so now this time Im trying to say if that originalUser data isn't in Distinct users AND ALSO if the key2 of my 2nd loop (i.e the way Im iterating through this object)
        // is NOT EQUAL to the original key unique id from my userObj THEN add this user to the distinct users obj and up the distinct user count.
        // console.log("making sure I still have my original key data", key);

        if (!distinctUsers in distinctUsers) {
            distinctUsers.push(userObj[key]);
            uniqueUserCount++;
            //   console.log("distinct");
        } else {
            //trying this out now instead where I first say if the original user entry doesn't exist, add it, else (or) if it does exist then if the original data key doesnt equal the key2 (unique keys in our new obj)
            //to the also add it in that instance. Had it on one line previously with &&. Seeing if breaking it up changes the flow of it as there will be both new users being added then iterating
            //to a new event that will have that user again so we'd have to make sure that key (the unique id that identifies each user data object) doesn't already exist in the new object.
            if (!key) {
                distinctUsers.push(originalUserEntry);
                uniqueUserCount++;
            }
            // }
            //}
        }

    }
    console.log("THERE WERE THIS MANY UNIQUE USERS", uniqueUserCount);
    console.log("THIS IS MY NEW OBJECT", distinctUsers);
}
findDistinctUsers();

function placeholderName() {
    // function loopEvents(){
    for (let i = 0; i < eventJSON.events.length; i++) {
        // here I was making sure the loop was properly targeting the event so we can count how many of them were home page visits.
        // console.log("WHAT AM I LOOKING AT HERE", eventJSON.events[i].name);

        //This will reference the name in the event. This is where we are looking for "Visited home page"
        let eventName = eventJSON.events[i].name;
        //This will reference the unique user ID tied to each event entry.
        let eventID = eventJSON.events[i].user_id;
        for (const key in userObj) {
            let originalUserEntry = userObj[key];
            
        //     // made sure this was working and I'm seeing every user entry loop through
        //     // console.log(originalUserEntry);
        //     for (const key2 in distinctUsers){
        //         let distinctUser = distinctUsers[key2];
        //         if (originalUserEntry != distinctUser){
        //             uniqueUserEvents.push(originalUserEntry);
        //             uniqueCount++;
        //         }
        // }
        //     if(!userObj[key]){
        //         distinctUsers.push(key);
        //         testtCount++;
        //     }
        // }
    
        // here I was quickly making sure I could access the keys then use them to make sure I could narrow down each specific user entry. Then tested to make sure I could access the age of each specific user.
        // console.log("checking keys", key);
        // console.log("MORE TESTING", userObj[key]);
        // console.log("TRYING TO NARROW DOWN TO THE AGE", userObj[key].age);

        //Next I begin to check the conditions for the question. Since I've looped through both sets of Data inside of this double loop I can reference both sets of data.
        //So I begin an if statement saying if the key, or the ID listed in the user object, matches the unique_id listed in the events object AND also that the name of the event
        // is "Visited home page" then we increment our homePageUserTotal and we at the age of that home page visit entry to the total age variable to average out in the end.
        //Saving the overall user entries logged in the beginning just helps illustrate in the end that the number of matched entries with unique IDs and a home-page-visits are different.
        // In the end you have 6741 users who visited the home page with a combined age of 199488. When you divide that up it returns an average age of 29.593235425011127.

        if (eventName === "Visited home page" && key === eventID ) {
            // I leave in a console log like this when the script takes a second just to feel smart and watch something fly through the console while I wait.
            // Jokes aside I like to show how I understand this is looping through each key and then each obj that key is referencing to show understanding of the loop process.
            // console.log("Checking key here", key);
            // console.log("checking index");
            // console.log(
            //   "This is the user object for they unique key previously logged",
            //   userObj[key]
            // );
            homePageUserTotal++;
            // this is short hand that just means ageTotal is equal to ageTotal plus userObj[key].age (aka we just keep adding each users age to the total age)
            // above we had already determined its a matching user that visited the home page.
            originalAgeTotal += userObj[key].age;
        }
        

        //I was beginning to try some things for question 3 here rather than create a new function as the script was starting to get long. Tried to refactor some previous stuff to help with that which took time.
        // for (key in uniqueUserEvents){
        //     console.log("checking the uniqueObj key", key);
        //     if (key === userObj[key]){
        //     uniqueUserEvents.push(userObj[key]);
        //     console.log("checking the unique events here", uniqueUserEvents);
        //     }
        // }
        // }
    
    
    

        }
}
console.log("CHECKING TOTAL NUMBER OF ALL Unique USERS ENTRIES", uniqueUserCount);
console.log("CHECKING NEW OBJ", distinctUsers);
console.log("=+=+=+=+=+=+=+=+=+==+=+=++=+++==++++++++======+++=+=+=+=+");
console.log("CHECKING TOTAL NUMBER OF ALL USERS ENTRIES", originalUserTotalNum);
console.log("CHECKING ONLY HOME PAGE VISITS COUNT", homePageUserTotal);
console.log("CHECKING COMBINED AGE OF ALL HOMEPAGE USERS", originalAgeTotal);
console.log("THIS SHOULD BE THE AVERAGE AGE OF USERS WHO VISITED THE HOMEPAGE BUT IS NOT DISTINCT USERS", originalAgeTotal / homePageUserTotal);
console.log("CHECKING TOTAL NUMBER OF ALL USERS ENTRIES", originalUserTotalNum);
}
placeholderName();
// function homePageUsersAge() {
// }
// homePageUsersAge();

//  3. What is the overall conversion rate of a user visiting the home page and then purchasing an item? Note: if a user purchases multiple times, only count him/her once.  Note 2: The events are unordered.

//Need to track how many people make a purchase after visiting the home page
//First Ill start with seeing if I can match keys to see if there are multiple entries

// function purchaseConversion() {
//   let matches = 0;
//   let matchess = 0;

//   for (let i = 0; i < eventJSON.events.length; i++) {
//     let eventName = eventJSON.events[i].name;
//     let eventID = eventJSON.events[i].user_id;

//     for (const key in userObj) {
//       if (key === key) {
//         matches++;
//       }
//       if (key && key === eventID && eventName === "Visited home page") {
//         matchess++;
//       }
//     }
//     console.log("Not broken just looping please wait");
//   }

//   console.log("===========-------------================");
//   console.log("CHECKING MATCHES", matches);
//   console.log("===========-------------================");
//   console.log("CHECKING SPECIFIC MATCHESS", matchess);
// }
// purchaseConversion();

// I lost time once I got to this step, but here at this point we've in step one looped through the user events to log the total number events.
// Then in step 2 we looped through the events as well as the user info to cross reference how many users visited the home page and get the average age of those users.

//You can see the theme of becoming more granular slowly going deeper into the information starting with looping through 1 set to combining both.
// Here in 3 we have already gathered how many users visited the home page. We now need to loop through the events to look for repeating user_ids.
// If the id is repeating we only want to count it once. (i.e its the same person doing multiple home page log ins when we only want each individual new event from a new person)

//as the events information is an array I would create a variable of an empty array. Then I would loop through the events array and create a conditional that would use a ! to
// basically say in the loop "ok Im looking at this ID currently. If it doesn't exist in the new empty array yet, push it over to it." Then if it came to a future entry that had the
// same id, it wouldn't push to the new array. You would then use the timestamps to sort that array in ascending order. That way you should know what action came before or after whatever action you're looking at.
// once there you would just have to loop through the now sorted info in the new array and when an entry has made a visit to the home page to then search for that same user with a timestamp after that
// Inclused the event name "Purchased items in cart". So basically: Find unique users, sort them in ascending order, find if a user visited the home page, then look to see if they ever "Purchased items in cart" after that homepage visit.
// You would have a variable used as a counter to count how many users purchased items after visiting the home page. You'd then divide that number to the number of total visitors (which was already calculated above) to get your conversion rate.

//  4. After a user visits the home page, what are the 3 most frequent things s/he would do next?

// This would be similar to 3 but I would make a counter for each eventName. Then you look through those unique visitors but instead of only looking for purchases we would just look for
// the timestamp for that specific user immediately after they visited the home page (remember we had just hypothetically sorted it in 3 to be in ascending order).
// Then once you do that, ie loop through unique users, find when they visited the home page, then look at the eventName of their next immediate entry we itterate the counter for that eventName.
// In the end it should have a count for all the entries users made immediately after visiting the home page and we'd return the 3 highest counts.

//  5. After a user visits a blog post, what is the most frequent path of events s/he will follow to purchase the items in his/her cart? State any assumptions that you make.

// This would be similar again to 4 just a bit deeper. Rather than look for a home page visit we are looking for a blog post visit. That's all the same just replacing home page visit with blog post visit for the eventName.
// Where it gets deeper is instead of just looking for the next entry, we want to keep tracking the path to a purchase to remember how they got there.
// So what I would do is say once I hit a blog post visit (and assuming we've sorted) I would look at the next event but add a condition asking if the eventName for the next event is a purchase?
// If not I'd continue the conditional and continue to append console logs of the path.
// Essentially then you'd get to a user who hits the blog post and start it off commenting "User ," + eventID," is hitting the blog post here ".
//then continue to add on + If the next one isn't a purchase it would just say "Next they clicked " + eventName etc until we got to a purchase where you'd just end it with something like that stating "purchased here" + that purchase eventName.
// You could create a new emptry array called visitorFlow and push these commented out pathways to it.

// So simply in the end rather than just only having the next entry we get every entry up to the purchase.
//You can loop through all those and compare them to say basically is the 2nd entry the same, 3rd, or however many events is the most common that appears.
// Then you'd be able to track how many had the same path and make a guess on what the user may do based on the higher matching rates. I.e if there is a path that was used 5 times
// by different users in the same order it may be a more justified assumption than a pathway that only 1 user took.