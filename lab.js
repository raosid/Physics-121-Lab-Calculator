/*
	Author: Sid Rao
	Script for standard deviation and mean calculator.
*/

(function () {

	//An array storing all the values entered by the user.
	var values = [];
	var totalCount = 0;
	var leastDecimal = 0;

	window.onload = function () {
		$("calc").onclick = calculateValues;
	}

	/*
		
	*/
	function calculateValues() {
		if ($("values").value) {
			changeStates();
			getValuesArray(); //initializes the array that containds all the numbers entered by the user.
			
			var mean = getMean();
			var stdDeviation = sampleStandardDeviation(mean);
			var variance = Math.pow(stdDeviation, 2);
			reportResults(mean, stdDeviation, variance);
		} else {
			$("error").innerHTML = "Please enter your values"
		}
	}

	/*
		Changes the state of the app. Called when the calculate 
		button is pressed.
	*/
	function changeStates() {
		totalCount = 0;
		$("error").innerHTML = "";
		$("mean").innerHTML = "Mean: ";
		$("std_deviation").innerHTML = "Sample standard deviation: ";
		$("variance").innerHTML = "Variance: ";
	}

	
	/*
		Creates an array from the values entered by the user. 
		Skips any value which is not a real number
		and Displays a message about incorrect values.
	*/
	function getValuesArray() {
		var numbers_str = $("values").value.trim();
		
		values = numbers_str.split("\n");
		
		getLeast(values); //Calculating the lowest accurate value (the number with the least numbers after the decimal)
		

		//Making every value float.
		for (var i = 0; i < values.length; i++) {
			var newFloat = parseFloat(values[i]); 
			if (isNaN(newFloat)) {
				$("error").innerHTML = "Please only enter real numbers.";
				values[i] = null;
			} else {
				values[i] = newFloat;
				totalCount++;
			}
		}
	}

	/*
		Calculates the mean of the values.
	*/
	function getMean() {
		var sum = 0;
		for (var i = 0; i < values.length; i++) {
			if (values[i] != null) {
				sum+=values[i];	
			}
		}
		return sum/totalCount;
	}

	/*
		Calculates the sample standard deviation.
	*/
	function sampleStandardDeviation(calculatedMean) {
		var squares = [];
		var sum = 0;
		for (var i = 0; i < values.length; i++) {
			sum +=  parseFloat(Math.pow(values[i] - calculatedMean, 2));
		}
		return Math.pow(sum/(totalCount-1), 0.5);
	}

	/*
		Reports the results.
	*/
	function reportResults(mean, stdDeviation, variance) {
		leastDecimal = Math.max(leastDecimal, 1);
		$("mean").innerHTML += mean.toFixed(leastDecimal);
		$("std_deviation").innerHTML += stdDeviation.toFixed(leastDecimal);
		$("variance").innerHTML += variance.toFixed(leastDecimal);
		
	}

	/*
		Returns the DOM object of the element passed
		in as a parameter.
	*/
	function $(id) {
		return document.getElementById(id);
	}

	/*
		Adds taking care of significant figures
	*/
	function getLeast(values) {
		var min = 999;
		for (var i = 0; i < values.length; i++) {
			if (values[i] != "") {
				var current = decimalPlaces(values[i]);	
				if (current < min) {
					min = current;
				}
			}
			
		}
		leastDecimal = min;
	}


	//returns the number of decimal places in the number passed as a parameter.
	function decimalPlaces(num) {
		return (num.split(".")[1] || []).length;
	}

	
	//Return true if the number has a decimal point.
	function decimalpoint(number) {
   		return (number.indexOf(".") > 0);
	}


})();