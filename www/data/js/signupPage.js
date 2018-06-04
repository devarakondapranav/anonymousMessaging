var config = {
    apiKey: "AIzaSyDUv6BpRyNtVR80KVdaFN5uuYosZeXdVo0",
    authDomain: "anonymous-e03e3.firebaseapp.com",
    databaseURL: "https://anonymous-e03e3.firebaseio.com",
    projectId: "anonymous-e03e3",
    storageBucket: "anonymous-e03e3.appspot.com",
    messagingSenderId: "836947903070"
  };
firebase.initializeApp(config);
var username = null;
var userpass = null;
var userRoll = null;
var userDisplayName = null;


function signUp()
{
	username = document.getElementById('email');
	userpass = document.getElementById('pass');
	userDisplayName = document.getElementById("displayName").value;
	userRoll = String(document.getElementById("roll")).value;
	alert("Sign Up process started");
	if(username.value.length > 0 && userpass.value.length && userDisplayName.length>0)
	{
		alert("Signing up");	
		console.log("Event fired");
		const email = username.value;
		const pass = userpass.value;
		const auth= firebase.auth();

		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e=>alert("Incorrect credentials...try again"));

		alert("Sign Up successful...");
	}
	else
	{
		alert("Dont leave input fields blank");
	}
}
firebase.auth().onAuthStateChanged(firebaseUser=>{
	if(firebaseUser)
	{
		console.log(firebaseUser);
		var dbref = firebase.database().ref().child("users");
		var userList = null;
		dbref.once("value", function(snapshot)
		{
			userList = snapshot.val();
			var newObj = {"count": "1","name":String(document.getElementById("displayName").value), "roll": String(document.getElementById("roll").value), "outgoing":{"nothing":"nothing"}};
			console.log("new object for user created...");

			userList[firebaseUser.uid] = newObj;
			dbref.set(userList);
			console.log("object added to DB...opening chats");
			//window.open('mainIndex.html');



		})

		
	}
	else{
		console.log("Incorrect credentials...");
	}

})