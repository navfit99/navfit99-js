//var backendBaseURL = 'https://fitrep.herokuapp.com/';
var folders = []; //array
var reports = {}; //map
var retrievedFolders = [];

function disableMainUI() {
	$('.action-btn').prop('disabled', true);
}

function enableMainUI() {
	$('.action-btn').prop('disabled', false);
}

function showErrorAlertWithText(text) {
	$('#error-alert').show();
	$('#error-text').text(text);
}

function folderRowClicked() {
	console.log($(this));
}

function createNewFolderMap(parentID) {
	//find the highest folderID existing
	var highestFolderID = 0;
	for (var i = 0; i < folders.length; i++) {
		if (folders[i][folderIDKey] > highestFolderID)
			highestFolderID = folders[i][folderIDKey];
	}

	var newFolderMap = JSON.parse(blankFolderString);
	newFolderMap[folderParentKey] = parentID;
	newFolderMap[folderIDKey] = highestFolderID + 1;
	newFolderMap[folderNameKey] = "new folder";

	return newFolderMap;	
}

//Helper for getFolderChildIndicesFromArray()
function directChildIndicesOfFolder(folderID) {
	var directChildIndices = [];
	for (var i = 0; i < folders.length; i++) {
		if (folders[i][folderParentKey] == folderID) 
			directChildIndices.push(i);
	}
	return directChildIndices;
}

//Helper for folder struct deletion
function getFolderChildIndicesFromArray(folderID) {
	var allChildIndices = [];

	var directChildIndices = directChildIndicesOfFolder(folderID);
	if (directChildIndices.length > 0) {
		for (var i = 0; i < directChildIndices.length; i++) {
			allChildIndices.push(directChildIndices[i]);
		}
		
		for (var i = 0; i < directChildIndices.length; i++) {
			var childChildIndices = getFolderChildIndicesFromArray(directChildIndices[i][folderIDKey]);
			if (childChildIndices.length > 0)
				for (var j = 0; j < childChildIndices.length; j++) {
					allChildIndices.push(childChildIndices[j]);
				}
		}
	}

	console.log(allChildIndices);

	return allChildIndices;
}

function createFolderElement(folderMap) {
	//Folder main div container
		var singleFolderElement = jQuery('<div/>', {
			class: 'folder-row',
			id: 'folder' + folderMap[folderIDKey],
		});

		var folderTopBar = jQuery('<div/>', {
			class: 'folder-top-bar',
			id: 'folderTopBar' + folderMap[folderIDKey],
		});

		//Folder collapse button
		var collapseButton = jQuery('<button/>', {
			class: 'btn btn-info folder-collapse-button',
			'data-toggle': 'collapse',
			'data-target': '#folder' + folderMap[folderIDKey] + 'interior',
			'aria-expanded': 'true',
			'aria-controls': '#folder' + folderMap[folderIDKey] + 'interior',
			text: String.fromCharCode(9660),
			click: function(e) {
				if ($(this).html() == String.fromCharCode(9660))
					$(this).html(String.fromCharCode(9654));
				else if ($(this).html() == String.fromCharCode(9654))
					$(this).html(String.fromCharCode(9660));	
			}
		});

		//Folder title span
		var title = jQuery('<span/>', {
			class: 'folder-title',
			text: folderMap[folderNameKey],
		});

		if (title.text().length == 0)
			title.text('[blank]');

		//Folder comment span
		var comment = jQuery('<span/>', {
			class: 'folder-comment',
			text: ' - ' 
		});

		//Folder actions container
		var floatRightElement = jQuery('<span/>', {
			class: 'folder-float-right-element'
		});

		var actionsDropdownGroup = jQuery('<div/>', {
			class: 'btn-group folder-actions-group',
		});

		var actionsDropdownBtn = jQuery('<button/>', {
			class: 'btn btn-default dropdown-toggle hierarchy-actions-button',
			'data-toggle': 'dropdown',
			'aria-haspopup': 'true',
			'aria-expanded': 'false',
		});
		actionsDropdownBtn.html('<span class="glyphicon glyphicon-option-horizontal" aria-hidden="false">&nbsp;<span class="caret"></span>');

		var actionList = jQuery('<ul/>', {
			class: 'dropdown-menu'
		});

		//Add folder icon
		var elementAdd = jQuery('<li/>', {
			class: 'btn-primary'
		});
		elementAdd.html('<span class="glyphicon glyphicon-plus" aria-hidden="false"></span><span class="glyphicon glyphicon-folder-close" aria-hidden="false"></span> SubFolder');

		//Add report to folder icon
		var elementReportAdd = jQuery('<li/>', {
			class: 'btn-primary'
		});
		elementReportAdd.html('<span class="glyphicon glyphicon-plus" aria-hidden="false"></span><span class="glyphicon glyphicon-list-alt" aria-hidden="false"></span> Report');

		//Delete folder icon
		var elementDelete = jQuery('<li/>', {
			class: 'btn-danger'
		});
		elementDelete.html('<span class="glyphicon glyphicon-trash" aria-hidden="false"></span><span class="glyphicon glyphicon-folder-close" aria-hidden="false"></span> Delete');

		var elementHandle = jQuery('<span/>', {
			class: 'elementHandle ' + 'folder' + folderMap[folderIDKey] + 'handle'
		});
		elementHandle.html('<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>')

		//Folder interior
		var interior = jQuery('<div/>', {
			class: 'collapse in folder-interior',
			id: 'folder' + folderMap[folderIDKey] + 'interior'
		});

		
		//create folder title click element
  	(function(folderID, element){
      element.click(function(e) {
      	e.stopPropagation();

      	if ($('.folder-selected').length > 0)
      		$('.folder-selected').removeClass('folder-selected');
      	element.addClass('folder-selected');

      	loadReportsForFolderFromServer(folderID);
  		});
    })(folderMap[folderIDKey], title);
    

		//create add element handler
  	(function(parentID, element, containingDivToAddTo){
      element.click(function(e) {
      	e.stopPropagation();

      	//create new folder struct and add
      	var newFolderMap = createNewFolderMap(parentID);

      	folders.push(newFolderMap);

      	$('#folder' + folderMap[folderIDKey] + 'interior').append(createFolderElement(newFolderMap))

      });
  	})(folderMap[folderIDKey], elementAdd, singleFolderElement);

  	//create delete element handler
  	(function(folderID, element, containingDivToRemove){
      element.click(function(e) {
      	e.stopPropagation();

      	//Delete child folders
      	var sortedChildIndices = getFolderChildIndicesFromArray(folderID).sort(function(a, b) {
      		return a - b;
      	});

      	console.log(sortedChildIndices);

      	for (var i = sortedChildIndices.length - 1; i >= 0; i--)
      		folders.remove(sortedChildIndices[i]);

      	//Delete the folder in question
      	for (var i = 0; i < folders.length; i++) {
      		if (folders[i][folderIDKey] == folderID) {
      			folders.remove(i, i);
      			break;
      		}
      	}

      	//Delete div for folder in question
      	containingDivToRemove.remove();
      });
  	})(folderMap[folderIDKey], elementDelete, singleFolderElement);

		folderTopBar.append(collapseButton);
		folderTopBar.append(title);

		actionList.append(elementReportAdd, elementAdd, elementDelete);
		actionsDropdownGroup.append(actionsDropdownBtn);
		actionsDropdownGroup.append(actionList);

		floatRightElement.append(actionsDropdownGroup, elementHandle);
		folderTopBar.append(floatRightElement);
		singleFolderElement.append(folderTopBar);
		singleFolderElement.append(interior);

		return singleFolderElement;
}

function createReportElement(reportMap) {
	//report main div container
		var singleReportElement = jQuery('<div/>', {
			class: 'report-row',
			id: "report" + reportMap[reportIDKey],
		});

		var reportTopBar = jQuery('<div/>', {
			class: 'report-top-bar',
			id: reportMap[reportIDKey],
		});

		var maskedSSN;
		if (reportMap[reportSSNKey])
			maskedSSN = 'XXX-XX-' + reportMap[reportSSNKey].substr(reportMap[reportSSNKey].length - 4);
		else
			maskedSSN = "No SSN";

		//report title span
		var title = jQuery('<span/>', {
			class: 'report-title',
			text: reportMap[reportRateKey] + ' ' + reportMap[reportNameKey],
		});

		//report comment span
		var comment = jQuery('<span/>', {
			class: 'report-comment',
			text: maskedSSN 
		});

		//report actions container
		var floatRightElement = jQuery('<span/>', {
			class: 'report-float-right-element'
		});

		var actionsDropdownGroup = jQuery('<div/>', {
			class: 'btn-group report-actions-group',
		});

		var actionsDropdownBtn = jQuery('<button/>', {
			class: 'btn btn-default dropdown-toggle hierarchy-actions-button',
			'data-toggle': 'dropdown',
			'aria-haspopup': 'true',
			'aria-expanded': 'false',
		});
		actionsDropdownBtn.html('<span class="glyphicon glyphicon-option-horizontal" aria-hidden="false">&nbsp;<span class="caret"></span>');

		var actionList = jQuery('<ul/>', {
			class: 'dropdown-menu'
		});

		//Delete report icon
		var elementDelete = jQuery('<li/>', {
			class: 'btn-danger'
		});
		elementDelete.html('<span class="glyphicon glyphicon-trash" aria-hidden="false"></span><span class="glyphicon glyphicon-list-alt" aria-hidden="false"></span> Delete');

		//create report title click element
  	(function(reportID, element){
      element.click(function(e) {
      	e.stopPropagation();

      	if ($('.report-selected').length > 0)
      		$('.report-selected').removeClass('report-selected');
      	element.addClass('report-selected');

      	//load report in detail view

      	$('.detail-container').empty();
      	showReportDetail();
  		});
    })(reportMap[reportIDKey], title);

  	//create delete element handler
  	(function(reportID, element, containingDivToRemove){
      element.click(function(e) {
      	e.stopPropagation();

      	delete reports[reportID];

      	//Delete div for report in question
      	containingDivToRemove.remove();
      });
  	})(reportMap[reportIDKey], elementDelete, singleReportElement);

		reportTopBar.append(title, jQuery('<br/>'), comment);

		actionList.append(elementDelete);
		actionsDropdownGroup.append(actionsDropdownBtn);
		actionsDropdownGroup.append(actionList);

		floatRightElement.append(actionsDropdownGroup);
		reportTopBar.append(floatRightElement);
		singleReportElement.append(reportTopBar);

		return singleReportElement;
}

function processFolders(data) {
	folders = data;

	console.log(data);
	for (var i = 0; i < data.length; i++) {
		var folderMap = data[i];

		var singleFolderElement = createFolderElement(folderMap);

		var containingFolderInterior;
		if (folderMap[folderParentKey] == 0)
			containingFolderInterior = $('#folders-container');
		else
			containingFolderInterior = $('#folder' + folderMap[folderParentKey] + 'interior');

		containingFolderInterior.append(singleFolderElement);
	}
}

function processReports(data) {
	var retrievedReports = data;

	console.log(retrievedReports);
	for (var i = 0; i < retrievedReports.length; i++) {
		var reportMap = retrievedReports[i];

		reports[reportMap[reportIDKey]] = reportMap;

		var singleReportElement = createReportElement(reportMap);

		var containingInterior = $('#reports-container');
		containingInterior.append(singleReportElement);
	}	

}

function loadFoldersFromServer() {
	loadData(getUrlParameter(fileUUIDKey), 1, null);
}

function loadReportsForFolderFromServer(folderID) {
	$('#reports-container').empty();

	for (var i = 0; i < retrievedFolders.length; i++) {
		if (retrievedFolders[i] == folderID) {
			for (var j in reports) {
				if (parseInt(reports[j][reportParentIDKey].split(" ")[1]) == folderID) {
					var singleReportElement = createReportElement(reports[j]);

					var containingInterior = $('#reports-container');
					containingInterior.append(singleReportElement);
				}
			}
			return;
		}
	}

	loadData(getUrlParameter(fileUUIDKey), 3, folderID);
}

function loadData(fileUUID, type, typeData) {
	/*
	disableMainUI();
	$('#new-file-loader-aspect').show();
	*/

  $.ajax({
    url: backendBaseURL + backendFileHandler,
    type: 'POST',
    data: {
    	'fileUUID': fileUUID,
    	'type': type,
    	'typeData': typeData
    },
    cache: false,
    success: function(data, textStatus, jqXHR)
    {
    	console.log(data);
    	if (data['Status'] == 0) {
    		switch(type) {
    			case 1:
    				processFolders(data['NavFitDatabase']);
    				break;
    			case 3:
    				processReports(data['NavFitDatabase']);
    				retrievedFolders.push(typeData);
    				break;
    			default:
    				console.log('Unknown type '+ type);
    		}

    	} else {
    		enableMainUI();
    		showErrorAlertWithText(data['StatusData']);
    		$('#new-file-loader-aspect').hide();
    	}
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
      enableMainUI();
      showErrorAlertWithText(textStatus);
      $('#new-file-loader-aspect').hide();
    },
    complete(jqXHR, textStatus) {
    	
    }
	});

}

$(document).ready(function() {
	console.log(getUrlParameter(fileUUIDKey));

	loadFoldersFromServer();
});

//https://stackoverflow.com/a/21903119/761902
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};