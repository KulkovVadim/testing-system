<html>
 <head>
	<script type="text/javascript" src="jquery-1.11.3.min.js"></script>  
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href='https://fonts.googleapis.com/css?family=Didact+Gothic' rel='stylesheet' type='text/css'>
  
  <script type="text/javascript" src="script.js"></script>
  <link href="style_main.css" rel="stylesheet"> 

  <?php

session_start();
if (isset($_SESSION['login'])) {
  $surname = $_SESSION['surname'];  
  $login = $_SESSION['login'];
  $name = $_SESSION['name'];  
  $user_status = $_SESSION['user_status'];
  $massege = "Вы вошли как ".$name." ".$surname;
}else{
  header('Location:../../login');
  exit;
}
if(isset($_GET['exit']) && $_GET['exit']=='1'){
    unset($_SESSION['login']);
    session_destroy();
    header('Location:../../login');
    exit();
}
?>
  <title>Тесы НИИИС</title>

   </head> 
<body>
<div id="head">
  <div id="user_status"><?php echo $massege; echo "  <a href='?exit=1'>Выйти</a>";?></div>
    <div id="edit_button"><a href='../tests'>Переход в раздел тестов</a></div>

  
</div>
	<div id="main">
   

  </div>
</body>
</html>

