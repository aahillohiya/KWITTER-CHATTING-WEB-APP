var firebaseConfig = {
      apiKey: "AIzaSyCc9SGgf-QL9n5lOJH0ADqfzijmscEURh0",
      authDomain: "kwitterdatabase-d1a8f.firebaseapp.com",
      databaseURL: "https://kwitterdatabase-d1a8f-default-rtdb.firebaseio.com",
      projectId: "kwitterdatabase-d1a8f",
      storageBucket: "kwitterdatabase-d1a8f.appspot.com",
      messagingSenderId: "303911048976",
      appId: "1:303911048976:web:e2538c11f8c773e234b795"
};
firebase.initializeApp(firebaseConfig);

var username = localStorage.getItem("USERNAME");

document.getElementById("User_Name").innerHTML = "welcome" + username;

function addRoom() {
      room_name = document.getElementById("Room_Name").value ;
      firebase.database().ref("/").child(room_name).update({
      purpose:"Adding room name" 
      });

      localStorage.setItem("ROOM_NAME",room_name);

      window.location = ("kwitter_page.html");
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;

      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;

      });});}
getData();

function redirectToRoomName(name) {
      localStorage.setItem("NAME",name);
      window.location = ("kwitter_page.html");
}

function logout() {
      window.location="index.html";
      localStorage.removeItem("ROOM_NAME");
      localStorage.removeItem("USERNAME");
}