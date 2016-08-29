<?php 
header('Access-Control-Allow-Origin: *');  

include('config.php');

 	if($_POST['btn']=="courses")
 	{
 	$sql="SELECT title_content FROM app_content";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;
 	}
	

	echo json_encode($jsondata); 

 
 	}

 


 ?>