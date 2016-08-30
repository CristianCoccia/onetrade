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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        if(localStorage.getItem("Loged"))
        {
        	$("#home").css("display","block");
        	$("login.form").css("display","none");
        }

        console.log('Received Event: ' + id);
    }
};

var quizq,quizh,quiza,quizh2;

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
				    "color": "white",
    				"font-size": "2em",
    				"text-align": "left",
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
		beforeSend: function () {
                

                },

		 success:function(data){	

				quizh='';
				var i,j;
				var valor=data.length;
				for(i=0;i<valor;i++)
				{	
					quizh=quizh+'<div class="col-xs-12"><p>'+data[i][0]+'</p></div><div class="col-xs-12">';
					for(j=1;j<=1;j++)
					{
							
						quizh=quizh+findanswer(data[i][j]);

						
					}

				}


				$("#content-quiz").css("display","none");
				$("#on-quiz").css("display","block");
				$("#answerquiz").html(quizh);
				
		
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
		async:false,
		beforeSend: function () {
                

                },

		 success:function(data){	


		 	var valor= data.length;
		 	
		 	var i,j,opcion;


				for(i=0;i<valor;i++)
				{	
					
					opcion=data[i][0];

					for( j=1;j<=1;j++)
					{
							
						answerback=answerback+'<div class="col-xs-12"><input type="radio"  name="option'+b+'" value="'+data[0][j]+'"/>'+opcion+'</div></div>';

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



}