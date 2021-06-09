const express = require("express");
const app = express();
const port = process.env.port || 5000;
const path = require("path")

let home = path.join(__dirname, "../public");

const matchesPlayedPerYearData = require(path.join(__dirname, "../public/output/matchesPerYear.json"))
const matchesWonPerTeamPerYearData = require(path.join(__dirname, "../public/output/matchesWonPerTeam"))
const extraRuns2016Data = require(path.join(__dirname, "../public/output/extraRuns2016.json"))
const economicalBowlers2015Data = require(path.join(__dirname, "../public/output/economicalBowlers2015.json"))
const teamsWonTossMatchData = require(path.join(__dirname, "../public/output/teamsWonTossMatch.json"));

app.use(express.static(home));

app.get("/api/matchesPlayedPerYear", (req, res) => {
    res.send(matchesPlayedPerYearData);
})

app.get("/api/matchesWonPerTeamPerYear", (req, res) => {
    res.send(matchesWonPerTeamPerYearData);
})
app.get("/api/extraRuns2016", (req, res) => {
    res.send(extraRuns2016Data);
})
app.get("/api/economicalBowlers2015", (req, res) => {
    res.send(economicalBowlers2015Data);
})
app.get("/api/teamsWonTossMatch", (req, res) => {
    res.send(teamsWonTossMatchData);
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
