//<script type="text/javascript">

		var chart; // global
		var i = 1;
		/**
		 * Request data from the server, add it to the graph and set a timeout to request again
		 */
		function requestData() {
			$.ajax({
				url: 'query.php', 
				success: function(point) {
					var series = chart.series[0],
						shift = series.data.length > 20; // shift if the series is longer than 20
					
					// add the point
					chart.series[0].addPoint([(new Date().getTime()/2),parseFloat(point[1])], true, shift);
					chart.series[1].addPoint([(new Date().getTime()/2),parseFloat(point[2])], true, shift);
					// call it again after one second
					setTimeout(requestData, 1000);	
				},
				cache: false,
				data: 'i='+(i++),
				contentType: "application/json; charset=utf-8",
				type:"GET"
			});
		}
			
		$(document).ready(function() {
		Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
			chart = new Highcharts.Chart({
				chart: {
					renderTo: 'container',
					defaultSeriesType: 'spline',
					animation: Highcharts.svg, 
					events: {
						load: requestData
					}
				},
				title: {
					text: 'Power Supply Monitor'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 1 * 1000,
					minorGridLineColor: '#cccccc',
					minorTickInterval: 'auto'
				},
				yAxis: {
					min: 0,
					gridLineColor: '#197F07',
					gridLineWidth: 1,
					minorGridLineColor: '#cccccc',//'#c5EEFa',
					minorTickInterval: 'auto',
					//minorGridLineDashStyle: 'longdash',
					minorTickColor: '#197F07',
					minorTickWidth: 1,
					//alternateGridColor: '#f3f3f3',
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'Value',
						margin: 40
					},
					plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
				},
				tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
			legend: {
                enabled: true
            },
            exporting: {
                enabled: true
            },
				series: [{
					name: 'Consumption',
					data: []
				},{
					name: 'Generation',
					type: 'areaspline',
					color: '#e60000',
					data: []
				}]
			});	
		});
		//</script>