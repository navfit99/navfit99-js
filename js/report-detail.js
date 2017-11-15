function appendRadioToElement(radioText, value, checked, enabled, element) {
	var input = jQuery('<input/>', {
		class: 'report-input-element',
		'name': element.attr('id'),
		type: 'radio',
		value: value
	});

	if (checked)
		input.prop('checked', true);

	if (!enabled) {
		input.prop('disabled', true);
	}

	var inputLabel = jQuery('<label/>', {
		text: radioText
	});

	inputLabel.append(input);
	element.append(inputLabel);
}

function appendRadiosToElement(radioTextArray, checkedValue, enabled, element) {
	//values for radio buttons are 1 indexed
	for (var i = 0; i < radioTextArray.length; i++) {
		appendRadioToElement(radioTextArray[i], i+1, checkedValue && checkedValue == i+1 ? true : false, enabled, element);
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
		class: 'report-input-element',
		'name': element.attr('id'),
	});

	appendSelectionOptionToElement(null, selectInput);

	for (var i = 0; i < optionTextArray.length; i++) {
		appendSelectionOptionToElement(optionTextArray[i], selectInput);
	}

	element.append(selectInput);
}

function appendTextInputToElement(value, placeholder, enabled, element) {
	var textInput = jQuery('<input/>', {
		class: 'report-input-element',
		'name': element.attr('id'),
		type: 'text',
		'placeholder': placeholder,
		value: value
	});

	if (!enabled) {
		textInput.prop('disabled', true);
	}

	element.append(textInput);

	return textInput;
}

function appendTextAreaToElement(value, placeholder, enabled, element) {
	var textarea = jQuery('<textarea/>', {
		class: 'report-input-element',
		'name': element.attr('id'),
		'placeholder': placeholder,
	});

	textarea.val(value);

	textarea.css('width','100%');

	if (!enabled) {
		textarea.prop('disabled', true);
	}

	element.append(textarea);
}

function appendCheckboxToElement(checkboxText, checked, element) {
	var input = jQuery('<input/>', {
		class: 'report-input-element',
		'name': element.attr('id'),
		type: 'checkbox',
	});

	if (checked)
		input.prop('checked', true);

	var inputLabel = jQuery('<label/>', {
		text: checkboxText
	});

	inputLabel.append(input);
	element.append(inputLabel);
}

function appendNewBlockToElement(blockMap, reportID, element) {
	//console.log(blockMap);

	var block = jQuery('<div/>', {
		class: 'field-block col-sm-' + blockMap['colWidth'],
		id: 'block' + blockMap['number'],
		text: (blockMap['number'] ? (blockMap['number'] + '. ') : '') + blockMap['description']
	});

	if (reportBlkKeys[blockMap['number']-1] != null) {
		//$('[name=block5]:checked').val()
		var existingValue = reports[reportID][reportBlkKeys[blockMap['number']-1]];
		if (blockMap['radios']) {
			appendRadiosToElement(blockMap['radios'], existingValue+1, blockMap['disabled'] ? false : true, block);
		}

		//$('[name=block10]').is(':checked')
		if (blockMap['checkbox']) {
			appendCheckboxToElement(blockMap['checkbox'], existingValue ? true : false, block);
		}

		//$('[name=block1]').val()
		if (blockMap['textbox']) {
			var existingValue = reports[reportID][reportBlkKeys[blockMap['number']-1]];
			appendTextInputToElement(existingValue, blockMap['placeholder'], blockMap['disabled'] ? false : true, block);
		}

		//$('[name=block1]').val()
		if (blockMap['textarea']) {
			var existingValue = reports[reportID][reportBlkKeys[blockMap['number']-1]];
			appendTextAreaToElement(existingValue, blockMap['placeholder'], blockMap['disabled'] ? false : true, block);
		}

		//$('[name=block8]').val()
		if (blockMap['selectOptions']) {
			appendSelectionOptionsToElement(blockMap['selectOptions'], block);
		}
	} else { //special "one to many" relationship block
		switch(blockMap['number']) {
			case 5:
				
				var selectedRadio;
				for (var i = 0; i < reportBlk5Keys.length; i++) {
					if (reports[reportID][reportBlk5Keys[i]] == true)
						selectedRadio = i+1;
				}
				//console.log(selectedRadio);
				if (blockMap['radios']) {
					appendRadiosToElement(blockMap['radios'], selectedRadio, blockMap['disabled'] ? false : true, block);
				}
				//Check the correct radio button, not added to DOM yet
				//$('[name=block5][value=' + selectedRadio + ']').prop('checked',true);
			
				break;

			case 29:
				var inputA = appendTextInputToElement(reports[reportID][reportBlk29Keys[0]], 'Primary', true, block);
				inputA.attr('navfitFieldPart', 'a');
				var inputB = appendTextInputToElement(reports[reportID][reportBlk29Keys[1]], null, true, block);
				inputB.attr('navfitFieldPart', 'b');
				break;

			case 40:
				var inputA = appendTextInputToElement(reports[reportID][reportBlk40Keys[0]], 'Primary', true, block);
				inputA.attr('navfitFieldPart', 'a');
				var inputB = appendTextInputToElement(reports[reportID][reportBlk40Keys[1]], null, true, block);
				inputB.attr('navfitFieldPart', 'b');
				break;

			case 43:
				var selectedRadio;
				for (var i = 0; i < reportBlk43Keys.length; i++) {
					if (reports[reportID][reportBlk43Keys[i]] == true)
						selectedRadio = i+1;
				}
				//console.log(selectedRadio);
				if (blockMap['radios']) {
					appendRadiosToElement(blockMap['radios'], selectedRadio, blockMap['disabled'] ? false : true, block);
				}
				break;

			case 46:
				var selectedRadio;
				for (var i = 0; i < reportBlk46Keys.length; i++) {
					if (reports[reportID][reportBlk46Keys[i]] == true)
						selectedRadio = i+1;
				}
				//console.log(selectedRadio);
				if (blockMap['radios']) {
					appendRadiosToElement(blockMap['radios'], selectedRadio, blockMap['disabled'] ? false : true, block);
				}
				break;

			default:
				console.log('null reportBlkKeys but no special switch statement for number ' + blockMap['number'])
		}
	}

	

	element.append(block);
}

function appendNewBlocksToElement(blockMapArray, reportID, element) {
	for (var i = 0; i < blockMapArray.length; i++) {
		appendNewBlockToElement(blockMapArray[i], reportID, element);
	}
}

function modifyReportMapAndLogPendingChange(reportID, inputElement) {
	var elementName = inputElement.attr('name');
	var blockNumber = parseInt(elementName.substring(5, elementName.length));
	switch(blockNumber) {
		case 5:
			var selectedRadio = parseInt(inputElement.val())-1;
			for (var i = 0; i < reportBlk5Keys.length; i++) {
				if (i == selectedRadio) {
					reports[reportID][reportBlk5Keys[i]] = true;
				} else {
					reports[reportID][reportBlk5Keys[i]] = false;
				}
			}
			break;
		case 29:
			var fieldPart = inputElement.attr('navfitFieldPart');
			if (fieldPart == 'a') {
				reports[reportID][reportBlk29Keys[0]] = inputElement.val();
			} else if (fieldPart == 'b') {
				reports[reportID][reportBlk29Keys[1]] = inputElement.val();
			}
			break;
		case 40:
			var fieldPart = inputElement.attr('navfitFieldPart');
			if (fieldPart == 'a') {
				reports[reportID][reportBlk40Keys[0]] = inputElement.val();
			} else if (fieldPart == 'b') {
				reports[reportID][reportBlk40Keys[1]] = inputElement.val();
			}
			break;
		case 43:
			var selectedRadio = inputElement.val();
			for (var i = 0; i < reportBlk43Keys.length; i++) {
				if (i == selectedRadio) {
					reports[reportID][reportBlk43Keys[i]] = true;
				} else {
					reports[reportID][reportBlk43Keys[i]] = false;
				}
			}
			break;
		case 46:
			var selectedRadio = inputElement.val();
			for (var i = 0; i < reportBlk46Keys.length; i++) {
				if (i == selectedRadio) {
					reports[reportID][reportBlk46Keys[i]] = true;
				} else {
					reports[reportID][reportBlk46Keys[i]] = false;
				}
			}
			break;
		default:
			if (inputElement.is('input[type=text]')) {
				reports[reportID][reportBlkKeys[blockNumber-1]] = inputElement.val();
			} else if (inputElement.is('textarea')) {
				reports[reportID][reportBlkKeys[blockNumber-1]] = inputElement.val();
			} else if (inputElement.is('input[type=checkbox]')) {
				reports[reportID][reportBlkKeys[blockNumber-1]] = inputElement.is(':checked') ? true : false;
			} else if (inputElement.is('input[type=radio]')) {
				reports[reportID][reportBlkKeys[blockNumber-1]] = parseInt(inputElement.val())-1;
			} else {
				console.log('Unknown block number ' + blockNumber + ' element ' + inputElement);
			}
	}

	logPendingChange(EditScopeEnum.report, EditOpEnum.update, reports[reportID]);
}


function showReportDetail(reportID) {
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
		textbox: true,
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

	appendNewBlocksToElement([block1, block2, block3, block4], reportID, fields1to4);
	reportPage.append(fields1to4);

	var fields5to9 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block5 = { //SPECIAL
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

	appendNewBlocksToElement([block5, block6, block7, block8, block9], reportID, fields5to9);
	reportPage.append(fields5to9);

	var fields10to14 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block10 = {
		number: 10, 
		colWidth: 2, 
		description: 'Occasion for Report', 
		checkbox: 'Periodic'
	};

	var block11 = {
		number: 11, 
		colWidth: 2, 
		description: String.fromCharCode(0x2190), 
		checkbox: 'Detachment of Individual'
	};

	var block12 = {
		number: 12, 
		colWidth: 2, 
		description: String.fromCharCode(0x2190), 
		checkbox: 'Periodic'
	};

	var block13 = {
		number: 13, 
		colWidth: 2, 
		description: String.fromCharCode(0x2190), 
		checkbox: 'Periodic'
	};

	var block14 = {
		number: 14, 
		colWidth: 2, 
		description: 'Period of Report', 
		textbox: true,
		placeholder: 'From'
	};

	var block15 = {
		number: 15, 
		colWidth: 2, 
		description: '', 
		textbox: true,
		placeholder: 'To'
	};

	appendNewBlocksToElement([block10, block11, block12, block13, block14, block15], reportID, fields10to14);
	reportPage.append(fields10to14);

	var fields16to21 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block16 = {
		number: 16, 
		colWidth: 2, 
		description: '', 
		checkbox: 'Not Observed Report'
	};

	var block17 = {
		number: 17, 
		colWidth: 2, 
		description: 'Type of Report', 
		checkbox: 'Regular'
	};

	var block18 = {
		number: 18, 
		colWidth: 2, 
		description: String.fromCharCode(0x2190), 
		checkbox: 'Concurrent'
	};

	var block19 = {
		number: 19, 
		colWidth: 2, 
		description: String.fromCharCode(0x2190), 
		checkbox: 'Ops Cdr'
	};

	var block20 = {
		number: 20, 
		colWidth: 2, 
		description: 'Physical Readiness', 
		textbox: true,
		placeholder: ''
	};

	var block21 = {
		number: 21, 
		colWidth: 2, 
		description: 'Billet Subcategory (if any)', 
		selectOptions: ['N/A', 'BASIC', 'APPROVED', 'INDIV AUG']
	};

	appendNewBlocksToElement([block16, block17, block18, block19, block20, block21], reportID, fields16to21);
	reportPage.append(fields16to21);

	var fields22to27 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block22 = {
		number: 22, 
		colWidth: 2, 
		description: 'Reporting Senior (Last, FI MI)', 
		textbox: true,
	};

	var block23 = {
		number: 23, 
		colWidth: 2, 
		description: 'Grade', 
		textbox: true,
	};

	var block24 = {
		number: 24, 
		colWidth: 2, 
		description: 'Desig', 
		textbox: true,
	};

	var block25 = {
		number: 25, 
		colWidth: 2, 
		description: 'Title', 
		textbox: true,
	};

	var block26 = {
		number: 26, 
		colWidth: 2, 
		description: 'UIC', 
		textbox: true,
	};

	var block27 = {
		number: 27, 
		colWidth: 2, 
		description: 'SSN', 
		textbox: true,
	};

	appendNewBlocksToElement([block22, block23, block24, block25, block26, block27], reportID, fields22to27);
	reportPage.append(fields22to27);

	var fields28to28 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block28 = {
		number: 28, 
		colWidth: 12, 
		description: 'Command employment and command achievements.', 
		textarea: true,
	};

	appendNewBlocksToElement([block28], reportID, fields28to28);
	reportPage.append(fields28to28);

	var fields29to29 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block29 = { //SPECIAL
		number: 29, 
		colWidth: 12, 
		description: 'Primary/Collateral/Watchstanding duties. (Enter primary duty abbreviation in box.)', 
	};

	appendNewBlocksToElement([block29], reportID, fields29to29);
	reportPage.append(fields29to29);

	var fields30to32 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block30to32text1 = {
		colWidth: 3,
		description: 'For Mid-term Counseling Use' 
	}

	var block30 = {
		number: 30, 
		colWidth: 3, 
		description: 'Date Counseled', 
		textbox: true,
	};

	var block31 = {
		number: 31, 
		colWidth: 3, 
		description: 'Counseler', 
		textbox: true,
	};

	var block32 = {
		number: 32, 
		colWidth: 3, 
		description: 'Signature of Individual Counseled', 
	};

	appendNewBlocksToElement([block30to32text1, block30, block31, block32], reportID, fields30to32);
	reportPage.append(fields30to32);

	var fields33to33 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block33 = {
		number: 33, 
		colWidth: 12, 
		description: "PROFESSIONAL EXPERTISE: Professional Knowledge proficiency, and qualifications. ", 
		radios: ['NOB', '1.0*', '2.0', '3.0', '4.0', '5.0']
	};

	appendNewBlocksToElement([block33], reportID, fields33to33);
	reportPage.append(fields33to33);

	var fields34to34 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block34 = {
		number: 34, 
		colWidth: 12, 
		description: "COMMAND OR ORGANIZATIONAL CLIMATE/EQUAL OPPORTUNITY: ", 
		radios: ['NOB', '1.0*', '2.0', '3.0', '4.0', '5.0']
	};

	appendNewBlocksToElement([block34], reportID, fields34to34);
	reportPage.append(fields34to34);

	var fields35to35 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block35 = {
		number: 35, 
		colWidth: 12, 
		description: "MILITARY BEARING CHARACTER: Appearance, conduct, physical fitness, adherence to Navy Core Values.", 
		radios: ['NOB', '1.0*', '2.0', '3.0', '4.0', '5.0']
	};

	appendNewBlocksToElement([block35], reportID, fields35to35);
	reportPage.append(fields35to35);

	var fields36to36 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block36 = {
		number: 36, 
		colWidth: 12, 
		description: "TEAMWORK: Contributions towards team building and team results.", 
		radios: ['NOB', '1.0*', '2.0', '3.0', '4.0', '5.0']
	};

	appendNewBlocksToElement([block36], reportID, fields36to36);
	reportPage.append(fields36to36);

	var fields37to37 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block37 = {
		number: 37, 
		colWidth: 12, 
		description: "MISSION ACCOMPLISHMENT AND INITIATIVE: Taking initiative, planning/prioritizing, achieving mission.", 
		radios: ['NOB', '1.0*', '2.0', '3.0', '4.0', '5.0']
	};

	appendNewBlocksToElement([block37], reportID, fields37to37);
	reportPage.append(fields37to37);

	var fields38to38 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block38 = {
		number: 38, 
		colWidth: 12, 
		description: "LEADERSHIP: Organizing, motivating and developing others to accomplish goals.", 
		radios: ['NOB', '1.0*', '2.0', '3.0', '4.0', '5.0']
	};

	appendNewBlocksToElement([block38], reportID, fields38to38);
	reportPage.append(fields38to38);

	var fields39to39 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block39 = {
		number: 39, 
		colWidth: 12, 
		description: "TACTICAL PERFORMANCE: (Warfare qualified officers only) Basic and tactical employment of weapons systems.", 
		radios: ['NOB', '1.0*', '2.0', '3.0', '4.0', '5.0']
	};

	appendNewBlocksToElement([block39], reportID, fields39to39);
	reportPage.append(fields39to39);

	var fields40to40 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block40 = { //SPECIAL
		number: 40, 
		colWidth: 12, 
		description: 'I recommend screening this individual for next career milestone(s) as follows: (maximum of two) Recommendations may be for competitive schools or duty assignments such as: LCPO, DEPT CPO, SEA, CMC, CWO, LDO, Dept Head, XO, OIC, CO, Major Command, War College, PG School.', 
	};

	appendNewBlocksToElement([block40], reportID, fields40to40);
	reportPage.append(fields40to40);

	var fields41to41 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block41 = { 
		number: 41, 
		colWidth: 12, 
		description: ' COMMENTS ON PERFORMANCE. * All 1.0 marks , three 2.0 marks, and 2.0 marks in Block 34 must be specifically substantiated in comments. Comments must be verifiable. Font must be 10 or 12 pitch (10 to 12 point) only. Use upper and lower case',
		textarea: true
	};

	appendNewBlocksToElement([block41], reportID, fields41to41);
	reportPage.append(fields41to41);

	var fields42to44 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block42 = {
		number: 42, 
		colWidth: 4, 
		description: 'Promotion Recommendation - INDIVIDUAL', 
		radios: ['NOB', 'Significant Problems', 'Progressing', 'Promotable', 'Must Promote', 'Early Promote']
	};

	var block43 = {
		number: 43, 
		colWidth: 4, 
		description: 'Promotion Recommendation - SUMMARY', 
		radios: ['NOB', 'Significant Problems', 'Progressing', 'Promotable', 'Must Promote', 'Early Promote'],
		disabled: true
	};

	var block44 = {
		number: 44, 
		colWidth: 4, 
		description: 'Reporting Senior Address',
		textarea: true
	};

	appendNewBlocksToElement([block42, block43, block44], reportID, fields42to44);
	reportPage.append(fields42to44);

	var fields45to46 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block45 = {
		number: 45, 
		colWidth: 6, 
		description: 'Signature of Reporting Senior', 
	};

	var block46 = {
		number: 46, 
		colWidth: 6, 
		description: 'Signature of individual evaluated. " I have seen this report, been apprised of my performance, and understand my right to make a statement."', 
		radios: ['I intend to submit a statement.', 'I do not intend to submit a statement.']
	};

	appendNewBlocksToElement([block45, block46], reportID, fields45to46);
	reportPage.append(fields45to46);

	var fields47to47 = jQuery('<div/>', {
		class: 'row fields-row'
	});

	var block47 = {
		number: 47, 
		colWidth: 12, 
		description: 'Typed name, grade, command, UIC, and signature of Regular Reporting Senior on Concurrent Report', 
		textbox: true
	};

	appendNewBlocksToElement([block47], reportID, fields47to47);
	reportPage.append(fields47to47);


	$('#detail-container').append(reportPage);

	$('.report-input-element').change(function(e) {
		console.log('change' + e.currentTarget.tagName);

		if ($(e.currentTarget).is('input[type=radio]')) {
			console.log('radio' + $(e.currentTarget).val());
		} else if ($(e.currentTarget).is('input[type=checkbox]')) {
			console.log('checkbox' + ($(e.currentTarget).is(':checked') ? true : false));
		} else if ($(e.currentTarget).is('select')) {
			console.log('select' + $(e.currentTarget).val());
		} else {
			$(e.currentTarget).trigger('input');
			return;
		}

		modifyReportMapAndLogPendingChange(reportID, $(e.currentTarget));
	});

	$('.report-input-element').on('input', function(e) {
		console.log('input' + e.currentTarget.tagName);

		if ($(e.currentTarget).is('input[type=text]')) {
			console.log('text' + $(e.currentTarget).val());
		} else if ($(e.currentTarget).is('textarea')) {
			console.log('textarea' + $(e.currentTarget).val());
		} else {
			console.log('Unknown element on input event ' + e + $(e.currentTarget).val());
		}

		modifyReportMapAndLogPendingChange(reportID, $(e.currentTarget));
	});
}
