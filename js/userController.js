var userController = crudModule.controller('userController',function($scope,$http,$log){
	$scope.tempUser = {};
	$scope.users = [];
	$scope.genderOptions = {
							'type'   : 'select',
							'name'	 : 'gender',
							'value'  : $scope.gender,
							'values' : [
								{'value':0,'label':'Male'},
								{'value':1,'label':'Female'},
								{'value':2,'label':'Not Disclosed'}
							]/* do not change the order of gender */
						};
	//$scope.gender = $scope.genderOptions.values[-1];
 	$scope.addUser	= function(){
		$scope.tempUser['name'] = $scope.name;
		$scope.tempUser['email'] = $scope.email;
		if($scope.gender.value === null)
			$scope.tempUser['gender'] = 0;	
		else
			$scope.tempUser['gender'] = $scope.gender.value;
		$scope.tempUser['phone'] = $scope.phone;
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
       // var data = {user:$scope.tempUser,action:'new'};
       var data = jAng.param({
            'data':$scope.tempUser,
            'action':'new'
        });
        
        var addSuccess = function(response){
        	var responseData = response.data.data;
        	var count = $scope.users.length ;
        	var temp = {'id':$scope.tempUser['id'],'name': $scope.tempUser['name'],'phone':$scope.tempUser['phone'],'email':$scope.tempUser['email'],'gender':$scope.tempUser['gender'],'created':responseData['created'],'modified':responseData['modified']};
        	$log.info(temp);
        	$scope.users[count] = temp;
        	jAng('.addRecord').trigger('click');
        	$scope.name = '';
        	$scope.phone = '';
        	$scope.email = ''
        	$scope.gender = ''

        }	 
        var addFailed = function(error){
        	alert(error);
        }	 
        $http.post('api/app.php',data,config)
        	 .then(addSuccess,addFailed);
        	
        
	}

	$scope.getUsers	= function(){
		var getSuccess = function(response){
			$scope.users = response.data.users;
        	//$log.info(response.data);
        }	 
        var getFailed = function(error){
        	alert(error);
        }
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
    
       var data = jAng.param({
            'action':'viewAll'
        });
        $http.post('api/app.php',data,config)
        	 .then(getSuccess,getFailed);
        	
	}

	$scope.deleteUser = function(id,index){
		var flag = confirm('Are you sure you want to delete record');
		if(!flag)
			return;
		$log.info(id);
		var data = jAng.param({
				'id':id,
				'action':'delete'
			});
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var deleteSuccess = function(response){
        	if(response.data.status == 'success'){
        		$log.info('success');
        		$scope.users.splice(index,1);
        		alert('User has been deleted');
        	}else{
        		$log.info('failed');
        	}
        }
        var deleteFailed = function(error){

        }
		$http.post('api/app.php',data,config)
			 .then(deleteSuccess,deleteFailed)	;
	}
	$scope.updateUser = function(user,index){
		$scope.tempUser = $scope.users[index];
		$scope.tempUser.index = index;
		$scope.name = $scope.tempUser.name;
		$scope.phone = $scope.tempUser.phone;
		$scope.email = $scope.tempUser.email;
		$scope.id = $scope.tempUser['id'];
		$scope.gender = $scope.genderOptions.values[$scope.tempUser.gender];
		jAng('.addRecord').trigger('click');
	}



	$scope.saveUser = function(){
		/* saves the update user */
		$log.info('saving update user');
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $log.info($scope.tempUser.index);
        $scope.tempUser['id'] = $scope.id;
        $scope.tempUser['name'] = $scope.name;
        $scope.tempUser['phone'] = $scope.phone;
        $scope.tempUser['email'] = $scope.email;
        if($scope.gender == null)
        	$scope.tempUser['gender'] = '0';
        else
        	$scope.tempUser['gender'] = $scope.gender.value;
        var data = jAng.param({
				'data':$scope.tempUser,
				'action':'update'
			});
        var updateSuccess = function(response){
        	if(response.data.status == 'success'){
        		$scope.users[$scope.tempUser] = $scope.tempUser;
        		jAng('#notification').html('');
        		var html = '<p class="aler alert-success" id="message">'+response.data.message+'</p>';
        		jAng('#notification').html(html);
        		jAng('.addRecord').trigger('click');
        	}else{
        		alert(response.data.message);
        	}
        }
        var updateFailed = function(error){
        	alert(error);
        }

        $http.post('api/app.php',data,config)
        	 .then(updateSuccess,updateFailed);	
	}
});