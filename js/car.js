
var Car = function(licensePlateNumber){
    // Attribute
	this.carLicensePlateNumber = licensePlateNumber; 
	// Method	
    this.predictorPicoYPlaca = function(date,hour,minute){				
        return predictorJSON(this.carLicensePlateNumber,date,hour,minute);
    };
};
