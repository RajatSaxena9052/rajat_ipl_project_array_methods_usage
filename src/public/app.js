document.addEventListener('DOMContentLoaded', function () {

    fetch('/api/matchesPlayedPerYear')
        .then((res) => res.json())
        .then((MatchesPlayedPerYear) => {

            Highcharts.chart('matchesPlayedPerYear', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '1. Matches played in each year'
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
                        text: 'Number of matches '
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Matches played : <b>{point.y:.0f}</b>'
                },
                series: [{
                    name: 'Population',
                    data: Object.entries(MatchesPlayedPerYear),
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        });

    fetch('/api/matchesWonPerTeamPerYear')
        .then((res) => res.json())
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

            Highcharts.chart('matchesWonPerTeamPerYear', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '2. Matches won by each team over all the seasons of IPL'
                },
                xAxis: {
                    categories: season
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Matches Won'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: series
            });


        });

    fetch("/api/extraRuns2016")
        .then((res) => res.json())
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
        .then((res) => res.json())
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
        .then((res) => res.json())
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
