<?php
include("config.php");
session_start();
if($_SERVER["REQUEST_METHOD"] == "POST")
{
// username and password sent from Form 
$myusername=addslashes($_POST['username']); 
$mypassword=md5(addslashes($_POST['password'])); 
//header("location: index.html");
$sql="SELECT User FROM user WHERE User='$myusername' and Password='$mypassword'";
$result=$mysqli->query($sql);

if($result->num_rows > 0)//count==1)
{
$_SESSION['login_user']=$myusername;
//echo "Locin sucessfully!";
header("location: index.html");
}
else 
{
//echo "Your Login Name or Password is invalid";
header("location: login.html");
}
$result->free();
}
?>
