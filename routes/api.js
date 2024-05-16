const express = require('express');
// const { Next } = require('react-bootstrap/esm/PageItem');
const routes = express.Router();

const Student = require('../model/Studentsmodels');
const studentController = require('../controller/studentController');
const { verifyAccessToken } = require('../helpers/JWThelper');

//get a list of students from the database
routes.get("/students/:id",verifyAccessToken, async (req, res)=>{
    const result = await Student.find({});
    res.send(/*{type:"Get Request"}*/ result);
});

routes.get('/students', verifyAccessToken, studentController.getAllStudents);

routes.post('/students',verifyAccessToken, studentController.AddStudent);

// Update students in the DB
// routes.put("/students/:id", (req, res)=>{
//     res.send({type: "Update Request"});
// });

//update students in the DB
routes.patch('/updateStudents/:id', async(req, res, next) => {
    try{
        const id = req.params.id;
        const update = req.body;
        const options = {new: true}
        const result = await Student.findByIdAndUpdate(id, update, options)
        
        res.send(result);
    }catch(error){
        console.log(error.message)
    }
})

//Delete a student from the DB
routes.delete("/students/:id", async(req, res) =>{
    const id = req.params.id 
    try{
        const student = await Student.findByIdAndRemove(id)
        res.send(student);
    }catch(error){
        console.log(error.message);
    }
    //res.send({type:"Delete Request"});
});
module.exports = routes;