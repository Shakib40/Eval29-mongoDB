const express = require('express');
const mongoose = require('mongoose');

const connect  = () => {
    return mongoose.connect("mongodb://localhost:27017/test2");
};

const jobSchema = new mongoose.Schema(
{
    title: { type: 'string', require: true },
    location:{ type: 'string', require: true },
    period: { type: 'string', require: true},
    rating: { type: 'string', require:true },
    open: { type: 'string', require: true}
},
{
    versionKey:false,
    timestamp:true,
}
);
const User = mongoose.model("user" , jobSchema);

// CRUD
const app = express();
app.use(express.json());

app.post('/jobs' , async(req,res) => {
    try {
        const jobs = await User.create(req.body);
        return res.status(200).send(jobs);
    }catch (err) {
        return res.status(500).json({message: err.message , status:"Failed"});
    }

})

app.get('/jobs' , async(req, res) => {
    try {
        const jobs = await User.find().lean().exec();
        return res.send(jobs);
    }catch (err) {
        return res.status(500).json({message: err.message , status:"Failed"});
    }              
})

app.get('/jobs/:location' , async(req, res) => {
    try {
        const jobs = await User.findById(req.params.location).lean().exec();
        return res.send(jobs);
    }catch (err) {
        return res.status(500).json({message: err.message , status:"Failed"});
    }              
})


app.listen(2345, async function() {
    await connect();
    console.log("Listening on Port 2345");   
});
