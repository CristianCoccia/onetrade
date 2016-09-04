<?php 
header('Access-Control-Allow-Origin: *');  
include('config.php');


 	if($_POST['btn']=="courses")
 	{
 	$sql="SELECT title_content,contentid FROM app_content";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;
 	}
	

	echo json_encode($jsondata); 

 
 	}


	if(isset($_POST['id']))
 	{
 	$sql="SELECT title_content,general_info FROM app_content WHERE contentid=".$_POST['id'];
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_assoc())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}


 	if(isset($_POST['quiz']))
 	{
 	$sql="SELECT quizname,quizid FROM app_quiz";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}


 	if(isset($_POST['quizid']))
 	{
 	$sql="SELECT question,idquestion FROM quizz_questions WHERE app_quiz_quizid=".$_POST['quizid'];
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}


 	if(isset($_POST['indi']))
 	{

 	$sql="SELECT indidate,indititle,operation,price,pair,stoploss,tapeprofit FROM app_indicators ORDER BY  indidate DESC";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}


 	 if(isset($_POST['answerid']))
 	{
 	$sql="SELECT optionw,statusw FROM quizz_answers WHERE questionid=".$_POST['answerid'];
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}


 	if(isset($_POST["key"]))
	{
		$sql2="SELECT COUNT(gcm_regid) FROM gcm_devices WHERE gcm_regid='".$_POST["key"]."'";
		$result = $db->query($sql2);
		$row = $result->fetch_row();

		

		if($row[0] == 0)
		{

			$sql="INSERT INTO gcm_devices (gcm_regid) values ('".$_POST["key"]."')";
			$db->query($sql);


		}

	}

 


 ?>