const Lead = require("../models/Lead");
const User = require("../models/User");

const resolvers = {
  Query: {
    leads: async () => {
      const res = await Lead.find();

      return res;
    },
    leadsCount: async () => {
      const res = await Lead.countDocuments();

      return res;
    },
    findUser: async (_, { uid }) => {
      const user = await User.findOne({ uid: uid });

      return user;
    },
  },
};

module.exports = resolvers;
