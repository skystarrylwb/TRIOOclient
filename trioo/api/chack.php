<?php 
$username = $_POST["username"];
$password = $_POST["password"];
$conn = mysqli_connect("localhost","root","root","aim");
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($conn,$sql);
if(mysqli_num_rows($result) === 1){
    $row = mysqli_fetch_assoc($result);
    if($username === $row["username"] || $password === $row["password"]){
        $arr = array("res_code" => 1 );
        echo json_encode($arr);
    }
}else{
    $arr = array("res_code" => -1);
    echo json_encode($arr);
}
mysqli_close($conn);
 ?>
