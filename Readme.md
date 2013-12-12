# Diet-Cookies 
HTTP Cookie Manager for `dietjs`

### Install 
If you have `dietjs` it's already installed.
```
	npm install diet-cookies
```

### Example usage
```javascript
app.get.simple('/', function(request, response){
	// GET cookie
	console.log(request.cookies.id);
	
	// SET cookie
	response.cookies.set('name', 'john doe', { httpOnly: true }); // options are optional
	
	// DELETE cookie
	response.cookies.delete('location');
	
	// END response
	response.end('hurray!');
});
```

### How it works?
- You can`GET` cookies from`request.cookies[id]`  
- You can `SET` or `UPDATE` cookies with `response.cookies.set(id, value, options)`
- You can `DELETE` cookies with`response.cookies.delete(id)`  

### Options for `response.cookies.set`
```javascript
{
	"httpOnly": false, 	// true or false
	"secure": false, 	// true or false
	"domain": null, 	// null or domain string
	"path": null,  		// null or path string
}
```

### Dependencies
- `dietjs`