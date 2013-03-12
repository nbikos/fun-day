/**
 * @author nick
 */

var popReps = require('helper').popReps;
var repRows = require('helper').repRows;

var repArray = popReps();
Ti.API.info('array is ready');
var myRows = repRows(repArray);
Ti.API.info('myRows populated');

//create a view


//add a picker to the view
var reppicker = Ti.UI.createPicker({
	top: 50,
	selectionIndicator: true
});

var caldHolder = {
	cald_name: null,
	rep_name: null,
	time_slot: null
};

reppicker.add(myRows);
reppicker.addEventListener('change', function(e){
		caldHolder.cald_name= textField.value;
		caldHolder.rep_name= reppicker.getSelectedRow(0).title;
	stime = shour+':'+sminutes;
	etime = ehour+':'+eminutes;
	caldHolder.time_slot = stime+'-'+etime;
	Ti.API.info('record ready to push from the change in rep');
});

var defaultStart = new Date();
defaultStart.setHours(7);
defaultStart.setMinutes(30);

var defaultEnd = new Date();
defaultEnd.setHours(8);
defaultEnd.setMinutes(0);

var startpicker = Ti.UI.createPicker({
  type:Ti.UI.PICKER_TYPE_TIME,
  top:150,
  value: defaultStart
});

var shour;
var sminutes;

startpicker.addEventListener('change', function(e){
	var st = new Date(e.value);
	shour = st.getHours();
	sminutes = st.getMinutes();
});

var ehour;
var eminutes;

var endpicker = Ti.UI.createPicker({
  type:Ti.UI.PICKER_TYPE_TIME,
  top:380,
  value: defaultEnd
});

endpicker.addEventListener('change', function(e){
	var et = new Date(e.value);
	ehour = et.getHours();
	eminutes = et.getMinutes();
});


var stime = new String();
var etime = new String();

var textField = Ti.UI.createTextField({
	color:'#336699',
	top: 600,
	height: 50,
	width: 250
});

var repLabel = Ti.UI.createLabel({
	color:'white',
	top:10,
	height:30,
	text:'Select Rep',
});

var startLabel = Ti.UI.createLabel({
	color:'white',
	top:120,
	height:30,
	text:'Choose Start Time',
});

var endLabel = Ti.UI.createLabel({
	color:'white',
	top:350,
	height:30,
	text:'Choose End Time',
});

var reasLabel = Ti.UI.createLabel({
	color:'white',
	top:570,
	height:30,
	text:'Enter Reason',
});


var commitApt = Ti.UI.createButton({
	title:'commit',
	top: 650,
	color: 'red'
});

commitApt.addEventListener('click', function(e){
	var mydb = Ti.Database.open('myDB');
	mydb.execute('INSERT INTO cald (cald_name, office_id, time_slot, rep_name) VALUES (?, 1, ?, ?)',caldHolder.cald_name, caldHolder.time_slot, caldHolder.rep_name);
	mydb.close();
	Ti.App.fireEvent('f:update');
});



//to do list
// clean code
// create method to recover latest appointment id


//add the view to the current window
Ti.UI.currentWindow.add(reppicker);
Ti.UI.currentWindow.add(startpicker);
Ti.UI.currentWindow.add(endpicker);
Ti.UI.currentWindow.add(textField);
Ti.UI.currentWindow.add(repLabel);
Ti.UI.currentWindow.add(startLabel);
Ti.UI.currentWindow.add(endLabel);
Ti.UI.currentWindow.add(reasLabel);
Ti.UI.currentWindow.add(commitApt);
//Ti.UI.currentWindow.orientationModes = [ Ti.UI.PORTRAIT ];
