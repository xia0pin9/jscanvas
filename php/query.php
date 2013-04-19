<?php
//set the JSON header
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-type: text/json");

include("config.php");

$mode = $_GET['mode'];

switch($mode) {
    case "total":
    	//$query= "select date_format(timestamp, '%Y') as 'year', date_format(timestamp, '%m') as 'month', count(cid) as 'total' from event group by date_format(timestamp, '%Y%m')";
    	$result = array(
	"May 2012 Day 01-15" => 219554,
	"May 2012 Day 16-31" => 687439,
	"Jun 2012 Day 01-15" => 297786,
	"Jun 2012 Day 16-30" => 233928,
	"Jul 2012 Day 01-15" => 282759,
	"Jul 2012 Day 16-31" => 237110,
	"Aug 2012 Day 01-15" => 195981,
	"Aug 2012 Day 16-31" => 270769,
	"Sep 2012 Day 01-15" => 196751,
	"Sep 2012 Day 16-30" => 283103,
	"Oct 2012 Day 01-15" => 219356,
	"Oct 2012 Day 16-31" => 1069451,
	"Nov 2012 Day 01-15" => 291615,
	"Nov 2012 Day 16-30" => 82437
	);
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
	    echo $time;
	}
	
	break;
    case "port":
    	$tcpquery = "select tcp_dport,count(tcp_dport) from tcphdr group by tcp_dport";	
	$udpquery = "select udp_dport,count(udp_dport) from udphdr group by udp_dport";	

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
}

$mysqli->close();

?>
