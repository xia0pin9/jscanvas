// Macro pattern definition
var pattern1 = /@DRAW\sPIECHART\sWITH\sOPTIONS\s(\w+)\sFROM\sDATA\s(\w+)\sAT\s\#(\w+)/gm;
var pattern2 = /@DRAW\sCOLUMNCHART\sWITH\sOPTIONS\s(\w+)\sFROM\sDATA\s(\w+)\sAT\s\#(\w+)/gm;
var pattern3 = /@CREATE\sTABLE\sWITH\s(\w+)\sAT\s\#(\w+)/gm;
var pattern4 = /@CREATE\sFORM\sWITH\s(\w+)\sAT\s\#(\w+)/gm;
var pattern5 = /@DRAW\sSPLINECHART\sWITH\sOPTIONS\s(\w+)\sFROM\sDATA\s(\w+)\,\s(\w+)\sAT\s\#(\w+)/gm;
var pattern6 = /@DRAW\sLINECHART\sWITH\sOPTIONS\s(\w+)\sFROM\sDATA\s(\w+)\sAT\s\#(\w+)/gm;

// Draw pie_chart 
function trans1(args){
	var loc = document.getElementById(args[3]);
	chartdata = eval(args[2]);
	var options = eval(args[1]);
	var title = options["title"];
	var series = options["series"];
	
	$(loc).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: title
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            	percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                     dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: series,
                data: chartdata
            }]
        });
};

// Draw column_chart
function trans2(args){
	var loc = document.getElementById(args[3]);
	chartdata = eval(args[2]);
	var options = eval(args[1]);
	var title = options["title"];
	var subtitle = options["subtitle"];
	var ytitle = options["ytitle"];
	var series = options["series"];
	
	$(loc).highcharts({
            chart: {
                type: 'column',
				zoomType: 'xy'
            },
            title: {
                text: title
            },
            subtitle: {
                text: subtitle
            },
            xAxis: {
                categories: chartdata[0],
            },
            yAxis: {
                min: 0,
				labels: {
                    format: '{value}',
                    style: {
                        color: '#89A54E'
                    }
                },
                title: {
                    text: ytitle
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
            series: [{
                name: series,
                data: chartdata[1]
    
            }]
        });
	
};

// Create table
function trans3(args){
	var loc = document.getElementById(args[2]);
	var tabledata = eval(args[1]);
	var theaddata = tabledata[0];
	var tbodydata = tabledata[1];
	
	var table = $('<table class="table table-bordered">'+
		      '<thead><tr id="thead'+counts+'"></tr></thead>'+
		      '<tbody id="tbody'+counts+'"></tbody></table>');
	$(loc).append(table);
	//$(table).find('thead'+counts).append($('<tr></tr>'));
	for (var i=0; i<theaddata.length; i++){
	    var elem = $("<th></th>").text(theaddata[i]);
	    $(table).find('#thead'+counts).append($(elem));
	}
	for (var i=0; i<tbodydata.length; i++){
	    var id = "tby"+i;
	    var tr = document.createElement("tr");
	    $(tr).attr('id', id);//addClass(id);
	    $(table).find('#tbody'+counts).append(tr);
	    var row = tbodydata[i];
	    for (var j=0; j<row.length; j++){
		var element = $("<th></th>").text(row[j]);
		$(element).css({'font-weight':'normal'});
		$(table).find('#'+id).append($(element));
	    }
	}
};

// Create form
function trans4(args){
	var loc = document.getElementById(args[2]);
	var formdata = eval(args[1]);
	var title = formdata['title'];
	var action = formdata['action'];
	var method = formdata['method'];
	var inputs = formdata['input'];
	var form = $('<form class="form-horizontal">' +
		     '<fieldset id="fbody'+counts+
		     '"><div id="legend'+counts+'"></div>' + 
		     '</fieldset></form>');
	$(loc).append(form);
	$(form).attr('action',action);
	$(form).attr('method',method);
	//$(loc).append(form);
	//Set form title
	var lgcontent = $('<legend class=""></legend>').text(title);
	$(form).find('#legend'+counts).append(lgcontent);

	//Process form inputs
	for (var i=0; i<inputs.length;i++) {
	    var inputid = "input"+i;
	    var cgroup = $('<div class="control-group"></div>');
	    $(cgroup).attr('id', 'cgroup'+i);
	    $(form).find('#fbody'+counts).append(cgroup);
	    var controls = $('<div class="controls"></div>');
	    $(controls).attr('id', 'control'+i);
	    $(form).find('#cgroup'+i).append(controls);
	    if (inputs[i][0] == "button") {
			var button = $('<button class="btn btn-success"></button>').text(inputs[i][1]);
			$(form).find('#control'+i).append(button);
	    }else{
			var label = $('<label class="control-label"></label>').text(inputs[i][1]);
			$(label).attr('for', inputs[i][0]);
			var input = $('<input placeholder="" class="input-xlarge">');	
			$(input).attr('id', inputs[i][0]);
			$(input).attr('name', inputs[i][0]);
			if (inputs[i][0] == "password"){
				$(input).attr('type', inputs[i][0]);
			}else{
				$(input).attr('type', 'text');
			}
			$(form).find('#cgroup'+i).prepend(label);
			$(form).find('#control'+i).append(input);
	    }
	}
};

// Draw dynamic_chart
function trans5(args){
        var options = eval(args[1]);
        var ctitle = options['charttitle'];
        var xtitle = options['xtitle'];
        var ytitle = options['ytitle'];
        var dname  = options['dataname'];
        var point  = options['pointnum'];
        var cycle  = options['updatecycle'];
        var loc = document.getElementById(args[4]);
        var x = eval(args[2]);
        var y = eval(args[3]);
        drawChart(loc, cycle, ctitle, xtitle, ytitle, dname, point, x, y);
};

// Draw line_chart
function trans6(args){
	var loc = document.getElementById(args[3]);
	chartdata = eval(args[2]);
	var options = eval(args[1]);
	var title = options["title"];
	var subtitle = options["subtitle"];
	var ytitle = options["ytitle"];
	var series = options["series"];
	$(loc).highcharts({
            chart: {
                type: 'line',
				zoomType: 'xy'
            },
            title: {
                text: title
            },
            subtitle: {
                text: subtitle
            },
            xAxis: {
                categories: chartdata[0],
            },
            yAxis: {
                min: 0,
				labels: {
                    format: '{value}',
                    style: {
                        color: '#89A54E'
                    }
                },
                title: {
                    text: ytitle
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
            series: [{
                name: series,
                data: chartdata[1]
    
            }]
        });
};

// Concrete function call for splinechart with dynamical content
function drawChart(loc, cycle, ctitle, xtitle, ytitle, dataname, pointnum, xvalue, yvalue){
	Highcharts.setOptions({global: {useUTC: false}});
    
	$(loc).highcharts({
		chart: {
			type: 'spline',
			animation: Highcharts.svg, // don't animate in old IE
			marginRight: 10,
			events: {
				load: function() {   
					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function() {
						var x = eval(xvalue), // current time
							y = eval(yvalue);
						series.addPoint([x, y], true, true);							
					}, cycle * 1000);
				}
			}
		},
		title: {text: ctitle},
		xAxis: {
			type: 'datetime',
			title: {text: xtitle}
		},
		yAxis: {
			title: {text: ytitle},
			plotLines: [{value: 0, width: 1, color: '#808080'}]
		},
		tooltip: {
			formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {enabled: false},
		exporting: {enabled: false},
		series: [{
			name: dataname,
			data: (function() {
				//generate an array of default data, initialize the graph
				var data = [], i;    
				for (i = -(pointnum-1); i <= 0; i++) {
					data.push({
						x: eval(xvalue) + i * 1000,
						y: 0
					});
				}
				return data;					
			})()
		}]
	});
}

// Record the number of macro calls, prevent temporary DOM id name collision
var counts = 0;

// Macro processor control framework starts
var macrotable = [
	[pattern1, trans1], 
	[pattern2, trans2], 
	[pattern3, trans3], 
	[pattern4, trans4], 
	[pattern5, trans5],
	[pattern6, trans6]
];

function transform_dsl() {
	// Specified by JSCanvas, all macro calls must be put within a <p> tag
	var scripts = document.getElementsByTagName("p"); 
	// Replace each macro pattern within web page if exists
	for (var i=0; i < scripts.length; i ++ ) {
		var element = scripts[i];
		// Check if current <p> html element is a macro call
		for (var j=0; j < macrotable.length; j ++)
		{	
			// Determine the specific macro call within the <p> tag
			var re = macrotable[j][0];
			// Pattern matching via regular expression
			var results = re.exec(element.textContent);
			if (results == null)
			{
				continue; // normal <p> tag
			}
			counts ++;
			// Hide the macro call element
			$(element).remove();
			// Get the corresponding macro translation handle
			var fun = macrotable[j][1];
			// Call the translation function with matched string
			fun(results);
		}
	}
}

$(document).ready(function(){
	transform_dsl();
});
// Macro processor control framework ends

