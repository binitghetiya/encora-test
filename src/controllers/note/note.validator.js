const Joi = require("joi");

export const addNote = {
  body: {
    note: Joi.string().required(),
  },
};

export const updateNote = {
  body: {
    note: Joi.string().required(),
  },
  params: {
    noteId: Joi.number().required(),
  },
};

export const deleteNote = {
  params: {
    noteId: Joi.number().required(),
  },
};
