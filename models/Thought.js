const { Schema, model } = require('mongoose');
const moment = require('moment');

// reaction Schema

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    username: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// thought Schema

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      Required: true,
      minLength: 1,
      maxLength: 280,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
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
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;
