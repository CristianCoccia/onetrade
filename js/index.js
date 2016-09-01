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

            // device APIs are available
            //

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);

         var pushNotification = window.plugins.pushNotification; 
       // if (device.platform == 'android' || device.platform == 'Android') { 
            alert("Register called"); 
            //tu Project ID aca!! 
            pushNotification.register(this.successHandler, this.errorHandler,{"1:596982116432:android:d213d15dc975e1c7":"onetrade-142113","ecb":"app.onNotificationGCM"}); 
       /* } 
        else { 
            alert("Register called"); 
            pushNotification.register(this.successHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"}); 
        }*/ 
    }, 
    // result contains any message sent from the plugin call 
    successHandler: function(result) { 
        alert('Callback Success! Result = '+result) 
    }, 
    errorHandler:function(error) { 
        alert(error); 
    }, 
    onNotificationGCM: function(e) { 
        switch( e.event ) 
        { 
            case 'registered': 
                if ( e.regid.length > 0 ) 
                { 
                    console.log("Regid " + e.regid); 
                    alert('registration id = '+e.regid); 
                    //Cuando se registre le pasamos el regid al input 
                    document.getElementById('regId').value = e.regid; 
                } 
            break; 

            case 'message': 
              // NOTIFICACION!!! 
              alert('message = '+e.message+' msgcnt = '+e.msgcnt); 
            break; 

            case 'error': 
              alert('GCM error = '+e.msg); 
            break; 

            default: 
              alert('An unknown GCM event has occurred'); 
              break; 
        } 
    }, 
    onNotificationAPN: function(event) { 
        var pushNotification = window.plugins.pushNotification; 
        alert("Running in JS - onNotificationAPN - Received a notification! " + event.alert); 
         
        if (event.alert) { 
            navigator.notification.alert(event.alert); 
        } 
        if (event.badge) { 
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge); 
        } 
        if (event.sound) { 
            var snd = new Media(event.sound); 
            snd.play(); 
        } 
    } 
    
};

if(localStorage.getItem("Loged"))
{
   	$("#home").css("display","block");
   	$("#login-form").css("display","none");

}

var quizq,quizh,quiza,quiza2,countq,questions,ayudante,counta;



 $('#send').click(function(){ 
	 
		var usuario= $("#username").val();
		var clave= $("#password").val();		
		$.ajax({
		type: "POST",
		url: "http://server201.distritohosting.com/php/validacion.php",
		data:{username:usuario, password:clave},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
                
                },

		 success:function(data){	

			
		if(data.success)
		{
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
        });
        return false;
		}
        );
		 
$('#btn1').click(function(){ 

		var selection="courses";

		$.ajax({
		type: "POST",
		url:"http://server201.distritohosting.com/php/consultas.php",
		data:{btn:selection},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
                
                },

		 success:function(data){	

		var titles='';
		var i,j,ayuda;
		$("#home").css("display","none");
		$("#select-courses").css("display","block");

			for(i=0;i<data.length;i++)
			{	
				titles=titles+'<div class="btn" id="course'+i+'">'+data[i][0]+'</div>';


			}

		$("#courses").html(titles);

			for(i=0;i<data.length;i++)
			{	
				ayuda="#course"+i;
				for(j=1;j<=1;j++)
				{	
					$(ayuda).attr("onclick","findcontent("+data[i][j]+")");
					$(ayuda).attr("id",data[i][j]);
				}

			}

		$("#courses .btn").css({
			    "padding": "2em",
			    "margin-top": "2em",
			    "height":"1em",
			    "width":"100%",
			    "color":"white",
			    "background":"rgba(25,52,62,0.8)",
			    "font-size":"1.2em"
						});

		
		}
        });
        return false;
		}
        );



$('#btn2').click(function(){ 

		var selection="quiz";

		$.ajax({
		type: "POST",
		url:"http://server201.distritohosting.com/php/consultas.php",
		data:{quiz:selection},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
                
                },

		 success:function(data){	

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
			    "padding": "2em",
			    "margin-top": "2em",
			    "height":"1em",
			    "width":"100%",
			    "color":"white",
			    "background":"rgba(25,52,62,0.8)",
			    "font-size":"1.2em"
						});

		
		}
        });
        return false;
		}
        );



$('#btn3').click(function(){ 


	var option="indi";



	$.ajax({
		type: "POST",
		url: "http://server201.distritohosting.com/php/consultas.php",
		data:{indi:option},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
                

                },

		 success:function(data){	

			var valor=data.length,i,j,operation,price,pair,stop,tape,acumulador="",title,date,ayuda=0;

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
						stoploss=data[i][j];
					}
					else
					if(j==6)
					{
						tape=data[i][j];
					}

				}

				acumulador=acumulador+'<div href="#indicator'+ayuda+'" onClick="show('+ayuda+')" class="btn btn-warning col-xs-12 col-sm-12">'+date+'| '+title+'</div><div id="'+ayuda+'" class="col-xs-12 col-sm-12 collapse" > Operation:'+operation+'</br>Price:'+price+'</br>Pair:'+pair+'</br>Stoploss:'+stoploss+'</br>Tape profit:'+tape+'</div>';

			}

			$("#indicators").html(acumulador);
			for(i=1;i<valor+1;i++)
			{
				$("#"+i).css(
				{
					"background":"white",
					"font-size":"1em",
					"font-weight":"bold",
					"border-radius":"1em",
					"padding":"1em"
				});
			}

			$("#market").css("display","block");
			$("#home").css("display","none");
		}
        });
		}
        );



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
	$("#opciones-menu").toggle("fast");
   	$("#login-form").css("display","block");

}
);


$("#btn-menu").click(function(){


	$("#opciones-menu").toggle("fast");
});


function show(a)
{
	$("#"+a).toggle("slow");

}


function findcontent(id)
{

		$.ajax({
		type: "POST",
		url: "http://server201.distritohosting.com/php/consultas.php",
		data:{id:id},
		dataType:"json",
		crossDomain: true,
		cache: false,
		beforeSend: function () {
                

                },

		 success:function(data){	

			
		
		
			$("#select-courses").css("display","none");
			$("#content-courses").css("display","block");


			$("#title-content-courses").html(data[0].title_content);
			$("#content-courses-in").html(data[0].general_info);

			$("#title-content-courses").css({
				    "color": "white",
   					 "font-size": "3em"
			} );
			$("#content-courses-in").css({
					"margin-top":"2em",
    				"font-size": "1.3em",
    				"text-align": "left",
    				"margin-bottom":"4em"
			});
		
		}
        });
       
		
        
}



function findquiz(id)
{		
		var a=id;
		

		$.ajax({
		type: "POST",
		url: "http://server201.distritohosting.com/php/consultas.php",
		data:{quizid:a},
		dataType:"json",
		crossDomain: true,
		cache: false,
		async:false,
		beforeSend: function () {
                

                },

		 success:function(data){	
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

				
		
		}
        });
       
		
        
}


function findanswer(a)
{	
	var answerback='';
	var b=a;

		$.ajax({
		type: "POST",
		url: "http://server201.distritohosting.com/php/consultas.php",
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
						answerback='<div id="'+id+'" onClick="next('+data[i][j]+')">'+opcion+'</div>';
						ayuda="#option"+k;
						ayuda2="#"+id;

						
						$(ayuda).html(answerback);
						$(ayuda2).addClass("btn btn-danger col-xs-12 col-sm-12 blink");

					}



				}
				
				

			
		
		}
        });	
 
  return answerback;
}






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
}



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





