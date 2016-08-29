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

        console.log('Received Event: ' + id);
    }
};



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

		}
		else
		{
		alert("Something Went wrong");
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
		alert(data.length);
		var i;
		$("#home").css("display","none");
		$("#select-courses").css("display","block");

			for(i=0;i<data.length;i++)
			{
				titles=titles+'<div class="btn" id="course'+i+'">'+data[i][0]+'</div>';
			}

		$("#courses").html(titles);
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