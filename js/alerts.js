function errorCloseButtonClicked() {
	$('#error-alert').hide();
}

function successCloseButtonClicked() {
	$('#success-alert').hide();
}

function showErrorAlertWithText(text) {
	$('#error-alert').show();
	$('#error-text').text(text);
}

function showSuccessAlertWithText(text) {
	$('#success-alert').show();
	$('#success-text').text(text);
}

$(document).ready(function() {
	$('#error-close-btn').click(errorCloseButtonClicked);
	$('#success-close-btn').click(successCloseButtonClicked);
});