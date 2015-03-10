'use strict';

(function() {
	// Fiableops Controller Spec
	describe('Fiableops Controller Tests', function() {
		// Initialize global variables
		var FiableopsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Fiableops controller.
			FiableopsController = $controller('FiableopsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fiableop object fetched from XHR', inject(function(Fiableops) {
			// Create sample Fiableop using the Fiableops service
			var sampleFiableop = new Fiableops({
				name: 'New Fiableop'
			});

			// Create a sample Fiableops array that includes the new Fiableop
			var sampleFiableops = [sampleFiableop];

			// Set GET response
			$httpBackend.expectGET('fiableops').respond(sampleFiableops);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fiableops).toEqualData(sampleFiableops);
		}));

		it('$scope.findOne() should create an array with one Fiableop object fetched from XHR using a fiableopId URL parameter', inject(function(Fiableops) {
			// Define a sample Fiableop object
			var sampleFiableop = new Fiableops({
				name: 'New Fiableop'
			});

			// Set the URL parameter
			$stateParams.fiableopId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fiableops\/([0-9a-fA-F]{24})$/).respond(sampleFiableop);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fiableop).toEqualData(sampleFiableop);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Fiableops) {
			// Create a sample Fiableop object
			var sampleFiableopPostData = new Fiableops({
				name: 'New Fiableop'
			});

			// Create a sample Fiableop response
			var sampleFiableopResponse = new Fiableops({
				_id: '525cf20451979dea2c000001',
				name: 'New Fiableop'
			});

			// Fixture mock form input values
			scope.name = 'New Fiableop';

			// Set POST response
			$httpBackend.expectPOST('fiableops', sampleFiableopPostData).respond(sampleFiableopResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fiableop was created
			expect($location.path()).toBe('/fiableops/' + sampleFiableopResponse._id);
		}));

		it('$scope.update() should update a valid Fiableop', inject(function(Fiableops) {
			// Define a sample Fiableop put data
			var sampleFiableopPutData = new Fiableops({
				_id: '525cf20451979dea2c000001',
				name: 'New Fiableop'
			});

			// Mock Fiableop in scope
			scope.fiableop = sampleFiableopPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fiableops\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fiableops/' + sampleFiableopPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fiableopId and remove the Fiableop from the scope', inject(function(Fiableops) {
			// Create new Fiableop object
			var sampleFiableop = new Fiableops({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fiableops array and include the Fiableop
			scope.fiableops = [sampleFiableop];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fiableops\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFiableop);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fiableops.length).toBe(0);
		}));
	});
}());