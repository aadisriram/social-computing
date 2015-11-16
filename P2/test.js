var text = "ACTION: Yes\n#id_mbadams3_1 #P2CSC555F15";

var splitText = text.split("#")[1].split(" ")[0];
console.log(splitText);

// var Relationships = {
// 	FAMILY    : "family", 
// 	FRIEND    : "friend", 
// 	STRANGER  : "stranger", 
// 	COLLEAGUE : "colleague"};
	
// 	var People = {
// 	"Anakin"    : Relationships.FAMILY,
// 	"Chewbacca" : Relationships.FRIEND,
// 	"Han"       : Relationships.FRIEND,
// 	"JarJar"    : Relationships.FRIEND,
// 	"Jango"     : Relationships.STRANGER,
// 	"Leia"      : Relationships.FAMILY,
// 	"Luke"      : Relationships.FAMILY,
// 	"Padme"     : Relationships.FAMILY,
// 	"Mace"      : Relationships.COLLEAGUE,
// 	"ObiWan"    : Relationships.COLLEAGUE,
// 	"Yoda"      : Relationships.COLLEAGUE
// }

// var RelationshipScoring = {
// 	"high"    : 0.6,
// 	"medium"  : 0.3,
// 	"low"     : 0.1,
// 	undefined : 0.0
// }

// if (People["Anakin"])
//     console.log(RelationshipScoring[People["Test"]]);