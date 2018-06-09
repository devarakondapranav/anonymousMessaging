//alert("Connected to JS file");
var config = {
    apiKey: "AIzaSyDUv6BpRyNtVR80KVdaFN5uuYosZeXdVo0",
    authDomain: "anonymous-e03e3.firebaseapp.com",
    databaseURL: "https://anonymous-e03e3.firebaseio.com",
    projectId: "anonymous-e03e3",
    storageBucket: "anonymous-e03e3.appspot.com",
    messagingSenderId: "836947903070"
  };
  firebase.initializeApp(config);


 var username = document.getElementById('email');
var userpass = document.getElementById('pass');
function authenticate()
{
	alert("Logging in");	
	console.log("Event fired");
	const email = username.value;
	const pass = userpass.value;
	const auth= firebase.auth();

	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e=>alert("Incorrect credentials...try again"));
}
firebase.auth().onAuthStateChanged(firebaseUser=>{
	if(firebaseUser)
	{
		console.log(firebaseUser);
		window.open('mainIndex.html', "_self");
	}
	else{
		console.log("Incorrect credentials...");
	}

})

// alert("Connected to fb");