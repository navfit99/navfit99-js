//var backendBaseURL = 'http://localhost:8000/';
var frontendBaseURL = 'http://localhost';

$(window).on("load", function(){

});

$(document).ready(function() {
	$('#import-form').prop('action', backendBaseURL + '/upload');
	$('#edit-form').prop('action', frontendBaseURL + '/file.html');
	$('#edit-form').on('submit', editFormSubmitted);

	$('#import-btn').click(importButtonClicked);

	$('#file-input').change( function() {
		uploadFile();
	});

	$('#new-file-btn').click(newFileButtonClicked);
	$('#edit-btn').click(editButtonClicked);

	$('#edit-submit-btn').click(editSubmitButtonClicked);

	$('#edit-close-btn').click(editCloseButtonClicked);

  $('#disclaimer-btn').click(hideDisclaimer);
  $('#disclaimer-btn').focus();

  disableMainUI();
});

function disableMainUI() {
	$('.action-btn').prop('disabled', true);
}

function enableMainUI() {
	$('.action-btn').prop('disabled', false);
}

function editFormSubmitted() {
	$('.action-btn:not(#edit-btn)').removeClass('btn-primary btn-warning');

	$('#edit-close-btn').hide();
	$('#edit-uuid-text').prop('disabled', true);
	$('#edit-submit-btn').prop('disabled', true);
}

function uploadFile() {
	disableMainUI();
	$('#import-loader-aspect').show();

	// Create a formdata object and add the files
  var data = new FormData();

  $.each($('#file-input')[0].files, function(key, value)
  {
      data.append(key, value);
      console.log(key);
  });

  $.ajax({
    url: backendBaseURL + '/upload',
    type: 'POST',
    data: data,
    cache: false,
    dataType: 'text',
    processData: false, // Don't process the files
    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
    success: function(data, textStatus, jqXHR)
    {
    	data = JSON.parse(data);
    	if (data['Status'] == 0) {
    		$('.action-btn:not(#import-btn)').removeClass('btn-primary btn-warning');
    		$('#import-btn').text("Loading");
      	window.location.href = frontendBaseURL + '/file.html?uuid=' + data['StatusData'];      	
    	} else {
    		enableMainUI();
    		showErrorAlertWithText(data['StatusData']);
    		$('#import-loader-aspect').hide();
    	}
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
    	enableMainUI();
      showErrorAlertWithText(textStatus);
      $('#import-loader-aspect').hide();
    },
    complete(jqXHR, textStatus) {
    	
    }
	})
  .uploadProgress(function(e){
    if (e.lengthComputable) {
      var percentage = Math.round((e.loaded * 100) / e.total);
      console.log(percentage);
    }
  });

}

function importButtonClicked() {
  $('#file-input').trigger('click');
}

function newFileButtonClicked() {
	disableMainUI();
	$('#new-file-loader-aspect').show();

  $.ajax({
    url: backendBaseURL + 'newFile',
    type: 'GET',
    cache: false,
    success: function(data, textStatus, jqXHR)
    {
    	if (data['Status'] == 0) {
    		$('.action-btn:not(#new-file-btn)').removeClass('btn-primary btn-warning');
    		$('#new-file-btn').text("Loading");
      	window.location.href = frontendBaseURL + '/file.html?uuid=' + data['StatusData'];      	
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

function editButtonClicked() {
	disableMainUI();
	$('#edit-alert').show();
}

function editSubmitButtonClicked() {
	editFormSubmitted();
	$('#edit-form').submit();
}

function editCloseButtonClicked() {
	enableMainUI();
	$('#edit-alert').hide();
}

function hideDisclaimer() {
	$('.disclaimer').hide();

	enableMainUI();
}