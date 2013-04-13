<?php
include("config.php");
session_start();
if($_SERVER["REQUEST_METHOD"] == "POST")
{
// username and password sent from Form 
$myusername=addslashes($_POST['username']); 
$mypassword=md5(addslashes($_POST['password'])); 

$sql="SELECT User FROM user WHERE User='$myusername' and Password='$mypassword'";
$result=mysql_query($sql);
$row=mysql_fetch_array($result);
$active=$row['active'];
$count=mysql_num_rows($result);

if($count==1)
{
//$_Se"myusername");
$_SESSION['login_user']=$myusername;
//echo "Locin sucessfully!";
header("location: index.html");
}
else 
{
//echo "Your Login Name or Password is invalid";
header("location: login.html");
}
}
?>
