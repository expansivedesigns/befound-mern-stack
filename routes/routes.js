const express = require("express")
const router = express.Router()
const modelCopy = require("../models/models")

router.post("/form", async (req, res) => {
    const data = req.body
    const modelInstance = new modelCopy(data)    

    modelInstance.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error =>{
        res.json(error)
    })

    res.send(`${modelInstance} added to the database`) 
    results.push(modelInstance)  

})

//to see data as and endpoint
router.get('/results', (req, res) => {
    modelCopy.find({ })
        .then((data) => {
            console.log('Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error: ', dataerror)
        })
})

module.exports = router