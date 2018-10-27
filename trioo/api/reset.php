<?php 
//请求获取用户信息
$username = $_POST["username"];
$newpassword = $_POST["newpassword"];
//连接数据库
$conn = mysqli_connect("localhost","root","root","aim");
//查询用户是否存在
$sqlq = "SELECT * FROM users WHERE username = '$username'";
//执行语句块
$resultq = mysqli_query($conn,$sqlq);
//判断用户名是否存在
if(mysqli_num_rows($resultq) === 1){
    //转换成关联数组
    $row = mysqli_fetch_assoc($resultq);
    //获取关联数组里的数值
    $rowps = $row["password"];
    //判断输入的密码与原密码是否相同
    if($rowps === $newpassword){
        $arr = array("res_code"=>0);
        echo json_encode($arr);
    }else{
    $sql = "UPDATE users SET password = '$newpassword' WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    if($result){
        $arr = array("res_code"=>1);
        echo json_encode($arr);
    }
    }
}else{
    $arr = array("res_code"=>-1);
    echo json_encode($arr);
}
mysqli_close($conn);
 ?>

