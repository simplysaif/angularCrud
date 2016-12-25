<?php
class connection{

	private $connection;
	private $host = 'localhost';
	private $user = 'root';
	private $password = '';
	private $db = 'angular';
	private $table = 'users';
	public function __construct(){
		if(!isset($connection)){
			/*$connection = new PDO("mysql:host=$this->host;dbname=$this->db",$this->user,$this->password);*/
			//$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$connection = new mysqli($this->host,$this->user,$this->password,$this->db);
			if(!$connection->connect_error)
				$this->connection = $connection;
		}
	}

	public function addUser($user){
		try{
			$sql = "insert into ".$this->table."(name,phone,email,gender) values (?,?,?,?)";
			$statement = $this->connection->prepare($sql);
			$statement->bind_param('sssi',$user['name'],$user['phone'],$user['email'],$user['gender']);
			if($statement->execute()){
				$user['created'] = date("Y-m-d H:i:s");
				$user['modified'] = date("Y-m-d H:i:s");
			}
			$this->connection->close();
			return $user;
		}catch(Exception $e){

		}
		
	}

	public function getAllUsers(){
		try{
			include 'TableRows.php';
			$sql = 'select * from '.$this->table;
			$result = $this->connection->query($sql);
			$results = array();
			if($result->num_rows > 0){
				while ($row = $result->fetch_assoc()) {
					$temp = array();
					$temp['id'] = $row['id'];
					$temp['name'] = $row['name'];
					$temp['email'] = $row['email'];
					$temp['gender'] = $row['gender'];
					$temp['phone'] = $row['phone'];
					$temp['created'] = $row['created'];
					$temp['modified'] = $row['modified'];
					$results[] = $temp;
				}
			}
			return $results;
		}catch(Exception $e){

		}
	}

	public function deleteUser($id){
		$sql = "delete from $this->table where id = $id";
		if($this->connection->query($sql) === true ){
			return true;
		}else{
			return false;
		}
	}


	public function updateUser($user){
		
		$sql = "update ".$this->table." set name = ?, phone = ? , email = ? ,gender = ?, modified = ? where id = ?";

		$statement = $this->connection->prepare($sql);
		
		$statement->bind_param('sssssi',$user['name'],$user['phone'],$user['email'],$user['gender'],date("Y-m-d H:i:s"),$user['id']);
		try{
			$statement->execute();
			return true;
		}
		catch(Exception $e){
			return false;	
		}
		
			
	}
}