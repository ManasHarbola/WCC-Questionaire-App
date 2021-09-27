/*
Sorts all tags from lowest percentage to highest

Takes input in format
    {
        "tag1" : [user_tag_score, max_score],
        "tag2" : ....
    }

and return output in format

    [{"tagName" : "tag1", "user_tag_score": , "max_score"}, ....]

*/
export function rank_all_tags(tags) {
    let tag_list = [];
    for (const [key, value] of Object.entries(tags)) {
        tag_list.push({"tagName" : key, "user_tag_score" : value[0], "max_score" : value[1]});
    }

    //sort array by user_tag_score/max_score
    tag_list.sort(
        function(tag1, tag2) {
            let tag1_percentage = tag1.user_tag_score / tag1.max_score;
            let tag2_percentage = tag2.user_tag_score / tag2.max_score;

            if (tag1_percentage < tag2_percentage) {
                return -1;
            }
            if (tag1_percentage > tag2_percentage) {
                return 1;
            }

            return 0;
        }
    );
    
    return tag_list;
}

/*
Returns at most k lowest scoring (by percentage) tags

Takes input in format
    {
        "tag1" : [user_tag_score, max_score],
        "tag2" : ....
    }

and return output in format

    [{"tagName" : "tag1", "user_tag_score": , "max_score"}, ....]

*/
export function get_k_lowest_tags(tags, k) {
    let tag_list = rank_all_tags(tags);
    //return k lowest tag results
    return tag_list.slice(0, k);
}
