/*
 * jQuery jclock - Clock plugin - v 0.2.1
 * http://plugins.jquery.com/project/jclock
 *
 * Copyright (c) 2007-2008 Doug Sparling <http://www.dougsparling.com>
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($) {

  $.fn.jclock = function(options) {
    var version = '0.2.1';

    // options
    var opts = $.extend({}, $.fn.jclock.defaults, options);


	
    return this.each(function() {
      $this = $(this);
      $this.timerID = null;
      $this.running = false;
      $this.startTime = new Date();
      $this.serverTime = new Date();
	  $this.h_date = new Date( );
	  $this.format = "$dia$ de $nombreMes$ de $anio$ $hhmmss$ $ampm$";
	  $this.language = "es"; //es, en
	  $this.secondCounter = 0;
	  
	$this.diasES = ["Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&aacute;bado" ];
	$this.diasEN = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	$this.mesesES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	$this.mesesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

      $this.timeNotation = o.timeNotation;
      $this.am_pm = o.am_pm;
      $this.utc = o.utc;
      $this.utc_offset = o.utc_offset;
      $this.h_hour = o.h_hour;
	  $this.h_date = new Date( o.h_date ); 
	  $this.format = o.h_format;
	  $this.language = o.h_language;
	  //alert(""+$this.h_date+" "+$this.h_hour );

      var hhmmss = $this.h_hour.split(":");
      $this.serverTime = new Date($this.h_date);
      $this.serverTime.setHours( hhmmss[0] );
      $this.serverTime.setMinutes( hhmmss[1] );
      $this.serverTime.setSeconds( hhmmss[2] );

      $this.css({
        fontFamily: o.fontFamily,
        fontSize: o.fontSize,
        backgroundColor: o.background,
        color: o.foreground
      });

      $.fn.jclock.startClock($this);

    });
  };
       
  $.fn.jclock.startClock = function(el) {
    $.fn.jclock.stopClock(el);
    $.fn.jclock.displayTime(el);
  }
  $.fn.jclock.stopClock = function(el) {
    if(el.running) {
      clearTimeout(el.timerID);
    }
    el.running = false;
  }
  $.fn.jclock.displayTime = function(el) {
    var time = $.fn.jclock.getTime(el);
    el.html(time);
    el.timerID = setTimeout(function(){$.fn.jclock.displayTime(el)},1000);
  }


  $.fn.jclock.getDelay = function( ){
  	/*var milisNow = new Date().getTime();
	var milisStart = $this.startTime.getTime();
	milisDelay = milisNow - milisStart;
	return milisDelay;*/
	
	return ( $this.secondCounter++ )*1000; 
	

  }

  $.fn.jclock.formatTime = function(  hhmmss, date, am_pm ) {
	var finalStr = $this.format.replace( "$anio$", date.getFullYear() );
	finalStr = finalStr.replace( "$dia$", date.getDate() );
	finalStr = finalStr.replace( "$hhmmss$", hhmmss );
	finalStr = finalStr.replace( "$ampm$", am_pm );
	
	if( $this.language == "en" ){
		finalStr = finalStr.replace( "$nombreDia$",  $this.diasEN[date.getDay() ] );
		finalStr = finalStr.replace( "$nombreMes$", $this.mesesEN[date.getMonth() ]  );	
	}
	else{
		finalStr = finalStr.replace( "$nombreDia$",  $this.diasES[date.getDay() ] );
		finalStr = finalStr.replace( "$nombreMes$", $this.mesesES[date.getMonth() ]  );
	}
	return finalStr;
  }


  $.fn.jclock.getTime = function(el) {
    var now = new Date();
    var hours, minutes, seconds;

    var milisactual = $this.serverTime.getTime() + $.fn.jclock.getDelay();
    now.setTime( milisactual );
	
	

    if(el.utc == true) {
      if(el.utc_offset != 0) {
        now.setUTCHours(now.getUTCHours()+el.utc_offset);
      }
      hours = now.getUTCHours();
      minutes = now.getUTCMinutes();
      seconds = now.getUTCSeconds();
    } else {
      hours = now.getHours();
      minutes = now.getMinutes();
      seconds = now.getSeconds();
    }

    var am_pm_text = '';
    (hours >= 12) ? am_pm_text = " PM" : am_pm_text = " AM";

    if (el.timeNotation == '12h') {
      hours = ((hours > 12) ? hours - 12 : hours);
    } else {
      hours   = ((hours <  10) ? "0" : "") + hours;
    }

    minutes = ((minutes <  10) ? "0" : "") + minutes;
    seconds = ((seconds <  10) ? "0" : "") + seconds;

    var timeNow = hours + ":" + minutes + ":" + seconds;
    if ( (el.timeNotation != '12h') || (el.am_pm != true) ) {
     	//timeNow += am_pm_text;
		am_pm_text = "";
    }
	var monthName = $this.mesesES[ now.getMonth() ];
	var dayName = $this.diasES[ now.getDay () ];
	timeNow = $.fn.jclock.formatTime( timeNow, now, am_pm_text );
    return timeNow;
  };
       
  // plugin defaults
  $.fn.jclock.defaults = {
    timeNotation: '24h',
    am_pm: false,
    utc: false,
    fontFamily: '',
    fontSize: '',
    foreground: '',
    background: '',
    utc_offset: 0,
    h_hour: ''
  };

})(jQuery);
