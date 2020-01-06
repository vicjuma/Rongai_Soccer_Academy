const express = require('express');
const recipeController = require('./../controllers/recipe')

const router = express.Router();

router.post('/', recipeController.createRecipe);

router.get('/:id', recipeController.getOneRecipe);

router.get('/', recipeController.getAllRecipes);

router.put('/:id', recipeController.updateRecipe);

router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;