/*
Takes question responses in format:
{
    "question_id" : {"point_value" : x , "max_value" : y, "tags" : ["library", "voting",...],
    ...
}
and returns:
{
    "user_points" : some_val,
    "max_points" : some_val,
    "tag_scores" : {
        "tag1" : [user_tag_score, max_score],
        "tag2" : ....
    }
}
}
*/
export function calculate_scores(answers) { 
    let scores = {
        "user_score" : 0,
        "max_score" : 0,
        "tag_scores" : {}
    };
    console.log(answers);
    for (let key in answers) {
        //update current user score
        scores["user_score"] += answers[key]["point_value"];
        //update max 
        scores["max_score"] += answers[key]["max_value"];

        const tags = answers[key]["tags"];
        console.log("Loop stage 1");
        if(!answers[key] || !tags) continue;
        if(typeof tags == "string") {
            //if tag doesnt exist in scores["tag_scores"], then create it
            if (!(tags in scores["tag_scores"])) {
                scores["tag_scores"][tags] = [0, 0];
            }
            //update user tag score
            scores["tag_scores"][tags][0] += answers[key]["point_value"];
            //update max tag score
            scores["tag_scores"][tags][1] += answers[key]["max_value"];
        } else {
            tags.forEach(
                (tag) =>  {
                    //if tag doesnt exist in scores["tag_scores"], then create it
                    if (!(tag in scores["tag_scores"])) {
                        scores["tag_scores"][tag] = [0, 0];
                    }
                    //update user tag score
                    scores["tag_scores"][tag][0] += answers[key]["point_value"];
                    //update max tag score
                    scores["tag_scores"][tag][1] += answers[key]["max_value"];
                }
            );
        }
    }
    console.log("End");
    return scores;
}