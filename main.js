var app = new Vue({
  el: '#app',
  data: {
    errorMsg: "",
    successMsg: "",
    showAddModal: false,
    editAddModal: false,
    editDeleteModal: false,
    users: [],
    newUser: {name: "", email: "", phone: ""},
    currentUser: {}
  },
  mounted: function(){
  	this.getAllUsers();
  },
  methods: {
  	getAllUsers(){  
  		axios.get("http://127.0.0.1/Crud-vue-php/db.php?action=read").then(function(response) {
  			if (response.data.error) {
  				app.errorMsg = response.data.message;
  			}
  			else
  			{
  				app.users = response.data.users;
  			}
  		});
  	},
  	// here add user
  	addUser(){
  		var formData = app.toFormData(app.newUser);
  		axios.post("http://127.0.0.1/Crud-vue-php/db.php?action=create", formData).then(function(response) {
  			app.newUser = {name: "" ,email: "" ,phone: ""};
  			if (response.data.error) {
  				app.errorMsg = response.data.message;
  			}
  			else
  			{
  				app.successMsg = response.data.message;
  				app.getAllUsers();
  			}
  		});
  	},
  	toFormData(obj){
  		var fd = new FormData();
  		for (var i in obj) {
  			fd.append(i, obj[i]);
  		}
  		return fd;
  	},
  	// here update user
  	updateUser(){
  		var formData = app.toFormData(app.currentUser);
  		axios.post("http://127.0.0.1/Crud-vue-php/db.php?action=update", formData).then(function(response) {
  			app.currentUser = {};
  			if (response.data.error) {
  				app.errorMsg = response.data.message;
  			}
  			else
  			{
  				app.successMsg = response.data.message;
  				app.getAllUsers();
  			}
  		});
  	},
  	// here delete user
  	deleteUser(){
  		var formData = app.toFormData(app.currentUser);
  		axios.post("http://127.0.0.1/Crud-vue-php/db.php?action=delete", formData).then(function(response) {
  			app.currentUser = {};
  			if (response.data.error) {
  				app.errorMsg = response.data.message;
  			}
  			else
  			{
  				app.successMsg = response.data.message;
  				app.getAllUsers();
  			}
  		});
  	},
  	selectUser(user){
  		app.currentUser = user;
  	},
  	clearMsg(){   // clear message
  		app.errorMsg = "";
  		app.successMsg = "";
  	}
  }
});