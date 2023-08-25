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

async function deleteOne(req, res) {

  const entry = await Stargazing.findById(req.params.id);

  if (!entry) {
    return res.status(404).json({ message: 'Entry not found' });
  }

  // Make sure user is authorized
  if (entry.user.toString() !== req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' }); 
  }

  try {
    await entry.remove();
    res.json(entry);
  } catch (err) {
    const error = createError(500, err.message);
    return next(error);
  }

}
  




module.exports = {
  create,
  index,
  deleteOne
};


