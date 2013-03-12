//
// Sample Titanium mobile application
//
// For use with this tutorial:
// http://bit.ly/titaniumdbtutorial
//

// Initialize database
var myDB = Titanium.Database.install('mynewdata.sqlite','myDB');
//myDB.remove();
//myDB = Titanium.Database.install('mynewdata.sqlite','myDB');

// Restore long term application settings
var currentSize = Ti.App.Properties.getInt('fontSize');
if (currentSize == null || currentSize < 12 || currentSize > 20) {
	currentSize = 14;
	Ti.App.Properties.setInt('fontSize',14);
}

// this sets the background color of the master UIView
Titanium.UI.setBackgroundColor('#111');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// Tab for calendar
var win1 = Titanium.UI.createWindow({
    url:'tab_calendar.js',
    title:'Calendar'
});
win1.barColor = '#993333';
var tab1 = Titanium.UI.createTab({
    icon:'nav_categories.png',
    title:'Calendar',
    window:win1
});
tab1.addEventListener('click', function(e) {
	win1.orientationModes = [ ];
});

// employee tab
var win2 = Titanium.UI.createWindow({
	url:'tab_mine.js',
	title:'emps'
});
var tab2 = Titanium.UI.createTab({
	icon:'nav_config.png',
	title:'emps',
	window:win2
});

//make new appt
var win3 = Titanium.UI.createWindow({
	url:'sched.js',
	title:'appointments',
	barCalor:'#777777'
});
var tab3 = Titanium.UI.createTab({
	icon:'nav_categories.png',
	title:'appointments',
	window:win3
});
tab3.addEventListener('click', function(e){
	win3.orientationModes = [ Titanium.UI.PORTRAIT ];
});

var win4 = Titanium.UI.createWindow({
	url:'php.js',
	title:'php',
	barColor:'#555555'
});
var tab4 = Titanium.UI.createTab({
	icon:'nav_categories.png',
	title:'php',
	window:win4
});
//win3.orientationModes = [ Titanium.UI.PORTRAIT ];
// Add tabs to tabgroup  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab1);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
// Open tab group
tabGroup.open();
