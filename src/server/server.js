const express = require("express");
const app = express();
const port = process.env.port || 5000;
const path = require("path")

let home = path.join(__dirname, "../public");

const matchesPlayedPerYearData = require(path.join(__dirname,"../public/output/matchesPerYear.json"))
const matchesWonPerTeamPerYearData = require(path.join(__dirname,"../public/output/matchesWonPerTeam"))



app.use(express.static(home));

app.get("/api/matchesPlayedPerYear",(req,res)=>{
    res.send(matchesPlayedPerYearData)
})

app.get("/api/matchesWonPerTeamPerYear",(req,res)=>{
    res.send(matchesWonPerTeamPerYearData)
})



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
