jQuery.fn.showLoading = function(options) {
	var indicatorID;
	var settings = {'addClass' : '','beforeShow' : '','afterShow' : '','hPos' : 'center','vPos' : 'center',
			'indicatorZIndex' : 5001,'overlayZIndex' : 5000,'parent' : '','marginTop' : 0,'marginLeft' : 0,'overlayWidth' : null,'overlayHeight' : null};
	jQuery.extend(settings, options);
	var testDiv = '<div class="centerLoading"><div class="loading-pulse"><div></div><div></div><div></div>';
	testDiv += '<img class="imgLogoLoading" alt="FFI" src="../../../web/css/Bancolombia/images/logo.png" srcset="../../../web/css/Bancolombia/images/logo_bancolombia.svg"></div>';
	var loadingDiv = jQuery(testDiv);
	var overlayDiv = jQuery('<div></div>');
	indicatorID = getIndicator(settings);
	jQuery(loadingDiv).attr('id', 'loading-indicator-' + indicatorID);
	jQuery(overlayDiv).css('display', 'none');
	jQuery(document.body).append(overlayDiv);
	jQuery(overlayDiv).attr('id', 'loading-indicator-' + indicatorID + '-overlay');
	jQuery(overlayDiv).addClass('loading-indicator-overlay');
	if (settings.addClass) {
		jQuery(loadingDiv).addClass(settings.addClass);
		jQuery(overlayDiv).addClass(settings.addClass + '-overlay');
	}
	var overlay_width;
	var overlay_height;
	var border_top_width = isNaNValues(jQuery(this).css('border-top-width'));
	var border_left_width = isNaNValues(jQuery(this).css('border-left-width'));
	var overlay_left_pos = jQuery(this).offset().left + parseInt(border_left_width);
	var overlay_top_pos = jQuery(this).offset().top + parseInt(border_top_width);
	if (settings.overlayWidth !== null) {
		overlay_width = settings.overlayWidth;
	} else {
		overlay_width = parseInt(jQuery(this).width()) + parseInt(jQuery(this).css('padding-right')) + parseInt(jQuery(this).css('padding-left'));
	}
	if (settings.overlayHeight !== null) {
		overlay_height = settings.overlayHeight;
	} else {
		overlay_height = parseInt(jQuery(this).height()) + parseInt(jQuery(this).css('padding-top')) + parseInt(jQuery(this).css('padding-bottom'));
	}
	jQuery(overlayDiv).css('width', overlay_width.toString() + 'px');
	jQuery(overlayDiv).css('height', overlay_height.toString() + 'px');
	jQuery(overlayDiv).css('left', overlay_left_pos.toString() + 'px');
	jQuery(overlayDiv).css('position', 'absolute');
	jQuery(overlayDiv).css('top', overlay_top_pos.toString() + 'px');
	jQuery(overlayDiv).css('z-index', settings.overlayZIndex);
	isValidSettings(settings.overlayCSS, overlayDiv);
	jQuery(loadingDiv).css('display', 'none');
	jQuery(document.body).append(loadingDiv);
	jQuery(loadingDiv).css('position', 'absolute');
	jQuery(loadingDiv).css('z-index', settings.indicatorZIndex);
	var indicatorTop = sumMargin(overlay_top_pos, settings.marginTop);
	var indicatorLeft = sumMargin(overlay_left_pos, settings.marginLeft);
	addStylesLoading(settings.hPos, indicatorLeft, overlayDiv, loadingDiv, 'left');
	addStylesLoading(settings.vPos, indicatorTop, overlayDiv, loadingDiv, 'top');
	isValidSettings(settings.css, loadingDiv);
	var callback_options = {
		'overlay' : overlayDiv,'indicator' : loadingDiv,'element' : this
	};
	if (typeof (settings.beforeShow) == 'function') {
		settings.beforeShow(callback_options);
	}
	jQuery(overlayDiv).show();
	jQuery(loadingDiv).show();
	if (typeof (settings.afterShow) == 'function') {
		settings.afterShow(callback_options);
	}
	return this;
};

jQuery.fn.hideLoading = function(options) {
	var settings = {};
	var indicatorID;
	jQuery.extend(settings, options);
	indicatorID = getIndicator(settings);
	jQuery(document.body).find('#loading-indicator-' + indicatorID).remove();
	jQuery(document.body).find('#loading-indicator-' + indicatorID + '-overlay').remove();
	return this;
};

function getIndicator(settings){
	if (settings.indicatorID) {
		return settings.indicatorID;
	} else {
		return jQuery(this).attr('id');
	}
}

function isNaNValues(border){
	if (isNaN(parseInt(border))) {
		return 0;
	} else {
		return border;
	}
}

function isValidSettings(settingsStyle, overdiv){
	if(settingsStyle)
		jQuery(overdiv).css(settingsStyle);
}

function addStylesLoading(position, indicator, overlayDiv, loadingDiv, side){
	if (position.toString().toLowerCase() == 'center' && side === 'left') {
		jQuery(loadingDiv).css(side, (indicator + ((jQuery(overlayDiv).width() - parseInt(jQuery( loadingDiv).width())) / 2)).toString() + 'px');
	}else if (position.toString().toLowerCase() == 'center' && side === 'top') {
		jQuery(loadingDiv).css(side, (indicator + ((jQuery(overlayDiv).height() - parseInt(jQuery( loadingDiv).height())) / 2)).toString() + 'px');
	} else if (position.toString().toLowerCase() == 'top') {
		jQuery(loadingDiv).css(side, indicator.toString() + 'px');
	} else if (position.toString().toLowerCase() == 'bottom') {
		jQuery(loadingDiv).css(side, (indicator + (jQuery(overlayDiv).height() - parseInt(jQuery( loadingDiv).height()))).toString() + 'px');
	} else if (position.toString().toLowerCase() == 'left') {
		jQuery(loadingDiv).css(side, (indicator + parseInt(jQuery(overlayDiv).css( 'margin-left'))).toString() + 'px');
	} else if (position.toString().toLowerCase() == 'right') {
		jQuery(loadingDiv).css(side, (indicator + (jQuery(overlayDiv).width() - parseInt(jQuery( loadingDiv).width()))).toString() + 'px');
	} else {
		jQuery(loadingDiv).css(side, (indicator + parseInt(position)).toString() + 'px');
	}
}

function sumMargin(indicator, margin){
	if (margin) {
		indicator += parseInt(margin);
	}
	return indicator;
}
