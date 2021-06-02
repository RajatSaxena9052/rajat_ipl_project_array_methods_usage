function extraRunsConcededPerTeam2016(matchArray, deliveriesArray) {
    if (matchArray !== undefined && deliveriesArray !== undefined) {

        let matchIds = matchArray.reduce((accumulator, matches) => {
            let year = matches.season;

            if (year == 2016) {
                let matchId = matches.id

                accumulator.add(matchId);
            }

            return accumulator;

        }, new Set());

        let extraRuns = deliveriesArray.reduce((accumulator, deliveries) => {
            let matchId = deliveries.match_id

            if (matchIds.has(matchId)) {
                let teamName = deliveries['batting_team'];

                if (accumulator[teamName] === undefined) {
                    accumulator[teamName] = parseInt(deliveries['extra_runs']);
                } else {
                    accumulator[teamName] += parseInt(deliveries['extra_runs']);
                }

            }

            return accumulator;

        }, {});

        return extraRuns;
    }
    return {}
}
module.exports = extraRunsConcededPerTeam2016