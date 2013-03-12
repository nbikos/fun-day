exports.deleteItem = function(_id) {
	var mydb = Ti.Database.open('myDB');
	mydb.execute('delete from cald where cald_name = ?', _id);
	mydb.close();
};


exports.popReps = function() {
	
	//create array to hold database
	var repArray = [];
	
	//populate the array from the database if it is currently empty
	if(repArray.length == 0) {
		//open the database
		var db = Titanium.Database.open('myDB');
		//query db for required info
		var dbrows = db.execute('select reps_name from reps order by reps_name asc');
		
		//operate while current row exists
		while(dbrows.isValidRow()) {
			repArray.push({repname:dbrows.fieldByName('reps_name')});
			dbrows.next();
		}
		dbrows.close();
		db.close();
	}
	return repArray;
};


exports.popEmp = function() {
	
	//create array that will hold database directly
	var calArray = [];
	
	
	// populate employee array from database
	if(calArray.length == 0) {
		
		//open database for use
		var db = Titanium.Database.open('myDB');
		
		//find information needed, enter into dbrows
		var dbrows = db.execute('select time_slot, cald_name, rep_name from cald order by time_slot asc');
		//var dbrows = db.execute('select item_id, item_name from items order by item_name asc');
		
		//make sure there is still a good row being looked at
		while (dbrows.isValidRow()) {
			
			//creates calArray entry wil cald, time, rep
			calArray.push({
				calname:dbrows.fieldByName('cald_name'),
				timeslot:dbrows.fieldByName('time_slot'),
				repname:dbrows.fieldByName('rep_name')
			});
			
			//Ti.API.info("Found item: "+dbrows.fieldByName('calendar_name')+" ["+dbrows.fieldByName('calendar_name')+"]");
			dbrows.next();
		}
		
		//close databases
		dbrows.close();
		db.close();
	}
	return calArray;
};


exports.repRows = function(repArray){
	
	//create rows for display in picker
	var repsRows = [];
	
	//this will create and populate the picker
	for(var c = 0; c < repArray.length; c++) {
		//create an item to be listed on the picker
		var row = Ti.UI.createPickerRow();
		//copy current array item, repArray[c], to var item
		var item = repArray[c];
		//copy item info to current row
		//row.repname = item.repname;
		//create label with repname
		var label = Ti.UI.createLabel({
    		text: item.repname,
    		font:{fontSize:20,fontWeight:'bold'},
    		textAlign:'left',
    		height:'auto',
    		width:'126'
  		});
  		row.title = item.repname;
  		//add the label to the row
  		row.add(label);	
		//add current row to array
		repsRows[c] = row;
	}
	//rows are returned, ready to applied to picker
	return repsRows;
};


exports.popRows = function(calArray){
	
	var calRows = [];
	
	// employ table view
	for (var c=0;c<calArray.length;c++) {
		
		// create table row visually
		var row = Ti.UI.createTableViewRow({height:40,backgroundColor:'#ffffff',backgroundSelectedColor:'#eeee33',hasChild:true}); 
		
		// current Array member is saved to item
		var item = calArray[c];
		
		// item information is sent to row.
		row.calname = item.calname;
		row.timeslot = item.timeslot;
		row.repname = item.repname;
		row.fixname = item.calname;
		
		// current c value is saved to row
		// c value represents its row as well as its position in calArray
		row.c = c;
							
		// make three labels of information pulled
		var calName = Ti.UI.createLabel({
			text: item.calname,
			fixname: item.calname,
			color: '#334499',
			textAlign:'left',
			left:4,
			top:8,
			height:'auto',
			font:{fontWeight:'bold',fontSize:20}
		});
		var timeName = Ti.UI.createLabel({
			text: item.timeslot,
			fixname: item.calname,
			color: '#339999',
			textAlign:'left',
			left:120,
			top:8,
			height:'auto',
			font:{fontWeight:'bold',fontSize:20}
		});
			var repName = Ti.UI.createLabel({
			text: item.repname,
			fixname: item.calname,
			color: '#33CC99',
			textAlign:'left',
			left:230,
			top:8,
			height:'auto',
			font:{fontWeight:'bold',fontSize:20}
		});
		
		//add the labels to the row
		row.add(calName);
		row.add(timeName);	
		row.add(repName);
		
		// row will listen for click
		// on click, row will be sent in under e
		//
		//
		row.addEventListener('click', function(e) {
			
			// create a dialog for alerting
			var dialog = Ti.UI.createAlertDialog({
	    		cancel: 1,
	    		buttonNames: ['Confirm', 'Cancel'],
	    		message: 'Would you like to delete this record?',
	    		title: 'Delete'
	  		});
	  		
	  		dialog.eRow = e.source;
	  		
	  		// give the dialog a listener
	  		// what is sent in this time??
	  		//
	  		//
	  		dialog.addEventListener('click', function(e){
	    		
	    		
	    		//if confirm is clicked
	    		if(e.index === 0){
	    			
	    			
	    			//item is erased from database
	    			exports.deleteItem(e.source.eRow.fixname);
	    			//contained in row and in labels
	    			alert(e.source.eRow.fixname+" fixname");
	    			
	    			/*calRows.splice(e.source.eRow.c,1);
	    			
	    			for(var x = 0; x < calRows.length; x++){
	    				calRows[x].c = x;
	    			} 
	    			
	    			Ti.App.fireEvent('c:update');
	    			//this section removes the actual row, renumbers the other rows, then calls for a 
	    			//screen update
	    			
	    			//deprecated*/
	    			
	    			Ti.App.fireEvent('f:update'); //full update, regenerates all arrays then redisplays
	    		}
	    		
	    		// if cancel is clicked
	    		else if(e.index === 1){
	    			alert("nothing was done");
	    		}
	  		});
	  		
	  		// show the dialog, the last step of the first click event
	  		dialog.show();
		});
	    		
		// add row to the array
		// row is saved at c, c represents is row and index from calArray
		calRows[c] = row;
	}
	
	// reutrn the rows
	return calRows;
};


exports.dia = function(e, eRow){
		    		
		//if confirm is clicked
   		if(e.index === 0){
   			//deleteItem(row.calname);
   			alert(eRow.calname+" number " +eRow.repname+" ERASED!");
		    		
			//calRows.splice(e.c,1);
		    calTableView.setData(calRows); 
 		}
		    		
		// if cancel is clicked
  		else if(e.index === 1){
   			alert("nothing was done");
		}
};