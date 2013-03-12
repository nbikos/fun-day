/**
 * @author nick
 */


var employArray = [];
var employRows = [];
// populate employee array from database
if(employArray.length == 0) {
	var db = Titanium.Database.open('myDB');
	var dbrows = db.execute('select employ_id, employ_name, office_id from employ order by employ_name asc');
	while (dbrows.isValidRow()) {
		employArray.push({
			catid:dbrows.fieldByName('employ_id'),
			empname:dbrows.fieldByName('employ_name'),
			office:dbrows.fieldByName('office_id')
		});
		Ti.API.info("Found employee: "+dbrows.fieldByName('employ_name')+" ["+dbrows.fieldByName('employ_id')+"]");
		Ti.API.info("     from office: "+dbrows.fieldByName('office_id'));
		dbrows.next();
	}
	dbrows.close();
	db.close();
}

// employ table view
for (var c=0;c<employArray.length;c++) {
	var row = Ti.UI.createTableViewRow({height:40,backgroundColor:'#ffffff',selectedBackgroundColor:'#eeee33',hasChild:true}); 
	var item = employArray[c];
	
	row.empname = item.empname;
	row.catid = item.catid;
	row.office = item.office;
						
	var empName = Ti.UI.createLabel({
		text: item.empname,
		color: '#334499',
		textAlign:'left',
		left:4,
		top:8,
		height:'auto',
		font:{fontWeight:'bold',fontSize:20}
	});
	row.add(empName);	
	employRows[c] = row;
}
var employTableView = Titanium.UI.createTableView({data:employRows});

Titanium.UI.currentWindow.add(employTableView);