function superOver(deliveriesArray) {
    if (deliveriesArray !== undefined) {

        let superOverMatchPlayer = deliveriesArray.reduce((accumulator, delivery) => {
            let superOver = delivery.is_super_over;

            if (superOver > 0) {
                let superOverBowler = delivery["bowler"];
                let superOverRuns = delivery["total_runs"];

                if (accumulator[superOverBowler] == undefined) {
                    accumulator[superOverBowler] = {
                        "runsGiven": parseInt(superOverRuns),
                        "bowls": 1
                    };
                } else {
                    accumulator[superOverBowler]["runsGiven"] += parseInt(superOverRuns);
                    accumulator[superOverBowler]["bowls"] += 1;
                }

            }

            return accumulator;

        }, {});

        let minimumEconomy = null;

        let BestEconomicSuperOverPlayer = Object.entries(superOverMatchPlayer)
            .reduce((accumulator, player) => {
                let bowler = player[0]
                let runsGiven = player[1]["runsGiven"];
                let overs = player[1]["bowls"] / 6;
                let calculatedEconomy = runsGiven / overs;

                if (minimumEconomy == null) {
                    minimumEconomy = calculatedEconomy;
                }
                else if (minimumEconomy > calculatedEconomy) {
                    minimumEconomy = calculatedEconomy;
                    accumulator["bowlerName"] = bowler;
                    accumulator["economy"] = minimumEconomy;
                }

                return accumulator;

            }, {
                bowlerName: "",
                economy: ""
            });

        return BestEconomicSuperOverPlayer;
    }

    return {};
}
module.exports = superOver