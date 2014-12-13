function Cookies($){
	this.__proto__.header = [];
	this.__proto__.signal = $;
	
	var cookieHeader = $.header('cookie');
	if(cookieHeader){
		var split = cookieHeader.split(';');
		var split_length = split.length;
		for(var i = 0; i < split_length; i++){
			var item = split[i];
			var cookieSplit = item.split('=');
			if(cookieSplit.length){
				var name = cookieSplit[0] ? cookieSplit[0].trim() : '';
				var value = cookieSplit[1] ? cookieSplit[1].trim() : '' ;
				this[name] = value;
			}
		}
	}
		
	return this;
}

Cookies.prototype.set = function(name, value, options){
	// Safe Options Reference
	var options = options || {};
	
	// Calculate Expiration Time
	if(isset(options.expire)){
		var days 	 = options.expire[0]*1000*60*60*24;
		var hours 	 = options.expire[1] ? options.expire[1]*1000*60*60 : 0 ;
		var minutes  = options.expire[2] ? options.expire[2]*1000*60 : 0;
		var future 	 = days+hours+minutes;
		var now 	 = new Date().getTime();
		var expires  = ' Expires='+ new Date(now+future).toGMTString()+' ';
	} else {
		var expires = '';
	}
	
	// Create Safe References to Cookie Options
	var domain 	 = (!isset(options.domain))  ? '' 			 : ' Domain='+options.domain+'; ';
	var secure 	 = (isset(options.secure)) 	 ? '; secure ' 	 : '';
	var httpOnly = (isset(options.httpOnly)) ? '; httpOnly ' : '';
	var path 	 = (!isset(options.path)) 	 ? '/' 			 : options.path;
	
	var header_string = name+'='+value
	+'; Path='+path+';'
	+ domain
	+ expires 
	+ secure 
	+ httpOnly;
	
	this[name] = value;
	this.header.push(header_string);
	this.signal.header('set-cookie', this.header);
};

Cookies.prototype.delete = function(name, options){
	var options = (isset(options)) ? options : {} ;
	var domain 	= (!isset(options.domain))	? '' : ' Domain='+options.domain+'; ' ;
	var path 	= (!isset(options.path)) ? '/' : options.path;

	delete this[name];
	this.header.push(name+'=;'+domain+' expires=Thu, 10 Mar 1994 01:00:00 UTC; path='+path);
	this.signal.header('set-cookie', this.header);
};

// Cookie Handler Module
module.exports = function($){
	$.cookies = new Cookies($)
	$.return();
}