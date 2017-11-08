
function appendRadioToElement(radioText, value, element) {
	var radio = jQuery('<input/>', {
		'name': element.attr('id'),
		type: 'radio',
		value: value
	});

	var radioText = jQuery('<p/>', {
		text: radioText
	});

	radioText.append(radio);
	element.append(radioText);
}

function appendRadiosToElement(radioTextArray, element) {
	for (var i = 0; i < radioTextArray.length; i++) {
		appendRadioToElement(radioTextArray[i], i, element);
	}
}

function appendSelectionOptionToElement(optionText, element) {
	var option = jQuery('<option/>', {
		value: optionText,
		text: optionText
	});
	element.append(option);
}

function appendSelectionOptionsToElement(optionTextArray, element) {
	var selectInput = jQuery('<select/>', {
		'name': element.attr('id'),
	});

	appendSelectionOptionToElement(null, selectInput);

	for (var i = 0; i < optionTextArray.length; i++) {
		appendSelectionOptionToElement(optionTextArray[i], selectInput);
	}

	element.append(selectInput);
}

function appendTextInputToElement(placeholder, enabled, element) {
	var textInput = jQuery('<input/>', {
		'name': element.attr('id'),
		type: 'text',
		'placeholder': placeholder
	});

	if (!enabled) {
		textInput.prop('disabled', true);
	}

	element.append(textInput);
}

function appendNewBlockToElement(blockMap, element) {
	var block = jQuery('<div/>', {
		class: 'field-block col-sm-' + blockMap['colWidth'],
		id: 'block' + blockMap['number'],
		text: blockMap['number'] + '. ' + blockMap['description']
	});

	//$('[name=block5]:checked').val()
	if (blockMap['radios']) {
		appendRadiosToElement(blockMap['radios'], block);
	}

	//$('[name=block1]').val()
	if (blockMap['textbox']) {
		appendTextInputToElement(null, blockMap['disabled'] ? false : true, block);
	}

	//$('[name=block8]').val()
	if (blockMap['selectOptions']) {
		appendSelectionOptionsToElement(blockMap['selectOptions'], block);
	}

	element.append(block);
}

function appendNewBlocksToElement(blockMapArray, element) {
	for (var i = 0; i < blockMapArray.length; i++) {
		appendNewBlockToElement(blockMapArray[i], element);
	}
}

function showReportDetail() {
	var reportPage = jQuery('<div/>', {
		class: 'report-page'
	});

	var fields1to4 = jQuery('<div/>', {
		class: 'row fields-row'
	})

	var block1 = {
		number: 1, 
		colWidth: 6, 
		description: "Name (Last, First MI Suffix)", 
		textbox: true
	};

	var block2 = {
		number: 2, 
		colWidth: 2, 
		description: "Grade/Rate", 
		textbox: true
	};

	var block3 = {
		number: 3, 
		colWidth: 2, 
		description: "Desig", 
		textbox: true
	};

	var block4 = {
		number: 4, 
		colWidth: 2, 
		description: "SSN", 
		textbox: true
	};

	appendNewBlocksToElement([block1, block2, block3, block4], fields1to4);
	reportPage.append(fields1to4);

	var fields5to9 = jQuery('<div/>', {
		class: 'row fields-row'
	})

	var block5 = {
		number: 5, 
		colWidth: 3, 
		description: "", 
		radios: ['ACT', 'FTS', 'INACT', 'AT/ADSW/265']
	};

	var block6 = {
		number: 6, 
		colWidth: 2, 
		description: "UIC", 
		textbox: true
	};

	var block7 = {
		number: 7, 
		colWidth: 3, 
		description: "Ship/Station", 
		textbox: true
	};

	var block8 = {
		number: 8, 
		colWidth: 2, 
		description: "Promotion Status", 
		selectOptions: ['REGULAR', 'FROCKED', 'SELECTED', 'SPOT']
	};

	var block9 = {
		number: 9, 
		colWidth: 2, 
		description: "Date Reported", 
		textbox: true
	};

	appendNewBlocksToElement([block5, block6, block7, block8, block9], fields5to9);
	reportPage.append(fields5to9);

	$('#detail-container').append(reportPage);
}