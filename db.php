<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "crudvuephp";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $database);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$result = array('error' => false );
	$action = '';

	if (isset($_GET['action'])) {
		$action = $_GET['action'];
	}

	// select/show all data 
	if ($action == 'read') {
		$sql = $conn->query("SELECT * FROM users");
		$users = array();
		while ($row = $sql->fetch_assoc()) {
			array_push($users, $row);
		}
		$result['users'] = $users;
	}

	// insert / create data 
	if ($action == 'create') {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];

		$sql = $conn->query("INSERT INTO users(name, email, phone)VALUES('$name','$email','$phone')");
		
		if ($sql) {
			$result['message'] = "User added successfully!";
		}
		else
		{
			$result['error'] = true;
			$result['message'] = "Failed to add user!";
		}
	}

	//  updated data 
	if ($action == 'update') {
		$id = $_POST['id'];
		$name = $_POST['name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];

		$sql = $conn->query("UPDATE users SET name='$name',email='$email',phone='$phone' WHERE id='$id'");
		
		if ($sql) {
			$result['message'] = "User updated successfully!";
		}
		else
		{
			$result['error'] = true;
			$result['message'] = "Failed to update user!";
		}
	}

	//  deleted data 
	if ($action == 'delete') {

		$id = $_POST['id'];

		$sql = $conn->query("DELETE FROM users WHERE id='$id'");
		
		if ($sql) {
			$result['message'] = "User deleted successfully!";
		}
		else
		{
			$result['error'] = true;
			$result['message'] = "Failed to delete user!";
		}
	}

	$conn->close();
	echo json_encode($result);
?>