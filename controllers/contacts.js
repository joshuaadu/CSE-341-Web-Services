const mongodb = require('../db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('cse341').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('cse341').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const create = async (req, res) => {
  if (!req.body?.firstName) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const result = await mongodb.getDb().db('cse341').collection('contacts').insertOne(req.body);
  console.log(result);
  res.status(201).json({ message: 'Contact created!' });
};

const update = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .updateOne({ _id: userId }, { $set: req.body });
  console.log(result);
  res.status(200).json({ message: 'Contact updated!' });
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .deleteOne({ _id: userId });
  console.log(result);
  res.status(200).json({ message: 'Contact deleted!' });
};

module.exports = { getAll, getSingle, create, update, deleteContact };
