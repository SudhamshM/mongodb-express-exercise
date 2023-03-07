const { ObjectId } = require('mongodb')
// need a ref variable for stories collection in mongodb
let stories;
exports.getCollection = db => 
{
    stories = db.collection('stories')
}

exports.find = () => stories.find().toArray();

exports.findById = id => stories.findOne({_id: new ObjectId(id)});

exports.save = (story) =>
{
    return stories.insertOne(story);
};

exports.updateById = (id, newStory) => stories.updateOne
                    (
                        {_id: new ObjectId(id)},
                        {$set: {title: newStory.title, content: newStory.content}}
                     )

exports.deleteById = function(id) {
    return stories.deleteOne({_id: new ObjectId(id)})
}