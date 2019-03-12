var potentialFriends = require("../data/friends");

module.exports = function(app){

    app.get("/api/people", function(req, res){
        res.json(potentialFriends);
    })

    app.post("/api/people", function(req, res){
        var bestMatch;
        var bestMatchScore = 41;
        //loop through every person in potential friends
        potentialFriends.forEach(function(person){
            var matchScore = 0;
            //compare the question answers the user submitted to the current potential friend
            for(var i =0; i < person.scores.length; i++){
                //find the difference in answers
                var questionScore = Math.abs(req.body.scores[i] - person.scores[i]);
                console.log(questionScore);
                matchScore += questionScore;
            }
            console.log(bestMatchScore, " ", matchScore);
            //if the score is lower than the current best friend match, change the match
            if (matchScore < bestMatchScore){
                bestMatchScore = matchScore;
                bestMatch = person;
            }
        });
        //push the user to the friends api so other users can match with them
        potentialFriends.push(req.body);
        console.log(bestMatch);
        //send the bestMatch object to the user
        res.json(bestMatch);
    })
}