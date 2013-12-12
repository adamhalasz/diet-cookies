
// Cookie Handler Module
module.exports = function(request, response){
	response.cookieList = [];
	response.cookieIndexes = {};
	var deleteCookies = [];
	var cookies = {};
	if(isset(request.headers.cookie)){
		var pairs = request.headers.cookie.split(';');
		for(var i = 0; i < pairs.length; i++){
			var pair = pairs[i].split('=');
			var name = pair[0];
			if(name.charAt(0) == ' '){ name = name.substring(1) }
			cookies[name] = pair[1];
			response.cookieIndexes[name] = i;
		}
	}
	var actions = {
		// options: time, httpOnly, secure, path, domain
		set : function(name, value, options){
			
			// Calculate Expiration Time
			if(isset(options.time)){
				var days 	 = options.time[0]*1000*60*60*24;
				var hours 	 = options.time[1]*1000*60*60;
				var minutes  = options.time[2]*1000*60;
				var future 	 = days+hours+minutes;
				var now 	 = new Date().getTime();
				var expires  = ' Expires='+ new Date(now+future).toGMTString()+' ';
			// session cookie
			} else {
				var expires = '';
			}
			
			var domain 	 = (!isset(options.domain))  ? '' 			 : ' Domain='+options.domain+'; ';
			var secure 	 = (isset(options.secure)) 	 ? '; secure ' 	 : '';
			var httpOnly = (isset(options.httpOnly)) ? '; httpOnly ' : '';
			var path 	 = (!isset(options.path)) 	 ? '/' 			 : options.path;
			
			response.cookieList.push(
				name+'='+value
				+'; Path='+path+';'
				+ domain
				+ expires 
				+ secure 
				+ httpOnly
			);
			
			response.cookieIndexes[name] = response.cookieList.length;
			response.setHeader('Set-Cookie', response.cookieList);
			request.cookies[name] = value;
			
			// for testing
			// console.log('SET cookie WITH name `' + name + '` TO `' + value + '`', request.url.pathname);
			
			// Save to Cookies
			cookies[name] = value;
		},
		delete: function(name, options){
			var options = (isset(options)) ? options : {} ;
			var domain 	= (!isset(options.domain))	? '' : ' Domain='+options.domain+'; ' ;
			var path 	= (!isset(options.path)) ? '/' : options.path;
			
			delete cookies[name];
			response.cookieList.push(name+'=;'+domain+' expires=Thu, 10 Mar 1994 01:00:00 UTC; path='+path);
			response.setHeader('Set-Cookie', response.cookieList);
		}
	}
	
	return [cookies, actions];
}

//response.cookies.set('id', 10, [300,0,0], 'httpOnly');