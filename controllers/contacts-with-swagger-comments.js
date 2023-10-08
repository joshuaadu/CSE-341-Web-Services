const mongodb = require('../db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to get all contacts'
  // #swagger.responses[200] = {
  //   description: 'List of contacts',
  // }

  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to get a single contact'
  // #swagger.responses[200] = {
  //   description: 'Contact',
  // }
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'contact ID.',
        required: true,
        type: 'string'
    } */
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
                description: 'Some description...',
                required: true,
        } */

  if (!req.body?.firstName) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const result = await mongodb.getDb().db().collection('contacts').insertOne(req.body);
  console.log(result);
  res.status(201).json({ message: 'Contact created!', id: result.insertedId });
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

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .updateOne({ _id: userId }, { $set: req.body });
  console.log(result);
  res.status(204);
  // res.status(204).json({ message: 'Contact updated!' });
};

const deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to delete a contact'
  // #swagger.responses[200] = {
  //   description: 'Contact deleted',
  // }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  console.log(result);
  res.status(200).json({ message: 'Contact deleted!' });
};

module.exports = { getAll, getSingle, create, update, deleteContact };
