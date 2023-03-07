const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const { ObjectId } = require('mongodb')
// need a ref variable for stories collection in mongodb
let stories;
exports.getCollection = db => 
{
    stories = db.collection('stories')
}

exports.find = () => stories.find().toArray();

exports.findById = id => stories.findOne({_id: new ObjectId(id)});

exports.save = function (story) {
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = function(id, newStory) {
    let story = stories.find(story=>story.id === id);
    if(story) {
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
    }
 
}

exports.deleteById = function(id) {
    let index = stories.findIndex(story =>story.id === id);
    if(index !== -1) {
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
}