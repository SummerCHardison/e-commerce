const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: "productTag"}]
    });
    // find all instances of tag and include connections to product
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if error retun 500 and log the error
});

router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: "productTag"}]
    });
    // find instances of tag with the specified primary key value and include connections to product

    if (!tagsData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    };

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if no id return 404 and a message, if error retun 500 and log the error
});

router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    // create a new instance of tag using the data given in the request body
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if error retun 500 and log the error
});

router.put('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    // update the instance of tag where the id matches the request parameter to include what is written in the body

    if (!tagsData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    };

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if no id return 404 and a message, if error retun 500 and log the error
});

router.delete('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id
      }
      // delete instance of tag where id matches the param value
    });

    if (!tagsData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // return 200 status and the data if success, if no id return 404 and a message, if error retun 500 and log the error
});

module.exports = router;
