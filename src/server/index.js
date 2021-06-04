const csvToJson = require("csvtojson");
const outputFileGenerator = require("./outPutFileGenerator");


const matches = "src/data/matches.csv";
const deliveries = "src/data/deliveries.csv";

const matchesPlayedPerYear = require("./matchesPlayedPerYear");
const matchesWonPerTeamPerYear = require("./matchesWonPerTeamPerYear");
const extraRunsConcededPerTeam2016 = require("./extraRunsConcededPerTeam2016");
const top10EconomicalBowlers2015 = require("./top10EconomicalBowlers2015");
const teamsWonTossMatch = require("./teamsWonTossMatch");
const playerOfMatch = require("./playerOfMatch");
const batsmanStrikeRate = require("./batsmanStrikeRate");
const dismissedPlayer = require("./dismissedPlayer");
const superOver = require("./superOver");

function main() {
    csvToJson()
        .fromFile(matches)
        .then((matches) => {
            csvToJson()
                .fromFile(deliveries)
                .then((deliveries) => {

                    let calculatedValues = {
                        matchPlayedPerYear: matchesPlayedPerYear(matches),
                        matchWonPerTeam: matchesWonPerTeamPerYear(matches),
                        extraRuns: extraRunsConcededPerTeam2016(matches, deliveries),
                        tenEconomicPlayer: top10EconomicalBowlers2015(matches, deliveries),
                        wonTossAndMatch: teamsWonTossMatch(matches),
                        winnerOfPlayerOfMatch: playerOfMatch(matches),
                        strikeRate: batsmanStrikeRate(matches, deliveries),
                        playerDismissed: dismissedPlayer(deliveries),
                        superOverEconomy: superOver(deliveries)
                    };

                    convertAndSave(calculatedValues);
                });
        });
}

function convertAndSave(calculatedValues) {

    outputFileGenerator("matchesPerYear.json", calculatedValues.matchPlayedPerYear, "outputfile matchesPerYear.json is created").then(data => {
        console.log(data);

        return outputFileGenerator("matchesWonPerTeam.json", calculatedValues.matchWonPerTeam, "outputfile matchesWonPerTeam.json is created");
    }).then(data => {
        console.log(data);

        return outputFileGenerator("extraRuns2016.json", calculatedValues.extraRuns, "outputfile extraRuns2016.json is created");
    }).then(data => {
        console.log(data);

        return outputFileGenerator("economicalBowlers2015.json", calculatedValues.tenEconomicPlayer, "outputfile economicalBowlers2015.json is created");
    }).then(data => {
        console.log(data);

        return outputFileGenerator("teamsWonTossMatch.json", calculatedValues.wonTossAndMatch, "outputfile teamsWonTossMatch.json is created");
    }).then(data => {
        console.log(data);

        return outputFileGenerator("teamsWonTossMatch.json", calculatedValues.wonTossAndMatch, "outputfile teamsWonTossMatch.json is created");
    }).then(data => {
        console.log(data)

        return outputFileGenerator("playerOfMatch.json", calculatedValues.winnerOfPlayerOfMatch, "outputfile playerOfMatch.json is created");
    }).then(data => {
        console.log(data);

        return outputFileGenerator("strikeRate.json", calculatedValues.strikeRate, "outputfile strikeRate.json is created");
    }).then(data => {
        console.log(data);

        return outputFileGenerator("highestDismissedPlayer.json", calculatedValues.playerDismissed, "outputfile highestDismissedPlayer.json is created");
    }).then(data => {
        console.log(data);

        return outputFileGenerator("bestSuperOverBowler.json", calculatedValues.superOverEconomy, "outputfile bestSuperOverBowler.json is created");
    }).then(data => {
        console.log(data);

    }).catch(error => {
        console.log(error);
    });

}

main();