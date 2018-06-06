var source = "";
//var anotherRef = firebase.database().ref().chile("/");
var uid = null;
var dbref = null;
var anotherRef = null;
var count = 0;
window.newCount = 0;
window.newNormal = 0;
window.newAnonIn = 0;
window.newAnonOu = 0;
$('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
$(document).ready(function(){
	//$("html").niceScroll();
	$('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
	firebase.auth().onAuthStateChanged(function(user) {

	dbref = firebase.database().ref().child("users");
	//alert("SAN....");
	dbref.once("value", function(snapshot)
	{
		var listOfUsers = [];
		var users = snapshot.val();
		uid = user.uid;

		for(var userLocal in users)
		{
			//console.log(typeof user);
			if(userLocal == user.uid)
			{
				source = users[userLocal]["name"];
				//alert("Welcome " + source);
				document.getElementById("welcomeMSG").innerHTML = "Hi " + source + "!!";
				continue;
			}
			var username = users[userLocal]["name"];
			var rollNo = users[userLocal]["roll"];
			var div = document.createElement("div");
			div.className = "friend";
			div.setAttribute("id", username);
			div.innerHTML  = "<img src='js/s.jpg'/><p><strong>" + username + "</strong><br><span>"+rollNo+"</span></p><div class ='status available'></div>";
			document.getElementById("friends").appendChild(div);
			//document.getElementById("friends2").appendChild(div);
			//document.getElementById("friends2").appendChild(div);
			listOfUsers.push(username);



			
			
		

			if(window.newNormal == 0)
			{
				alert("This tab lets you chat with users normally and does not hide identities.");
				window.newNormal  = 1;
			}



		}
		console.log("function called");
		setNotifyListeners(source, listOfUsers);

		/*
		var anonOuref = firebase.database().ref().child("users").child(uid).child("incoming");
		anonOuref.on("value", function(snapshot)
		{
			document.getElementById("friends1").innerHTML = "";
			var users = snapshot.val();
			if(users!=null)
			{
				for (var userLocal in users)
				{
					if(userLocal.lastIndexOf("temp")!=-1)
						continue;
				
					var username = userLocal.substring(1,2);
					//var rollNo = users[userLocal]["roll"];
					var div = document.createElement("div");
					div.className = "friend";
					//div.setAttribute("id", userLocal);
					div.innerHTML  = "<img src='js/s.jpg'/><p><strong>" + username + "</strong><br><span>"+"No:(" + "</span></p><div class ='status available'></div>";
					document.getElementById("friends1").appendChild(div);
				}
				
			}
			else
			{
				var div = document.createElement("div");
				div.className = "friend";
				//div.setAttribute("id", userLocal);
				div.innerHTML  = "<img src='js/s.jpg'/><p><strong>" + "No anonymous messages yet :( " + "</strong><br><span>"+"</span></p><div class ='status available'></div>";
				document.getElementById("friends1").appendChild(div);
			}
			alert("Done with AnonIn");

		})
		*/
		var mainRef = firebase.database().ref().child("users").child(uid).child("incoming");
		mainRef.once("value", function (snapshot) {
			var incoming_users = snapshot.val();
			console.log(incoming_users);
			window.count = incoming_users.length;
			for(var incoming_user in incoming_users)
			{
				if(incoming_user.lastIndexOf("temp")== -1)
				{
					var username = incoming_user;
					var rollNo = "SSS";
					var div = document.createElement("div");
					div.className = "friend";
					div.setAttribute("id", username);
					div.innerHTML  = "<img src='js/s.jpg'/><p><strong>" + username + "</strong><br><span>"+rollNo+"</span></p><div class ='status available'></div>";
					document.getElementById("friends1").appendChild(div);

				}

			}
			//alert("Done with AnonIn");
			
		})
			



	})

	var anonInref = firebase.database().ref().child('users');
	anonInref.once("value", function(snapshot)
	{
		var users = snapshot.val();
		for (var userLocal in users)
		{
			if(userLocal == user.uid)
			{
				//source = users[userLocal]["name"];
				//alert("Welcome " + source);
				continue;
			}
			var username = users[userLocal]["name"];
			var rollNo = users[userLocal]["roll"];
			var div = document.createElement("div");
			div.className = "friend";
			div.setAttribute("id", userLocal);
			div.innerHTML  = "<img src='js/s.jpg'/><p><strong>" + username + "</strong><br><span>"+rollNo+"</span></p><div class ='status available'></div>";
			document.getElementById("friends2").appendChild(div);
		}
		//alert("Done with AnonOu");
	})


	

	
  var preloadbg = document.createElement("img");
  preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";
  
	$("#searchfield").focus(function(){
		if($(this).val() == "Search contacts..."){
			$(this).val("");
		}
	});
	$("#searchfield").focusout(function(){
		if($(this).val() == ""){
			$(this).val("Search contacts...");
			
		}
	});
	
	$("#sendmessage input").focus(function(){
		if($(this).val() == "Send message..."){
			$(this).val("");
			//alert("Hello");
		}
	});
	$("#sendmessage input").focusout(function(){
		if($(this).val() == ""){
			$(this).val("Send message...");
			
		}
	});
		
	
	$("#friends").each(function()
	{		
		$(this).on("click", "div.friend", function()
		{
			//alert("yayyy...");
			jQuery('#chat-messages div').html('');
			var childOffset = $(this).offset();
			var parentOffset = $(this).parent().parent().offset();
			var childTop = childOffset.top - parentOffset.top;
			var clone = $(this).find('img').eq(0).clone();
			var top = childTop+12+"px";
			
			$(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");									
			
			setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
			setTimeout(function(){
				$("#chat-messages").addClass("animate");
				$('.cx, .cy').addClass('s1');
				setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
				setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
			}, 150);														
			
			$('.floatingImg').animate({
				'width': "50px",
				'left':'10px',
				'top':'3px'
			}, 200);
			
			var name = $(this).find("p strong").html();
			console.log(name);
			var email = $(this).find("p span").html();	
			if(true)
			{
				//var source = "S";
				//document.getElementById("chat-messages").innerHTML = "";
				var destination = name;
				var mesRef = firebase.database().ref().child(source+ 'To' + destination);
				mesRef.once("value", function(snapshot)
				{
					//alert("jai");
					var messages = snapshot.val();
					console.log(messages);
					messages = messages.split("***");
					for(var i=0;i<messages.length-1;i++)
					{
						if(messages[i][0] == "0")
						{

							var div = document.createElement("div");
							div.className = "message right";
							div.innerHTML = "<div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span> " +messages[i].split(":")[1] + "</span></div>";
							document.getElementById("chat-messages").appendChild(div);
						}
						else
						{
							var div = document.createElement("div");
							div.className = "message";
							div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span>" +messages[i].split(":")[1] + "</span></div>";
							document.getElementById("chat-messages").appendChild(div);
						}
					}
					var chatLogObject = document.getElementById("chat-messages");
					console.log("height is  " + chatLogObject.scrollHeight);
					chatLogObject.scrollTop = chatLogObject.scrollHeight;	
				})
				


			}
			var tempref1 = null;
			var node = null;
				if(source > destination)
				{
					node = source + "To" + destination + "temp";
					tempref1 = firebase.database().ref().child(source + "To" + destination + "temp");
					

				}
				else
				{
					node = destination + "To" + source + "temp";
					tempref1 = firebase.database().ref().child(destination + "To" + source + "temp");
					
				}
				tempref1.on("value", function(snapshot)
				{

					var latestMes = snapshot.val();
					if(latestMes.split(":")[0] == uid)
					{
						var div = document.createElement("div");
						div.className = "message right";
						div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" +getTimestamp() +  "</span></div>";
						document.getElementById("chat-messages").appendChild(div);
					}
					else
					{
						var div = document.createElement("div");
						div.className = "message";
						div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" + getTimestamp() + "</span></div>";
						document.getElementById("chat-messages").appendChild(div);
					}
					//alert("done");
					var chatLogObject = document.getElementById("chat-messages");
					chatLogObject.scrollTop = chatLogObject.scrollHeight;

				})
				
				firebase.database().ref().child(source + destination + 'notify').off();



															
			$("#profile p").html(name);
			$("#profile span").html(email);			
			
			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
			$('#friendslist').fadeOut();
			$('#chatview').fadeIn();
		
			
			$('#close').unbind("click").click(function(){		

				$("#chat-messages, #profile, #profile p").removeClass("animate");
				$('.cx, .cy').removeClass("s1 s2 s3");
				$('.floatingImg').animate({
					'width': "40px",
					'top':top,
					'left': '12px'
				}, 200, function(){$('.floatingImg').remove()});	

				firebase.database().ref().child(source + destination + "notify").on("value", function(snapshot)
			{
				var yo = snapshot.val();
				if(yo!=null)
				{
					console.log("Set listener on "  + source+destination + "notify");
					yo = yo.split("*@*");
					if(yo[0] == "notRead")
					{
						createNoty("Normal message from " + yo[2] +":- " + yo[1], 'info');
					    $('.page-alert .close').click(function(e) {
					        e.preventDefault();
					        $(this).closest('.page-alert').slideUp();
					    });
					    window.setTimeout(function() {
					    $(".alert").fadeTo(500, 0).slideUp(500, function(){
					        $(this).remove(); 
					    });
					}, 3000);
					    //yo[0] = "read";
					    //notify.set(" ");
					}

				}
			})
			firebase.database().ref().child(source + destination + 'notify').set("read*@*nothing*@*noOne");			
				
				setTimeout(function(){
					//alert("closing");
					firebase.database().ref().child(node).off();
					$('#chatview').fadeOut();					
					$('#friendslist').fadeIn();				
				}, 50);
			});	
					
		});
	});	
var momNumber = 7032311481;



$("#friends1").each(function()
	{		
		$(this).on("click", "div.friend", function()
		{
			//alert("yayyy...");
			jQuery('#chat-messages div').html('');
			var childOffset = $(this).offset();
			var parentOffset = $(this).parent().parent().offset();
			var childTop = childOffset.top - parentOffset.top;
			var clone = $(this).find('img').eq(0).clone();
			var top = childTop+12+"px";
			
			$(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");									
			
			setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
			setTimeout(function(){
				$("#chat-messages").addClass("animate");
				$('.cx, .cy').addClass('s1');
				setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
				setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
			}, 150);														
			
			$('.floatingImg').animate({
				'width': "50px",
				'left':'10px',
				'top':'3px'
			}, 200);
			
			var name = $(this).find("p strong").html();
			console.log(name);
			var email = $(this).find("p span").html();	
			if(true)
			{
				//var source = "S";
				//document.getElementById("chat-messages").innerHTML = "";
				var destination = name;
				var mesRef = firebase.database().ref().child("users").child(uid).child("incoming").child(destination);
				mesRef.once("value", function(snapshot)
				{
					//alert("jai");
					var messages = snapshot.val();
					console.log(messages);
					messages = messages.split("***");
					for(var i=0;i<messages.length-2;i++)
					{
						if(messages[i][0] == "0" && messages[i].split(":")[2]!="No messages have been sent!")
						{

							var div = document.createElement("div");
							div.className = "message right";
							div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span>" + messages[i].split(":")[1] + "</span></div>";
							document.getElementById("chat-messages").appendChild(div);
						}
						else if(messages[i][0] == "1" && messages[i].split(":")[2]!="No messages have been sent!")
						{
							var div = document.createElement("div");
							div.className = "message";
							div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span>" +messages[i].split(":")[1] + "</span></div>";
							document.getElementById("chat-messages").appendChild(div);
						}
					}
					var chatLogObject = document.getElementById("chat-messages");
					console.log("height is  " + chatLogObject.scrollHeight);
					chatLogObject.scrollTop = chatLogObject.scrollHeight;	
				})
				


			}
			var tempref1 = firebase.database().ref().child("users").child(uid).child("incoming").child(destination+"temp");
			window.anonInTempRef = tempref1;
			window.anonInRef = mesRef;
			var node = null;
			
				tempref1.on("value", function(snapshot)
				{

					var latestMes = snapshot.val();
					if(latestMes.split(":")[0] == uid)
					{
						var div = document.createElement("div");
						div.className = "message right";
						div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" + getTimestamp() + "</span></div>";
						document.getElementById("chat-messages").appendChild(div);
					}
					else
					{
						var div = document.createElement("div");
						div.className = "message";
						div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" + getTimestamp() + "</span></div>";
						document.getElementById("chat-messages").appendChild(div);
					}
					//alert("done");
					var chatLogObject = document.getElementById("chat-messages");
					chatLogObject.scrollTop = chatLogObject.scrollHeight;

				})



															
			$("#profile p").html(name);
			$("#profile span").html(email);			
			
			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
			$('#friendslist').fadeOut();
			$('#chatview').fadeIn();
		
			
			$('#close').unbind("click").click(function(){		

				$("#chat-messages, #profile, #profile p").removeClass("animate");
				$('.cx, .cy').removeClass("s1 s2 s3");
				$('.floatingImg').animate({
					'width': "40px",
					'top':top,
					'left': '12px'
				}, 200, function(){$('.floatingImg').remove()});				
				
				setTimeout(function(){
					//alert("closing");
					tempref1.off();
					window.anonInRef = null;
					window.anonInTempRef = null;
					$('#chatview').fadeOut();					
					$('#friendslist').fadeIn();				
				}, 50);
			});	
					
		});
	});	
	

	$("#friends2").each(function()
	{		
		$(this).on("click", "div.friend", function()
		{
			//alert("yayyy...");
			jQuery('#chat-messages div').html('');
			var childOffset = $(this).offset();
			var parentOffset = $(this).parent().parent().offset();
			var childTop = childOffset.top - parentOffset.top;
			var clone = $(this).find('img').eq(0).clone();
			var top = childTop+12+"px";
			
			$(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");									
			
			setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
			setTimeout(function(){
				$("#chat-messages").addClass("animate");
				$('.cx, .cy').addClass('s1');
				setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
				setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
			}, 150);														
			
			$('.floatingImg').animate({
				'width': "50px",
				'left':'10px',
				'top':'3px'
			}, 200);
			
			var name = $(this).find("p strong").html();
			console.log(name);
			var email = $(this).find("p span").html();	
			var useruid = $(this).attr("id");
			console.log(useruid);
			var tempref1 = null;
			var destination = name;
			var mappings = null;
			var mesRef = null;
			var  tempref1 = null;


			if(true)
			{
				//var source = "S";
				//document.getElementById("chat-messages").innerHTML = "";
				
				console.log("current users id is " +  uid);
				var deciderRef = firebase.database().ref().child("users").child(uid).child("outgoing");
				
				deciderRef.once("value", function(snapshot)
				{
					mappings = snapshot.val();
					var nodeFound = false;
					for (var x in mappings)
					{
						//alert(x);
						if(x == useruid)
						{

							destination = mappings[x];
							nodeFound = true;
							console.log(x + "=> " + mappings[x]);
							
							break;
						}

					}
					
					if(nodeFound == true)
					{
						//alert("already found..");
						//alert("Destination is "+ destination);
						mesRef = firebase.database().ref().child("users").child(useruid).child("incoming").child(destination);
						tempref1 = firebase.database().ref().child("users").child(useruid).child("incoming").child(destination+"temp");
						window.anonDestination = mesRef;
						window.anonDestinationTemp = tempref1;

						mesRef.once("value", function(snapshot)
					{
					//alert("jai");
						var messages = snapshot.val();
						console.log(messages);
						messages = messages.split("***");
						for(var i=0;i<messages.length-2;i++)
						{
							if(messages[i][0] == "1" && messages[i].split(":")[2] != "No messages have been sent!")
							{

								var div = document.createElement("div");
								div.className = "message right";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span> " +messages[i].split(":")[1] + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
							else if(messages[i][0] == "0" && messages[i].split(":")[2] != "No messages have been sent!")
							{
								var div = document.createElement("div");
								div.className = "message";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span>" +messages[i].split(":")[1] + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
						}
						var chatLogObject = document.getElementById("chat-messages");
						chatLogObject.scrollTop = chatLogObject.scrollHeight;	



						tempref1.on("value", function(snapshot)
						{
							//alert("foo");

							var latestMes = snapshot.val();
							console.log(latestMes);
							if(latestMes.split(":")[0] == uid)
							{
								var div = document.createElement("div");
								div.className = "message right";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" + getTimestamp() + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
							else if(latestMes.split(":")[1] == "9905")
							{

							}
							else
							{
								var div = document.createElement("div");
								div.className = "message";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" + getTimestamp() + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
							//alert("done");
							var chatLogObject = document.getElementById("chat-messages");
							chatLogObject.scrollTop = chatLogObject.scrollHeight;

						})
					})
					}
					else
					{
						//alert("should create new node");
						var nextToken = null;
						var foo = firebase.database().ref().child("users").child(useruid).child("count");
						foo.once("value", function(snapshot)
						{
							nextToken = Number(snapshot.val());
							//alert("New token is "+ nextToken);
							foo.set(String(nextToken+1));
							mappings[useruid] = "s" + String(nextToken);
						deciderRef.set(mappings);
						//alert("Token added..");
						destination = "s" + String(nextToken);
						
						mesRef = firebase.database().ref().child("users").child(useruid).child("incoming").child(destination);
						mesRef.set("0:1830:No messages have been sent!***");
						tempref1 = firebase.database().ref().child("users").child(useruid).child("incoming").child(destination+"temp");
						tempref1.set("sknv:9905");
						alert("Your chat will appear as " + destination + " to " + name) ;
						window.anonDestination = mesRef;
						window.anonDestinationTemp = tempref1;
						mesRef.once("value", function(snapshot)
						{
					//alert("jai");
						var messages = snapshot.val();
						console.log(messages);
						messages = messages.split("***");
						for(var i=0;i<messages.length-2;i++)
						{
							if(messages[i][0] == "1" && messages[i].split(":")[2]!="No messages have been sent!")
							{

								var div = document.createElement("div");
								div.className = "message right";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span>"+ messages[i].split(":")[1] + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
							else if(messages[i][0] == "0" && messages[i].split(":")[2]!="No messages have been sent!")

							{
								var div = document.createElement("div");
								div.className = "message";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+messages[i].split(":")[2] + " <div class = 'corner'></div><span>"+ messages[i].split(":")[1] + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
						}
						var chatLogObject = document.getElementById("chat-messages");
						chatLogObject.scrollTop = chatLogObject.scrollHeight;	



						tempref1.on("value", function(snapshot)
						{
							//alert("foo");

							var latestMes = snapshot.val();
							console.log(latestMes);
							if(latestMes.split(":")[0] == uid)
							{
								var div = document.createElement("div");
								div.className = "message right";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" + getTimestamp() + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
							else if(latestMes.split(":")[1] == "9905")
							{

							}
							else
							{
								var div = document.createElement("div");
								div.className = "message";
								div.innerHTML = "<img src = 'js/s.jpg'><div class = 'bubble'>"+latestMes.split(":")[1] + " <div class = 'corner'></div><span>" + getTimestamp() + "</span></div>";
								document.getElementById("chat-messages").appendChild(div);
							}
							//alert("done");
							var chatLogObject = document.getElementById("chat-messages");
							chatLogObject.scrollTop = chatLogObject.scrollHeight;

						})
					})

						})
						



					}
					
					
				})
				
				//var mesRef = firebase.database().ref().child("users").child(useruid).child(locInDest);
				
				


			}
			//tempref1 = firebase.database().ref().child("users").child(useruid).child("incoming").child(destination+ "temp");
			//alert("Dest temp is " + destination + "temp");
			



															
			$("#profile p").html(name);
			$("#profile span").html(email);			
			
			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
			$('#friendslist').fadeOut();

			$('#chatview').fadeIn();
			//$("#send").unbind("click").click( alert("Send btn clicked"));
		
			
			$('#close').unbind("click").click(function(){		

				$("#chat-messages, #profile, #profile p").removeClass("animate");
				$('.cx, .cy').removeClass("s1 s2 s3");
				$('.floatingImg').animate({
					'width': "40px",
					'top':top,
					'left': '12px'
				}, 200, function(){$('.floatingImg').remove()});				
				
				setTimeout(function(){
					//alert("closing");
					//alert("closing ..." +destination);
					firebase.database().ref().child(destination+"temp").off();
					$('#chatview').fadeOut();
					window.anonDestinationTemp = null;
					if(tempref1!=null)tempref1.off();
					
					$('#friendslist').fadeIn();				
				}, 50);
			});
			
		});
	});	



})



});

/*
var source = "";
var userRef = firebase.database().ref().child("users");
firebase.auth().onAuthStateChanged(function(user) {
	userRef.once("value", function(snapshot)
	{
		var userlist = snapshot.val();
		source = userlist[user.uid]["name"];
		alert("Welcome " + source);
	})



})
*/


function deauthenticate()
	{	
	alert("Logging out...");
	firebase.auth().signOut();
	return true;
	}
//Start

//end




function insAndUpdate()
{ 
	//alert(" yo");

	var message_to_be_sent = document.getElementById("message_to_be_sent").value;
	if(message_to_be_sent.length !=0)
	{
		document.getElementById("message_to_be_sent").value = "";
		if(document.getElementById("chatmode").innerHTML == "normal")
		{
			var tempref = null;
			
			var destination = document.querySelector("p.animate").innerHTML;
			var div = document.createElement("div");
			
			var chatLogObject = document.getElementById("chat-messages");
			chatLogObject.scrollTop = chatLogObject.scrollHeight;
			console.log(source + "to " + destination );
			if(source > destination)
			{
				tempref = firebase.database().ref().child(source + "To" + destination + "temp");
				tempref.set(uid + ":" + message_to_be_sent);

			}
			else
			{
				tempref = firebase.database().ref().child(destination + "To" + source + "temp");
				tempref.set(uid + ":" + message_to_be_sent);
			}
			var fref = firebase.database().ref().child(source + "To" + destination);
			fref.once("value", function(snapshot)
			{
				var oldMessage = snapshot.val();
				if(oldMessage!=null)
					oldMessage+= "***0:"+getTimestamp()+ ":" + message_to_be_sent;
				else
					oldMessage = "***0:"+getTimestamp()+ ":" + message_to_be_sent;
				fref.set(oldMessage);
			})

			var sref = firebase.database().ref().child(destination + "To" + source);
			sref.once("value", function(snapshot)
			{
				var oldMessage =snapshot.val();
				if(oldMessage!=null)
					oldMessage+= "***1:"+getTimestamp()+ ":" + message_to_be_sent;
				else
					oldMessage = "***1:"+getTimestamp()+ ":" + message_to_be_sent;
				sref.set(oldMessage);
			})
			var notify = firebase.database().ref().child(destination+source + "notify");
			notify.once("value", function(snapshot)
			{
				notify.set("notRead*@*" + message_to_be_sent + "*@*" + source);
				//notify.set("read*@*" + message_to_be_sent + "*@*" + source)

			})
		}
		else if(document.getElementById("chatmode").innerHTML == "anonOu")
		{
			//alert("send in anonOu");
			var anonTempref = window.anonDestinationTemp;
			anonTempref.set(uid +":" +message_to_be_sent);
			var anonRef = window.anonDestination;
			var old_messages = null;
			anonRef.once("value", function (snapshot) {
				old_messages = snapshot.val();
				if(old_messages != null)
					old_messages += "1:"+getTimestamp() + ":" + message_to_be_sent+"***";
				else
					old_messages = "1:"+getTimestamp() + ":" + message_to_be_sent+"***";
				anonRef.set(old_messages);
			})
			//alert("Done...");


		}
		else
		{
			//alert("send in anonIn");
			var anonInTempRef = window.anonInTempRef;
			anonInTempRef.set(uid + ":" + message_to_be_sent);
			var anonInRef = window.anonInRef;
			var old_messages = null;
			anonInRef.once("value", function (snapshot) {
				old_messages = snapshot.val();
				old_messages+= "0:"+ getTimestamp() + ":" + message_to_be_sent + "***";
				anonInRef.set(old_messages);

			})
			//alert("Done sending in AnonIn");
		}
	}

	//alert(getTimestamp());
}
function openAnonIn()
{
	//alert("yo");
	if(window.newAnonIn == 0)
	{
		alert("This tab (with downward arrow) is where you will see your anonymous messages. You will not know who the senders are !");
		window.newAnonIn = 1;
	}
	if(false)
	{
		if(window.count!=0)
			alert("You have anonymous messages from " + String(window.count) + " users!");
		else
			alert("You do not have any anonymous messages yet :( ");
	}
	$('#friends').fadeOut();
	$("#friends2").fadeOut();
	$("#friends1").fadeIn();
	document.getElementById("refresh").innerHTML = "Reload";

	
	
	document.getElementById("friends1").style.visibility = "";
	//document.getElementById("friends2").style.visibility = "hidden";
	//alert("Done");
	document.getElementById("normal").style.backgroundColor = "white";
	document.getElementById("anonOu").style.backgroundColor = "white";

	document.getElementById("anonIn").style.backgroundColor = "#d8dfe3";
	document.getElementById("chatmode").innerHTML = "anonIn";
	console.log("chat mode is " + document.getElementById("chatmode").innerHTML);

	var mainTempRef = firebase.database().ref().child("users").child(uid).child("incoming");
		mainTempRef.once("value", function(snapshot)
		{

			var in_users = snapshot.val();
			if(window.count!= in_users.length)
			{


				alert("new anonymous message!");
				for(var incoming_user in in_users)
				{
					if(incoming_user.lastIndexOf("temp")== -1)
					{
						var username = incoming_user;
						var rollNo = "SSS";
						var div = document.createElement("div");
						div.className = "friend";
						div.setAttribute("id", username);
						div.innerHTML  = "<img src='js/s.jpg'/><p><strong>" + username + "</strong><br><span>"+rollNo+"</span><</p><div class ='status available'></div>";
						document.getElementById("friends1").appendChild(div);

					}
				}
			}
		})



	
	

}

function openNormal() {
	//document.getElementById("friends1").style.visibility = "hidden";
	//document.getElementById("friends2").style.visibility = "hidden";
	$("#friends").fadeIn();
	$("#friends2").fadeOut();
	$("#friends1").fadeOut();
	document.getElementById("anonIn").style.backgroundColor = "white";
	document.getElementById("anonOu").style.backgroundColor = "white";
	document.getElementById("normal").style.backgroundColor = "#d8dfe3";

	document.getElementById("chatmode").innerHTML = "normal";
	console.log("chat mode is " + document.getElementById("chatmode").innerHTML);
	//document.getElementById("refresh").innerHTML = "";


	
	//alert("back");
}
function refreshPage()
{
	location.reload();
}
function openAnonOu() {
	//document.getElementById("friends1").style.visibility = "hidden";
	if(window.newAnonOu == 0)
	{
		alert("This tab (with upward arrow) is where you can send messages anonymously and the recievers will not know the identity of the sender (which is you 😈 )");
		window.newAnonOu = 1;
	}
	$("#friends1").fadeOut();
	$("#friends").fadeOut();
	$("#friends2").fadeIn();
	document.getElementById("friends2").style.visibility = "";
	document.getElementById("anonIn").style.backgroundColor = "white";
	document.getElementById("normal").style.backgroundColor = "white";
	document.getElementById("anonOu").style.backgroundColor = "#d8dfe3";
	document.getElementById("chatmode").innerHTML = "anonOu";
	console.log("chat mode is " + document.getElementById("chatmode").innerHTML);
	//document.getElementById("refresh").innerHTML = "";
	
}

function getTimestamp()
{
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var d = new Date();
	var day = String(d.getDate()) + "/" + months[d.getMonth()];
	var time = String(d.getHours()) + ";" + String(d.getMinutes());
	return(day + " " + time);

}

function createNoty(message, type) {
    var html = '<div class="alert alert-' + type + ' alert-dismissable page-alert" id = "newMes">';    
    html += '<button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>';
    html += message;
    html += '</div>';    
    $(html).hide().prependTo('#noty-holder').slideDown();
};
/*
$(function(){
    createNoty('Hi! This is my message', 'info');
    createNoty('success', 'success');
    createNoty('warning', 'warning');
    createNoty('danger', 'danger');
    createNoty('info', 'info');
    $('.page-alert .close').click(function(e) {
        e.preventDefault();
        $(this).closest('.page-alert').slideUp();
    });
});
*/
function setNotifyListeners(source, listOfUsers)
{
	console.log("function called");
	for(var i = 0;i < listOfUsers.length;i++)
	{

			//notify.set("");

			console.log("current user is "+ listOfUsers[i]);
			firebase.database().ref().child(source + listOfUsers[i] + "notify").on("value", function(snapshot)
			{
				var yo = snapshot.val();
				if(yo!=null)
				{
					console.log("Set listener on "  + source+listOfUsers[i] + "notify");
					yo = yo.split("*@*");
					if(yo[0] == "notRead")
					{
						createNoty("Normal message from " + yo[2] +":- " + yo[1], 'info');
					    $('.page-alert .close').click(function(e) {
					        e.preventDefault();
					        $(this).closest('.page-alert').slideUp();
					    });
					    window.setTimeout(function() {
					    $(".alert").fadeTo(500, 0).slideUp(500, function(){
					        $(this).remove(); 
					    });
					}, 3000);
					    //yo[0] = "read";
					    //notify.set(" ");
					}

				}
			})
	}
	console.log("function execution done");
}