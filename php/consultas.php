<?php 
header('Access-Control-Allow-Origin: *');  
include('config.php');

//Get all courses for the selection
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

//Get all the content from one course.

	if(isset($_POST['id']))
 	{
 	$sql="SELECT title_content,general_info,date_content FROM app_content WHERE contentid=".$_POST['id'];
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_assoc())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}

//Get all the avaible quizzes
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

//get the questions from one quiz

 	if(isset($_POST['quizid']))
 	{
 	$sql="SELECT question,idquestion FROM quizz_questions WHERE app_quiz_quizid=".$_POST['quizid']." ORDER BY RAND()";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}

//Get all the indicators for the dash board

 	if(isset($_POST['indisolo']))
 	{

 	$sql="SELECT indicatorid,indidate,indititle FROM app_indicators ORDER BY  indidate DESC";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}

//Get all the information from all the quizz (CURRENT 10-09-2016)
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

//Get all the information from 1 indicator ABOUT TO UPDATE

	if(isset($_POST['indisoloinfo']))
 	{

 	$sql="SELECT indidate,indititle,operation,price,pair,stoploss,tapeprofit FROM app_indicators WHERE indicatorid=".$_POST['indisoloinfo']."";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}

//Get all the answers from one question

 	 if(isset($_POST['answerid']))
 	{
 	$sql="SELECT optionw,statusw FROM quizz_answers WHERE questionid=".$_POST['answerid']." ORDER BY RAND()";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}

//Register device to send GCM notification

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

//Get all messages to show.
 	if(isset($_POST['mess']))
 	{

 	$sql="SELECT idmessage,datem,titlem FROM messages ORDER BY  datem DESC";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}

//get all the content from one message
 	if(isset($_POST['messageid']))
 	{

 	$sql="SELECT titlem,content FROM messages WHERE idmessage=".$_POST['messageid']."";
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_array())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}
 	
//Verify the last update from the content

 	if(isset($_POST['date']))
 	{
 	$sql="SELECT date_content FROM app_content WHERE contentid=".$_POST['date'];
	$info=$db->query($sql);
	

	 while($arr = $info->fetch_assoc())
 	{
  	 $jsondata[] = $arr;

 	}
	
	echo json_encode($jsondata); 

 
 	}


 



 ?>