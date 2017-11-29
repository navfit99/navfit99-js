$(window).on("load", function(){

});

function editFormSubmitted() {
	$('.action-btn:not(#edit-btn)').removeClass('btn-primary btn-warning');

	$('#edit-close-btn').hide();
	$('#edit-uuid-text').prop('disabled', true);
	$('#edit-submit-btn').prop('disabled', true);
}

function loginButtonClicked() {
  disableMainUI();
  $('#login-loader-aspect').show();
  document.location.assign(authBaseURL + authVerifyHandler);
}

function setupLoginLogoutUI() {
  $('#login-btn').click(loginButtonClicked);
  if (setupLogoutButton(function() {
    document.location.reload();
  })) {
    $('#login-btn').css('display', 'none');
    setupUserNavfitListButton();
  } else {
    $('#user-btn').css('display', 'none');
    $('#login-btn').css('display', 'inline');
  }
}

$(document).ready(function() {
  checkAuthStruct(getAuthStruct(true), function(valid) {
    if (!valid) {
      sessionStorage.clear();
      setupLoginLogoutUI();
    }
  });

  setupDisclaimer(true);

  $('#import-form').prop('action', backendBaseURL + backendUploadHandler);
  $('#edit-form').prop('action', frontendFileHandler);
  //$('#edit-form').on('submit', editFormSubmitted);

  $('#import-btn').click(importButtonClicked);

  $('#file-input').change( function() {
    uploadFile();
  });

  $('#new-file-btn').click(newFileButtonClicked);
  $('#edit-btn').click(editButtonClicked);

  $('#edit-submit-btn').click(editSubmitButtonClicked);
  $('#edit-close-btn').click(editCloseButtonClicked);

  

  disableMainUI();

  setupLoginLogoutUI();
});