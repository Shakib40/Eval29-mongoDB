const express = require("express");
const app = express();
const data = require("./data.json");


data.forEach((p) => {
    p.notice_period = Math.floor(Math.random() * 3);
    p.rating = Math.floor(Math.random() * 10);
    p.opening = Math.floor(Math.random() * 50);
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send(data);
    res.end();
})

app.get("/jobs/:city/skills/:skill", (req, res) => {
    const temp = data.filter((p) => {
        if(p.city === req.params.city)
            return p;
    })
    const data_send = temp.filter((p) => {
        if(p.skills === req.params.skill)
             return p;
    })
    if(data.length === 0){
        res.send("job not found");
    }
    else
        res.send(data_send);
})

app.get("/jobs/wfh", (req, res) => {
    const newData = data.filter((p) => {
        if(p.wfh === true)
            return p;
    })
    res.send(newData);
})

app.get("/jobs/notice_period/:n", (req, res) => {
    const newData = data.filter((p) => {
        if(p.notice_period >= req.params.n)
            return p;
    })
    res.send(newData);
})

app.get("/jobs/rating/:n", (req, res) => {
    const newData = data.filter((p) => {
        if(p.rating >= req.params.n)
            return p;
    })
    res.send(newData);
})


app.get("/jobs/company_details/:company_name", (req, res) => {
    const newData = data.filter((p) => {
        if(p.company_name == req.params.company_name)
            return p;
    })
    res.send(newData);
})

app.listen(2345, () => {
    console.log("Listening at port 2345");
})