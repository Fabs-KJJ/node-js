const Student = require('../model/Studentsmodels');
const createError = require('http-errors'); // You need to require the 'http-errors' library
const mongoose = require('mongoose');

module.exports = {
    AddStudent: async (req, res) => {
        try {
            const student = new Student(req.body);
            const result = await student.save();
            res.send(result);
        } catch (error) {
            console.error(error.message);
        }
    },
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find({})
            res.send(students)
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Internal Server Error')
        }
    },
    getStudent: async (req, res, next) => {
        const id = req.params.id;
        try {
            const student = await Student.findById(id);
            if (!student) {
                throw createError(404, "Student does not exist");
            }
            res.send(student);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid student id"));
                return;
            }
            next(error);
        }
    },
    deleteStudent: async (req, res, next) => {
        const id = req.params.id;
        try {
            const student = await Student.findByIdAndRemove(id);
            if (!student) {
                throw createError(404, "Student does not exist");
            }
            res.send(student);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid student id"));
                return;
            }
            next(error);
        }
    }
};
