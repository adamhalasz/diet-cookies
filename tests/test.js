// ================================================
//  Dependencies
// ================================================

	// Assert Module
	var assert = require('assert');
	
	// Request Module
	var request = require('request')
	var request = request.defaults({ jar: true }) // // Enable Cookies for Request
	var jar = request.jar();
	
	// Create Diet Server Instance
	var server = require('diet')
	var app = server()
	var localhost = 'http://localhost:3000/';
	app.listen(localhost)
	
	// Use Diet Cookies
	var cookies = require('../index')
	app.header(cookies)


// ================================================
//  Routes
// ================================================
	
	app.get('/cookies/set-one', function($){
		$.cookies.set('type', 'home made')
		$.end()
	})
	
	app.get('/cookies/set-multiple', function($){
		$.cookies.set('type', 'jellybean')
		$.cookies.set('sirup', 'chocolate')
		$.end()
	})
	
	app.get('/cookies/read', function($){
		assert.equal($.cookies.type, 'jellybean')
		$.end()
	})
	
	app.get('/cookies/delete', function($){
		$.cookies.delete('type')
		assert.equal($.cookies.type, null)
		$.end()
	})
	
	app.get('/cookies/read-after-delete', function($){
		assert.equal($.cookies.type, null)
		$.end()
	})
	
	app.get('/cookies/expire/set', function($){
		$.cookies.set('id', '100', { expire: [0,0,0,2] })
		assert.equal($.cookies.id, '100')
		$.end()
	})
	
	app.get('/cookies/expire/check-exists', function($){
		assert.equal($.cookies.id, '100')
		$.end()
	})
	
	app.get('/cookies/expire/check-expired', function($){
		assert.equal($.cookies.id, null)
		$.end()
	})


// ================================================
//  Tests
// ================================================
	
	describe('Cookie CRUD Test', function(){
		
		var cookies = {}
	
		it('Should Set the cookie "type" to "home made"', function(done){
			request.get(localhost+'cookies/set-one', function(error, response, body){
				assert.equal(error, null)
				assert.equal(response.headers['set-cookie'][0], 'type=home made; Path=/;')
				done()
			})
		})
		
		it('Should Set the cookie "type" to "jellybean" and "sirup" to "chocolate"', function(done){
			request.get(localhost+'cookies/set-multiple', function(error, response, body){
				assert.equal(error, null)
				
				// cookie type
				assert.equal(response.headers['set-cookie'][0], 'type=jellybean; Path=/;')
				cookies.type = response.headers['set-cookie'][0];
				
				// cookie sirup 
				assert.equal(response.headers['set-cookie'][1], 'sirup=chocolate; Path=/;')
				cookies.sirup = response.headers['set-cookie'][1];
				
				done()
			})
		})
		
		it('Should Read the cookie "type" and find it to be "jellybean"', function(done){
			request.get(localhost+'cookies/read', function(error, response, body){
				assert.equal(error, null)
				done()
			})
		})
		
		it('Should Delete the cookie "type" and find it to be "null"', function(done){
			request.get(localhost+'cookies/delete', function(error, response, body){
				assert.equal(error, null)
				request.get(localhost+'cookies/read-after-delete', function(error, response, body){
					assert.equal(error, null)
					done()
				})
			})
		})
		it('Should Read set the cookie "id" and expire it after 2 seconds', function(done){
			request.get(localhost+'cookies/expire/set', function(error, response, body){
				assert.equal(error, null)
				
				request.get(localhost+'cookies/expire/check-exists', function(error, response, body){
					assert.equal(error, null)
					
					setTimeout(function(){
					
						
						request.get(localhost+'cookies/expire/check-expired', function(error, response, body){
							assert.equal(error, null)
							done()
						});
						
					}, 2000)
				
				
				});
			})
		}).timeout(5000)
	})
