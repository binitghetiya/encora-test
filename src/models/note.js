"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      note: DataTypes.STRING,
    },
    {}
  );
  Note.associate = function (models) {
    // associations can be defined here
  };
  return Note;
};
