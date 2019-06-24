module.exports = (sequelize, DataTypes) => {
  const Led = sequelize.define("led", {
    position: {
      type: String
    },
    temp: {
      type: String
    },
    door: {
      type: String
    }
  });
  return Led;
};
