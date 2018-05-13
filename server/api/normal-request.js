import express from 'express';
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const connection = closure => mongoClient.connect('mongodb://localhost:27017/test', (err, db)=> err? console.log(err) : closure(db));
let response = {
    data : [],
    message: null,
    status: 200
}
router.get('/first-load', (req, res)=>{
    connection(db => db.collection('test').find().sort({_id: 1}).limit(30).toArray((err, result)=>{
        response.data = result;
        res.json(response);
    }));
});

router.get('/gainers-load', (req, res)=>{
    connection(db => db.collection('test').find().sort({value: -1}).limit(20).toArray((err, result)=>{
        response.data = result;
        res.json(response);
    }));
});

router.get('/losers-load', (req, res)=>{
    connection(db => db.collection('test').find().sort({value: 1}).limit(20).toArray((err, result)=>{
       response.data = result;
       res.json(response) 
    }))
})
module.exports = router;