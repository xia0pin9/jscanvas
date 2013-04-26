JSCanvas
========

1. INTRODUCTION:

   JSCanvas is a bottom-up domain specific language, which is specialized for the domain of web based data display. JSCanvas is mainly built upon jQuery, Highcharts, and Bootstrap libraries, aim at supporting an easy-to-use clean code data display language.
   

2. DOCUMENTATION:

   JSCanvas includes six components. There are FORM, TABLE, LINECHART, COLUMNCHART, PIECHART and SPLINECHART. In order to apply this DSL, first we need to include jQuery, Bootstrap, and Highcharts library in the page, which is put under 'js' folder. And of course include 'jscanvas.js' as well. Bootstrap provides an nice front-end web developing framework, we can present wonderful bootstrap-style graphical components through calling of particular class name.

   The language should be used in HTML page and put between '<p></p>' and start with '@'.

  (1) With JSCanvas, we can create a table or form using keyword 'CREATE' the grammar is:
		
		CREATE (TABLE | FORM) WITH 'data' AT '#container';

   'data' is an array veriable that specifies the graphical content you want to present. '#container' is the DOM element with id of "container" in HTML that specifies the location where you want to create this table or from.

   For example, if we want create a table, we can simply create a '<div id = "container">' at the desired location and define an array of data specifying what kind of information we want to present:

	data = [
		thead =>
			[Source IP		Destination IP	Signature										Timestamp],
		tbody => [
			[129.130.10.82	164.113.67.73	(http_inspect) OVERSIZE REQUEST-URI DIRECTORY	2012-05-10 14:35:31]
			[129.130.10.82	164.113.67.80	(http_inspect) OVERSIZE REQUEST-URI DIRECTORY	2012-05-10 14:35:31]
			[129.130.10.82	164.113.67.73	(http_inspect) OVERSIZE REQUEST-URI DIRECTORY	2012-05-10 14:35:36]
			[129.130.10.133	98.129.116.171	SENSITIVE-DATA Email Addresses					2012-05-10 14:35:38]
			[129.130.10.133	98.129.116.171	SDF_COMBO_ALERT									2012-05-10 14:35:38]
			[129.130.10.133	98.129.116.171	SENSITIVE-DATA Email Addresses					2012-05-10 14:35:40]
			[129.130.10.133	98.129.116.171	SDF_COMBO_ALERT									2012-05-10 14:35:40]
			[129.130.10.133	98.129.116.171	SENSITIVE-DATA Email Addresses					2012-05-10 14:35:42]
			[129.130.10.133	98.129.116.171	SDF_COMBO_ALERT									2012-05-10 14:35:42]
			[129.130.10.82	164.113.67.73	(http_inspect) OVERSIZE REQUEST-URI DIRECTORY	2012-05-10 14:35:42]
		]
	]

	<p>@CREATE TABLE WITH data AT #container;</p>

   Then JSCanvas will simply create a table for us!

   Also, we can create a from without much of effort, form need a dictionary variable, specifies "title", "action", "method", "input"  for example we can crate a form like this:

	var data = {
		"title":"Login",	//form name
		"action":"login.php",	//form action
		"method":"post",	//form method
		"input":[['username','Username'],['password','Password'],['button','Login']],	//components inside form
	} 
 
	<p>@CREATE FROM WITH data AT #container;</p>
	
   (2)	With JSCanvas, we can draw different charts by using keyword 'DRAW' the grammar is:

	DRAW (LINECHART | COLUMNCHART | PIECHART | SPINECHART) WITH OPTIONS 'opt' FROM DATA 'data' AT '#container';
	
    For line chart and column chart the 'data' is an array variable and 'opt' is a dictionary with fields: "title", "subtitle", "ytitle", and "series", for example:

	data = [219554, 687439, 297786, 233928, 282759, 237110, 195981, 270769, 196751, 283103, 219356, 1069451, 291615, 82437];
	var opt = {
		"title":"title name",	//title of chart
		"subtitle":"subtitle name",	//subtitle of chart
		"ytitle":"y axis name",	//name of y-axis
		"series":"series name"	//name of series
	};
		
	<p>@DRAW LINECHART WITH OPTION opt FORM DATA data AT #container;</p>
	
    For pie chart the data requries a two-dimension array for example:

	data = [
        	['Firefox',   45.0],	//name, precentage
            	['IE',       26.8],
            	['Safari',    8.5],
            	['Opera',     6.2],
            	['Others',   0.7]
	];

	var option = {
		"title":"title",	//name of chart
		"series":"series name"	//name of series
	};
		
	<p>@DRAW PIECHART WITH OPTIONS option FROM DATA data AT #well;</p>
	
	
    Finally SPINECHART is a keyword for drawing dynamic chart, for dynamic chart, it is a little bit special, first we need two data arguments one for x-axis, and one for y-axis and each variable only contain one value at a time instead of an array. For example:

	var opts = {
		"charttitle" : "title name",	//name of chart
		"xtitle" : "x-axis name",	//name of x-axis
		"ytitle" : "y-axis name",	//name of y-axis
		"dataname" : "series name",	//name of series 
		"pointnum" : 20,	//maximum number of points show on chart
		"updatecycle" : 1,	//update inteval
	}
	var xvalue = "(new Date()).getTime());
	var yvalue = Math.random();
	
	<p>@DRAW SPLINECHART WITH OPTIONS opts FROM DATA xvalue, yvalue AT #well;</p>
	
    On the other hand, we can also integrate with AJAX and update data every certain amount of time(according to the "updatecycle" that user set) from server, for example: 

	function getValue() {
		var ytemp;
		$.ajax({
			url:'query.php',
			async: false,
			data:'mode=current&time='+getTime(),
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				ytemp = data;
			}
		})
		return ytemp;
	
	
	function getTime() {	return (new Date()).getTime();	}
	
	var xvalue = "getTime()";
	var yvalue = "getValue()";
	
	var opts = {
		"charttitle" : "title",
		"xtitle" : "x-axis name",
		"ytitle" : "y-axis name",
		"dataname" : "series name",
		"pointnum" : 20,	//maximum number of points show on chart
		"updatecycle" : 1,	//update per second
	}
	
	<p>@DRAW SPLINECHART WITH OPTIONS opts FROM DATA xvalue, yvalue AT #well;</p>
	
    With this setup, the chart will query point per second and add it on chart.

	
3. DEMO:

   Currently, we have implemented six macro components. Each component has a seperate usage example. They are put in login.html, latest.html, total.html, half.html, port.html, current.html, corresponding with FORM, TABLE, LINECHART, COLUMNCHART, PIECHART, SPLINECHART macro components respectively. Accoring to the needs and situations, different macro patterns may need different data specification.

   The Demo_DSL is 