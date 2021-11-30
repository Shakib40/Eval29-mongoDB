const express = require("express");
const app = express();
const data = require("./job_data.json");



app.use(express.json());

/*

id
company_name
city
location 
skills
work_from_home (Yes/No)
notice_period
rating
opening
details


*/

// Get All Jobs
app.get("/",  (req, res) => {
    try {
        return res.status(201).send(data);
    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get All Jobs
app.get("/jobs",  (req, res) => {
    try {
        return res.status(201).send(data);
    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get All Jobs by city
app.get("/jobs/:city",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.city === req.params.city)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get All Jobs by location
app.get("/jobs/:location",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.location === req.params.location)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// app.get("/jobs/:city/skills/:skill", (req, res) => {
//     const temp = data.filter((p) => {
//         if(p.city === req.params.city)
//             return p;
//     })
//     const data_send = temp.filter((p) => {
//         if(p.skills === req.params.skill)
//              return p;
//     })
//     if(data.length === 0){
//         res.send("job not found");
//     }
//     else
//         res.send(data_send);
// })

// Get All Jobs which have Work form home
app.get("/jobs/work_from_home",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.work_from_home === true)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});



// Get All Jobs which have notice_period n
app.get("/jobs/notice_period/:n",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.notice_period == req.params.n)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get All Jobs which have rating n
app.get("/jobs/rating/:n",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.rating == req.params.n)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get All Jobs which have rating n
app.get("/jobs/rating/:n",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.rating == req.params.n)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get All Jobs by sort by rating
app.get("/jobs/rating",  (req, res) => {
    try {
        const val = data.sort(function(a,b){
            return a.rating - b.rating;
        });
        return res.status(201).send(val);
    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get company which have most jobs opening
app.get("/jobs/opening",  (req, res) => {
    try {
        const val =  data.sort( 
            function(a, b) {
               return parseFloat(b['opening']) - parseFloat(a['opening']);
            }
        )[0]['company_name'];
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get All Jobs which have opening greaterThan n
app.get("/jobs/opening/:n",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.opening >= req.params.n)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

// Get company details by company name
app.get("/jobs/company_details/:company_name",  (req, res) => {
    try {
        const val = data.filter((p) => {
            if(p.company_name == req.params.company_name)
                return p;
        })
        return res.status(201).send(val);

    } 
    catch (e) {  
        return res.status(500).json({ message: e.message, status: "Failed" }); 
    }
});

app.listen(2345, () => {
    console.log("Listening at port 2345");
})

