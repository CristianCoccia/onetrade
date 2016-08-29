<?php 	
header('Access-Control-Allow-Origin: *');  
$jsondata = array();
include('config.php');
if(isset($_POST['username']))
 {	

 	$sql="SELECT email,password FROM user_info where email='".$_POST['username']."'";
	$info=$db->query($sql);
	$info_total=$info->fetch_assoc();

 	$usuarioEnviado=$_POST['username'];
 	$passwordEnviado=$_POST['password'];
 	$usuarioValido=$info_total['email'];
 	$passwordValido=$info_total['password'];

 	if( $usuarioEnviado == $usuarioValido && $passwordEnviado == $passwordValido ){

 	    $jsondata['success'] = true;
         $jsondata['message'] = 'Welcome!';
	
 	}else{
 		$jsondata['success'] = false;
         $jsondata['message'] = 'Wrong email or password';
	
 	}
        
        }
 else
{
 	    $jsondata['success'] = false;
        $jsondata['message'] = "There is a problem, please try it again later.";       
 }

	
 	
    echo json_encode($jsondata);
     exit();
?>







