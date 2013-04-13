<?php
include('config.php');
session_start();
$user_check=$_SESSION['login_user'];
if(!$user_check)
{
    //header("location: login.html");
    echo "error";
}
else
{
    echo $user_check;
}
?>
