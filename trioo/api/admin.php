<?php 
//获取表单中的值
$adminusername = $_POST["adminusername"];
$adminpassword = $_POST["adminpassword"];
//连接数据库
$conn = mysqli_connect("localhost","root","root","aim");
//sql语句
$sql = "SELECT * FROM admin WHERE username = '$adminusername'";
//执行sql语句
$result = mysqli_query($conn,$sql);
//判断是否有返回值
if(mysqli_num_rows($result) >=1){
    $row = mysqli_fetch_assoc($result);
    $rowps = $row["password"];
    if($adminpassword === $rowps){
        $arr = array("res_code" => 1);
        echo json_encode($arr);
    }else{
        $arr = array("res_code" => -1);
        echo json_encode($arr);
    }
}else{
    $arr = array("res_code" => 0);
    echo json_encode($arr);
}
//断开数据库连接
mysqli_close($conn);
 ?>


