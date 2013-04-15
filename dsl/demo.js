var pattern1 = /@PRINT\s(\w+)\s(\w+)/gm;
var pattern2 = /@DRAW\s(\w+)/gm;
var pattern3 = /@CREATE\sTABLE\sWITH\s(\w+)\sAT\s\#(\w+)/gm;
var pattern4 = /@CREATE\sFORM\sWITH\s(\w+)\sAT\s\#(\w+)/gm;
var pattern5 = /@OUTPUT\s(\w+)/gm;
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
	var loc = document.getElementById(args[2]);
	var formdata = eval(args[1]);
	var title = formdata['title'];
	var action = formdata['action'];
	var method = formdata['method'];
	var inputs = formdata['input'];
	var form = $('<form class="form-horizontal">' +
		      '<fieldset id="fbody"><div id="legend"></div>' + 
		      '</fieldset></form>');
	$(form).attr('action',action);
	$(form).attr('method',method);
	$(loc).append(form);
	//Set form title
	var lgcontent = $('<legend class=""></legend>').text(title);
	$(form).find('#legend').append(lgcontent);

	//Process form inputs
	for (var i=0; i<inputs.length;i++) {
	    var inputid = "input"+i;
	}
};

function trans5(args, handle){
	alert(args);
};

function trans6(args, handle){
	alert(args);
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
		//alert(element.textContent);
		//if (element.src) continue;
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

var data;
/*
function requestData(type) {
	$.ajax({
		url: 'query.php', 
		success: function(point) {
			data = point;
			alert(data);
			//var series = chart.series[0],
			//	shift = series.data.length > 20; // shift if the series is longer than 20
		},
		cache: false,
		data: "mode="+type,
		contentType: "application/json; charset=utf-8",
		type:"GET"
	});
}*/

function outerHTML(node){
     return node.outerHTML || new XMLSerializer().serializeToString(node);
}

$(document).ready(function(){
	transform_dsl();
});
