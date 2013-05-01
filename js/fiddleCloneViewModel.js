(function () {
	
	var viewModel = function() {
		self = this;

		self.baseHtml = '<link href="css/bootstrap.min.css" rel="stylesheet">';
		self.baseHtml +='<link href="css/bootstrap-responsive.min.css" rel="stylesheet">';
		self.baseHtml +='<link href="css/font-awesome.min.css" rel="stylesheet">';
		self.baseHtml +='<link href="css/bootswatch.css" rel="stylesheet"> ';
		self.baseHtml +='<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>';
		self.baseHtml +='<script src="js/bootstrap.min.js"></script>';
		self.baseHtml +='<script src="js/knockout-2.2.1.js"></script>';

		//Properties

		self.showListExampleOutput = ko.observable(true);
		self.showBasicExampleOutput = ko.observable(true);

		self.fontSize = ko.observable("14px")

		self.basicExampleUserHtml  = ko.observable('<p>First name: <i data-bind="text: firstName"></i></p> \n<p>Last name: <i data-bind="text: lastName"></i></p>');
		self.basicExampleUserScript  = ko.observable('function viewModel(){\n    self=this;\n    self.firstName = "Bert";\n    self.lastName = "Bertington";\n} \n\n ko.applyBindings(new viewModel());');

		self.listsExampleUserHtml  = ko.observable('<form data-bind="submit: $root.addItem">\n    New item:<input data-bind="value: itemToAdd, valueUpdate: \'afterkeydown\'" />\n    <button type="submit" class="btn btn-success" data-bind="enable: itemToAdd().length > 0">Add</button>\n    <ul data-bind="foreach: items">\n        <li><span data-bind="text:$data"></span></li>\n    </ul>\n</form>');
		self.listsExampleUserScript  = ko.observable('var SimpleListModel = function(items) {\n    self = this;\n    self.items = ko.observableArray(items);\n    self.itemToAdd = ko.observable("");\n    self.addItem = function() {\n        if (self.itemToAdd() != "") {\n            self.items.push(this.itemToAdd());\n            self.itemToAdd("");\n        }\n    }\n};\n ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));');
		
		//Functions	
		self.runBasicExample = function(){

			$('#basicExampleIframe').empty();

			var iframe = document.createElement('iframe');
			var basicExample = document.getElementById('basicExampleIframe');
			basicExample.appendChild(iframe);

			// create a string to use as a new document object
			var html = self.baseHtml;
				html +='<script type="text/javascript"> $(document).ready(function() {' + self.basicExampleUserScript() + ' }); </script>';
				html +='<br/>'+ self.basicExampleUserHtml();

			// get a handle on the <iframe>d document
			var doc = iframe.contentWindow || iframe.contentDocument;
			if (doc.document) {
				doc = doc.document;
			}

			doc.open();
			doc.write(html);
			doc.close();
		}

		self.cheatBasic1 = function(){
			self.basicExampleUserHtml('<p>First name: <i data-bind="text: firstName"></i></p> \n<p>Last name: <i data-bind="text: lastName"></i></p>');
			self.basicExampleUserScript('function viewModel(){\n    self=this;\n    self.firstName = "Bert";\n    self.lastName = "Bertington";\n} \n\n ko.applyBindings(new viewModel());');
		}

		self.cheatBasic2 = function(){
			self.basicExampleUserHtml('<p>First name: <i data-bind="text: firstName"></i></p> \n<p>Last name: <i data-bind="text: lastName"></i></p> \n\n<input type="text" class="input" data-bind="value:firstName, valueUpdate: \'afterkeydown\'"/>');
			self.basicExampleUserScript('function viewModel(){\n    self=this;\n    self.firstName = ko.observable("Bert");\n    self.lastName = "Bertington";\n} \n\n ko.applyBindings(new viewModel());');
		}

		self.cheatBasic3 = function(){
			self.basicExampleUserHtml('<p>First name: <i data-bind="text: firstName"></i></p> \n<p>Last name: <i data-bind="text: lastName"></i></p> \n\n<input type="text" class="input" data-bind="value:firstName, valueUpdate: \'afterkeydown\'"/>\n\n<button type="button" class="btn btn-success" data-bind="click:clickMe">Click Me!</button>');
			self.basicExampleUserScript('function viewModel(){\n    self=this;\n    self.firstName = ko.observable("Bert");\n    self.lastName = "Bertington";\n\n    self.clickMe = function(){\n        self.firstName("David")\n    } \n} \n\n ko.applyBindings(new viewModel());');
		}

		self.runListsExample = function(){

			$('#listsExampleIframe').empty();

			var iframe = document.createElement('iframe');
			var basicExample = document.getElementById('listsExampleIframe');
			basicExample.appendChild(iframe);

			// create a string to use as a new document object
			var html = self.baseHtml;
				html +='<script type="text/javascript"> $(document).ready(function() {' + self.listsExampleUserScript() + ' }); </script>';
				html +='<br/>'+ self.listsExampleUserHtml();

			// get a handle on the <iframe>d document
			var doc = iframe.contentWindow || iframe.contentDocument;
			if (doc.document) {
				doc = doc.document;
			}

			doc.open();
			doc.write(html);
			doc.close();
		}

		self.cheatLists1 = function(){
			self.listsExampleUserHtml('<form data-bind="submit: $root.addItem">\n    New item:<input data-bind="value: itemToAdd, valueUpdate: \'afterkeydown\'" />\n    <button type="submit" class="btn btn-success" data-bind="enable: itemToAdd().length > 0">Add</button>\n    <ul data-bind="foreach: items">\n        <li><span data-bind="text:$data"></span></li>\n    </ul>\n</form>');
			self.listsExampleUserScript('var SimpleListModel = function(items) {\n    self = this;\n    self.items = ko.observableArray(items);\n    self.itemToAdd = ko.observable("");\n    self.addItem = function() {\n       self.items.push(this.itemToAdd());\n       self.itemToAdd("");\n    }\n};\n ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));');
		}

		self.cheatLists2 = function(){
			self.listsExampleUserHtml('<div class="well" data-bind="visible:items().length >= 5"><h1>5 is the max!</h1></div>\n\n<form data-bind="submit: $root.addItem">\n    New item:<input data-bind="value: itemToAdd, valueUpdate: \'afterkeydown\'" />\n    <button type="submit" class="btn btn-success" data-bind="enable: itemToAdd().length > 0 && items().length < 5">Add</button>\n    <ul data-bind="foreach: items">\n        <li><span data-bind="text:$data"></span></li>\n    </ul>\n</form>');
			self.listsExampleUserScript('var SimpleListModel = function(items) {\n    self = this;\n    self.items = ko.observableArray(items);\n    self.itemToAdd = ko.observable("");\n    self.addItem = function() {\n       self.items.push(this.itemToAdd());\n       self.itemToAdd("");\n    }\n};\n ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));');
		}

		self.cheatLists3 = function(){
			self.listsExampleUserHtml('<div class="well" data-bind="visible:items().length >= 5"><h1>5 is the max!</h1></div>\n\n<form data-bind="submit: $root.addItem">\n    New item:<input data-bind="value: itemToAdd, valueUpdate: \'afterkeydown\'" />\n    <button type="submit" class="btn btn-success" data-bind="enable: itemToAdd().length > 0 && items().length < 5">Add</button>\n    <ul data-bind="foreach: items">\n        <li><span data-bind="text:$data"></span>\n         <button type="button" class="btn btn-danger" data-bind="click:$root.removeItem">Remove</button>\n    </li>\n    </ul>\n</form>');
			self.listsExampleUserScript('var SimpleListModel = function(items) {\n    self = this;\n    self.items = ko.observableArray(items);\n    self.itemToAdd = ko.observable("");\n    self.addItem = function() {\n       self.items.push(this.itemToAdd());\n       self.itemToAdd("");\n    }\n    self.removeItem = function(item) {\n        self.items.remove(item);\n     }\n};\n ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));');
		}

		self.toggleListOutput = function(){
			if(self.showListExampleOutput()){
				self.showListExampleOutput(false);
			}else{
				self.showListExampleOutput(true);
			}
		}

		self.toggleBasicOutput = function(){
			if(self.showBasicExampleOutput()){
				self.showBasicExampleOutput(false);
			}else{
				self.showBasicExampleOutput(true);
			}
		}

		self.increaseTextSize = function(){
			var fontSize = (self.fontSize()).substring(0,2);
			fontSize = parseInt(fontSize) + 2;
			self.fontSize(fontSize + "px");
		}

		self.decreaseTextSize = function(){
			var fontSize = (self.fontSize()).substring(0,2);
			fontSize = parseInt(fontSize) - 2;
			self.fontSize(fontSize + "px");
		}

		//Onload
		self.runBasicExample();
		self.runListsExample();

	}

	//Export
	ViewModel = viewModel;

}());