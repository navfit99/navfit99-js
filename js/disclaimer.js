function hideDisclaimer() {
	$('.disclaimer').hide();

  sessionStorage.setItem(disclaimerKey, true);

	enableMainUI();
}

function setupDisclaimer(forceShow) {
	$('#disclaimer-btn').click(hideDisclaimer);
  $('#disclaimer-btn').focus();

  if (!forceShow) {
  	if (sessionStorage.getItem(disclaimerKey))
  		hideDisclaimer();
  }
}