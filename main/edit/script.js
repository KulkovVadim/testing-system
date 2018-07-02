function return_back(){
	$(location).attr('href', "../tests");
}
function user_status_error(){

	$('body').html('<div id="user_status_error">Вы попали на страничку предназначенную для пользователей с правами адиминистартора. Пожалуйста вернитесь в раздел тестов.<button type="button" id="submit_button" onclick="return_back()">Назад</button></div>');

}

function error(str){
	$('#error_space').html('');
	var i = 0;
	var z=50;
	setInterval(function(){
		if (i<50) {
			i++;
			$("#error_space").css("height", i)
		}
	}, 10);
	setTimeout("$('#error_space').html('"+str+"')", 500);
	/*setTimeout(function(){
		$('#error_space').html('');
		
		setInterval(function(){
			if (z>0) {
				z--;
				$("#error_space").css("height", z)
			};
		}, 10);

	}, 3000);*/
	
}

function test_select(num){
	var markup="";
	$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "test_select",
				   test_id: num}
			})
		.done(function( data ) {
			markup+="<div class='backButoon_UC' id='back_to_test_select' onclick='test_edit()'>Назад</div>"
			markup+="<h2>Выберите вопрос</h2>"
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);	
			$.each(resp_obj, function(key, value) {
				$.each(value, function(key, value) {
					if (key=="quest_id") {
						markup+="<div class='name_list' onclick='quest_select("+value+","+num+")'>";
					};
					if (key=="quest") {
						markup+=value;
						markup+="</div>";
					};

				})
			})
			markup+="<br>";
			markup+="<div class='backButoon_UC' id='import' onclick='import_q("+num+")'>Импорт воросов</div>";
			$("#low_main").html(markup);
	
		})

}
function import_q(id_parent){
	//console.log(id_parent);
		var markup="";
		$.ajax({
				method: "GET",
				url: "edit.php",
				data: {action: "tests"}
				})
			.done(function( data ) {
				markup+="<h1>Выберите тест</h1>";
				markup+="<div id='low_main'>";
				markup+="<div class='backButoon_UC' onclick='user_status()'>Назад</div>";
				var resp_obj=$.parseJSON(data);
				//console.log(resp_obj);
				$.each(resp_obj, function(key, value) {
					$.each(value, function(key, value) {
						if (key=="id") {
							if (value!=id_parent) {
								markup+="<div class='name_list' onclick='select_q("+value+","+id_parent+")'>";
							}else{
								markup+="<div class='name_list'>";
							}
						};
						if (key=="test_name") {
							markup+=value;
							markup+="</div>";
						};
					})
				})		
			markup+="</div>";
			$("#main").html(markup);
		})
}
function select_q(id, id_parent){
	//console.log("id= "+id+", id_parent= "+id_parent);
	var markup="";
	$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "test_select",
				   test_id: id}
			})
		.done(function( data ) {
			markup+="<div class='backButoon_UC' id='back_to_test_select' onclick='import_q()'>Назад</div>"
			markup+="<h2>Выберите вопрос для импорта</h2>"
			markup+="<p><b>Нажмите на нужный вопрос, для того что бы </b></p>"
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);	
			$.each(resp_obj, function(key, value) {
				$.each(value, function(key, value) {
					if (key=="quest_id") {	
						markup+="<div class='name_list' onclick='import_quest("+value+","+id+","+id_parent+")'>";
					};
					if (key=="quest") {
						markup+=value;
						markup+="</div>";
					};

				})
			})
			markup+="<br>";
			$("#low_main").html(markup);
		})
}
function import_quest(quest_id,test_id,id_parent) {
	var rdy1 = confirm("Вы действительно импортировать этот вопрос?");
	if (rdy1==true) {
	////console.log(quest_id+","+test_id+","+id_parent);
	$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "quest_import",
					test_id: test_id,
					quest_id: quest_id,
					in_test: id_parent}
			})
			.done(function( data ) {
				alert("Вопрос был импортирован");
				var resp_obj=$.parseJSON(data);
				//////console.log(resp_obj);	
			})
	};
}
var status = false;
var num_answer = 0;
var god = 0;
function disable_div(id){
	status = true;
	if (num_answer!=0) {
		num_answer = num_answer - god;
	};
	$("#close"+id).remove();
	$("#answer"+id).remove();
	$("#checkbox"+id+"div").remove();
	$("#close_div"+id).remove();
	var low_id = id - 1;
	$("#close_div"+low_id).html("<div class='closeX' title='Удалить этот вариант ответа' id='close"+low_id+"' onclick='disable_div("+low_id+")'>X</div>");
	id1 = id - 1;
	$("#gg").html("<div class='backButoon_UC' onclick='new_answer("+id1+")'>Добавить варинт ответа</div>");
	god = 1;
	//god++;
	////console.log("god ="+god);
	////console.log("Текущие кол-во вопросов "+num_answer); 
}

var div_id = 0;
function new_answer(num) {
				//////console.log(div_id);
				var div_id2 = div_id +1;
					num_answer = num + 1;
					////console.log("false");	

				var del_id_x = num_answer-1;
				////console.log("Вопросов уже "+num_answer);
				
				$("#reserve_div"+div_id).html("<input required type='text' autocomplete='off' size='60' id='answer"+num_answer+"' class='input_form'  placeholder=' Введите овтет номер "+num_answer+"'>"+
					"<div id='checkbox"+num_answer+"div' style='display: inline;'><input type='checkbox' id='checkbox"+num_answer+"' value='1'> Это правильный ответ.</div>"+
					"<div id='close_div"+num_answer+"' style='display: inline;'>"+
					"<div class='closeX' title='Удалить этот вариант ответа' id='close"+num_answer+"' onclick='disable_div("+num_answer+")'>X</div>"+
					"</div>"+
					"<div id='reserve_div"+div_id2+"'></div>");
				div_id++;
				status = false;
				god=0; 
				$("#gg").html("<div class='backButoon_UC' onclick='new_answer("+num_answer+")'>Добавить варинт ответа</div>");
				$("#close"+del_id_x).remove();
			}

function quest_select(id,parent_id){
////console.log("id родителя теста "+parent_id);
////console.log("id вопроса "+id);

var markup="";
var b = 0;
	$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "quest_select",
				   id: id}
			})
		.done(function( data ) {
			markup+="<form  onsubmit='return false;'>";
			markup+="<div class='backButoon_UC' id='del_quest'>Удалить вопрос</div>";
			markup+="<div class='backButoon_UC' id='back_to_quest_select'>Назад</div>";
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);
			$.each(resp_obj, function(key, value){	
				if (key=='Открытой формы'){
					$.each(value, function(key, value) {
						if (key=='quest') {
							markup+="<h2>Вопрос</h2>";
							markup+="<input required type='text' value='"+value+"' autocomplete='off' size='60' id='quest' class='input_form' name='new_quest' placeholder=' Введите вопрос'>";
							//markup+=value+'<br>';

						};
						if (key=='correct_answer') {
							markup+="<h2>Ответ</h2>";
							markup+="<input required type='text' autocomplete='off' value='"+value+"' size='60' id='answer' class='input_form' name='new_answer' placeholder=' Введите вопрос'>";
							//markup+=value+'<br>';
						};
					})
				};
				if (key=='На установление правильной последовательности') {
					$.each(value, function(key, value) {
						
						if (key=='quest') {
							markup+="<p>Количество вопросов"+
							"<input type='number' size='1' name='quantity_quest' id='quantity_quest1' class='input_num' onchange='form_sequence(1)'></p>";
							markup+="<input name='quest' required type='text' autocomplete='off' size='60' id='quest' class='input_form'  placeholder=' Введите вопрос'>";
							markup+="<div id='quest_zone1'></div>";
						};
					});
				};
				if (key=='Закрытой формы') {
					var b =0;
					markup+="<h2>Вопрос</h2>";
					$.each(value, function(key, value) {
						if (key=='quest') {
							markup+="<input required type='text' autocomplete='off' name='quest' value='"+value+"' size='60' id='quests' class='input_form'  placeholder=' Введите вопрос'>";
						};
						if (key=='answer') {
							markup+="<h2>Ответы на вопрос</h2>";
							$.each(value, function(key, value) {
								////console.log(value);
								b++;
								markup+="<input required value='"+value+"' type='text' name='answer"+b+"' autocomplete='off' size='60' id='"+b+"' class='input_form'  placeholder=' Введите овтет номер "+b+"'>"; 
								markup+="<div name id='checkbox"+b+"div' style='display: inline;'><input name='checkbox"+b+"' type='checkbox' id='checkbox"+b+"' value='1'> Это правильный ответ.</div>";
								//markup+="<div id='close_div"+b+"' style='display: inline;'></div>";
							})

						};
					})
					markup+="<textarea name='quantity_answers' style='display:none;'>"+b+"</textarea>";
				};
				if (key=='На соответствие') {
					$.each(value, function(key, value) {
						if (key=='quest') {
							markup+='<p>Количество варивантов'
							markup+='<input type="number" size="1" name="quantity_answers1" id="quantity_answers1" class="input_num" onchange="form_conformity_answer(1)" >';
							markup+='<div id="answers_zone1"></div>';
							markup+='<p>Количество действий'
							markup+='<input type="number" size="1" name="quantity_quest1" id="quantity_quest1" class="input_num" onchange="form_conformity(1)" ></p>';
							markup+='<div id="quest_zone1"></div>';
							markup+='<p>Введите правильный порядок:  <input type="text" id="answer" autocomplete="off" name="correct_answer" style="input_form" placeholder="123" size="10"></p>';


							// form_conformity(1);
							// form_conformity_answer(1)
							var re = /\s*;\s*/
							var questList = value.split(re);
							var questList1 = questList.length -1;
							for (var i =0; i<questList1; i++) {
								//////console.log(questList[i]);
								//markup+="<li>"+questList[i]+"</li>";
							};
						};
					})
				};

			})
			markup+="<br><button id='save' class='submit_button'>Сохранить изменения</button>";
			markup+="</form>";
			$("#low_main").html(markup);
			$("#save").click(function(){
				$.ajax({
					method: "GET",
					url: "edit.php?action=quest_change&id="+id,
					data: $('form').serialize()
					})
					.done(function(data) {
						var resp_obj=$.parseJSON(data);
						////console.log(resp_obj);
					})
			});
			$.each(resp_obj, function(key, value) {	
				// if (key=='Открытой формы'){
				// 	$.each(value, function(key, value) {
				// 		if (key=='quest') {
				// 			$("#quest").val(value);
				// 		};
				// 		if (key=='correct_answer') {
				// 			$("#answer").val(value);
				// 		};
				// 	})	
				// }
				if (key=='На соответствие') {
					$.each(value, function(key, value) {
						if (key=='quantity_answers') {
							$("#quantity_quest1").val(value);
							$("#quantity_answers1").val(value);
							form_conformity(1);
							form_conformity_answer(1)
							
						};
					})
					$.each(value, function(key, value) {
						if (key=='quest') {
							var re = /\s*;\s*/
							var questList = value.split(re);
							var questList1 = questList.length -1;
							var z =0;
							for (var i=0; i<questList1; i++) {
								z++;
								$("#quest"+z).val(questList[i]);
							};

						};
						if (key=='answer') {
							var a = 0;
							////console.log(value);
							$.each(value, function(key, value) {
								a++;
								$("#answer"+a).val(value);
							})
						};
						if (key=='correct_answer') {

							$("#answer").val(value);
						};
					})
				};
				if (key=='На установление правильной последовательности') {
					$.each(value, function(key, value) {
						if (key=='quantity_answers') {	
							$("#quantity_quest1").val(value);
							form_sequence(1);	
						};
						
						if (key=='quest') {
							$("#quest").val(value);	
						};
						if (key=='answer') {
							var idd = 0;
							$.each(value, function(key, value) {
								idd++;
								$("#quest"+idd).val(value);
							})
						};
					})
					$.each(value, function(key, value) {
						if (key=='correct_answer') {
							////console.log(value);
							$("#answer").val(value);
						};

					})

				};							
			})	
				
			// $("#del_quest").click(function(){
			// 	$.ajax({
			// 			method: "GET",
			// 			url: "edit.php",
			// 			data: {action: "del_quest",
			// 					quest_del_id: id,
			// 					parent_test_id:parent_id}
			// 	})
			// 	.done(function( data ) {
			// 		var rdy1 = confirm("Вы действительно хотите удалить этот вопрос?");
			// 		if (rdy1==true) {
			// 			alert("Вопрос был удален.");
			// 			user_status();
			// 		}
			// 	})
			// });
			$("#back_to_quest_select").click(function(){
				var rdy1 = confirm("Вы действительно хотите вернутся назад? Все изменения не будут записаны");
					if (rdy1==true) {
						test_select(parent_id);
					}
			});
	
		}).done(function() {
			//$("#close_div"+b).html("<div class='closeX' title='Удалить этот вариант ответа' id='close"+b+"' onclick='disable_div("+b+")'>X</div>");
		});
}

function test_edit(){
	var markup="";
	$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "tests"}
			})
		.done(function( data ) {
			markup+="<h1>Редактировать тест</h1>";
			markup+="<div id='low_main'>";
			markup+="<div class='backButoon_UC' onclick='user_status()'>Назад</div>";
			markup+="<h2>Выберите тест</h2>";
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);
			$.each(resp_obj, function(key, value) {
				$.each(value, function(key, value) {
					if (key=="id") {
						markup+="<div class='name_list' onclick='test_select("+value+")'>";
					};
					if (key=="test_name") {
						markup+=value;
						markup+="</div>";
					};
				})
			})		
		markup+="</div>";
		$("#main").html(markup);
		})

}
function user_status(){
	var markup=""; 
	$.ajax({
		url: "edit.php",
		data: { user_status: "check"}
		})
		.done(function( data ) {
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);
			if (resp_obj==false) {
				////console.log("asdsa");
				user_status_error();
			}else{
				markup+="<div class='edit_div'>"
				markup+="<h1>Раздел управления</h1>"
				markup+="<ul>"
				markup+="<li type='none' class='edit_list' onclick='test_edit()'>Редактировать тест</li>";
				markup+="<li type='none' class='edit_list' onclick='test_del()'>Удалить тест</li>";
				markup+="<li type='none' class='edit_list' onclick='test_add()'>Добавить тест</li>";
				markup+="<li type='none' class='edit_list' onclick='user_control()'>Управление пользователями</li>";
				markup+="<li type='none' class='edit_list' onclick='result_list()'>Результаты тестов</li>";
				markup+="</ul>"
				markup+="</div>"
				$("#main").html(markup);

			}
		});

}
function test_del_f(num){
	////console.log("Мы удаляем тест "+num);
	var rdy = confirm("Вы действительно хотите удалить тест №"+num+"?");
	if (rdy==true) {
		$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "test_del",
					id: num}
			})
		.done(function( data ) {
			user_status();
		})
	}
}

function test_del(){
////console.log("asd");
	var markup="";
		$.ajax({
		url: "edit.php",
		data: {action: "tests_del"}
		})
		.done(function( data ) {
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);
			markup+="<div class='backButoon_UC' onclick='user_status()'>Назад</div>";
			markup+="<h2>Удаление тестов</h2>"	
			markup+="<table border='1' class='face'>";
			markup+="<tr>";
			markup+="<th class='th_head'>id теста</th>"
			markup+="<th class='th_head'>Название теста</th>";
    		markup+="<th class='th_head'>Удаление</th>";
			markup+="</tr>";
			$.each(resp_obj, function(key, value) {

				markup+='<tr>';

				$.each(value, function(key, value) {
					if (key=='id') {
						markup+="<td>"+"#"+value+"</td>";
						var ida = value;
					};
					if (key=='test_name') {
						markup+="<td>"+value+"</td>";
						var test_name = value;
					};
				})
				$.each(value, function(key, value) {
					if (key=='id') {
						markup+="<td><div id='delet_button' onclick='test_del_f("+value+")'>Удалить </div></td>";
						var ida = value;
					};
				
				})


				markup+='</tr>';
			})

				markup+="</table>";
				$("#main").html(markup);
		})
}
function result_list(){
	
	var markup="";
		$.ajax({
		method: "GET",
		url: "edit.php",
		data: {action: "get_result_list"}
		})
		.done(function( data ) {
			var days = 31;
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);
			markup+="<div id='error_space'></div>";
			markup+="<div class='backButoon_UC' onclick='user_status()'>Назад</div>";
			markup+="<h2>Результаты тестов</h2>"
		  	markup+='Выберите дату: <input type="date" id="calendar" name="calendar" style="margin-right: 15px;">';
			markup+="<div class='backButoon_UC' id='datebutton'>Найти</div>";

			if (resp_obj.length>0) {
				markup+="<div id='tablediv'>";
				markup+="<table border='1' style='margin-top: 15px;'>";
				markup+="<tr>";
				markup+="<th class='th_head'> Номер записи </th>"
				markup+="<th class='th_head'> Название теста </th>";
    			markup+="<th class='th_head'> Имя пользователя </th>";
    			markup+="<th class='th_head'> Дата прохождения </th>";
    			markup+="<th class='th_head'> Время </th>";
    			markup+="<th class='th_head'> Оценка </th>";
				markup+="</tr>";
				$.each(resp_obj, function(key, value) {
					markup+='<tr>';
					$.each(value, function(key, value) {
						
						if (key=='id') {
							markup+="<td>"+value+"</td>";
						};
						if (key=='testname') {
							markup+="<td>"+value+"</td>";
						};
						if (key=='user'){
							markup+="<td>"+value+"</td>";			
						};
						if (key=='date_r') {
							markup+="<td>"+value+"</td>";
						};
						if (key=='time_r') {
							markup+="<td>"+value+"</td>";	
						};
						if (key=='mark') {
							markup+="<td>"+value+"</td>";
						};
					})
					markup+='</tr>';
				})
				markup+="</table>";
				markup+="<p><div class='backButoon_UC' style='margin-top: 15px;' id='clear_table' onclick='del_result()'>Очистить таблицу</div></p>";
				markup+="<p><div class='backButoon_UC' style='margin-top: 15px;' id='csv_file' onclick=''>Сохранить как файл</div></p>";
			
				markup+="</div>";

				$("#main").html(markup);
				$("#csv_file").click(function(){
					$.ajax({
							method: "GET",
							url: "edit.php",
							data: {action: "get_csv"}
							})
							.done(function(){
								var url = "../../files/export.csv";
								$(location).attr('href',url);
							});	
							
				})
				$("#datebutton").click(function(){
					////console.log($("#calendar").val());
					var date = $("#calendar").val();
					var error_date = "Поле с датой пусто";
					if (date=="") {
						error(error_date);
					}else{
						var markup1="";
						$("#tablediv").html("");
						$("#error_space").html("");
						$("#error_space").css("height",0);
						////console.log(navigator.userAgent);
						var str = navigator.userAgent;
						if(str.indexOf('Chrom') + 1) {
							var n=date.replace("-",".");
							var y=n.replace("-",".");
							var arr = y.split(/[..]/);
	  						for (var i=0,len=arr.length;i<len;i++) {
	    						////console.log(arr[i]);
							}
							
							var finaldate = arr[2]+"."+arr[1]+"."+arr[0];
							////console.log("Chrom");
						}else{
							var finaldate=$("#calendar").val();
							////console.log("calendar= "+finaldate);
						}

 						$.ajax({
							method: "GET",
							url: "edit.php",
							data: {action: "get_result_date",
									date_r: finaldate}
							})
							.done(function( data ) {

								var resp_obj=$.parseJSON(data);
								//console.log(resp_obj);
								if (resp_obj.length>0) {
								markup1+="<table border='1' style='margin-top: 15px;'>";
								markup1+="<tr>";
								markup1+="<th class='th_head'> Номер записи </th>"
								markup1+="<th class='th_head'> Название теста </th>";
    							markup1+="<th class='th_head'> Имя пользователя </th>";
    							markup1+="<th class='th_head'> Дата прохождения </th>";
    							markup1+="<th class='th_head'> Время </th>";
    							markup1+="<th class='th_head'> Оценка </th>";
								markup1+="</tr>";
								$.each(resp_obj, function(key, value) {
								markup1+='<tr>';
								$.each(value, function(key, value) {
									
									if (key=='id') {
										markup1+="<td>"+value+"</td>";
									};
									if (key=='testname') {
										markup1+="<td>"+value+"</td>";
									};
									if (key=='user'){
										markup1+="<td>"+value+"</td>";			
									};
									if (key=='date_r') {
										markup1+="<td>"+value+"</td>";
									};
									if (key=='time_r') {
										markup1+="<td>"+value+"</td>";	
									};
									if (key=='mark') {
										markup1+="<td>"+value+"</td>";
									};
								})
								markup1+='</tr>';
							})
							markup1+="</table>";
							markup1+="<p><div class='backButoon_UC' onclick='result_list()'>Очистить фильтр</div></p>";	
							$("#tablediv").html(markup1);
							}else{
								$("#tablediv").html("<p>Результатов теста не найдено</p> <p><div class='backButoon_UC' onclick='result_list()'>Очистить фильтер</div></p>");
							}
							});

					}
				});
			}else{
				markup+="<p>Таблица пуста.</p>";
				$("#main").html(markup);
			}
		});
}

function del_result(){
var markup="";
var rdy2 = confirm("Вы действительно хотите удалить все результаты тестов?");
	if (rdy2==true) {
		$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "del_result"}
			})
			.done(function( data ) {
				markup+="<div class='backButoon_UC' onclick='user_status()'>Назад</div>";
				markup+="<h2>Результаты тестов</h2>"	
				markup+="<p>Таблица была очищена.</p>"
				$("#main").html(markup);
			})
	}
}


function div_pswd_chenge(id) {

	$("#pswd_change").html("<h3>Введите новый пароль для пользовтедя с id "+id+"</h3><div id='form_p'><form onsubmit='return false;'>"+
		 "<input type='text' autocomplete='off' size='40' name='new_pswd1' placeholder=' Введите пароль' id='new_pswd1' class='input_form' required>"+
		 "<p><input type='submit' class='submit_button' style='margin-top:0px;' value='Сохранить изменения' name='submit' id='add_new_pswd'></p></form></div>");


		$("#form_p form").on( "submit", function( event ) {
			var new_pswd = $("#new_pswd1").val();
			$.ajax({
				method: "GET",
				url: "edit.php",
				data: { new_pswd: new_pswd,
						action: "set_new_pswd",
						id: id}
			})
			.done(function( data ) {
				var resp_obj=$.parseJSON(data);
				if(resp_obj!="ok"){
					error(resp_obj);
				}else{
					alert("Пароль был успешно изменен");
					//console.log(resp_obj);
					user_control();
				}
			})
		});
}

function del_user(id){
	var user_del = confirm("Вы действительно хотите удалить пользователя?");
	if (user_del==true) {
		$.ajax({
			method: "GET",
			url: "edit.php",
			data: {action: "del_user",
					id:id}
			})
			.done(function( data ) {
				alert("Пользователь был удален");
				user_control();
			})
	}
}

function user_edit(id){
	var markup="<div id='error_space'></div>";
	$.ajax({
		method: "GET",
		url: "edit.php",
		data: {action: "user_info",
				id: id}
		})
		.done(function( data ) {
			var user_status1;
			var resp_obj=$.parseJSON(data);
			//console.log(resp_obj);
			markup+="<h1>Настройка пользователя"
			$.each(resp_obj, function(key, value) {
				$.each(value, function(key, value) {
					if (key=='name') {
						markup+=" "+value+" ";
					};
					if (key=='surname') {
						markup+= value+"</h1>";
						markup+="<div class='backButoon_UC' onclick='user_control()'>Назад</div>";
					};
					if (key=='login') {
						markup+="<p>Логин пользователя "+value+"</p>"
					};
					if (key=='user_status') {
						var status;
						user_status1=value;
						if (value=='user') {
							status="Пользователь"
						}else{
							status="Админимтратор"
						};
						markup+="<p>Статус польлзователя "+status+"</p>"
					};
				})

			})
			if (user_status1=='user') {
				var user = 1;
			}else{
				var user = 2;
			}
			markup+="<div id='back' class='edit_div' onclick='switch_status("+id+","+user+")'>Cменить статус пользователя</div>";
			markup+="<p><div id='back' class='edit_div' onclick='del_user("+id+")'>Удалить пользователя</div></p>";
			markup+="<p><div id='back' class='edit_div' onclick='div_pswd_chenge("+id+")'>Изменить пароль</div></p>";
			//console.log(user_status1);
			markup+="<div id='pswd_change'></div>";
			$("#main").html(markup);
		})
}

function switch_status (id,user_status1) {
	var user = "Пользователь";
	//console.log("switch_status");
	//console.log(user_status1)
	if (user_status1==2) {
		var new_status='Пользователем';
		var new_st = 'user';
	}else{
		var new_status='Администратором';
		var new_st = 'admin';
	};
	var rdy = confirm("Вы действительно хотите сделать пользователя "+new_status+"?");
			if (rdy==true) {
				//console.log('rdy!');
				$.ajax({
					method: "GET",
					url: "edit.php",
					data : {action: "status_change",
							id: id,
							new_status: new_st}
			
				})
				.done(function(data){
					var resp_obj=$.parseJSON(data);
					//console.log(resp_obj);
					alert("Статус был успешно изменен");
					// if (new_st=='admin') {
					// 	user_edit(id);						
					// }else{
					// 	user_status();
					// }
				});
			}
}

function user_control(){
	$.ajax({
		method: "GET",
		url: "edit.php",
		data: {action: "user_edit"}
		})
		.done(function( data ) {
			var markup="";
			var resp_obj=$.parseJSON(data);
			////console.log(resp_obj);
			markup+="<h2>Информация о пользователях</h2>"	
			markup+="<div class='backButoon_UC' onclick='user_add()'>Добавление пользователей</div>";
			markup+="<div class='backButoon_UC' onclick='user_status()'>Назад</div>";
			markup+="<br>";
			markup+="<br>";
			markup+="<table border='1' class='face'>";
			markup+="<tr>";
			//markup+="<th class='th_head'> Номер пользователя </th>";
			markup+="<th class='th_head'> Имя пользователя </th>"
			markup+="<th class='th_head'> Фамилия </th>";
    		markup+="<th class='th_head'> Статус пользовтеля</th>";
    		markup+="<th class='th_head'> Редактирование</th>";
    		//markup+="<th class='th_head'> Удаление пользователя</th>";
    		markup+="</tr>";
			$.each(resp_obj, function(key, value) {
				markup+='<tr>';
				$.each(value, function(key, value) {
					
					if (key=='name') {
						markup+="<td>"+value+"</td>";
					};
					if (key=='surname'){
						markup+="<td>"+value+"</td>";			
					};
					if (key=='user_status') {
						if (value=="admin") {
							markup+="<td>Админимтратор</td>";
						}else{
							markup+="<td>Пользователь</td>";
						}
					};
					if (key=='user_id') {
						markup+="<td><div id='delet_button' onclick='user_edit("+value+")'>Редакрировать</div></td>";
					};
					
				})
				
				markup+='</tr>';
			})
			markup+="</table>";
			$("#main").html(markup);
		})
}
function pswd_gen () {
	$.ajax({
		method: "GET",
		url: "edit.php",
		data: {action: "pswd_gen"}
		})
		.done(function( data ) {
			var pswd=""
			var resp_obj=$.parseJSON(data);
			//console.log(resp_obj);
			$.each(resp_obj, function(key, value) {
				pswd+=value;			
				////console.log(pswd);				
			})
					$("#pswd").val(pswd);
		})
}
function login_gen(){
	function ucFirst(name , surname) {
		if (!name && !surname) return name,surname;
			$("#name").val(name[0].toUpperCase() + name.slice(1));
			$("#surname").val(surname[0].toUpperCase() + surname.slice(1));
	}
	/*function ucFirst1 (surname) {
		if (!surname) return surname;
			$("#surname").val(surname[0].toUpperCase() + surname.slice(1));
	}*/


	var nameval = $("#name").val();
	var surnameval = $("#surname").val();
	if (nameval!="" && surnameval!="") {
		ucFirst(nameval, surnameval);
		//ucFirst1(surnameval);
		nameval = $("#name").val();
		surnameval = $("#surname").val();
		var str = surnameval+"_"+nameval;
		//console.log(str);
		$.ajax({method: "GET",
		url: "edit.php",
		data: { action: "log_gen",
				str: str}
		})
		.done(function( data ) {
			var resp_obj=$.parseJSON(data);
			//console.log(resp_obj);
			$("#login").val(resp_obj)
		})
	};
}

function user_add(){
	markup="<div id='error_space'></div><div id='test'>"+"<div class='edit_div' id='back' onclick='user_control()'>Назад</div>"+
	"<form  onsubmit='return false;'>"+
	"<h3>Фамилия нового пользователя</h3>"+
	"<p><input type='text' autocomplete='off' size='40' name='user_surname' onchange='login_gen();' placeholder=' Введите фамилию пользователя' id='surname' class='input_form' required></p>"+
	"<h3>Имя нового пользователя</h3>"+
	"<p><input type='text' autocomplete='off' size='40' name='user_name' onchange='login_gen()'; placeholder=' Введите имя пользователя' id='name' class='input_form' required></p>"+
	"<h3>Логин нового пользователя</h3>"+
	"<p><input type='text' autocomplete='off' size='40' name='login' placeholder=' Введите логин' id='login' class='input_form' required></p>"+
	"<h3>Пароль нового пользователя</h3>"+
    "<input type='text' autocomplete='off' size='40' name='pswd' placeholder=' Введите пароль' id='pswd' class='input_form' required>"+"  <div onclick='pswd_gen()' class='edit_div' id='back' >Сгенерировать</div>"+
    "<h3>Статус пользователя</h3>"+"<select name='newuser_status'><option>Обычный пользователь</option><option>Админимтратор</option></select>"+
    "<p><input type='submit' value='Добавить' name='submit' id='add_button'></p></form>"+"</div>";
	
	$("#main").html(markup);

	$("#test form").on( "submit", function( event ) {
			//console.log('sumbit detected!');
			var rdy = confirm("Добавить нового пользователя?");
			if (rdy==true) {
				//console.log('rdy!');
				$.ajax({
					method: "GET",
					url: "edit.php?action=newuser",
					data : $('form').serialize()
			
				})
				.done(function(data){
					var resp_obj=$.parseJSON(data);
					//console.log(resp_obj);
					if (resp_obj=="ok") {
						user_control();
					}else{
						error(resp_obj);
					}
					

				});
			}else{

			};
	})
}
function form_add_answers(num){
	var markup="<h4>Ответы на вопрос<h4>";
		var answervul = $("#quantity_answers"+num+"").val();
		//console.log(num+"num");
		//console.log(answervul+"answervul");
	if (answervul!="" && answervul>0 && answervul!=0) {
		var i;
		answervul++;
		for(i=1; i<answervul; i++){
			markup+="<input required type='text' autocomplete='off' name='answer"+i+"quest"+num+"' size='60' id='answer"+i+"' class='input_form'  placeholder='Введите овтет номер "+i+"'>"+ 
			"  <input type='checkbox' name='answer_num"+i+"quest"+num+"' value='a"+i+"'> Это правильный ответ.<Br>"
		}
	}else{
		markup+="Некорректный ввод!";
	}
	$("#answers_zone"+num).html(markup);
}

function form_sequence(num){
	var markup="<h4>Ввдети дейстрия в разном порядке<h4><ol>";
		var answervul = $("#quantity_quest"+num+"").val();
		// //console.log(num+"num");
		// //console.log(answervul+"answervul");
	if (answervul!="" && answervul>0 && answervul!=0) {
		var i;
		answervul++;
		for(i=1; i<answervul; i++){
			markup+="<li><input required type='text' autocomplete='off' name='q"+i+"quest"+num+"' size='60' id='quest"+i+"' class='input_form'  placeholder='Введите действие №"+i+"'></li>";
		}
	}else{
		markup+="Некорректный ввод!";
	}
	markup+="</ol>"
	markup+="<h4>Введие правильный порядок через точку с запятой. Содержимое этого поля будет записано как правильный ответ.</h4>"
	markup+="<input id='answer' required type='text' autocomplete='off' name='answer"+num+"' size='60' class='input_form'  placeholder='Действие №2;Действие №1;Действие №3;'>";
	$("#quest_zone"+num).html(markup);
}

function form_conformity(num){
	var markup="<h4>Варианты ответа<h4><ol>";
		var answervul = $("#quantity_quest"+num+"").val();
			// //console.log(num+"num");
			// //console.log(answervul+"answervul");
	if (answervul!="" && answervul>0 && answervul!=0) {
		var i;
		answervul++;
		for(i=1; i<answervul; i++){
			markup+="<li><input required type='text' autocomplete='off' name='q"+i+"quest"+num+"' size='60' id='answer"+i+"' class='input_form'  placeholder='Введите определение'></li>";
		}
	}else{
		markup+="Некорректный ввод!";
	}
	markup+="</ol>"
	$("#quest_zone"+num).html(markup);
}

function form_conformity_answer(num){
	var markup="<h4>Оперделения<h4><ol>";
		var answervul = $("#quantity_answers"+num+"").val();
		// //console.log(num+"num");
		// //console.log(answervul+"answervul");
	if (answervul!="" && answervul>0 && answervul!=0) {
		var i;
		answervul++;
		for(i=1; i<answervul; i++){
			markup+="<li><input required type='text' autocomplete='off' name='answer"+i+"quest"+num+"' size='60' id='quest"+i+"' class='input_form'  placeholder='Введите определение'></li>";
		}
	}else{
		markup+="Некорректный ввод!";
	}
	markup+="</ol>"
	$("#answers_zone"+num).html(markup);
}

function quest_form_del(num){

	kolzone = $("#"+i).val();
		if (kolzone != "undefined") {
			trueval = kolzone;
			//console.log(trueval);
		}else{
			
		};


}
function quest_type_f(num){
	//console.log("Мы меняем селектор с id "+num);
	var value = $("#select"+num).val();
	//console.log("Значение селектора с id="+num+" это "+value);
	if (value=='Закрытой формы') {
		$("#quest_div"+num).html("<p>Введите вопрос</p><input required name='quest_num"+num+"' type='text' autocomplete='off' size='60' id='quantity_quests' class='input_form'  placeholder=' Введите вопрос'>"+
 		"<p> Количество ответов<input type='number' size='1' name='quantity_answers"+num+"' id='quantity_answers"+num+"' class='input_num' onchange='form_add_answers("+num+")'></p>"+
		'<div id="answers_zone'+num+'"></div>');

	};
	if (value=='Открытой формы') {
		$("#quest_div"+num).html("<p>Введите вопрос</p><input required name='quest_num"+num+"' type='text' autocomplete='off' size='60' id='quantity_quests' class='input_form'  placeholder=' Введите вопрос'>"+
			"<p>Введите ответ</p><input required type='text' autocomplete='off' name='answer1quest"+num+"' size='60' id='answer1' class='input_form'  placeholder='Введите овтет'>");
	};
	if (value=='На соответствие') {
		$("#quest_div"+num).html("<p> Количество вопросов<input type='number' size='1' name='quantity_quest"+num+"' id='quantity_quest"+num+"' class='input_num' onchange='form_conformity("+num+")'></p>"+
		'<div id="quest_zone'+num+'"></div>'+
		"<p> Количество ответов<input type='number' size='1' name='quantity_answers"+num+"' id='quantity_answers"+num+"' class='input_num' onchange='form_conformity_answer("+num+")'></p>"+
		'<div id="answers_zone'+num+'"></div>'+
		'<p>Введите правильный порядок:  <input type="text" autocomplete="off" name="correct_answer'+num+'" style="input_form" placeholder="123" size="10"></p>');

	};
	if (value=='На установление правильной последовательности') {
		$("#quest_div"+num).html("<p> Количество вопросов<input type='number' size='1' name='quantity_quest"+num+"' id='quantity_quest"+num+"' class='input_num' onchange='form_sequence("+num+")'></p>"+
		"<input required type='text' autocomplete='off' name='mainq1quest"+num+"' size='60' class='input_form'  placeholder='Введите вопрос'>"+'<div id="quest_zone'+num+'"></div>');
	};
}
var answer_num = 0;
function form_add(num){

	//console.log("asdasdasdsdsdas");
	var div = $('<div/>', {
        'id':'answers'+num
    }).appendTo($('#answers_zone'+num));
     //var Head =$('<p/>').html("fadfsdfdasadsf").appendTo(div);
     var ipt =$('<input/>',{
     	 type :'text',
     	 autocomplete: 'off',
     	 size : '60',
     	 id : 'answer'+answer_num,
     	 class: 'input_form',
     	 placeholder: 'Введите ответ №'+answer_num
     }).	appendTo(div);
     answer_num++;

}
var quest_num = 0;
var max_id = 0;
function addDynamicExtraField() {
	quest_num++;
    var div = $('<div/>', {
        'class' : 'DynamicExtraField',
        'id':"quest"+quest_num
    }).appendTo($('#DynamicExtraFieldsContainer'));
    var br = $('<br/>').appendTo(div);
    var Head =$('<label/>').html("<h3>Вопрос №"+quest_num+"</h3>").appendTo(div);
    var br = $('<br/>').appendTo(div);
    var textarea = $('<select name="select'+quest_num+'" onchange="quest_type_f('+quest_num+')" id="select'+quest_num+'"><option>Закрытой формы</option><option>Открытой формы</option><option>На соответствие</option><option>На установление правильной последовательности</option></select>', {
        name : 'DynamicExtraField[]',
        size : '30'
    }).appendTo(div);
    var div1 = $('<div/>',{
    	id : 'quest_div'+quest_num,
    	class : 'button_div'
    }).appendTo(div);
	$('#quest_quantity').val(quest_num);
}
function test_add(){
	var markup="<div class='edit_div' id='back' onclick='user_status()'>Назад</div>"+
	"<h1>Добавление нового теста.</h1>"+
	"<form onsubmit='return false;'>"+
	"<h2>Название теста:</h2>"+
	"<input type='text' autocomplete='off' size='40' name='new_test_name' required placeholder='Введите название нового теста' class='input_form'>"+
	'<div id="DynamicExtraFieldsContainer"><div id="addDynamicField">'+
    '<input type="button" id="addButton" class="addButton" value="Добавить вопрос">'+
    '</div></div>'+"<input type='text' autocomplete='off' size='0' style='display: none;' id='quest_quantity' name='quest_quantity'>"+
    '<br><input type="submit" class="addButton" style="font-size: 17;" value="Добавить новый тест" class="button_div" id="add_button">'+
    '</form>';

	$("#main").html(markup);
	$('#addButton').click(function(event) {
    		addDynamicExtraField();
    		return false;
 	});
 	$('#DeleteDynamicExtraField').click(function(event) {
                $(this).parent().remove();
                return false;
            });
	$("#main form").on( "submit", function( event ) {
		var rdy = confirm("Добавить новый тест?");
		if (rdy==true) {
			$.ajax({
				method: "GET",
				url: "edit.php?action=newtest",
				data : $('form').serialize()
			
			})
			.done(function( data ) {
				var resp_obj=$.parseJSON(data);
				alert('Тест был добавлен.');
				user_status();
			})
		};
	})
}
$(document).ready(user_status());
