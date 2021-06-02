function dismissedPlayer(deliveriesArray) {
    if (deliveriesArray !== undefined) {

        let playersDismissed = deliveriesArray.reduce((accumulator, deliveries) => {
            let playerName = deliveries.player_dismissed;
            let dismissedBy = deliveries.fielder;

            if (playerName != "" && dismissedBy != "") {

                if (accumulator[playerName] == undefined) {
                    accumulator[playerName] = 1;
                } else {
                    accumulator[playerName] += 1;
                }

            }

            return accumulator;

        }, {});

        let maxDismissedPlayer = Object.entries(playersDismissed)
            .sort((player1, player2) => {
                return player2[1] - player1[1];
            });

        return {
            playerName: maxDismissedPlayer[0][0],
            DismissalTime: maxDismissedPlayer[0][1]
        };

    }

    return {};
}
module.exports = dismissedPlayer