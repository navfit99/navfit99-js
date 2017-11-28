function errorCloseButtonClicked() {
	$('#error-alert').hide();
}

function successCloseButtonClicked() {
	$('#success-alert').hide();
}

function warnCloseButtonClicked() {
	$('#warn-alert').hide();
}

function textAreaCloseButtonClicked() {
	$('#textarea-alert').hide();
}

function showErrorAlertWithText(text) {
	$('#error-alert').show();
	$('#error-text').text(text);
}

function showSuccessAlertWithText(text) {
	$('#success-alert').show();
	$('#success-text').text(text);
}

function showWarnAlertWithTextWithLink(text, link) {
	$('#warn-alert').show();
	$('#warn-text').text(text);
	$('#warn-link').val(link);
}

function showTextAreaAlertWithTextWithData(text, data) {
	$('#textarea-alert').show();
	$('#textarea-text').text(text);
	$('#textarea-data').val(data);
}


$(document).ready(function() {
	$('#error-close-btn').click(errorCloseButtonClicked);
	$('#success-close-btn').click(successCloseButtonClicked);
	$('#warn-close-btn').click(warnCloseButtonClicked);

	$('#textarea-close-btn').click(textAreaCloseButtonClicked);
});