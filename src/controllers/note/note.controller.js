import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import { User, Note } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";

export const allNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    const page = req.query.page || 1;
    const limit = 10;
    const notes = await Note.findAndCountAll({
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * limit,
      limit,
      where: {
        userId: userId,
      },
    });
    return successResponse(req, res, notes);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addNote = async (req, res) => {
  try {
    const { note } = req.body;
    const { userId } = req.user;

    const existNote = await Note.findOne({
      where: { note, userId },
    });
    if (existNote) {
      throw new Error("same note already exists");
    }
    const payload = {
      note,
      userId,
    };
    await Note.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { note } = req.body;
    const { noteId } = req.params;
    const { userId } = req.user;

    const existNote = await Note.findOne({
      where: { id: noteId },
    });
    if (!existNote) {
      return errorResponse(req, res, "Note not found", 404);
    }

    if (existNote.userId !== userId) {
      throw new Error("you are not authorized to update this note");
    }

    await Note.update({ note }, { where: { id: noteId } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { userId } = req.user;

    const existNote = await Note.findOne({
      where: { id: noteId },
    });
    if (!existNote) {
      return errorResponse(req, res, "Note not found", 404);
    }

    if (existNote.userId !== userId) {
      throw new Error("you are not authorized to delete this note");
    }

    await Note.destroy({ where: { id: noteId } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
