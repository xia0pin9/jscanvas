<?php
include('config.php');
session_start();
if(empty($_SESSION['login_user']))
{
    //header("location: login.html");
    echo "error";
}
else
{
    echo $_SESSION['login_user'];
}
?>
