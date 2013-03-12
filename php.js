/**
 * @author nick
 */


var request = Titanium.Network.createHTTPClient();
var url = "http://192.168.56.101/jsonret.php";
var arrData = [];
request.open("GET",url);
request.onload = function(){

	var jsonObject = JSON.parse(this.responseText);
	Ti.API.info(jsonObject[0].name);
	
	
};
request.send();


