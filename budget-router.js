const express = require('express');
// database access using knex
const db = require('./data/dbConfig');
const router = express.Router();


//DB HELPERS
const Accounts = {
    getAll(){
        return db('accounts')
    },
    getById(id){
        return db('accounts').where({id})
    },
    create(accounts) {
        return db('accoutns').insert(account)
    },
    update(id, post){
        return db('accounts').where({id})
    },
    delete(id) {
        return db('accounts').where({ id }).del()
    }




}
//DB HELPERS END


router.get('/', (req, res)=>{
    Accounts.getAll()
    .then(data => {res.json(data)})
    .catch(error => { res.json({error: error.message})})
})

router.get('/:id', (req, res) =>{
    Accounts.getById(req.params.id)
    .then(data => {
        // if empty dataset, do something different
        if (!data.length) {
          res.json({ message: 'no account with said id' })
        } else {
          res.json(data[0])
        }
      })
      .catch(error => {
        res.json({ message: error.message })
      })
})

router.post('/', (req, res) => {
    Accounts.create(req.body)
    .then(([id]) => {
        return Accounts.getById(id).first()
    }) 
    .then(data => { res.json(data)})
    .catch(error => { res.json({message: error.message})})
})

router.put('/:id', (req, res) =>{
    Accounts.update(req.params.id, req.body)
    .then(count => {
        if(!count) {
            res.json({message: "no post with that id"})
        } else{
            return Accounts.getById(req.params.id).first()
        }
    })
    .then(data => {
        res.json(data)
    })
    .catch(error => { res.json({message: error.message})})
})

router.delete('/:id', async (req, res) => {
    try{
        const deleteAccount = await Accounts.delete(req.params.id)
        if(!deleteAccount) {
            res.json({message: "no post with given ID"})
        } else{
            res.json({message: 'post deleted successfully'})
        }
    } catch (error){ res.json({message: error.message})}
})





module.exports = router;