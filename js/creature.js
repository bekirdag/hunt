var window_w = $(window).width();
var window_h = $(window).height();

function go(me,x,y) {
	me_o = document.getElementById(me);
	var speed = me_o.getAttribute("speed");
	var count = speed;
	var in_edge_x = false;
	var in_edge_y = false;
	if(x>=window_w+20)
	{
		x = -9.99*2;
		in_edge_x = true;
	}
	else if (x<-20){
		x = window_w-0.02;
		in_edge_x = true;
	}
	
	if(y>=window_h+20)
	{
		y = -9.99*2;
		in_edge_y = true;
	}
	else if (y<-20){
		y = window_h-0.02;
		in_edge_y = true;
	}

	var my_position = $("#"+me).position();
	if(in_edge_x)
	{
		me_o.style.left = x+"px";
	}
	else
	{
		var x_dif = my_position.left - x;
		var first_pos_x = my_position.left;
		
		for (var i=0; i < count; i++) {
			
			me_o.style.left = first_pos_x - x_dif/count * i + "px" ;
		};
	}
	
	if(in_edge_y)
	{
		me_o.style.top = y+"px";
	}
	else
	{
		var y_dif = my_position.top - y;
		var first_pos_y = my_position.top;
		for (var i=0; i < count; i++) {
			me_o.style.top = first_pos_y - y_dif/count * i + "px" ;
		};
	}
}

function get_position(me,him,action) {

	me_o = document.getElementById(me);
	him_o = document.getElementById(him);
	var my_speed = me_o.getAttribute("speed");
	var his_speed = him_o.getAttribute("speed");

	var his_position = $("#"+him).position();
	var my_position = $("#"+me).position();
	
	var x2 = my_position.left-his_position.left;
	var y2 = my_position.top-his_position.top;
	
	var abs_x2 = Math.abs(x2);
	var abs_y2 = Math.abs(y2);
	
    var distance = Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2));
	
	var factor = (action=="get_closer") ? 1 : -1;
	
	var x1 = abs_x2/Math.sqrt(Math.pow(abs_x2,2)+Math.pow(abs_y2,2));
	var y1 = x1*abs_y2/abs_x2;
	
	var new_x_way = x1*factor;
	var new_y_way = y1*factor;
	
	if(x2>0)
	{
		if(abs_x2<window_w/2){
			new_x_way = new_x_way * (-1);
		}
	}
	else
	{
		if(abs_x2>window_w/2){
			new_x_way = new_x_way * (-1);
		}
	}
	
	if(y2>0)
	{
		if(abs_y2<window_h/2){
			new_y_way = new_y_way * (-1);
		}
	}
	else
	{
		if(abs_y2>window_h/2){
			new_y_way = new_y_way * (-1);
		}
	}

	var final_x = new_x_way*my_speed + my_position.left;
	var final_y = new_y_way*my_speed + my_position.top;
	
	return {x:final_x,y:final_y,distance:distance};
}

function seeing(me,him,action) {
	var items = him;
	var seeing = 0;
	var pos = [];
	var total_distance = 0;

	for (var i=0; i < items.length; i++) {
		var him = items[i];
		var h_el = $("#"+him);
		// console.log(h_el);
		var his_position = h_el.position();
		var my_position = $("#"+me).position();

		var x2 = my_position.left-his_position.left;
		var y2 = my_position.top-his_position.top;

		// also look from the edge of the window

		var abs_x2 = Math.abs(x2);
		var abs_y2 = Math.abs(y2);

		var x2_alt = window_w - abs_x2;
		var y2_alt = window_h - abs_y2;

		x2 = (x2_alt<abs_x2) ? x2_alt : abs_x2;
		y2 = (y2_alt<abs_y2) ? y2_alt : abs_y2;

		var eyesight = $("#"+me).attr("eyesightfactor") * ($("#"+me).width() + $("#"+me).height())/4;

		var distance = Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2));

		if(eyesight>distance) 
		{
			new_position = get_position(me,items[i],action);
			pos[seeing]= {x:new_position.x,y:new_position.y,distance:new_position.distance,weight:0};
			total_distance += new_position.distance;
			seeing++;
		}
	}
	
	if(seeing>0)
	{
		var saw = {items: pos, total_distance:total_distance}
		return saw;
	}
	else
	{
		return false;
	}
	
}

function tag(me,from,action) {
	from_string = from;
	from = from.split(",");
	var saw = seeing(me,from,action);
	if(saw)
	{
		var pos = saw.items;
		total_distance = saw.total_distance;

		posx = 0;
		posy = 0;
		var total_we = 0;
		for (var i=0; i < pos.length; i++) {
			pos[i].weight = total_distance/pos[i].distance;
			total_we += pos[i].weight;
		};
		for (var i=0; i < pos.length; i++) {
			percent = pos[i].weight/total_we;
			posx += percent * pos[i].x;
			posy += percent * pos[i].y;
		};
	
		go(me,posx,posy);
		var timer = 30;
	}
	else
	{
		var timer = 1000;
	}
	
	me_o = document.getElementById(me);
	
	setTimeout('tag("'+me_o.getAttribute("id")+'","'+from_string+'","'+action+'")', timer);
}

