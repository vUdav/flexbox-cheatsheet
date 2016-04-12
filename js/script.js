$(document).ready(function() {
	pulseBlock();
	copy();
	inputClipboardDataChange();
});

// pulse code block then hover on value shorthand properties
function pulseBlock() {
	$('.code-container__element a').hover(function(){
		var propertyId = $(this).attr('href');
		$(propertyId).toggleClass('code-container__element--pulse');
	});
}

// copy to clipboard property and value then click on value
function copy() {
	$('.code-container__element-value').on('click',function(e){
		e.preventDefault();
	});

	var clipboard = new Clipboard('.code-container__element-value');
	clipboard.on('success', function(e) {
		var notifyBlock = '<div class="copy-notify__block copy-notify__block--success"><strong>'+e.text+'</strong><br>is copied!</div>';
		$('#copy-notify').prepend(notifyBlock);
		// setTimeout(function(){$('#copy-notify').removeClass('copy-notify--success')}, 3000);
		e.clearSelection();
	});
}

// change input data-clipboard-text
function inputClipboardDataChange() {
	$('input.code-container__element-value').on('change',function(){
		var id = $(this).attr('id');
		var value = $(this).val();
		var clipboardText = id+': '+value+';';
		$(this).attr('data-clipboard-text',clipboardText);
	});
}