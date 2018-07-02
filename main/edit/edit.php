	<?php
require_once('../tests/config.php');

	$link = mysql_connect(DBHOST, DBUSER, DBPASSWORD)
        or die("Could not connect : " . mysql_error());
    
	mysql_select_db(DBNAME)
		or die("Could not select database");
	mysql_query("SET NAMES utf8;");
session_start();
function permissions(){
	$status = $_SESSION['user_status'];
	if ($status=='admin') {
		return(true);
	}else{
		return(false);
	}
}
function user_status(){
	$login = $_SESSION['login'];
	$query ="SELECT user_status FROM user WHERE login='$login'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			$data = array();	
   	 	while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	}
		
		foreach ($data as $key => $value) {
			foreach ($value as $key => $value) {
				if ($key=='user_status') {
					$user_status=$value;
				}
			}
		}
if ($user_status=='admin') {
		$admin_status = true;
		echo json_encode($admin_status);
	}else{
		$admin_status = false;
		echo json_encode($admin_status);
	}
	
}

function export_to_csv(){

$query ="SELECT * FROM testsresults";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			$data = array();	
   	 while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	};
	
$file = fopen('../../files/export.csv', 'w'); 
	$line = "Номер;Название Теста;Пользователь;Дата;Время;Оценка"; 
	fputs($file, $line."\n"); 



	foreach ($data as $key => $value) {
		$str="";
		foreach ($value as $key => $value) {
			if ($key=='id') {
				$str.=$value.";";
			}
			if ($key=='testname') {
				$str.=$value.";";
			}
			if ($key=='user') {
				$str.=$value.";";
			}
			if ($key=='date_r') {
				$str.=$value.";";
			}
			if ($key=='time_r') {
				$str.=$value.";";
			}
			if ($key=='mark') {
				$str.=$value.";";
				
			}
			
		}
			fputs($file, $str."\n");			
	}
	
	fclose($file);
	
}

function pswd_generation(){
	$pswd_array=null;
	$a  = 0;
	$letter_arr = array('q','w','e','r','t','y','u','i','o','p','a',"s",'d','f','g','h','j','k','l','z','x','c','v','b','n','m');
	for ($i=0; $i<5 ; $i++) { 
		$rand = rand(0, 1);
		if ($rand==0) {
		//$a++;
		$rand_letter = rand(0, 25);
		$pswd_array[$i] = $letter_arr[$rand_letter];
			}else{
				if ($a<2) {
					$a++;
					$rand_num = rand(0, 9);
					$pswd_array[$i] = $rand_num;
				}else{
					$rand_letter = rand(0, 25);
					$pswd_array[$i] = $letter_arr[$rand_letter];
				}
			}
	}
	return $pswd_array;

}


if(isset($_GET['action']) && $_GET['action']=='get_csv'){
	export_to_csv();
}


if(isset($_GET['action']) && $_GET['action']=='del_quest'){
	$quest_id_d=$_GET['quest_del_id'];
	$test_id_d=$_GET['parent_test_id'];

	$query ="SELECT quantity_quests FROM tests WHERE id='$test_id_d'";
		 $result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			//$data = array();	
   	 	$line = mysql_fetch_array($result);
   	 	$quantity_quests = $line['quantity_quests'];
   	 	$new_quantity_quests = $quantity_quests - 1;
   	 
   	 	$query ="UPDATE tests SET quantity_quests='$new_quantity_quests' WHERE id='$test_id_d'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());
	

		$query ="DELETE FROM quest WHERE quest_id='$quest_id_d' ";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());

}

if(isset($_GET['action']) && $_GET['action']=='tests_del'){

	$query ="SELECT * FROM tests";
		 $result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			$data = array();	
   	 while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	}

	
	echo json_encode($data);
}
if(isset($_GET['user_status']) && $_GET['user_status']=='check'){
	user_status();
	
}
if(isset($_GET['action']) && $_GET['action']=='get_result_list'){
	
	$query ="SELECT * FROM testsresults";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			$data = array();	
   	 while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	}

	
	echo json_encode($data);	
}

if(isset($_GET['action']) && $_GET['action']=='user_info'){
	$id = $_GET['id'];
	$query ="SELECT name, surname, user_status, user_id, login FROM user WHERE user_id=$id";
	$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			$data = array();	
   	 while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	}

	
	echo json_encode($data);	
}

if(isset($_GET['action']) && $_GET['action']=='get_result_date'){
	$date = $_GET['date_r'];
	$query ="SELECT * FROM testsresults WHERE date_r='$date'";
	$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

	$data = array();	
   	while ($line = mysql_fetch_assoc($result)) {
		$data[] = $line;
	}

	
	echo json_encode($data);	
}


if(isset($_GET['action']) && $_GET['action']=='user_edit'){
	
	$query ="SELECT name, surname, user_status, user_id FROM user";
	$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

			$data = array();	
   	 while ($line = mysql_fetch_assoc($result)) {
			$data[] = $line;
	}

	
	echo json_encode($data);	
}

if(isset($_GET['action']) && $_GET['action']=='pswd_gen'){
	$pswd_array = pswd_generation();
	echo json_encode($pswd_array);
}
if(isset($_GET['action']) && $_GET['action']=='log_gen'){
	$str =  $_GET['str'];
	
  	function translit($str) {
   		$rus = array('А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я');
   		$lat = array('A', 'B', 'V', 'G', 'D', 'E', 'E', 'Gh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'C', 'Ch', 'Sh', 'Sch', 'Y', 'Y', 'Y', 'E', 'Yu', 'Ya', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'gh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sch', 'y', 'y', '', 'e', 'yu', 'ya');
    	return str_replace($rus, $lat, $str);
  	}
	$end_str =  translit($str);
	echo json_encode($end_str);
}
if(isset($_GET['action']) && $_GET['action']=='newuser'){
	$user_status = $_GET['newuser_status'];
  	$user_surname = $_GET['user_surname'];
  	$user_name = $_GET['user_name'];
  	$login = $_GET['login'];
  	$pswd = $_GET['pswd'];
	
	$pswd_array = pswd_generation();
  	$salt="";
	foreach ($pswd_array as $key => $value) {
		$salt.=$value;
	}
  	$hashed_password = crypt($pswd,$salt);

  	if ($user_status=="Администатор") {
  		$status = "admin";
  	}else{
  		$status = "user";
  	}

  	$pswdlength = strlen($pswd);

  	if (!preg_match("#^[йЙ-цЦ-уУ-кК-еЕ-нН-гГ-шШ-щЩ-зЗ-хХ-фФ-ыЫ-вВ-аА-пП-рР-оО-лЛ-дД-жЖ-эЭ-яЯ-чЧ-сС-мМ-иИ-тТ-ьЬ-бБ-юЮ-ъЪ]+$#",$user_surname)) {
  		echo json_encode("Фамилия пользователя содержит недопустимые символы или пробел");
	} else if(!preg_match("#^[йЙ-цЦ-уУ-кК-еЕ-нН-гГ-шШ-щЩ-зЗ-хХ-фФ-ыЫ-вВ-аА-пП-рР-оО-лЛ-дД-жЖ-эЭ-яЯ-чЧ-сС-мМ-иИ-тТ-ьЬ-бБ-юЮ-ъЪ]+$#",$user_name)) {
  		echo json_encode("Имя пользователя содержит недопустимые символы или пробел");
	}else if ($pswdlength<5) {
  		echo json_encode("Ошибка! Минимальная длина пароля 5 символов."); 	
  	}else{
		$query ="INSERT INTO user VALUES ('','$user_name', '$user_surname', '$login', '$hashed_password' , '$status')";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());	
		echo json_encode("ok");
	}
  	
	
}
if(isset($_GET['action']) && $_GET['action']=='del_user'){
	$id = $_GET['id'];
	$query="DELETE FROM user WHERE user_id='$id'";
	$result = mysql_query($query)
					or die("Query failed : " . mysql_error());
}

if(isset($_GET['action']) && $_GET['action']=='status_change'){
	if (permissions()!=true){
		header('Location: ../tests/');
		break;
	}
	$id = $_GET['id'];
	$new_status = $_GET['new_status'];
	$query="UPDATE user SET user_status='$new_status' WHERE user_id='$id'";
	$result = mysql_query($query)
					or die("Query failed : " . mysql_error());	
}

if(isset($_GET['action']) && $_GET['action']=='set_new_pswd'){
		$id = $_GET['id'];
		$new_pswd = $_GET['new_pswd'];
		$pswd_array = pswd_generation();
		$salt="";
		foreach ($pswd_array as $key => $value) {
			$salt.=$value;
		}
	  	$newpswdlength = strlen($new_pswd);

		if ($newpswdlength<5) {
			echo json_encode("Ошибка! Минимальная длина пароля 5 символов.");
		}else{
			$hashed_password = crypt($new_pswd, $salt);
			$query="UPDATE user SET pswd='$hashed_password' WHERE user_id='$id'";
				$result = mysql_query($query)
					or die("Query failed : " . mysql_error());
			echo json_encode("ok");
		}
}

if(isset($_GET['action']) && $_GET['action']=='test_select'){
	$test_id = $_GET['test_id'];

	$query ="SELECT * FROM quest WHERE parent_test=$test_id";
		 $result = mysql_query($query)
		or die("Query failed : " . mysql_error());

	$data = array();	
   	while ($line = mysql_fetch_assoc($result)) {
		$data[] = $line;
	}

	echo json_encode($data);
}



if(isset($_GET['action']) && $_GET['action']=='del_result'){
	$query = "TRUNCATE TABLE testsresults";
	$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

}



if(isset($_GET['action']) && $_GET['action']=='quest_select'){
	$quest_id = $_GET['id'];
	$query = "SELECT quest, id, answer, correct_answer, quest_type, quantity_answers FROM quest LEFT JOIN answers ON quest_id = parent_quest WHERE quest_id=$quest_id";
	$result = mysql_query($query)
		or die("Query failed : " . mysql_error());


	$data  = null;
	$answers = null;
	while ($line = mysql_fetch_assoc($result)) {
		$quest_type =$line['quest_type'];
		if($quest_type=='Открытой формы'){
			$data[$quest_type]['quest']=$line['quest'];
			$data[$quest_type]['correct_answer'] =$line['correct_answer'];
			
		}
		if ($quest_type=='На установление правильной последовательности' || $quest_type=='На соответствие' || $quest_type=='Закрытой формы') {
			$answers[$line['id']]=$line['answer'];
			$data[$quest_type]['quest']=$line['quest'];
			$data[$quest_type]['correct_answer'] =$line['correct_answer'];
			$data[$quest_type]['quantity_answers'] =$line['quantity_answers'];
			$data[$quest_type]['answer']=$answers;
		}
	}
   	

	
	echo json_encode($data);
}

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

if(isset($_GET['action']) && $_GET['action']=='quest_import'){
	$quest_id =$_GET['quest_id'];
	$test_id =$_GET['test_id'];
	$id_parent =$_GET['in_test'];

	$query ="SELECT * FROM quest WHERE quest_id='$quest_id'";
	$result = mysql_query($query)
	or die("Query failed : " . mysql_error());
	$line = mysql_fetch_array($result);
	$quest = $line['quest'];
	$quest_type = $line['quest_type'];
	$correct_answer=$line['correct_answer'];
	$quantity_answers = $line['quantity_answers'];

	$query="INSERT INTO quest VALUES('','$quest','$id_parent','$quest_type','$correct_answer','$quantity_answers');";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());
		$new_quest_id = mysql_insert_id();
		echo json_encode($new_quest_id);

		$query ="SELECT quantity_quests FROM tests WHERE id='$id_parent'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

   	 	$line = mysql_fetch_array($result);
   	 	$quantity_quests = $line['quantity_quests'];
   	 	$new_quantity_quests = $quantity_quests + 1;
   	 
   	 	$query ="UPDATE tests SET quantity_quests='$new_quantity_quests' WHERE id='$id_parent'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());
	

	if ($quest_type!='Открытой формы') {
		$query ="SELECT * FROM answers WHERE parent_quest='$quest_id'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

		while ($line = mysql_fetch_assoc($result)) {
				$data[] = $line;
		}
		foreach ($data as $key => $value) {
			foreach ($value as $key => $value) {
				if ($key=='answer') {
					$answers=$value;
					$query="INSERT INTO answers VALUES('','$value','$new_quest_id');";
					$result = mysql_query($query)
					or die("Query failed : " . mysql_error());
				}
			}
		}
	}

}

if(isset($_GET['action']) && $_GET['action']=='test_del'){
		if (permissions()!=true){
			header('Location: ../tests/');
			break;
		}
		$id = $_GET['id'];
		$query ="SELECT quantity_quests FROM tests WHERE id=$id";
			 $result = mysql_query($query)
			or die("Query failed : " . mysql_error());
		
   		$line = mysql_fetch_assoc($result);
   		$quantity_quests = $line['quantity_quests'];
   		
   		
   			
	   		$query ="SELECT quest_id FROM quest WHERE parent_test=$id";
			 $result = mysql_query($query)
			or die("Query failed : " . mysql_error());
			$data = array();	

   		  while ($line = mysql_fetch_assoc($result)) {
				foreach ($line as $key => $value) {
					$data[] = $value;
				}
		}
		$quest_count = count($data);
		for ($i=0; $i!=$quest_count; $i++) { 
			$key = $data[$i];
			$query ="DELETE FROM answers WHERE parent_quest=$key";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
		}

		$query ="DELETE FROM quest WHERE parent_test=$id";
	   		$result = mysql_query($query)
			or die("Query failed : " . mysql_error());

		$query ="DELETE FROM tests WHERE id=$id";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
   		
}
	
if(isset($_GET['action']) && $_GET['action']=='newtest'){
	$quantity_quests = $_GET['quest_quantity']; //кол-во вопросов
	$new_test_name = $_GET['new_test_name'];
	

	$query ="INSERT INTO tests VALUES ('','$new_test_name','$quantity_quests')";
	$result = mysql_query($query)
	or die("Query failed : " . mysql_error());
	
	
	$query ="SELECT id FROM tests WHERE test_name='$new_test_name'";
	$result = mysql_query($query)
		or die("Query failed : " . mysql_error());
		$data = array();	
	while ($line = mysql_fetch_array($result)) {
			$data[] = $line;
	}
	foreach ($data as $key => $value) {
		foreach ($value as $key => $value) {
			if ($key=='id') {
				$new_test_id = $value;
			}
		}
	}
	
	$quantity_quests1 = $quantity_quests+1;
	for ($i=1; $i!=$quantity_quests1 ; $i++) { 
		$select = $_GET['select'.$i];
	

		if($select=='Закрытой формы'){
			$quests = $_GET['quest_num'.$i];
			$quantity_answers = $_GET['quantity_answers1'];
			$quantity_answers = $quantity_answers+1;
			for ($z=0; $z<$quantity_answers ; $z++) { 
				if (isset($_GET['answer_num'.$z.'quest'.$i]) && $_GET['answer_num'.$z.'quest'.$i]!=null) {
					$correct_answer = $_GET['answer'.$z.'quest'.$i];
				}
			}
			
		 $query ="INSERT INTO quest VALUES ('','$quests','$new_test_id','$select','$correct_answer','1')";
		 $result = mysql_query($query)
		 or die("Query failed : " . mysql_error());
	
		$query ="SELECT quest_id FROM quest WHERE quest='$quests'";
			 $result = mysql_query($query)
			or die("Query failed : " . mysql_error());
		
				$data = array();	
   		 while ($line = mysql_fetch_array($result)) {
				$data[] = $line;
		}
		foreach ($data as $key => $value) {
			foreach ($value as $key => $value) {
				if ($key=='quest_id') {
					$new_quest_id = $value;
				}
			}
		}
	
			for ($z=1; $z <$quantity_answers ; $z++) { 
				$quest = $_GET['answer'.$z.'quest'.$i];
				$query ="INSERT INTO answers VALUES ('','$quest','$new_quest_id')";
				$result = mysql_query($query)
				or die("Query failed : " . mysql_error());
			}
	
		}
		if ($select=='Открытой формы') {
			$quest = $_GET['quest_num'.$i];
			$correct_answer = $_GET['answer1quest'.$i];
	
			$query ="INSERT INTO quest VALUES ('','$quest','$new_test_id','$select','$correct_answer','1')";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
		}
			$quest="";
		if ($select=='На соответствие') {
			$quantity_quest= $_GET['quantity_quest'.$i];
			$correct_answer = $_GET['correct_answer'.$i];
			$quantity_answers = $_GET['quantity_answers'.$i];
			$quantity_answers1 = $quantity_answers+1;
			$quantity_quest1=$quantity_quest+1;
			for ($z=1; $z <$quantity_quest1 ; $z++) { 
				$quest.=$_GET['q'.$z.'quest'.$i].";";
			}
	
			$query ="INSERT INTO quest VALUES ('','$quest','$new_test_id','$select','$correct_answer','$quantity_answers')";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
	
			$query ="SELECT quest_id FROM quest WHERE quest='$quest'";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
		
				$data = array();	
   				while ($line = mysql_fetch_array($result)) {
					$data[] = $line;
				}
				foreach ($data as $key => $value) {
					foreach ($value as $key => $value) {
						if ($key=='quest_id') {
							$new_quest_id = $value;
						}
					}
				}
	
			for ($z=1; $z <$quantity_answers1 ; $z++) { 
				$new_answer =$_GET['answer'.$z.'quest'.$i];
	
				$query ="INSERT INTO answers VALUES ('','$new_answer','$new_quest_id')";
				$result = mysql_query($query)
				or die("Query failed : " . mysql_error());
			}
		}
		if ($select=='На установление правильной последовательности') {
			$quantity_quests_conf =$_GET['quantity_quest'.$i];
			//$quantity_quests1=$quantity_quests+1;
			$quantity_quests_conf1 = $quantity_quests_conf+1;
			$correct_answer = $_GET['answer'.$i];
			$quest=$_GET['mainq1quest'.$i];
			$query ="INSERT INTO quest VALUES ('','$quest','$new_test_id','$select','$correct_answer','$quantity_quests_conf')";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
	
			$query ="SELECT quest_id FROM quest WHERE quest='$quest'";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
			
			$data = array();	
   				while ($line = mysql_fetch_array($result)) {
					$data[] = $line;
				}
				foreach ($data as $key => $value) {
					foreach ($value as $key => $value) {
						if ($key=='quest_id') {
							$new_quest_id = $value;
						}
					}
				}
	
	
	
			for ($z=1; $z <$quantity_quests_conf1; $z++) { 
				$new_answer = $_GET['q'.$z.'quest'.$i];
				$query ="INSERT INTO answers VALUES ('','$new_answer','$new_quest_id')";
				$result = mysql_query($query)
				or die("Query failed : " . mysql_error());
	
			}
		}
	}
			echo json_encode($quantity_quests_conf);
}
if (isset($_GET['action']) && $_GET['action']=='quest_change') {
	$id=$_GET['id'];

	$query ="SELECT quest_type FROM quest WHERE quest_id='$id'";
	$result = mysql_query($query)
	or die("Query failed : " . mysql_error());
			
	$data = array();	
	while ($line = mysql_fetch_array($result)) {
			$data[] = $line;
		}
		foreach ($data as $key => $value) {
			foreach ($value as $key => $value) {
				if ($key=='quest_type') {
					$quest_type = $value;
				}
			}
		}
	
	if ($quest_type=='Открытой формы') {
		$quest=$_GET['new_quest'];
		$answer=$_GET['new_answer'];
		$query="UPDATE quest SET quest='$quest', correct_answer='$answer' WHERE quest_id='$id'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());
	};
	if ($quest_type=='На соответствие') {
		$quantity_quests = $_GET['quantity_quest1'];
		$quantity_answers = $_GET['quantity_answers1'];
		$correct_answer = $_GET['correct_answer'];
		$new_quest='';
		$quantity_answers = $quantity_answers+1;
		for ($i=1; $i<$quantity_answers ; $i++) { 
			$new_quest.=$_GET['answer'.$i.'quest1'].";";
		}

		$query="UPDATE quest SET quest='$new_quest', correct_answer='$correct_answer' WHERE quest_id='$id'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

		$query="DELETE FROM answers WHERE parent_quest='$id'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

		$quantity_quests = $quantity_quests+1;
		for ($i=1; $i <$quantity_quests ; $i++) { 
			$answer = $_GET['q'.$i.'quest1'];
			$query ="INSERT INTO answers VALUES ('','$answer','$id')";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
		}
		
	}
	if ($quest_type=='На установление правильной последовательности') {
		$quantity_quests=$_GET['quantity_quest'];
		$new_quest=$_GET['quest'];
		$correct_answer=$_GET['answer1'];
		
		$query="UPDATE quest SET quest='$new_quest', correct_answer='$correct_answer' WHERE quest_id='$id'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

		$query="DELETE FROM answers WHERE parent_quest='$id'";
		$result = mysql_query($query)
		or die("Query failed : " . mysql_error());

		$quantity_quests=$quantity_quests+1;
		for ($i=1; $i <$quantity_quests ; $i++) { 
			$answer = $_GET['q'.$i.'quest1'];
			$query ="INSERT INTO answers VALUES ('','$answer','$id')";
			$result = mysql_query($query)
			or die("Query failed : " . mysql_error());
		}

	}
	if ($quest_type=='Закрытой формы') {
		$quantity_answers=$_GET['quantity_answers'];
		$quantity_answers=$quantity_answers+1;
		for ($i=1; $i<$quantity_answers ; $i++) { 
			//$answer=$_GET['answer'.$i];
			if (isset($_GET['answer'.$i]) && $_GET['checkbox'.$i]!=null){
					$correct_answer = $_GET['answer'.$i];
			}
		}
	}

	echo json_encode($correct_answer);
}
?>
	