module.exports = (sequelize, DataTypes) => {
  const Led = sequelize.define("led", {
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
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
