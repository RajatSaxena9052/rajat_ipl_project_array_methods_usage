function matchesWonPerTeamPerYear(matchesArray) {
    if (matchesArray !== undefined) {

        let matchesWonPerTeam = matchesArray.reduce((accumulator, matches) => {
            let year = matches.season;

            if (accumulator[year] === undefined) {

                accumulator[year] = matchesArray.reduce((accumulator, matchesPlayed) => {

                    let winningYear = matchesPlayed.season;
                    let teamName = matchesPlayed.winner;

                    if (year === winningYear) {
                        if (accumulator[teamName] === undefined) {
                            accumulator[teamName] = 1;
                        } else {
                            accumulator[teamName] += 1;
                        }
                    }

                    return accumulator;

                }, {});

            }

            return accumulator;

        }, {});

        return matchesWonPerTeam;
    }

    return {};
}
module.exports = matchesWonPerTeamPerYear;