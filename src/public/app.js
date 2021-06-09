document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/matchesPlayedPerYear')
        .then((resp) => resp.json())
        .then((MatchesPlayedPerYear) => {
            Highcharts.chart("matches-played-per-year", {

                title: {
                    text: '1. Matches Played per season'
                },

                subtitle: {
                    text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
                },

                xAxis: {
                    categories: Object.keys(MatchesPlayedPerYear)
                },

                series: [{
                    type: 'column',
                    colorByPoint: true,
                    data: Object.values(MatchesPlayedPerYear),
                    showInLegend: false
                }]

            });


        });

    fetch('/api/matchesWonPerTeamPerYear')
        .then((resp) => resp.json())
        .then((matchesWonPerTeam) => {

            let Team = [], teamNamesPerSeason = Object.values(matchesWonPerTeam), season = Object.keys(matchesWonPerTeam)


            let teamNames = teamNamesPerSeason.reduce((accumulator, teamsPerSeason) => {
                Object.keys(teamsPerSeason).forEach(names => {
                    if (accumulator.has(names) == false && names != "") {
                        accumulator.add(names)
                    }
                })
                return accumulator
            }, new Set())

            let series = [...teamNames].reduce((accumulator, names) => {
                let winingTime = teamNamesPerSeason.reduce((accumulator, teamPerSeason) => {

                    if (teamPerSeason[names] == undefined) {
                        accumulator.push(0)
                    } else {
                        accumulator.push(teamPerSeason[names])
                    }
                    return accumulator;
                }, []);

                accumulator.push({
                    name: names,
                    data: winingTime
                })

                return accumulator
            }, [])

            Highcharts.chart("matches-won-per-team", {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '2. Matches won by each team over all the seasons of IPL'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
                },
                xAxis: {
                    categories: season,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Matches Won'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: series,
            })

        });



        

});