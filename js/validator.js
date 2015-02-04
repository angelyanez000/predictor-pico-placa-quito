// Predictor license plate number (algorithm Pico & Placa Quito)
function predictorJSON(licensePlateNumber,date,hour,minute){
	
	// Obtain data of the .html
	var dateClient =date;
	var hourTimeClient = hour;
	var minuteTimeClient = minute;
	var licensePlateNumberClient = licensePlateNumber;
				
	// Create a JSON Object			
	var data = '{"starttime": "07:00:00,09:30:00","endtime": "16:00:00,19:30:00","monday": "1,2","tuesday": "3,4","wednesday": "5,6","thursday": "7,8","friday": "9,0"}';
				
	var items = JSON.parse(data);
	
	var starTimeValue = items.starttime;
	var endTimeValue = items.endtime;
	var mondayValue = items.monday;
	var tuesdayValue = items.tuesday;
	var wednesdayValue = items.wednesday;
	var thursdayValue = items.thursday;
	var fridayValue = items.friday;				
	
	// Client Time
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1; 
	var day = nowDate.getDate();
	var hour = Number(hourTimeClient);
	var minute  = Number(minuteTimeClient);
	var second  = 0;
			
	// Split time
	var rangeStarTimeValue = starTimeValue.split(',');
	var rangeEndTimeValue = endTimeValue.split(',');
			
	// Obtain Start Time Range	
	var range1StarTimeSplit  = rangeStarTimeValue[0].split(':');
	var range1StartTime = new Date(year, month, day, parseInt(range1StarTimeSplit[0]),parseInt(range1StarTimeSplit[1]), parseInt(range1StarTimeSplit[2]), 0);
			
	var range2StarTimeSplit  = rangeStarTimeValue[1].split(':');
	var range2StartTime = new Date(year, month, day, parseInt(range2StarTimeSplit[0]),parseInt(range2StarTimeSplit[1]), parseInt(range2StarTimeSplit[2]), 0);
						
	// Obtain End Time Range	
	var range1EndTimeSplit  = rangeEndTimeValue[0].split(':');
	var range1EndTime = new Date(year, month, day, parseInt(range1EndTimeSplit[0]),parseInt(range1EndTimeSplit[1]), parseInt(range1EndTimeSplit[2]),0);
			
	var range2EndTimeSplit  = rangeEndTimeValue[1].split(':');
	var range2EndTime = new Date(year, month, day, parseInt(range2EndTimeSplit[0]),parseInt(range2EndTimeSplit[1]), parseInt(range2EndTimeSplit[2]),0);
			
	// Client Time
	var timeClient = new Date(year, month, day, hour,minute, second, 0);
	var timeError = 0;
	var hourNumber = "";
	var minuteNumber = "";
		
	// Compare Client Time with information of Schedules
	if ( (timeClient >= range1StartTime && timeClient <= range2StartTime)|| (timeClient >= range1EndTime && timeClient <= range2EndTime)) {		    	
		if(hourTimeClient < 10)
			hourNumber="0"+hourTimeClient;
		else
			hourNumber= hourTimeClient;
		if(minuteTimeClient < 10)
			minuteNumber="0"+minuteTimeClient;
		else
			minuteNumber=minuteTimeClient;		
		timeError = 1;			    
	}
			
	// Obtain last number of license plate number
	var validationNumber = licensePlateNumberClient.substring(licensePlateNumberClient.length-1,licensePlateNumberClient.length);
	var validationError = 0;
	var firstNumber = 0;
	var secondNumber = 0;			
					
					
	if(dateClient =="Monday"){
		var mondayNumbers = mondayValue.split(',');
		firstNumber = Number(mondayNumbers[0]);
		secondNumber = Number(mondayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Tuesday"){
		var tuesdayNumbers = tuesdayValue.split(',');
		firstNumber = Number(tuesdayNumbers[0]);
		secondNumber = Number(tuesdayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Wednesday"){
		var wednesdayNumbers = wednesdayValue.split(',');
		firstNumber = Number(wednesdayNumbers[0]);
		secondNumber = Number(wednesdayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Thursday"){
		var thursdayNumbers = thursdayValue.split(',');
		firstNumber = Number(thursdayNumbers[0]);
		secondNumber = Number(thursdayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Friday"){
		var fridayNumbers = fridayValue.split(',');
		firstNumber = Number(fridayNumbers[0]);
		secondNumber = Number(fridayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	var result ="";
	// Result of validation
	if((timeError == 0 && validationError ==1)||(timeError ==1 && validationError == 0) || (timeError == 0 && validationError == 0))
		result="You can drive your car without any problem!!!";
	if(timeError == 1 && validationError ==1)		
		result="You can't drive your car on "+dateClient+", your license plate number ("+licensePlateNumberClient+") ends in ("+validationNumber+")."+
		 "\n You can't drive your car in this schedule ("+hourNumber+":"+minuteNumber+") ";
	
	return result;
	
}

function loadData(){
	
	$("#hour_time_value").html('');
	$("#minute_time_value").html('');
	$("#day_date_value").html('');
	
	$("#hour_time_value").append('<option value="">Select</option>');
	$("#minute_time_value").append('<option value="">Select</option>');	
	$("#day_date_value").append('<option value="">Select</option>');
	
	for(var i =0;i<24;i++){				
		if(i<10)
			$("#hour_time_value").append('<option value="'+i+'"> 0'+i+'</option>');
		else
			$("#hour_time_value").append('<option value="'+i+'"> '+i+'</option>');
	}
	for(var j =0;j<60;j++){
		if(j<10)
			$("#minute_time_value").append('<option value="'+j+'"> 0'+j+'</option>');
		else
			$("#minute_time_value").append('<option value="'+j+'"> '+j+'</option>');
	}

	$("#day_date_value").append('<option value="Monday">Monday</option>');
	$("#day_date_value").append('<option value="Tuesday">Tuesday</option>');
	$("#day_date_value").append('<option value="Wednesday">Wednesday</option>');
	$("#day_date_value").append('<option value="Thursday">Thursday</option>');
	$("#day_date_value").append('<option value="Friday">Friday</option>');
	
	
}