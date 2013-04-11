<?php
session_start();
if(empty($_SESSION['myusername'])){
header("location:login.php");
}
?>

<html>
<body>
Login Successful
</body>
</html>