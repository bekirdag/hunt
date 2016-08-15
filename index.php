<!DOCTYPE HTML>
<html lang="en-EN">
<head>
	<meta charset="UTF-8">
	<script src="js/jquery.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/creature.js"></script>
	<script src="js/jquery.svg.min.js"></script>
	<script src="js/jquery.svgdom.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css" media="all">
	<script type="text/javascript">
		var animal_size = 80;
		var plant_size = 160;
	
		$(document).ready(function(){
			
			$('#canvas').svg();
			$("#mark_oldest_hunter").hide();
			$("#mark_oldest_prey").hide();
			
			$("#start").click(function(){
				Creature.start();
				
				$(this).hide();
				
				$("#mark_oldest_hunter").show();
				$("#mark_oldest_prey").show();
			});
			
			$("#mark_oldest_hunter").click(function(){
				Creature.mark_oldest("hunter");
			});
			$("#mark_oldest_prey").click(function(){
				Creature.mark_oldest("prey");
			});
		});
		
		$(window).resize(function () {
		    Creature.window_w = $(window).width();
		    Creature.window_h = $(window).height();
		});
	</script>
</head>
<body>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="canvas">
		
	</svg>
	<div id="start">Click to start</div>
	<div id="mark_oldest_hunter">Mark oldest hunter</div>
	<div id="mark_oldest_prey">Mark oldest prey</div>
	<div id="info_box">
		<div id="oldest"></div>
	</div>
<img src="http://hitwebcounter.com/counter/counter.php?page=6048369&style=0007&nbdigits=6&type=ip&initCount=0" title="good hits" Alt="good hits"   border="0" id="web_counter">   
</body>
</html>