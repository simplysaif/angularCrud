<?php
include 'connection.php';

if(isset($_POST['data']) || isset($_POST['action'])){
	
	$connection = new connection();
	if(isset($_POST['data']))
		$data = $_POST['data'];
	if(isset($_POST['id']))
		$id = $_POST['id'];
	else
		$id = -1;
	$action = $_POST['action'];
	$response = array();
	
	
	switch ($action) {
		case 'new':
			$response['status']  = 'error';
			$response['message']  = 'could not save user';
			if(!$data){
				echo json_encode($response);
				break;
			}

			$add = $connection->addUser($data);
			//$add = true;
			if(isset($add['created'])){
				$response['status'] = 'success';
				$response['message'] = 'Record has been saved';
				$response['data'] = $add;
			}
			echo json_encode($response);
			break;
		case 'viewAll':
			$response['status']  = 'error';
			$response['message']  = 'No Records';
			$users = $connection->getAllUsers();
			if(count($users) > 0){
				$response['status'] = 'success';
				$response['users'] = $users;
			}
			echo json_encode($response);
			break;

		case 'delete':
			$response['status']  = 'error';
			$response['message']  = 'Could not delete record';
			
			if($id == -1){
				echo json_encode($response);
				break;
			}

			$delete = $connection->deleteUser($id);
			if($delete){
				$response['status']  = 'success';
				$response['message']  = 'deleted successfully';
			}
			echo json_encode($response);
			break;	
		case 'update':
			$response['status'] = 'error';
			$response['message'] = 'could not update User';
			$update = $connection->updateUser($data);
			if($update){
				$response['status'] = 'success';
				$response['message'] = 'User has been updated';
			}
			
			echo json_encode($response);
			break;
		default:
			# code...
			break;
	}
}else{

}
