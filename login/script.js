$(function() {		
$("#submit_button").on("click", function( event ) {
			$.ajax({  
		url: 'login.php',  
		type: 'POST',
		data: { login: $("#login").val(),
				pswd: $("#pswd").val()
				}
		})
	.done(function(data){ 
	
	var markup=$.parseJSON(data);

		if (markup=="true") {
			console.log("123");
			var url = "../main/tests";
			$(location).attr('href',url);
		}else{
			$("#error_spase").html("");
			setInterval(function func() {
				$("#error_spase").html(markup);
		 	}, 500)
		};

					});
			});
		});


	

	