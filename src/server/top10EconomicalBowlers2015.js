function top10EconomicalBowlers2015(matchArray, deliveriesArray) {
    if (matchArray !== undefined && deliveriesArray !== undefined) {

        let allMatchId = matchArray.reduce((accumulator, matches) => {
            let year = matches.season;
            let matchId = matches.id;

            if (year === '2015') {
                accumulator.add(matchId);
            }

            return accumulator;

        }, new Set());

        let allBowlerName = deliveriesArray.reduce((accumulator, deliveries) => {
            let bowlerName = deliveries.bowler;

            if (allMatchId.has(deliveries.match_id)) {
                accumulator.add(bowlerName);
            }
            return accumulator;

        }, new Set());


        let allEconomy = [...allBowlerName].reduce((accumulator, bowler) => {
            if (accumulator[bowler] === undefined) {
                let totalRuns = 0, bowls = 0;

                accumulator[bowler] = deliveriesArray.reduce((accumulator, delivery) => {
                    let matchId = delivery.match_id;
                    let bowlerName = delivery.bowler;
                    let runs = delivery["total_runs"];

                    if (allMatchId.has(matchId) === true && bowlerName == bowler) {
                        totalRuns += parseInt(runs);
                        bowls++;
                    }
                    accumulator = Math.floor(totalRuns / (bowls / 6));

                    return accumulator;
                });

            }
            return accumulator;
        }, {});

        let topEconomy = Object.entries(allEconomy)
            .sort((player1, player2) => player1[1] - player2[1])
            .slice(0, 10)
            .reduce((accumulator, playerName) => {
                accumulator[playerName[0]] = playerName[1];
                return accumulator;
            }, {});

        return topEconomy;
    }

    return {}
}
module.exports = top10EconomicalBowlers2015