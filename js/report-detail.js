function showReportDetail(reportID) {

	var reportPage = jQuery('<div/>', {
		class: 'report-page'
	});

	//Setup meta data row
	var metadataRow = jQuery('<div/>', {
		class: 'row metadata-row'
	});

	var parentFolderLabel = jQuery('<label/>', {
		text: 'Parent Folder '
	});

	var selectParentFolderInput = jQuery('<select/>', {
		class: 'metadata-input-element',
	});

	for (var i = 0; i < folders.length; i++) {
		var folderID = folders[i][folderIDKey];

		var option = jQuery('<option/>', {
			value: folderID,
			text: folders[i][folderNameKey] + ' - ID:' + folderID
		});
		selectParentFolderInput.append(option);

		if (folders[i][folderIDKey] == reports[reportID][reportParentIDKey].split(" ")[1])
			option.prop('selected', true);
	}

	parentFolderLabel.append(selectParentFolderInput);
	metadataRow.append(parentFolderLabel);
	reportPage.append(metadataRow);

	//Setup report details
	var format = getReportFormatForReportID(reportID);

	for (var i = 0; i < format['rowContents'].length; i++) {
		var rowOfFields = jQuery('<div/>', {
			class: 'row fields-row'
		});

		var fieldFormatArray = [];

		for (var j = 0; j < format['rowContents'][i].length; j++) {
			fieldFormatArray.push(format['blocks'][format['rowContents'][i][j].toString()]);
		}

		appendNewBlocksToElement(fieldFormatArray, reportID, rowOfFields);
		reportPage.append(rowOfFields);
	}

	$('#detail-container').empty();
	$('#detail-container').append(reportPage);

	//Setup change handlers for metadata elements
	$('.metadata-input-element').change(function(e) {
		console.log('change' + e.currentTarget.tagName);
	 	if ($(e.currentTarget).is('select')) {
			reports[reportID][reportParentIDKey] = 'a ' + $(e.currentTarget).val();
		}

		logPendingChange(EditScopeEnum.report, EditOpEnum.update, reports[reportID]);
	});


	//Setup input and change handlers for input elements
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
