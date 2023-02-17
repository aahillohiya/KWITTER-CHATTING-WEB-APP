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

ROOM_NAME = localStorage.getItem("ROOM_NAME");

function send() {
      msg = document.getElementById("msg").value ;
      firebase.database().ref(ROOM_NAME).push({
      name: username,
      message: msg,
      like:0
      });
      document.getElementById("msg").innerHTML = ""
}
function getData() { firebase.database().ref("/"+ROOM_NAME).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

            console.log(firebase_message_id);
            console.log(message_data);

            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];

            name_row = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
            message_row = "<h4 class='message_h4'>" + message + "</h4>";
            like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
            span_with_tag ="<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
            row = name_row + message_row + like_button + span_with_tag ;
            console.log(this.id);

            document.getElementById("output").innerHTML+= row;
      } });  }); }
getData();

function updateLike(message_id) {
      button_id = message_id;
      like = document.getElementById(button_id).value;
      updatedlikes = Number(like) + 1;
      console.log(updatedlikes);
      console.log(button_id);
      firebase.database().ref(ROOM_NAME).child(message_id).update({
            like: updatedlikes
      });
}

function logout() {
      window.location="index.html";
      localStorage.removeItem("ROOM_NAME");
      localStorage.removeItem("USERNAME");
}

