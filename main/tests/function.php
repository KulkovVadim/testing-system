<?php
require_once('config.php');

	$link = mysql_connect(DBHOST, DBUSER, DBPASSWORD)
        or die("Could not connect : " . mysql_error());
    
	mysql_select_db(DBNAME)
		or die("Could not select database");
	mysql_query("SET NAMES utf8;");

if(isset($_GET['action']) && $_GET['action']=='tests'){
	$query ="SELECT id, test_name FROM tests";
		 $result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			$data = array();	
   	 while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	}

	
	echo json_encode($data);
}

if(isset($_GET['action']) && $_GET['action']=='get_test'){
	$test_id = $_GET['test_id'];
	  $query = "SELECT * FROM quest WHERE parent_test = $test_id";
	  $result = mysql_query($query)
		or die("Query failed : " . mysql_error());



	$data = array();	
   	while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	}

	
	echo json_encode($data);

}

if(isset($_GET['action']) && $_GET['action']=='get_close_form'){
	$q_id = $_GET['q_id'];
	$query = "SELECT id,answer FROM answers WHERE parent_quest = $q_id";
	  $result = mysql_query($query)
		or die("Query failed : " . mysql_error());



	$data = array();	
   	while ($line = mysql_fetch_assoc($result)) {
			$data[$line['id']] = $line['answer'];
	}

	
	echo json_encode($data);
}




if(isset($_GET['action']) && $_GET['action']=='list'){
	$test_id = $_GET['test_id'];
  $query = "SELECT q.quest_id, q.quest, q.parent_test, q.quest_type, a.id , a.answer, a.parent_quest
  			FROM quest q 
  			LEFT JOIN answers a
  				ON q.quest_id = a.parent_quest
  				 WHERE q.parent_test = $test_id";
    $result = mysql_query($query)
		or die("Query failed : " . mysql_error());

	$res_assoc=array();
	$data  = null;
	$array_qyest= null;
    while ($line = mysql_fetch_assoc($result)){
		
		$quest_info= $line['quest_id'].','.$line['quest_type'];
		$data[$quest_info][0] =$line['quest'];
		$data[$quest_info][$line['id']] = $line['answer'];
		
	}
	echo json_encode($data);
}

?>