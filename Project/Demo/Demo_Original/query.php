<?php
//set the JSON header
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-type: text/json");

include("config.php");

$mode = $_GET['mode'];

switch($mode) {
    case "half":
    	//$query= "select date_format(timestamp, '%Y') as 'year', date_format(timestamp, '%m') as 'month', count(cid) as 'total' from event group by date_format(timestamp, '%Y%m')";
    	$categories = array("May 2012 Day 01-15", "May 2012 Day 16-31", "Jun 2012 Day 01-15", "Jun 2012 Day 16-30", "Jul 2012 Day 01-15", "Jul 2012 Day 16-31", "Aug 2012 Day 01-15", "Aug 2012 Day 16-31", "Sep 2012 Day 01-15", "Sep 2012 Day 16-30", "Oct 2012 Day 01-15", "Oct 2012 Day 16-31", "Nov 2012 Day 01-15", "Nov 2012 Day 16-30");
	$data = array(219554, 687439, 297786, 233928, 282759, 237110, 195981, 270769, 196751, 283103, 219356, 1069451, 291615, 82437);

	$result = array($categories, $data);
	echo json_encode($result);
	break;
    case "current":
    	$time = $_GET['time'];
	$query = "SELECT COUNT(sid) FROM event WHERE TIMESTAMP = DATE_SUB( FROM_UNIXTIME('$time'/1000 ) , INTERVAL 6 MONTH )";
    	$result = $mysqli->query($query);
	if ($result) {
		$row = mysqli_fetch_row($result);
		echo $row[0];
	}else{
		echo 0; //$time;
	}
	break;
    case "port":
	/*$tcpquery = "select tcp_dport,count(tcp_dport) from tcphdr group by tcp_dport";	
	udpquery = "select udp_dport,count(udp_dport) from udphdr group by udp_dport";	*/
	$data = array(array('21', 4), array('22', 775666), array('25', 19437), array('80', 2531023), array('110', 205), array('139', 22), array('143', 3028), array('443', 196166), array('636', 2707), array('993', 82), array('other', 20), array('593', 3), array('928', 4), array('995', 5));
	echo json_encode($data);
	break;
    case "latest":
	$query = "select inet_ntoa(ip_src) as ipsrc, inet_ntoa(ip_dst) as ipdst, sig_name, timestamp from event, iphdr, signature where iphdr.cid = event.cid and signature.sig_id = event.signature limit 10";
	$thead = array("Source IP", "Destination IP", "Signature Info", "Timestamp");
	$tbody = array();
	$result = $mysqli->query($query);
	if ($result)//->num_rows > 0)
	{    
		while($row = $result->fetch_assoc()) {
		array_push($tbody, array($row['ipsrc'],$row['ipdst'],$row['sig_name'],$row['timestamp']));
		};
	}
	echo json_encode(array($thead,$tbody));
	//$result->free();
	break;
    case "total":
	$categories = array("2012 May", "2012 Jun", "2012 Jul", "2012 Aug", "2012 Sep", "2012 Oct", "2012 Nov", "2013 Jan");
	$data = array(906993, 531714, 519869, 466750, 479854, 1288807, 374052, 4333);
	$result = array($categories, $data);
	echo json_encode($result);
	break;
}

$mysqli->close();

?>
