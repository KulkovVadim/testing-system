<html>
 <head>
	<script type="text/javascript" src="jquery-1.11.3.min.js"></script>  
  <script type="text/javascript">
 

   function circle(num) {
   		
        var canvas = document.getElementById('circle');
        var obCanvas = canvas.getContext('2d');
        
        
        var start=(Math.PI/180)*90-((Math.PI/180)*num*360/100)/2 //координаты старта определяем так чтоб закрашенная область всегда была снизу
        obCanvas.fillStyle = "#C17938";
        obCanvas.strokeStyle = "#C17938";
        obCanvas.beginPath();
        obCanvas.arc(150,100,90,0,Math.PI*2,true);
        obCanvas.closePath();
        obCanvas.fill();
        // рисуем окружность
        
        var start=(Math.PI/180)*90-((Math.PI/180)*num*360/100)/2
        var b =-1;
        setInterval(function func() {
                   if (b<num) {
                   b++;

                    obCanvas.fillStyle = '#FAE084';
                    obCanvas.beginPath();
                    obCanvas.moveTo(150, 100);
                    obCanvas.arc(150,100,90.5,start,start+(Math.PI/180)*b*360/100,false);
                    obCanvas.closePath();
                    obCanvas.fill();
        obCanvas.beginPath();
        obCanvas.arc(150, 100, 70, 0, Math.PI*2, false); 
        obCanvas.fillStyle = 'white';
        obCanvas.fill();
        obCanvas.strokeStyle = 'white';
        obCanvas.stroke();
        obCanvas.closePath();

        obCanvas.fillStyle = "#000000";
        obCanvas.font = "20pt Comfortaa";
        obCanvas.textAlign = "center";
        obCanvas.textBaseline = 'middle';
        var x=canvas.width/2;
        var y=canvas.height/3;
        obCanvas.fillText(b+"%", x,y);
               };
        }, 30)
       

        obCanvas.beginPath();
        obCanvas.fillStyle = '#FAE084';
        obCanvas.strokeRect(15, 200, 25, 25);
        obCanvas.fillRect(15,200,25,25);
        obCanvas.closePath();
        obCanvas.fillStyle = "#000000";
        obCanvas.font = "12pt Comfortaa";
        obCanvas.textAlign = "center";
        obCanvas.textBaseline = 'middle';        
        var x=170;
        var y=212.5;
        obCanvas.fillText("Процент правильных ответов", x,y);


        }

     </script>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href='https://fonts.googleapis.com/css?family=Didact+Gothic' rel='stylesheet' type='text/css'>
  
  <script type="text/javascript" src="script.js"></script>
  <link href="style_main.css" rel="stylesheet"> 
  <?php
//ob_start();
//require_once('../../login/login.php');
//ob_end_clean();
session_start();
if (isset($_SESSION['login'])) {
  $surname = $_SESSION['surname'];  
  $login = $_SESSION['login'];
  $name = $_SESSION['name'];  
  $user_status = $_SESSION['user_status'];
  $massege = "Вы вошли как ".$name." ".$surname;
  if ($user_status=='admin') {
    $markup = "<p onclick='test_del()'>Удалить</p>";
  }else{
    $markup = "Вы вошли как пользователь";    
  }
}else{
  header('Location:../../login/');
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
  <div id="edit_button"><a href="../edit">Переход в раздел управления</a></div>
  
  
</div>
	<div id="main"></div>
</body>
</html>

