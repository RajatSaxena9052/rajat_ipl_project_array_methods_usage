function teamsWonTossMatch(matchArray) {
    if (matchArray !== undefined) {

        let teamNames = matchArray.reduce((accumulator, matches) => {
            accumulator.add(matches["team1"]);
            accumulator.add(matches["team2"]);

            return accumulator;

        }, new Set());


        let teamsWonTossMatch = [...teamNames].reduce((accumulator, names) => {

            accumulator[names] = matchArray.reduce((accumulator, matches) => {
                let tossWinner = matches["toss_winner"];
                let matchWinner = matches["winner"];

                if (tossWinner == names && matchWinner == names) {
                    accumulator += 1;
                }

                return accumulator;
            }, 0);

            return accumulator;

        }, {});

        return teamsWonTossMatch;

    }
    return {}
}
module.exports = teamsWonTossMatch