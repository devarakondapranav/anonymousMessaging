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
	userRoll = String(document.getElementById("roll").value)


	;
	//alert("Sign Up process started");
	if(username.value.length > 0 && userpass.value.length>=6 && userDisplayName.length>4 && String(userRoll).length == 12)
	{
		//alert("Signing up");	
		console.log("Event fired");
		const email = username.value;
		const pass = userpass.value;
		const auth= firebase.auth();

		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e=>alert("Some problem :( please try again..."));

		//alert("Sign Up successful...");
	}
	else
	{
		if(userpass.value.length < 6)
		{
			alert("Password should be atleast 6 characters long.");

		}
		if(String(userRoll).length != 12)
		{
			console.log(userRoll);
			alert("Enter a valid roll no");
		}
		if(userDisplayName.length <=4 )
			alert("Display Name should be atleat 5 characters long");
		if(username.length == 0)
			alert("Please enter a valid email");

	}
}
firebase.auth().onAuthStateChanged(firebaseUser=>{
	if(firebaseUser)
	{
		console.log(firebaseUser);
		alert("Sign Up successful");
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
			alert("You can now log in with your email and password");

		})

		
	}
	else{
		console.log("Incorrect credentials...");
	}

})