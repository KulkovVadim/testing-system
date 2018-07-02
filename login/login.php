<?php

session_start();
require_once('../main/tests/config.php');
    $link = mysql_connect(DBHOST, DBUSER, DBPASSWORD)
        or die("Could not connect : " . mysql_error());
    
    mysql_select_db(DBNAME)
        or die("Could not select database");

    mysql_query("SET NAMES utf8;");

    //echo "submit";
    $arrayName = array('true','Неверный логин или пароль!');
    if ($_POST['login']==null) {
        exit();
    }
    if ($_POST['pswd']==null) {
        exit();
    }
    if(isset($_POST['login']) AND isset($_POST['pswd'])){
         $log = $_POST['login'];
         $pas = $_POST['pswd'];
         $res_login = null;
         $res_pswd = null;

            function errorpars(){
                $error='Неверный логин или пароль!';
                echo json_encode($error);
                exit();
               }

            $query = "SELECT * FROM user WHERE login='$log'";
            $result = mysql_query($query)
                or die(errorpars());
            $res_assoc=array();
            while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
                $res_assoc[]=$line;
            }
            
            foreach ($res_assoc as $key => $value) {
                foreach ($value as $key => $value) {
                    # code...
                    if ($key=='user_status') {
                        $user_status =$value;
                    }
                    if ($key=='surname') {
                        $surname = $value;
                    }
                    if ($key=='name') {
                        $name = $value;
                    }
                    if ($key=='login') {
                        $res_login =  $value;
                    }
                    if ($key=='pswd') {
                        $res_pswd=$value;   
                    }
                }
            }
               
            if (strnatcasecmp ($log,$res_login)==0){
            //if ($log==$res_login) {
                if (hash_equals($res_pswd, crypt($pas, $res_pswd))) {
					$login = $log = $_POST['login'];
					echo json_encode($arrayName[0]);
					$_SESSION['name'] = $name;  
					$_SESSION['surname'] = $surname;  
					$_SESSION['login'] = $login; 
					$_SESSION['user_status']  = $user_status;
                }else{
                    echo json_encode($arrayName[1]);    
                }
            }else{
                echo json_encode($arrayName[1]);
            }           
    }

?>