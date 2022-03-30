const models = require('../../models');

const index = async function (req, res) {
  req.query.limit = req.query.limit || 10;
  let limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    console.log('error');
    res.status(400).end();
  }
  let user = await models.User.findAll({
    limit: limit,
  });
  res.json(user);
};
const show = async function (req, res) {
  let id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  let user = await models.User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) return res.status(404).end();
  res.json(user);
};

const destroy = async function (req, res) {
  let id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  await models.User.destroy({
    where: { id: id },
  });
  res.status(204).end();
};

const create = async function (req, res) {
  try {
    let name = req.body.name;
    if (!name) return res.status(400).end();

    let user = await models.User.create({ name });
    res.json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).end();
    }
  }

  res.status(201).json(user);
};

const update = async function (req, res) {
  try {
    let id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    let name = req.body.name;
    if (!name) return res.status(400).end();

    //   if (isConfict) return res.status(409).end();

    let user = await models.User.findOne({ where: { id } });
    if (!user) return res.status(404).end();
    else {
      user.name = name;
      await user.save();
    }
    res.json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).end();
    }
  }
};

module.exports = {
  index,
  show,
  destroy,
  create,
  update,
};
