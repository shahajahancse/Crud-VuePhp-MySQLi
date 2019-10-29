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
  	}
  }
})