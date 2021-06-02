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
        //console.log(Object.entries(yearWithIds))

        let result = Object.entries(yearWithIds)
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
                //console.log(allBatsmanName[0])

                accumulator[yearId[0]] = deliveriesArray.reduce((accum, deliveries) => {
                    if (yearId[1].indexOf(deliveries["match_id"]) !== -1 && deliveries["batsman"] === allBatsmanName[0]) {

                        if (accum[allBatsmanName[0]] === undefined) {
                            accum[allBatsmanName[0]] = {
                                bowls: 0,
                                runs: 0,
                                strikeRate: 0
                            };
                        } else {

                            accum[allBatsmanName[0]]["bowls"] += 1;
                            accum[allBatsmanName[0]]["runs"] += parseInt(deliveries["batsman_runs"]);
                            accum[allBatsmanName[0]]["strikeRate"] = ((accum[allBatsmanName[0]]["runs"] / accum[allBatsmanName[0]]["bowls"]) * 100).toFixed(3)

                        }
                    }
                    return accum
                }, {});


                return accumulator

            }, {});

        console.log(result)

        // for (let season in yearWithIds) {
        //     let batsman = {}
        //  

        //     let name = Object.keys(batsman)[0]

        //     for (let id of yearWithIds[season]) {
        //         for (let deliveries of deliveriesArray) {
        //             if (deliveries["match_id"] == id && deliveries["batsman"] == name) {
        //                 batsman[name]["bowls"] += 1
        //                 batsman[name]["runs"] += parseInt(deliveries["batsman_runs"])
        //             }
        //         }
        //     }
        //     batsman[name]["strikeRate"] = ((batsman[name]["runs"] / batsman[name]["bowls"]) * 100).toFixed(3)
        //     yearWithIds[season] = batsman
        // }

        // return yearWithIds
    }
    return {}
}
module.exports = batsmanStrikeRate