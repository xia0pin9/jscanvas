<?php
//set the JSON header
header("Content-type: text/json");

include("./mysql_connection.php");

$i = $_GET['i'];
$sql_one = "SELECT `DataValue` FROM `timedataflow` where TimeDataFlowID =".$i;
$sql_two = "SELECT `DataValue` FROM `timedataflow` where TimeDataFlowID =".$i;

$result_one = $conn->query($sql_one);
$result_two = $conn->query($sql_one);

// if the $result contains at least one row
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
echo json_encode($ret);
?>