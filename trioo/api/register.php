<?php 
//获取表单信息
$email = $_POST["email"];
$password = $_POST["password"];
//连接数据库
$conn = mysqli_connect("localhost","root","root","trioo");
//sqlq查询用户是否已经存在
$sqlq = "SELECT * FROM news WHERE users = '$email'";
//执行语句
$resultq = mysqli_query($conn,$sqlq);
//判断用户是否存在
if(mysqli_num_rows($resultq) === 1){
    $arr = array("res_code"=>0);
    echo json_encode($arr);
}elseif ($password==="") {
    $arr = array("res_code"=>2);
    echo json_encode($arr);
}else{
    //向数据库添加数据
    $sql = "INSERT INTO news(users,password) VALUES('$email','$password')";
    //执行语句
    $result = mysqli_query($conn,$sql);
    //判断是否执行成功
    if($result){
        $arr = array("res_code"=>1);
        echo json_encode($arr);
    }else{
        $arr = array("res_code"=>-1);
        echo json_encode($arr);
    }
}
 ?>
