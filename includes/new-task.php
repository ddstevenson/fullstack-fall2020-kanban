<?php include('config.php'); 

$taskname = $_POST['taskname'];
$taskdescription = $_POST['taskdescription'];
$taskpriority = $_POST['taskpriority'];
$taskstatus = $_POST['taskstatus'];
$enddate = $_POST['enddate'];

if(!isset($taskname)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'message'=>'task name was not provided correctly'
    )); 
}

if(!isset($taskdescription)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'message'=>'task description was not provided correctly'
    )); 
}

if(!isset($taskpriority)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'message'=>'task priority was not provided correctly'
    )); 
}

if(!isset($taskstatus)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'message'=>'task status was not provided correctly'
    )); 
}

if(!isset($enddate)) {
    echo json_encode(array(
        "success"=>false, 
        "duplicate"=>false, 
        'message'=>'end date was not provided correctly'
    )); 
}

$task = pg_query($conn, "SELECT * FROM task WHERE projectid = "."'".$_SESSION['currentproject']."'"." AND taskname="."'".$taskname."'");         //Gets current user's projects
$res = pg_fetch_result($task, 'taskname');

if($res == "") {
    $d = date("Y-m-d"); 
    $params = array(                                    //Assoc array with table values for 'person' to add new user to database
        "taskid"=>"",
        "projectid"=>$_SESSION['currentproject'],
        "taskname"=>$taskname, 
        "taskdescription"=>$taskdescription, 
        "taskpriority"=>$taskpriority,
        "taskstatus"=>$taskstatus,
        "startdate"=>$d, 
        "enddate"=>$enddate
    );  
  
    $insert = pg_insert($conn, 'task', $params);      //Insert user into database 
  
    if(!$insert) {                                      //Insert error
        http_response_code(404);                        //Send error code back to ajax to handle error
        echo(array("not"=> "working"));
        // die("Login unsuccessful"); 
    }

    pg_query($conn, "UPDATE project SET modified = '".strval($d)."' WHERE projectid = "."'".$_SESSION['currentproject']."'");     //Update project modified date 

    http_response_code(200); 
    echo json_encode(array(
        "success"=>true, 
        "duplicate"=>false
    )); 

} else {            //Duplicate task 
    http_response_code(200); 
    echo json_encode(array(
        "success"=>true, 
        "duplicate"=>true
    )); 
}

?>