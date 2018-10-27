<?php 
//获取用户输入的信息
$emial = $_POST["email"];
$password = $_POST["password"];
//连接数据库
$conn = mysql_connect("localhost", "root", "root", "trioo");
//数据库执行语句块
$sql = "SELECT * FROM newes WHERE users ='$email' AND password = '$password'";
//执行数据库语句
$result = mysql_query($conn, $sql);
//判断是否输入成功
if($result){
    $arr = array("res_code"=>1);
    echo json_encode($arr);
}else{
    $arr = array("res_code"=>0);
    echo json_encode($arr);
}
 ?>
