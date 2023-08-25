const Stargazing = require('../../models/stargazing');



async function create(req, res) {
  try {
    const stargazing = await Stargazing.create({
      title: req.body.title,
      observations: req.body.observations,
      user: req.user._id
    });
    res.status(201).json(stargazing);
  } catch(err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
   const stargazings = await Stargazing.find().populate('user');
   res.json(stargazings);
 } catch (err) {
  console.log(err)
  res.status(500).json(err);
 }
}


module.exports = {
  create,
  index
};


