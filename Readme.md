# Diet-Cookies 
HTTP Cookie Manager for diet.js

### Install 
If you have diet.js it's already installed.
```
	npm install diet-cookies
```

### Example usage:
```javascript
app.get.simple('/', function(request, response){
	// GET cookie
	console.log(request.cookies.id);
	
	// SET cookie
	response.cookies.set('name', 'john doe', { httpOnly: true }); // options are optional
	
	// DELETE cookie
	response.cookies.delete('location');
	
	response.end('hurray!');
});
```

### Set Options:
```javascript
{
	"httpOnly": false, 	// true or false
	"secure": false, 	// true or false
	"domain": null, 	// null or domain string
	"path": null,  		// null or path string
}
```

### Dependencies
- diet.js