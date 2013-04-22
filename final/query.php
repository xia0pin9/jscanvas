<?php
//set the JSON header
header("Content-type: text/json");

//include("config.php");

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
	break;}
    /*case "current":
    	$i = $_GET['i'];
	$query = "select count(sid) from event where cid > ".$i." and cid < ".(int($i)+10);
    	$result = $mysqli->query($query);
	echo $result->fetc_assoc();
	$result->free();
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
	if ($result->num_rows > 0)
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
/*$i = $_GET['i'];
$sql_one = "SELECT `DataValue` FROM `timedataflow` where TimeDataFlowID =".$i;
$sql_two = "SELECT `DataValue` FROM `timedataflow` where TimeDataFlowID =".$i;

$result_one = $conn->query($sql_one);
$result_two = $conn->query($sql_one);

 if the $result contains at least one row
if ($result_one->num_rows > 0) {
  // output data of each row from $result
  while(($row_one = $result_one->fetch_assoc()) and ($row_two = $result_two->fetch_assoc())) {
   $data_one = $row_one['DataValue']+4;
   $data_two = $row_one['DataValue'];
  }
 }
else {
  echo 'none';
}
$ret = array((time()*1000), $data_one, $data_two);
echo json_encode($ret); */

?>