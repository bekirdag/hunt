var window_w = $(window).width();
var window_h = $(window).height();

function go(me,x,y) {
	me_o = document.getElementById(me);
	if(x>window_w)
	{
		x = 1;
	}
	else if (x<0){
		x = window_w-20;
	}
	
	if(y>window_h)
	{
		y = 1;
	}
	else if (y<0){
		y = window_h-20;
	}

	me_o.style.left = x+"px";
	me_o.style.top = y+"px";
}

function follow(me,pray) {
	var new_position = get_position(me,pray,"get_closer");
	go(me,new_position.x,new_position.y);
	
	me_o = document.getElementById(me);
	him_o = document.getElementById(pray);
	
	if(me_o.offsetLeft!==him_o.offsetLeft || me_o.offsetTop!==him_o.offsetTop)
	{
		setTimeout('follow("'+me_o.getAttribute("id")+'","'+him_o.getAttribute("id")+'")', 1);
	}
	else
	{
		console.log(me_o.offsetLeft+","+him_o.offsetLeft+","+me_o.offsetTop+","+him_o.offsetTop);
	}
}

function get_position(me,him,action) {

	me_o = document.getElementById(me);
	him_o = document.getElementById(him);
	var my_step = me_o.getAttribute("step");
	var his_step = him_o.getAttribute("step");

	var him_position = $("#"+him).position();
	var my_position = $("#"+me).position();

	
	var x2 = my_position.left-him_position.left;
	var y2 = my_position.top-him_position.top;
	
	var abs_x2 = Math.abs(x2);
	var abs_y2 = Math.abs(y2);
	
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


	var final_x = new_x_way*my_step + my_position.left;
	var final_y = new_y_way*my_step + my_position.top;
	
	// final_x = Math.round(final_x);
	// final_y = Math.round(final_y);
	
	
	return {x:final_x,y:final_y};
}

function run(me,from) {
	var new_position = get_position(me,from,"run");
	go(me,new_position.x,new_position.y);
	
	me_o = document.getElementById(me);
	him_o = document.getElementById(from);
	
	if(me_o.offsetLeft!==him_o.offsetLeft || me_o.offsetTop!==him_o.offsetTop)
	{
		setTimeout('run("'+me_o.getAttribute("id")+'","'+him_o.getAttribute("id")+'")', 1);
	}
	else
	{
		console.log(me_o.offsetLeft+","+him_o.offsetLeft+","+me_o.offsetTop+","+him_o.offsetTop);
	}
}

