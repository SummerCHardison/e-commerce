const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{model: Product}]
    });
    // find all instances of category and include connections to product
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if error retun 500 and log the error
});

router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    // find instances of category with the specified primary key value and include connections to product

    if (!categoriesData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    };

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if no id return 404 and a message, if error retun 500 and log the error
});

router.post('/', async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body);
    // create a new instance of category using the data given in the request body
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if error retun 500 and log the error
});

router.put('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    // update the instance of category where the id matches the request parameter to include what is written in the body

    if (!categoriesData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    };

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if no id return 404 and a message, if error retun 500 and log the error
});

router.delete('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    // delete instance of category where id matches the param value

    if (!categoriesData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if no id return 404 and a message, if error retun 500 and log the error
});

module.exports = router;
