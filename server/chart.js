//Get the quickchart-js module
const QuickChart = require('quickchart-js')

module.exports = (currencyData) => {

    //Create a new instance
    const myChart = new QuickChart()

    let labelArray = []
    let dataArray = []
    
    Object.entries(currencyData.rates).forEach(([key, value]) => {
      labelArray.push(key.substring(8,10) + "/" + key.substring(5,7))
      dataArray.push(Number(value.BRL.toFixed(2)))
    })

    //Define the chart
    myChart
		.setConfig({
			type: 'line',
			data: {
			labels: labelArray,
			datasets: [
				{
				label: 'Euro last month',
				backgroundColor: 'rgb(50, 205, 86)',
				borderColor: 'rgb(45, 186, 78)',
				data: dataArray,
				fill: false,
				},
			],
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Euro last month',
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				},
				scales: {
					xAxes: [
					{
						display: true,
					},
					],
					yAxes: [
					{
						display: true,
						min: 0,
						max: 100,
						ticks: {
						stepSize: 5,
						},
					},
					],
				},
			},
		})
		.setWidth(1000)
		.setHeight(500)
		.setVersion('3')

    //Return the chart URL to be sent via email
    return myChart.getUrl()
}