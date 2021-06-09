function PlayerOfMatch(matchesArray) {
    if (matchesArray !== undefined) {

        let allMatchYear = matchesArray.reduce((accumulator, matches) => {
            let year = matches.season;

            accumulator.add(year);

            return accumulator;

        }, new Set());

        let playerOfMatch = [...allMatchYear].reduce((accumulator, season) => {

            let playerPerSeason = matchesArray.reduce((accumulator, matches) => {
                let playerName = matches.player_of_match;
                let year = matches.season;

                if (season == year) {
                    if (accumulator[playerName] === undefined) {
                        accumulator[playerName] = 1;
                    } else {
                        accumulator[playerName] += 1;
                    }
                }

                return accumulator;

            }, {});

            let maxPlayerOfMatch = Object.entries(playerPerSeason)
                .sort((player1, player2) => {
                    return player2[1] - player1[1];
                })

            accumulator[season] = { [maxPlayerOfMatch[0][0]] : maxPlayerOfMatch[0][1] };

            return accumulator;

        }, {});

        return playerOfMatch;
    }

    return {};
}
module.exports = PlayerOfMatch