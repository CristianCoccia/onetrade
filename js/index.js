/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
                     document.addEventListener("deviceready", onDeviceReady, true);



    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);      
    } 
    // result contains any message sent from the plugin call 

};

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
console.log("Device Ready")
var push = PushNotification.init({ "android": {"senderID":"596982116432"},
"ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

push.on('registration', function(data) {
console.log(data.registrationId);


	$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/consultas.php",
		data:{key:data.registrationId},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
                
                },

		 success:function(data){	

		}
        });


});

push.on('notification', function(data) {
console.log(data.message);
	if(data.title=="NEW TRADE ALERTS")
	{	
		$("#alertnotification").css("display","block");
	}
	else
	{
		$("#alertnotification2").css("display","block");
	}

// data.sound,
// data.image,
// data.additionalData
});

push.on('error', function(e) {
console.log(e.message);
});
}


//Making sure if someone is logged in

if(localStorage.getItem("Loged"))
{
   	$("#home").css("display","block");
   	$("#login-form").css("display","none");

}

var quizq,quizh,quiza,quiza2,countq,questions,ayudante,counta;


//User verfication

 $('#send').click(function(){ 
	 
		var usuario= $("#username").val();
		var clave= $("#password").val();		
		$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/validacion.php",
		data:{username:usuario, password:clave},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
        $("#wait").css("display","block");       
                },

		 success:function(data){	

			
		if(data.success)
		{
			$("#wait").css("display","none");
			$("#login-form").css("display","none");
			$("#home").css("display","block");
			$("#menu-main").css("display","block");
			localStorage.setItem("Loged",usuario);

		}
		else
		{
		alert("Wrong email or password");
		}
		}
		,error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
        return false;
		}
        );

 //Getting courses information
		 
$('#btn1').click(function(){ 

		var selection="courses";



		$.ajax({
		type: "POST",
		url:"http://onetrade.exchange/app_onetrade/consultas.php",
		data:{btn:selection},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {

        $("#wait").css("display","block");    

                },

		 success:function(data){

		$("#wait").css("display","none");
		var titles='';
		var i,j,ayuda;
		$("#home").css("display","none");
		$("#select-courses").css("display","block");

			for(i=0;i<data.length;i++)
			{	
				titles=titles+'<div class="btn" id="course'+i+'">'+data[i][0]+'</div>';


			}

		$("#courses").html(titles);


		$("#courses .btn").css({
			    "padding": "0.8em",
			    "margin-top": "0.5em",
			    "width":"100%",
			    "color":"white",
			    "background":"rgba(25,52,62,0.5)",
			    "font-size":"1.1em"
						});

			for(i=0;i<data.length;i++)
			{	
				ayuda="#course"+i;

				for(j=1;j<=1;j++)
				{	
					$(ayuda).attr("onclick","findcontent("+data[i][j]+")");
					$(ayuda).attr("id",data[i][j]);
				}

			}


		
		}
		,error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
        return false;
		}
        );

//Getting all the quizzes

$('#btn2').click(function(){ 

		var selection="quiz";

		$.ajax({
		type: "POST",
		url:"http://onetrade.exchange/app_onetrade/consultas.php",
		data:{quiz:selection},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
             $("#wait").css("display","block");   
                },

		 success:function(data){	
		 	$("#wait").css("display","none");
		var titles='';
		var i,j,ayuda;
		$("#home").css("display","none");
		$("#content-quiz").css("display","block");


			for(i=0;i<data.length;i++)
			{	
				titles=titles+'<div class="btn" id="quiz'+i+'">'+data[i][0]+'</div>';


			}

		$("#quiz-menu").html(titles);

			for(i=0;i<data.length;i++)
			{	
				ayuda="#quiz"+i;
				for(j=1;j<=1;j++)
				{	
					$(ayuda).attr("onclick","findquiz("+data[i][j]+")");
					$(ayuda).attr("id",data[i][j]);
				}

			}

		$("#quiz-menu .btn").css({
			    "padding": "1.2em",
			    "margin-top": "1em",
			    "height":"1em",
			    "width":"100%",
			    "color":"white",
			    "background":"rgba(25,52,62,0.5)",
			    "font-size":"1.2em"
						});

		
		},error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
        return false;
		}
        );


//Getting all the indicators

$('#btn3').click(function(){ 


	var option="indi";


		localStorage.setItem("notificacion",0);
		$("#alertnotification").css("display","none");

	$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/consultas.php",
		data:{indisolo:option},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
        
        $("#wait").css("display","block");        

                },

		 success:function(data){

		 	$("#wait").css("display","none");

			var valor=data.length,i,j,date,title,acumulador="";

			for(i=0;i<valor;i++)
			{		
				for(j=1;j<=2;j++)
				{
					if(j==1)
					{
						date=data[i][j];
					}
					else
					{
						title=data[i][j];
					}
				}

				acumulador=acumulador+'</br><div class="btn btn-warning" onclick="findindicator('+data[i][0]+')"> '+date+' | '+title+'</div></br>';

			}

			$("#indicators").html(acumulador);
			$("#market").css("display","block");
			$("#home").css("display","none");
		}
		,error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
		}
        );


//Getting the messages

$('#btn4').click(function(){ 

		var selection="messages";
		$("#show-messages").html("<h2>Select a message below:</h2>");	

		$.ajax({
		type: "POST",
		url:"http://onetrade.exchange/app_onetrade/consultas.php",
		data:{mess:selection},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {

		$("#wait").css("display","block");
                },
		 success:function(data){	

		 $("#wait").css("display","none");
		$("#alertnotification2").css("display","none");
		$("#home").css("display","none");
		$("#messages").css("display","block");

		var date,titles,i,j,total;
		total="";

			for(i=0;i<data.length;i++)
			{	
				total=total+'<div class="btn" id="message'+data[i][0]+'" onclick="findmessage('+data[i][0]+')">';

				for(j=1;j<=2;j++)
				{
					if(j==1)
					{
						date=data[i][j];
					}
					else
					{
						titles=data[i][j];
					}
				}

				total=total+date+" | "+titles+"</div>";

			}

		$("#all-messages").html(total);
		
		}
		,error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
        return false;
		}
        );



//Logout function

$('#logout').click(function(){

	localStorage.removeItem("Loged");	
	$("#home").css("display","none");
	$("#select-courses").css("display","none");
	$("#select-courses").css("display","none");
	$("#content-courses").css("display","none");
	$("#content-quiz").css("display","none");
	$("#on-quiz").css("display","none");
	$("#market").css("display","none");
	$("#menu-main").css("display","none");
	$("#messages").css("display","none");
	$("#opciones-menu").toggle("fast");
   	$("#login-form").css("display","block");


}
);


$("#btn-menu").click(function(){


	$("#opciones-menu").toggle("fast");
});


function show(a)
{
	$("#"+a).toggle("fast");

}


//Getting courses content

function findcontent(id)
{

		$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/consultas.php",
		data:{id:id},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
                
		$("#wait").css("display","block"); 	
                },

		 success:function(data){	

			$("#wait").css("display","none"); 
		
		
			$("#select-courses").css("display","none");
			$("#content-courses").css("display","block");


			$("#title-content-courses").html(data[0].title_content);
			$("#content-courses-in").html(data[0].general_info);


			$("#title-content-courses").css({
				    "color": "white",
   					 "font-size": "2em",
   					 "height":"2em",
   					 "text-align":"left",
   					 "padding-top":"0.5em"
			} );
			$("#content-courses-in").css({
					"margin-top":"2em",
    				"font-size": "1.3em",
    				"text-align": "left",
    				"margin-bottom":"4em"
			});
		
		}
		,error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
       
		
        
}

//Getting quiz questions

function findquiz(id)
{		
		var a=id;
		

		$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/consultas.php",
		data:{quizid:a},
		dataType:"json",
		crossDomain: true,
		cache: false,
		async:false,
		beforeSend: function () {
                
			$("#wait").css("display","block"); 
                },

		 success:function(data){
		 		$("#wait").css("display","none"); 	
		 		var local;
				quizh=data;
				quiza=1;
				quiza2=0;
				countq=1;
				counta=0;
				ayudante=0;
				questions=data.length;
				findanswer(quizh[0][quiza]);


				$("#content-quiz").css("display","none");
				$("#on-quiz").css("display","block");

				$("#question-quiz").html(quizh[quiza2][0]);

				
		
		},error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
       
		
        
}

//Getting quiz answers
function findanswer(a)
{	
	var answerback='';
	var b=a;

		$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/consultas.php",
		data:{answerid:b},
		dataType:"json",
		crossDomain: true,
		cache: false,
		async:true,
		beforeSend: function () {
                

                },

		 success:function(data){	


		 	var valor= data.length;
		 	
		 	var i,j,opcion,id,ayuda,ayuda2;



				for(i=0;i<valor;i++)
				{	
					
					opcion=data[i][0];


					for( j=1;j<=1;j++)
					{	
						k=i+1;
						id="answer"+k;	
						answerback='<div id="'+id+'"class="btn btn-danger col-xs-12 col-sm-12 blink" wrap="on" onClick="next('+data[i][j]+')"><p>'+data[i][0]+'</p></div>';
						ayuda="#option"+k;
						ayuda2="#"+id;

						
						$(ayuda).html(answerback);
					//	$(ayuda2).addClass("btn btn-danger col-xs-12 col-sm-12 blink");
						$(ayuda2+">p").css( {"word-break": "break-all",
											"word-wrap": "break-word",
											"overflow-wrap": "break-word",
											"display":"block",
						 				"max-width":"80vw",
						 				"text-overflow": "ellipsis"
						 					});

					}



				}
				
				

			
		
		}
        });	
 
  return answerback;
}


//All the back buttons

function back(a)
{
	if(a=="coursesmenu")
	{
		$("#select-courses").css("display","none");
		$("#home").css("display","block");
	}

		if(a=="quizmenu")
	{
		$("#content-quiz").css("display","none");
		$("#home").css("display","block");
	}


	if(a=="coursescontent")
	{
		$("#content-courses").css("display","none");
		$("#select-courses").css("display","block");
	}

	if(a=="quizquestion")
	{
		$("#on-quiz").css("display","none");
		$("#content-quiz").css("display","block");
	}


	if(a=="market")
	{
		$("#market").css("display","none");
		$("#home").css("display","block");		
	}

	if(a=="messages")
	{
		$("#messages").css("display","none");
		$("#home").css("display","block");	
		$("#show-messages").html("<h2>Select a message below:</h2>");	

	}

	if(a=="indicatorsolo")
	{
		$("#indicator-solo").css("display","none");
		$("#market").css("display","block");	
	}



}

//Next question function

function next(a)
{
	
	if(countq<questions)
	{

			quiza++;
			quiza2++;
			countq++;
			ayudante++;
			counta=counta+a;

			
			findanswer(quizh[ayudante][1]);

			$("#question-quiz").html(quizh[quiza2][0]);
	}
	else
	{
		$("#question-quiz").html("You Finished the Quiz");
		$("#option1").html("You got "+counta+" answers corrects out of "+questions+" questions.");
		$("#option1").css("color","black");
		$("#option2").html("");
		$("#option3").html("");

	}
}

//getting all the content from the messages

function findmessage(id)
{		
		var a=id;
		

		$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/consultas.php",
		data:{messageid:a},
		dataType:"json",
		crossDomain: true,
		cache: false,
		async:false,
		beforeSend: function () {
                

                },

		 success:function(data){	

		 	var total="";

		 	total='<div class="col-xs-12"><h2>'+data[0][0]+'</h2></div>';
		 	total=total+'<div class="col-xs-12">'+data[0][1]+'</div>';


			$("#show-messages").html(total);
			$("#all-messages .btn").css("background","rgba(0,0,0,0.4)");
			$("#message"+id).css("background","rgba(62,96,111,0.9)");


				
		
		}
        });
       
		
        
}


//Getting all the information about the indicators

function findindicator(a)
{ 

	$.ajax({
		type: "POST",
		url: "http://onetrade.exchange/app_onetrade/consultas.php",
		data:{indisoloinfo:a},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
        
        $("#wait").css("display","block");        

                },

		 success:function(data){

		 	$("#wait").css("display","none");

			var valor=data.length,i,j,operation,price,pair,stop,tape,acumulador="",title,date,ayuda=0,concatenar="";

			for(i=0;i<valor;i++)
			{	
				ayuda++;
				for(j=0;j<7;j++)
				{
					if(j==0)
					{
						date=data[i][j];
					}
					else
					if(j==1)
					{
						title=data[i][j];
					}
					else
					if(j==2)
					{
						operation=data[i][j];
					}
					else
					if(j==3)
					{
						price=data[i][j];
					}
					else
					if(j==4)
					{
						pair=data[i][j];
					}
					else
					if(j==5)
					{
						stop=data[i][j];
					}
					else
					if(j==6)
					{
						tape=data[i][j];
					}

				}
			}

			concatenar=title+" </br> ";

			$("#title-date").html('<h2 style="font-weight:bold;text-transform:uppercase">'+concatenar+'</h2><img src="img/calendar.png"/> <p style="color:#000040;display:inline;font-weight:bold">'+date+'<p></br>');
			$("#pair").html("<h4>PAIR: <p style='color:yellow;display:inline;font-weight:bold;font-size:1.3em'>"+pair+"</p></h4>");
			$("#stop").html("<h4>STOP LOSS:<p style='color:yellow;display:inline;font-weight:bold;font-size:1.3em'> "+stop+"</p></h4>");
			$("#tape").html("<h4>TAPE PROFIT: <p style='color:yellow;display:inline;font-weight:bold;font-size:1.3em'>"+tape+"</p></h4>");
			$("#price").html("<h4>PRICE: <p style='color:yellow;display:inline;font-weight:bold;font-size:1.3em'>"+price+"</p></h4>");
			$("#operation").html("<h4>OPERATION: <p style='color:yellow;display:inline;font-weight:bold;font-size:1.3em'>"+operation+"</p></h4>");

			$("#indicator-solo").css("display","block");
			$("#market").css("display","none");
		}
		,error:function(){

			$("#wait").css("display","none");
			alert("Something went wrong, please try again later.")
		}
        });
}

