var potentialFriends = require("../data/friends");

module.exports = function(app){
    //route to get the array of people objects
    app.get("/api/people", function(req, res){
        res.json(potentialFriends);
    });

    //route to post the new user's date to the people api, and finds the best match for the user
    app.post("/api/people", function(req, res){
        var bestMatch;
        //the worst possible matchscore is 40, so this ensures the user will be given a match
        var bestMatchScore = 41;
        //loop through every person in potential friends
        potentialFriends.forEach(function(person){
            //intialize the match score for the current person at 0
            var matchScore = 0;
            //compare the question answers the user submitted to the current potential friend
            for(var i =0; i < person.scores.length; i++){
                //find the difference in answers
                var questionScore = Math.abs(req.body.scores[i] - person.scores[i]);
                //add the difference to the match score
                matchScore += questionScore;
            }
            //if the score is lower than the current best friend match, change the match
            if (matchScore < bestMatchScore){
                //update the best match score 
                bestMatchScore = matchScore;
                //assign this person to best match
                bestMatch = person;
            }
        });
        //push the user to the friends api so other users can match with them
        potentialFriends.push(req.body);
        //send the bestMatch object to the user
        res.json(bestMatch);
    })
}