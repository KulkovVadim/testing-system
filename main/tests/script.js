function getTest (){

	$.ajax({method: "GET",
		url: "function.php",
		data: { action: "tests"}
		})
		.done(function( data ) {
			var markup ="<h2>Список тестов</h2>";
			var test=$.parseJSON(data);
	
			markup+="<div class='quest'>";
			markup+="<ol>";
			$.each(test, function(key, value) {
				$.each(value, function(key, value) {
						
						if (key =="id") {
							var idd = value;
							markup+='<li class="tests_list_li" id="'+value+'" onclick="refresh('+value+')"> ';
							

							
						}
						if(key=="test_name"){
							markup+=value;		
							markup+=" </li>";
						}

						

				});
			});
		markup+="</ol>"
		markup+="</div>";	

		$("#main").html(markup);
});

}
function refresh (num){
	var test_name = $("#"+num).html();
	var	markup='';
		markup+="<div id='backb' class='backb'>Назад</div>";
		markup+="<div id='test'>";
		markup+="<form id='test_form' onsubmit='return false;'>";
		markup+="<h1>"+test_name+"</h1>";
		markup+='<textarea rows="10" cols="45" name="test_id" style = "display: none;">';
		markup+= num;
		markup+='</textarea>';

	$.ajax({method: "GET",
		url: "function.php",
		data: { action: "list", // будем запрашивать только вопрос с его id и тип вопроса
				test_id: num}
		})
		.done(function( data ) {
			var test=$.parseJSON(data);
			//console.log(test);
			markup+="<ol>"
				
			$.each(test, function(key, value) {
				var re = /\s*,\s*/;
				var tagList = key.split(re);
				var quest_num = tagList[0];
				var quest_type = tagList[1];
				//console.log("id "+quest_num);
				//console.log("quest_type "+quest_type);
				if (quest_type=='Закрытой формы') {
					var i=0;
					$.each(value, function(key, value) {
						
						//console.log(value);
						if(key!='0'){
							i++;
							markup+="<input type='radio' id="+quest_num+" name='answer"+quest_num+"' value='"+value+"'>";
							markup+= value;
							markup+="<br>";
						}else{
							markup+="<li>";
							markup+="<p>";
							markup+=value;
							markup+="</p>";
							markup+="</li>";
							
						}
					})	
				
				};
					if (quest_type=='Открытой формы') {
						var i=0;
						$.each(value, function(key, value) {
							if(key=='0'){
								markup+="<li>";
								markup+="<p>";
								markup+=value;
								markup+="<p><input type='text' autocomplete='off' id="+quest_num+" name='answer"+quest_num+"' size='30' class='input_form'  placeholder='Введите ответ'></p>";
								markup+="</p>";
								markup+="</li>";
							}
						});
	
					};
					if (quest_type=='На установление правильной последовательности') {
						var size = 0;
						var arr = [];
						$.each(value, function(key, value) {
							if(key!='0'){
								arr[size]=value;
								size++;
							}					
						})
						var size1 = 0;
						$.each(value, function(key, value) {
							if(key!='0'){
								markup+="<select id='1' name='q"+quest_num+"answer"+size1+"'>";
								//console.log(size);
								for (var i=0; i<arr.length; i++) {
									markup+="<option>"+arr[i]+"</option>";
								};
								markup+="</select><br><br>";
							}else{
								markup+="<li>";
								markup+="<p>";
								markup+=value;
								markup+="</p>";
								markup+="</li>";
								
							}
							size1++;
							
						
						})
						
					};
					if (quest_type=='На соответствие') {
						var size = 1;
						//console.log(value);
						$.each(value, function(key, value) {
							if(key!='0'){
								markup+='<input type="text" autocomplete="off" name="q'+quest_num+'answer'+size+'" size="1">';
								markup+= " "+value;
								markup+="<br>";
								size++;
							}else{
								markup+="<li>";
								markup+="<p>";
								markup+="Установите сочитание";
								markup+="</p>";
								markup+="</li>";
								var re = /\s*;\s*/;
								var questList = value.split(re);
								var questList1 = questList.length -1;
								markup+="<ol>";
								for (var i =0; i<questList1; i++) {
									markup+="<li>"+questList[i]+"</li>";
								};
								markup+="</ol>";
								markup+="<br>";
							}
						})
					};
				});
					markup+="</ol>";
					markup+="<input type='submit' class='addButton' name='result' value='Закончить тест'>";
					markup+="</form>";
					markup+="</div>"
					$("#main").html(markup);	

	$("#backb").click(function(){
		var back = confirm("Вы действительно хотите покинуть тест?");
		if (back==true) {
			getTest();
		};
	})
	$("#test form").on( "submit", function( event ) {
			
			$.ajax({
				method: "GET",
				url: "testresult.php?result=Отправить",
				data: $('form').serialize()
			
			})
			.done(function( resp ) {
		
				var resp_obj=$.parseJSON(resp);
				//console.log(resp_obj);
				var Mark = resp_obj.mark;
				var Percent = resp_obj.percent;
				var markup="";
				markup+="<h2>Результаты теста</h2>";
				markup+="Ваша оценка за тест "+Mark;
				markup+="<br>";
				markup+="Процент правильных ответов "+Percent+"%";
				markup+="<br>";
	   			markup+='<canvas id="circle" width="300" height="300"><p>Ваш браузер не поддерживает рисование</p></canvas>';
				markup+='<input type="button" class="addButton" src="index.php" value="Закончить тест" onclick="getTest();">';
				$("#main").html(markup).ready(circle(Percent));
				
			});
				
	});
							
		});
	}

$(document).ready(getTest());
