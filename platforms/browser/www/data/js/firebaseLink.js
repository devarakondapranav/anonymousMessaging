var dbref = firebase.database().ref().child("users");
//alert("SAN....");
dbref.on("value", function(snapshot)
{
	var users = snapshot.val();

	for(var user in users)
	{
		console.log(typeof user);
		var username = users[user]["name"];
		var div = document.createElement("div");
		div.className = "friend";
		div.innerHTML  = "<img src='s.jpg'/><p><strong>" + username + "</strong><span>something</span></p><div class ='status available'></div>";
		document.getElementById("friends").appendChild(div);

	}
})