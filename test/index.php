<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Power Grid</title>
		<!--[if lte IE 8]><script language="javascript" type="text/javascript" src=".test/excanvas.min.js"></script><![endif]-->
		
		<script language="javascript" type="text/javascript" src="./jquery.js"></script>
	
		<script language="javascript" type="text/javascript" src="./highcharts.js"></script>
		<script src="http://code.highcharts.com/modules/exporting.js"></script>
	</head>
	<body id="framePage">
	<div id="container" style="width: 800px; height: 400px; margin: 0 auto"></div>
<script language="javascript" type="text/javascript" src="./draw_chart.js"></script>

	</body>
	<script type="text/javascript">
function resizeIframe(iframeID) {
if(self==parent) return false; /* Checks that page is in iframe. */
else if(document.getElementById&&document.all) /* Sniffs for IE5+.*/

var FramePageHeight = framepage.scrollHeight + 10; /* framePage
is the ID of the framed page's BODY tag. The added 10 pixels prevent an
unnecessary scrollbar. */

parent.document.getElementById(iframeID).style.height=FramePageHeight;
/* "iframeID" is the ID of the inline frame in the parent page. */
}
</script>
</html>