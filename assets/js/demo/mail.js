
// Mail.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - Designbudy.com -



$(document).ready(function() {


	// MAILBOX-COMPOSE.HTML
	// =================================================================

	if ($('#demo-mail-compose').length) {


		// SUMMERNOTE
		// =================================================================
		// Require Summernote
		// http://hackerwins.github.io/summernote/
		// =================================================================
		$('#demo-mail-compose').summernote({
			height:500
		});


		// Show The CC Input Field
		// =================================================================
		$('#demo-toggle-cc').on('click', function(){
			$('#demo-cc-input').toggleClass('hide');
		});



		// Show The BCC Input Field
		// =================================================================
		$('#demo-toggle-bcc').on('click', function(){
			$('#demo-bcc-input').toggleClass('hide');
		});



		// Attachment button.
		// =================================================================
		$('.btn-file :file').on('fileselect', function(event, numFiles, label, fileSize) {
			$('#demo-attach-file').html('<strong class="box-block text-capitalize"><i class="fa fa-paperclip fa-fw"></i> '+label+'</strong><small class="text-muted">'+fileSize+'</small>');
		});


		return;
	}





	// MAILBOX-MESSAGE.HTML
	// =================================================================

	// SUMMERNOTE
	// =================================================================
	// Require Summernote
	// http://hackerwins.github.io/summernote/
	// =================================================================
	if( $('#demo-mail-textarea').length ){
		$('#demo-mail-textarea').on('click', function(){
			$(this).empty().summernote({
			height:300,
			focus: true
			});
			$('#demo-mail-send-btn').removeClass('hide');
		});
		return;
	}





	// MAILBOX.HTML
	// =================================================================
	var mSelAllCb 	= $('#demo-checked-all-mail').find('.form-checkbox');
	var mListCb 	= $('.demo-cb-mail');
	var mReadCb 	= $('#demo-mail-list').find('li:not(.mail-list-unread)');
	var mUnreadCb 	= $('#demo-mail-list').find('.mail-list-unread');
	var mStarBtn 	= $('#demo-mail-list').find('.mail-star a');


	// Select / deselect all checkboxes.
	// =================================================================
	$('#demo-checked-all-mail').on('click', function(e){
		if(!mSelAllCb.jasmineCheck('isChecked')){
			mListCb.jasmineCheck('toggleOn');
			mSelAllCb.jasmineCheck('toggleOn');
		}else{
			mListCb.jasmineCheck('toggleOff');
			mSelAllCb.jasmineCheck('toggleOff');
		}
	});


	// Sellect all checkboxes.
	// =================================================================
	$('#demo-select-all-list').on('click', function(e){
		mListCb.jasmineCheck('toggleOn');
		mSelAllCb.jasmineCheck('toggleOn');
	});


	// Toggle checkboxes.
	// =================================================================
	$('#demo-select-toggle-list').on('click', function(e){
		mListCb.jasmineCheck('toggle');
	});


	// Uncheck all checkboxes.
	// =================================================================
	$('#demo-select-none-list').on('click', function(e){
		mListCb.jasmineCheck('toggleOff');
		mSelAllCb.jasmineCheck('toggleOff');
	});


	// Check on all the messages that have been read.
	// =================================================================
	$('#demo-select-read-list').on('click', function(e){
		mListCb.jasmineCheck('toggleOff');
		mReadCb.jasmineCheck('toggleOn');
	});


	// Checks on all unread messages.
	// =================================================================
	$('#demo-select-unread-list').on('click', function(e){
		mListCb.jasmineCheck('toggleOff');
		mUnreadCb.jasmineCheck('toggleOn');
	});


	// Check on all the messages that have been starred.
	// =================================================================
	$('#demo-select-starred-list').on('click', function(e){
		mListCb.jasmineCheck('toggleOff');
		$('#demo-mail-list').find('.mail-starred .demo-cb-mail').jasmineCheck('toggleOn');
	});


	//  Toggle the star on/off.
	// =================================================================
	mStarBtn.on('click', function(e){
		e.preventDefault();

		$(this).closest('li').toggleClass('mail-starred');
	});


	// highlight the message.
	// =================================================================
	mListCb.on('jasmine.ch.checked', function(){
		$(this).parents('li').addClass('highlight');
	}).on('jasmine.ch.unchecked', function(){
		$(this).closest('li').removeClass('highlight');
	});


	// Loading overlay.
	// =================================================================
	$('#demo-mail-ref-btn').jasmineOverlay().on('click', function(){
		var $el = $(this), relTime;

		$el.jasmineOverlay('show');
		relTime = setInterval(function(){
			$el.jasmineOverlay('hide');
			clearInterval(relTime);
		},2500);
	});


 });

