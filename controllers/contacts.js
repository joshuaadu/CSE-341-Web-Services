const mongodb = require('../db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const create = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to create a new contact'
  // #swagger.responses[201] = {
  //   description: 'Contact created',
  // }
  // #swagger.responses[400] = {
  //   description: 'Missing name',
  // }
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'New contact object.',
                required: true,
        } */
  if (!req.body?.firstName) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const result = await mongodb.getDb().db().collection('contacts').insertOne(req.body);
  if (result.acknowledged) {
    res.status(201).json({ message: 'Contact created!', id: result.insertedId });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }

  console.log(result);
};

const update = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to update a contact'
  // #swagger.responses[204] = {
  //   description: 'Contact updated',
  // }
  // #swagger.responses[400] = {
  //   description: 'Missing name',
  // }
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Contact object.',
                required: true,
        } */
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .updateOne({ _id: userId }, { $set: req.body });
  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
  // res.status(204).json({ message: 'Contact updated!' });
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle, create, update, deleteContact };
