import express from "express";
import multer from "multer";
import {
  getAllRecipes,
  getOneRecipe,
  getUserRecipes,
  createRecipe,
  deleteRecipe,
  editRecipe,
  likeRecipe,
} from "../controllers/RecipeController.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = express.Router();
// const upload = multer();
router.use(requireAuth)
router.get("/", getAllRecipes);
router.get("/user", getUserRecipes);
router.get("/:id", getOneRecipe);
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);
router.put("/:id", editRecipe);
router.put("/like/:id", likeRecipe);

export default router;
