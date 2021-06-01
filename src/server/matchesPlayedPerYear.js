function matchesPlayedPerYear(matchesArray) {
    if (matchesArray !== undefined) {

        let matchesPlayed = matchesArray.reduce((accumulator, matches) => {
            let year = matches['season'];

            if (accumulator[year] == undefined) {
                accumulator[year] = 1;
            } else {
                accumulator[year] += 1;
            }

            return accumulator;

        }, {});

        return matchesPlayed;

    }
    return {};
}
module.exports = matchesPlayedPerYear