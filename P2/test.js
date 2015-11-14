var text = "sender\nCall from : Anakin\nURGENCY : 0/1\n#id_unityID_num #P2CSC555F15";

var splitText = text.split("\n");
console.log(splitText[1].split(" : ")[1]);