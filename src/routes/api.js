import express from "express";
import validate from "express-validation";

import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";
import * as noteController from "../controllers/note/note.controller";
import * as noteValidator from "../controllers/note/note.validator";

const router = express.Router();

//= ===============================
// all API routes are under protectoin from apiAuth
//= ===============================

router.get("/me", userController.profile);
router.post(
  "/changePassword",
  validate(userValidator.changePassword),
  userController.changePassword
);

// Note routes
router.get("/notes", noteController.allNotes);
router.post("/notes", validate(noteValidator.addNote), noteController.addNote);
router.put(
  "/notes/:noteId",
  validate(noteValidator.updateNote),
  noteController.updateNote
);
router.delete(
  "/notes/:noteId",
  validate(noteValidator.deleteNote),
  noteController.deleteNote
);

module.exports = router;
