var firebaseConfig = {
    apiKey: "AIzaSyDMGk9ChMvTIKuWXwGppAlQrGKV9iiyP3c",
    authDomain: "zigbee-4880e.firebaseapp.com",
    databaseURL: "https://zigbee-4880e.firebaseio.com",
    projectId: "zigbee-4880e",
    storageBucket: "zigbee-4880e.appspot.com",
    messagingSenderId: "423491522068",
    appId: "1:423491522068:web:6561cd68342c7bbb"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


let allData = {}
function getAllDataOnce(){
  return firebase.database().ref('activity').once('value').then(function(snapshot) {
    for (device in snapshot.val()){
      allData[device] = {score:0,name:""}
      getScore(device)
      getName(device)
      getUpdate(device) 
    }
    updateP5();
  });
}

function getUpdate(device){
  firebase.database().ref('activity/'+device).on('value', function(update) {
    d = update.ref.key;
    t = new Date()
    if (t.getTime() - update.val().time < 10000){
      if (update.val().action=="single"){
        setScore(d,1)
      } else if (update.val().action=="double"){
        setScore(d,-1)
      }
    }
    updateP5();
  });
}

function getScore(device){
  return firebase.database().ref('scoring/'+device).once('value').then(function(snapshot) {
    allData[device].score = snapshot.val()
  });
}

function getName(device){
  return firebase.database().ref('nicknames/'+device).once('value').then(function(snapshot) {
    allData[device].name = snapshot.val()
  });
}

function setScore(device,sum){
  allData[device].score += sum;
  console.log(allData[device].name,allData[device].score)
  firebase.database().ref('scoring/' + device).set(allData[device].score);
}

getAllDataOnce()