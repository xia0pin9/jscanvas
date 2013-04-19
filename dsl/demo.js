var pattern1 = /@PRINT\s(\w+)\s(\w+)/gm;
var pattern2 = /@DRAW\s(\w+)/gm;
var pattern3 = /@CREATE\sTABLE\sWITH\s(\w+)\sAT\s\#(\w+)/gm;
var pattern4 = /@CREATE\sFORM\sWITH\s(\w+)\sAT\s\#(\w+)/gm;
var pattern5 = /@DRAW\sSPLINECHART\sWITH\sOPTIONS\s(\w+)\sFROM\sDATA\s(\w+)\,\s(\w+)\sAT\s\#(\w+)/gm;
var pattern6 = /@SHOW\s(\w+)\s(\w+)/g;

function trans1(args, handle){
	//alert(args);
	// Create a new node;
	var newnode = $('<p>I am just for test.</p>');
	//else alert($(this)+"no"+handle);
	//$(handle).after(newnode);
	//$(handle).parent().find('#demo').remove();
};

function trans2(args, handle){
	
};

function trans3(args, handle){
	var loc = document.getElementById(args[2]);
	var tabledata = eval(args[1]);
	var theaddata = tabledata[0];
	var tbodydata = tabledata[1];
	
	var table = $('<table class="table table-bordered">'+
		      '<thead><tr id="thead"></tr></thead>'+
		      '<tbody class="tbody"></tbody></table>');
	$(loc).append(table);
	//$(table).find('thead').append($('<tr></tr>'));
	for (var i=0; i<theaddata.length; i++){
	    var elem = $("<th></th>").text(theaddata[i]);
	    $(table).find('#thead').append($(elem));
	}
	for (var i=0; i<tbodydata.length; i++){
	    var id = "tby"+i;
	    var tr = document.createElement("tr");
	    $(tr).attr('id', id);//addClass(id);
	    $(table).find('.tbody').append(tr);
	    var row = tbodydata[i];
	    for (var j=0; j<row.length; j++){
		var element = $("<th></th>").text(row[j]);
		$(element).css({'font-weight':'normal'});
		$(table).find('#'+id).append($(element));
	    }
	}
	$(handle).remove();
};

function trans4(args, handle){
	$(handle).remove();
	var loc = document.getElementById(args[2]);
	var formdata = eval(args[1]);
	var title = formdata['title'];
	var action = formdata['action'];
	var method = formdata['method'];
	var inputs = formdata['input'];
	var form = $('<form class="form-horizontal">' +
		      '<fieldset id="fbody"><div id="legend"></div>' + 
		      '</fieldset></form>');
	$(loc).append(form);
	$(form).attr('action',action);
	$(form).attr('method',method);
	//$(loc).append(form);
	//Set form title
	var lgcontent = $('<legend class=""></legend>').text(title);
	$(form).find('#legend').append(lgcontent);

	//Process form inputs
	for (var i=0; i<inputs.length;i++) {
	    var inputid = "input"+i;
	    var cgroup = $('<div class="control-group"></div>');
	    $(cgroup).attr('id', 'cgroup'+i);
	    $(form).find('#fbody').append(cgroup);
	    var controls = $('<div class="controls"></div>');
	    $(controls).attr('id', 'control'+i);
	    $(form).find('#cgroup'+i).append(controls);
	    if (inputs[i][0] == "button") {
			var button = $('<button class="btn btn-success"></button>').text(input[i][1]);
			$(form).find('#control'+i).append(button);
	    }else{
			var label = $('<label class="control-label"></label>').text(input[i][1]);
			$(label).attr('for', input[i][0]);
			var input = $('<input type="text" placeholder="" class="input-xlarge">');	
			$(input).attr('id', input[i][0]);
			$(input).attr('name', input[i][0]);
			$(form).find('#cgroup'+i).prepend(label);
			$(form).find('#control'+i).append(input);
	    }
	}
};

function trans5(args, handle){
        $(handle).remove();
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
	//alert(eval(y));
        drawChart(loc, cycle, ctitle, xtitle, ytitle, dname, point, x, y);
};

function trans6(args, handle){
	$(handle).remove();
	var options = eval(args[1]);
	var ctitle = options['charttitle'];
	var xtitle = options['xtitle'];
	var ytitle = options['ytitle'];
	var dname  = options['dataname'];
	var point  = options['pointnum'];
	var cycle  = options['updatecycle'];
	var loc = document.getElementById(args[4]);
	var x = args[2];
	var y = args[3];
	drawChart(loc, cycle, ctitle, xtitle, ytitle, dname, point, x, y);
};

var macrotable = [
	[pattern1, trans1], 
	[pattern2, trans2], 
	[pattern3, trans3], 
	[pattern4, trans4], 
	[pattern5, trans5],
	[pattern5, trans6]
];

function transform_dsl() {
	var scripts = document.getElementsByTagName("p");
	for (var i=0; i < scripts.length; i ++ ) {
		var element = scripts[i];
		for (var j=0; j < macrotable.length; j ++)
		{	
			var re = macrotable[j][0];
			var results = re.exec(element.textContent);
			if (results == null)
			{
				continue;
			}
			var fun = macrotable[j][1];
			fun(results,element);
		}
	}
}

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
				for (i = -(pointnum); i < 0; i++) {
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

/*function outerHTML(node){
     return node.outerHTML || new XMLSerializer().serializeToString(node);
}*/

$(document).ready(function(){
	transform_dsl();
});
