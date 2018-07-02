<?php
require_once('config.php');
session_start();

	$link = mysql_connect(DBHOST, DBUSER, DBPASSWORD)
        or die("Could not connect : " . mysql_error());
    
	mysql_select_db(DBNAME)
		or die("Could not select database");
	mysql_query("SET NAMES utf8;");

if (isset($_GET['result'])&& $_GET['result']=='Отправить') {
		$true = 0;
		$false = 0;
		$test_id = $_GET['test_id'];
		
		$query = "SELECT quantity_quests FROM tests WHERE id=$test_id"; 
		$result = mysql_query($query)
			or die("Query failed2 : " . mysql_error());
		while ($line = mysql_fetch_assoc($result, MYSQL_ASSOC)) {
					foreach ($line as $key => $value) {
						if ($key=="quantity_quests") {
							$quantity_quests = $value;
						}
					}
					
			}



		$query ="SELECT quest_id FROM quest WHERE parent_test = $test_id";
		 $result = mysql_query($query)
		or die("Query failed1 : " . mysql_error());

			$data = array();	
    while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;

	}
			$quests_id = array();
			foreach($data as $key => $value) {
				foreach($value as $key => $value) {
					if ($key='quest_id') {
						array_push($quests_id, $value);
					}
				}
			}
			//echo json_encode($quests_id);
			$count =count($quests_id);
			for ($a=0; $a <$count; $a++) { 
					//$test_vul++;
					$quest_id=$quests_id[$a];
					$tets_co = 0;
   					$otvet="";
					$correct_answer="";
					$query ="SELECT quest_type, correct_answer, quantity_answers FROM quest WHERE quest_id=$quest_id";
					$result = mysql_query($query)
						or die("Query failed4 : " . mysql_error());

					$data = array();	
   					$line = mysql_fetch_assoc($result);
   					foreach ($line as $key => $value) {

						if ($key=='quest_type') {
							$quest_type=$value;
						}
						if ($key=='quantity_answers') {
							$quantity_answers = $value;
							if ($quantity_answers==1) {
								$otvet = $_GET['answer'.$quest_id.''];
							}else{
								$quantity_answers1 = $quantity_answers+1;
								for ($i=1; $i<$quantity_answers1 ; $i++) { 
									if ($quest_type=='На установление правильной последовательности') {
										$otvet.=$_GET['q'.$quest_id.'answer'.$i].";";
										
									}
									if ($quest_type=='На соответствие') {
										$otvet.=$_GET['q'.$quest_id.'answer'.$i];	
									}
								}
							}
							
						}
						if ($key=='correct_answer') {
							$correct_answer = $value;
							
						}
					}
					
					if($otvet==$correct_answer) {
						$true++;
					}else{
						$false++;
					}
			}
					
						$qsts = $false + $true;
						$b = 5 / $quantity_quests;
						$ocenka = $b * $true;
						$proc_true = 100 / $qsts;
						$proc_true = $proc_true * $true;
						$arrayData = array('mark' => $ocenka,'percent' =>  $proc_true);
						echo json_encode($arrayData);



	$query ="SELECT test_name FROM tests WHERE id = $test_id";
		 $result = mysql_query($query)
		or die("Query failed4 : " . mysql_error());

			$data = array();	
	while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;	
		}
		foreach ($data as $key => $value){
			foreach ($value as $key => $value){
				$test_name_toresult =  $value;
			}
		}
		$date =  date("d.m.Y");
		$time =  date("H:i");
		$login = $_SESSION['name']." ".$_SESSION['surname'];
		$query ="INSERT INTO testsresults VALUES ('','$test_name_toresult', '$login', '$date', '$time', '$ocenka')";
		$result = mysql_query($query)
		or die("Query failed5 : " . mysql_error());
}
		

		
?>
   