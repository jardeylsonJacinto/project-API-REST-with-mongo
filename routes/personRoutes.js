const router = require('express').Router();
const Person = require('../models/Person')

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;

  if(!name){
    return res.status(422).json({ error: "The name is mandatory!"});
  }

  const person = { name, salary, approved };

  try {
    await Person.create(person);
    res.status(201).json({ message: "inserted person in the system with success"});
  }catch(e){
    res.status(500).json({ Error: e});
  }
})

router.get('/', async (req, res) => {
  try{
    const people = await Person.find();
    res.status(200).json(people);
  }catch (e) {
    res.status(500).json({ error: e});
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params.id;

  try{
    const person = await Person.findOne({_id: id});

    if(!person){
      return res.status(422).json({ message: "User not found!"})
    }

    res.status(200).json(person);
  }catch (e) {
    res.status(500).json({error: e})
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  }

  try {
    const updatePerson = await Person.updateOne({_id: id}, person)

    if(updatePerson.matchedCount === 0){
      return res.status(422).json({ message: "User not found!"})
    }

    res.status(200).json(person)
  } catch (e) {
    res.status(500).json({ error: e})
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params.id;

  const person = await Person.findOne({_id: id})
  
  if(!person){
    return res.status(422).json({ message: "User not found!"})
  }

  try{
    await Person.deleteOne({_id: id})
    res.status(200).json({ message: "User removed success!"})
  } catch (e) {
    res.status(500).json({ error: e})
  }
})

module.exports = router;