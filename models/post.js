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
    },
    solarTemp: {
      type: String
    },
    voltage:{
      type: Number
    }
  });
  return Led;
};
