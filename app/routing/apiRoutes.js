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
                matchScore += questionScore;
            }
            //if the score is lower than the current best friend match, change the match
            if (matchScore < bestMatchScore){
                bestMatch = person;
            }
        });
        
        potentialFriends.push(req.body);
        console.log(bestMatch);
        res.json(bestMatch);
    })
}