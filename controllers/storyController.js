const model = require('../models/story');
exports.index = (req, res)=>{
    model.find()
    .then(stories => res.render('./story/index', { stories }))
    .catch(err => next(err))
};

exports.new = (req, res)=>{
    res.render('./story/new');
};

exports.create = (req, res, next)=>{

    let story = req.body;
    story.createdAt = new Date();
    model.save(story)
    .then(() => res.redirect('/stories'))
    .catch(err => next(err));
    
};

exports.show = (req, res, next)=>{
    let id = req.params.id; // string type, converted to objectId
    model.findById(id)
    .then(story => 
    {
        if(story) {
            res.render('./story/show', {story});
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err))
   
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let story = model.findById(id);
    if(story) {
        res.render('./story/edit', {story});
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next)=>{
    let story = req.body;
    let id = req.params.id;

   if (model.updateById(id, story)) {
       res.redirect('/stories/'+id);
   } else {
    let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
   }
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id))
        res.redirect('/stories');
    else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};