var firebaseConfig = {
    apiKey: "AIzaSyBNP-XmUIxdnRdQ0wRR9tuwmcmN8-QZK0o",
    authDomain: "smart-energy-meter-4835a.firebaseapp.com",
    databaseURL: "smart-energy-meter-4835a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-energy-meter-4835a",
    storageBucket: "smart-energy-meter-4835a.appspot.com",
    messagingSenderId: "67753854056",
    appId: "1:67753854056:web:77598c3b44ce544022e7dd",
    measurementId: "G-1GXEBJ5LER"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

$(document).ready(function(){
    var database = firebase.database();
	var Led1Status;
    var Led2Status;

	database.ref().on("value", function(snap){
		Led2Status = snap.val().Led2Status;
		if(Led2Status == "1"){    // check from the firebase
			//$(".Light1Status").text("The light is off");
			document.getElementById("unact").style.display = "none";
			document.getElementById("act").style.display = "block";
		} else {
			//$(".Light1Status").text("The light is on");
			document.getElementById("unact").style.display = "block";
			document.getElementById("act").style.display = "none";
		}
	});

    $(".toggle-btn").click(function(){
		var firebaseRef = firebase.database().ref().child("Led2Status");

		if(Led2Status == "1"){    // post to firebase
			firebaseRef.set("0");
			Led2Status = "0";
		} else {
			firebaseRef.set("1");
			Led2Status = "1";
		}
	})
});

// getting reference to the database
var database = firebase.database();

//getting reference to the data we want
var dataRef1 = database.ref('DHT_11/Humidity');
var dataRef2 = database.ref('DHT_11/Temperature');

//fetch the data
dataRef1.on('value', function(getdata1){
	var humi = getdata1.val();
	document.getElementById('humidity').innerHTML = humi + "%";
})

 dataRef2.on('value', function(getdata2){
	var temp = getdata2.val();
	document.getElementById('temperature').innerHTML = temp + "&#8451;";
})