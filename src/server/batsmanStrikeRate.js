function batsmanStrikeRate(matchesArray, deliveriesArray) {
    if (matchesArray != undefined && deliveriesArray != undefined) {

        let yearWithIds = matchesArray.reduce((accumulator, matches) => {
            let year = matches["season"];
            let matchId = matches["id"];

            if (accumulator[year] == undefined) {
                accumulator[year] = [matchId];
            } else {
                accumulator[year].push(matchId);
            }

            return accumulator;

        }, {});

        let batsmanWithStrikeRate = Object.entries(yearWithIds)
            .reduce((accumulator, yearId) => {
                let allBatsmanName = deliveriesArray.reduce((accumulator, delivery) => {
                    let oneMatchIdPerSeason = yearId[1][0];
                    let id = delivery.match_id;
                    let name = delivery.batsman;

                    if (id == oneMatchIdPerSeason) {
                        if (accumulator.indexOf(name) == -1) {
                            accumulator.push(name);
                        }
                    }

                    return accumulator;

                }, []);


                accumulator[yearId[0]] = deliveriesArray.reduce((accumulator, deliveries) => {
                    if (yearId[1].indexOf(deliveries["match_id"]) !== -1 && deliveries["batsman"] === allBatsmanName[0]) {

                        if (accumulator[allBatsmanName[0]] === undefined) {

                            accumulator[allBatsmanName[0]] = {
                                bowls: 0,
                                runs: 0,
                                strikeRate: 0
                            };

                        } else {

                            accumulator[allBatsmanName[0]]["bowls"] += 1;
                            accumulator[allBatsmanName[0]]["runs"] += parseInt(deliveries["batsman_runs"]);
                            accumulator[allBatsmanName[0]]["strikeRate"] = ((accumulator[allBatsmanName[0]]["runs"] / accumulator[allBatsmanName[0]]["bowls"]) * 100).toFixed(3);

                        }

                    }

                    return accumulator;
                }, {});

                return accumulator;

            }, {});

        return batsmanWithStrikeRate;

    }
    return {};
}
module.exports = batsmanStrikeRate;