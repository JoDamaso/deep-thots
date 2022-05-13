const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => { // get a thought by user name
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => { // get a single thought
            return Thought.findOne({ _id });
        },
        user: async () => { // get all users
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },
        user: async (parent, { username }) => { // get a user by username
            return User.findOne({ username }) 
                .select('-__v -password') // omitting this data from the search
                .populate('friends')
                .populate('thoughts');
        }
    }
};

// 21.1.6

module.exports = resolvers;