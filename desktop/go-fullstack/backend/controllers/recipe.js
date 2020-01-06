const Recipe = require('./../models/recipe');

exports.createRecipe = (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    time: req.body.time,
    difficulty: req.body.difficulty
  });
  recipe.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

exports.getOneRecipe = (req, res, next) => {
  Recipe.findOne({
    _id: req.params.id
  }).then(
    (recipes) => {
      res.status(200).json(recipes);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}

exports.getAllRecipes = (req, res, next) => {
  Recipe.find().then(
    (recipes) => {
      res.status(200).json(recipes);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

exports.updateRecipe = (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    time: req.body.time,
    difficulty: req.body.difficulty
  });
  Recipe.updateOne({_id: req.params.id}, recipe).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

exports.deleteRecipe = (req, res, next) => {
  Recipe.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}