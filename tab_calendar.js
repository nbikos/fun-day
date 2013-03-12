/**
 * @author nick
 */
/**
 * @author nick
 */

//currently uses stored database to rebuild view




var popEmp = require('helper').popEmp;
// populate employee array from database
var calArray = popEmp();

var popRows = require('helper').popRows;
// populate the array holding the rows to put on screen
var calRows = popRows(calArray);

// create a table view using calRows
var calTableView = Titanium.UI.createTableView({data:calRows});
Ti.App.addEventListener('c:update', function(e){
	//alert("resetting");
	calTableView.setData(calRows);
});

Ti.App.addEventListener('f:update', function(e){
	calArray = popEmp();
	calRows = popRows(calArray);
	alert("finishing update");
	calTableView.setData(calRows);
});

/*var deleteItem = function(_id) {
	var mydb = Ti.Database.open('myDB');
	mydb.execute('delete from cald where cald_name = ?', _id);
	mydb.close();
};*/

// add the tableview to the current window
Titanium.UI.currentWindow.add(calTableView);
//Titanium.UI.currentWindow.orientationModes = [ ]; 
