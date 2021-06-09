document.addEventListener('DOMContentLoaded', function () {

    fetch('/api/matchesPlayedPerYear')
        .then((resp) => resp.json())
        .then((MatchesPlayedPerYear) => {

            Highcharts.chart('matchesPlayedPerYear', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: '1. Matches played in each year'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'number of matches',
                    data: Object.entries(MatchesPlayedPerYear)
                }]
            });

        });

    fetch('/api/matchesWonPerTeamPerYear')
        .then((resp) => resp.json())
        .then((matchesWonPerTeam) => {

            let teamNamesPerSeason = Object.values(matchesWonPerTeam), season = Object.keys(matchesWonPerTeam);


            let teamNames = teamNamesPerSeason.reduce((accumulator, teamsPerSeason) => {
                Object.keys(teamsPerSeason).forEach(names => {

                    if (accumulator.has(names) == false && names != "") {
                        accumulator.add(names);
                    }

                })
                return accumulator;
            }, new Set());

            let series = [...teamNames].reduce((accumulator, names) => {
                let winingTime = teamNamesPerSeason.reduce((accumulator, teamPerSeason) => {

                    if (teamPerSeason[names] == undefined) {
                        accumulator.push(0);
                    } else {
                        accumulator.push(teamPerSeason[names]);
                    }

                    return accumulator;

                }, []);

                accumulator.push({
                    name: names,
                    data: winingTime
                });

                return accumulator;

            }, []);

            Highcharts.chart("matchesWonPerTeamPerYear", {
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
            });

        });

    fetch("/api/extraRuns2016")
        .then((resp) => resp.json())
        .then((extraRuns2016) => {
            let year = 2016;

            Highcharts.chart("extraRuns2016", {
                chart: {
                    type: 'column'
                },
                title: {
                    text: `3. Extra runs conceded by each team in ${year}`
                },
                subtitle: {
                    text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Extra Runs'
                    }
                },
                series: [{
                    name: `Team Names played in ${year}`,
                    data: Object.entries(extraRuns2016),
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',

                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        });

    fetch("/api/economicalBowlers2015")
        .then((resp) => resp.json())
        .then((economicalBowlers2015) => {

            let name = Object.entries(economicalBowlers2015).reduce((accumulator, name) => {
                accumulator.push(name[0]);
                return accumulator;
            }, []);

            let economy = Object.entries(economicalBowlers2015).reduce((accumulator, bowler) => {
                accumulator.push(bowler[1]);
                return accumulator;
            }, []);

            Highcharts.chart('economicalBowlers2015', {
                title: {
                    text: "4. Economical bowler in 2015"
                },
                subtitle: {
                    text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
                },
                xAxis: {
                    text: "players",
                    categories: name
                },
                series: [{
                    type: 'column',
                    colorByPoint: true,
                    data: economy,
                    showInLegend: false
                }]
            });
        });

    fetch("/api/teamsWonTossMatch")
        .then((resp) => resp.json())
        .then((teamsWonTossMatch) => {

            Highcharts.chart('teamsWonTossMatch', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '5. Teams winning toss and match'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Winning number'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Won toss and match: <b>{point.y:.1f}</b>'
                },
                series: [{
                    name: 'Winning number',
                    data: Object.entries(teamsWonTossMatch),
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });

        });

});
