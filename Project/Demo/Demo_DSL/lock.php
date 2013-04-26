<?php
include('config.php');
session_start();
//$user_check=$_SESSION['login_user'];
if(empty($_SESSION['login_user']))
{
    //header("location: login.html");
    echo "error";
}
else
{
    echo $user_check;
}
?>
