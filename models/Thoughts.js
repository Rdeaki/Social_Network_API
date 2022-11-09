const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//reaction schema ---------------------

const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 250
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

//-------------------------------------

//thought schema ----------------------

const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 250,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

//----------------------------------------------


// get total friend count--------------------

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// create User model
const Thought = model('Thought', thoughtSchema);

// exports thought model
module.exports = Thought;