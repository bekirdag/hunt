var window_w = $(window).width();
var window_h = $(window).height();
var speed_factor = 0.1;
var timers = [];


function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function rand_id(type)
{
	var id = Math.floor((Math.random()*1000)+0);
	if($('#hunter').length>0)
	{
		return rand_id(type);
	}
	else
	{
		return type+id;
	}
}

function create_item(type,speed,eyesightfactor,x,y,color,family,energy)
{
	var types = ["hunter","prey"];
	var ran_num = Math.floor((Math.random()*100)+0);
	ran_num = (ran_num>50) ? 1 : 0;
	var ran_type = types[ran_num];
	var ran_speed = Math.floor((Math.random()*50)+30);
	var ran_eyesightfactor = Math.floor((Math.random()*40)+10);
	var ran_x = Math.floor((Math.random()*window_w)+0);
	var ran_y = Math.floor((Math.random()*window_h)+0);
	var ran_energy = Math.floor((Math.random()*100)+10);
	var ran_color = get_random_color;
	type = (typeof type === 'undefined') ? ran_type : type;
	speed = (typeof speed === 'undefined') ? ran_speed : speed;
	speed = (type=="hunter") ? speed : speed*2;
	eyesightfactor = (typeof eyesightfactor === 'undefined') ? ran_eyesightfactor : eyesightfactor;
	x = (typeof x === 'undefined') ? ran_x : x;
	y = (typeof y === 'undefined') ? ran_y : y;
	color = (typeof color === 'undefined') ? ran_color : color;
	color = (type=="food") ? "green" : color;
	family = (typeof family === 'undefined') ? type : family;
	energy = (typeof energy === 'undefined') ? ran_energy : energy;
	border_radius = (type=="hunter") ? 3 : 10;
	var ran_id = rand_id(type);
	$("#canvas").append("<div id='"+ran_id+"' type='"+type+"' speed='"+speed+"' eyesightfactor='"+eyesightfactor+"' class='org "+family+"' energy='"+energy+"'></div>");
	var item = $("#"+ran_id);
	item.css("background-color",color);
	item.css("position","absolute");
	item.css("left",x);
	item.css("top",y);
	item.css("border-radius",border_radius);
	creature_start(ran_id);
	return ran_id;
}

function creature_start(id)
{
	var item = $("#"+id);
	if(item.hasClass("hunter"))
	{
		var type = "hunter";
	}
	else if(item.hasClass("prey"))
	{
		var type = "prey";
	}
	else
	{
		var type = "food";
	}
	var threshold = 50;	
	keep_going(type,item,id);
	energy_control(id,type,threshold);
}

function energy_control(id,type,threshold)
{
	var energy_control = energy_level(id);
	if(energy_control<threshold)
	{
		if(type=="hunter")
		{
			go_hunting(id,threshold,"prey","get_closer");
		}
		else if(type=="prey")
		{
			go_hunting(id,threshold,"food","get_closer");
		}
	}
	clearTimeout(timers["energy_control"+id]);
	timers["energy_control"+id] = setTimeout("energy_control('"+id+"','"+type+"','"+threshold+"')",3000);
}

function keep_going(type,item,id)
{
	// if it is a prey, always run away from the hunter
	if(type=="prey")
	{
		var prey = tag(id,".hunter","run");
		clearTimeout(timers["keep_going"+id]);
		timers["keep_going"+id] = setTimeout("keep_going('"+type+"','"+item+"','"+id+"')",prey);
	}
}

function kill_slowly()
{
	$(".org").each(function(){
		energy_change($(this).attr("id"),-1);
	});
	setTimeout("kill_slowly()",1000);
}

function go_hunting(id,threshold,what,action)
{
	if(id.length>0)
	{
		var hunt = tag(id,"."+what,action);
		var me_o = $("#"+id);
		var my_energy = parseInt(me_o.attr("energy"));
		
		

		if(my_energy<threshold && my_energy>0)
		{
			if(what == "food" && me_o.attr("danger")=="danger"){
				console.log("danger!");
				return false;
			}
			clearTimeout(timers["go_hunting"+id]);
			timers["go_hunting"+id]  = setTimeout("go_hunting('"+id+"','"+threshold+"','"+what+"','"+action+"')",hunt);
		}
		else if(my_energy>threshold)
		{
			// console.log(id + " is full");
			clearTimeout(timers["go_hunting"+id]);
		}
		else if(my_energy<0)
		{
			me_o.remove();
		}
	}
}

function energy_change(id,num)
{
	var item = $("#"+id);
	var new_level = parseInt(item.attr("energy"))+parseInt(num);
	item.attr("energy", new_level);
	if(new_level<=0)
	{
		item.remove();
	}
}

function energy_level(id)
{
	var item = $("#"+id);
	return parseInt(item.attr("energy"));
}

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
	// him could be imaginary
	var me_o = $("#"+me);
	
	if(me_o.length>0)
	{
		var my_position = $("#"+me).position();

		if(him=="imaginary")
		{
			var m_x = my_position.left-1;
			var m_y = my_position.top-1;
			var him = create_item("imaginary",0,0,m_x,m_y,"","",5);
		}

		him_o = $("#"+him);
		if(him_o.length<=0)
		{
			return false;
		}

		var my_speed = me_o.attr("speed");
		var his_speed = him_o.attr("speed");

		var his_position = $("#"+him).position();


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

		var final_x = new_x_way*my_speed*speed_factor + my_position.left;
		var final_y = new_y_way*my_speed*speed_factor + my_position.top;

		return {x:final_x,y:final_y,distance:distance};
	}
	else
	{
		return false;
	}
	
}

function get_saw(me,him)
{
	// console.log(me + " and " + him);
	var h_el = $("#"+him);
	var me_el = $("#"+me);
	if(me_el.length>0 && h_el.length>0)
	{
		var his_position = h_el.position();
		var my_position = me_el.position();

		var x2 = my_position.left-his_position.left;
		var y2 = my_position.top-his_position.top;

		// also look from the edge of the window

		var abs_x2 = Math.abs(x2);
		var abs_y2 = Math.abs(y2);

		var x2_alt = window_w - abs_x2;
		var y2_alt = window_h - abs_y2;

		x2 = (x2_alt<abs_x2) ? x2_alt : abs_x2;
		y2 = (y2_alt<abs_y2) ? y2_alt : abs_y2;

		var eyesight = me_el.attr("eyesightfactor") * (me_el.width() + me_el.height())/4;

		var distance = Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2));

		var saw = (eyesight>distance) ? true : false;
		return saw;
	}
	else{
		return false;
	}
}

function seeing(me,him,action) {
	var items = him;
	var seeing = 0;
	var pos = [];
	var total_distance = 0;

	for (var i=0; i < items.length; i++) {
		var him = items[i];
		if(him.indexOf(".")==0)
		{
			var h_el = $(him);
			h_el.each(function(){
				var eyesight = get_saw(me,$(this).attr("id"));
				if(eyesight) 
				{
					new_position = get_position(me,$(this).attr("id"),action);
					pos[seeing]= {x:new_position.x,y:new_position.y,distance:new_position.distance,weight:0,element:$(this).attr("id")};
					total_distance += new_position.distance;
					seeing++;
					var me_o = $("#"+me);
					if(new_position.distance<=me_o.width()*5)
					{
						me_o.attr("danger","danger");
					}
					else
					{
						me_o.attr("danger","safe");
					}
				}
			});
		}
		else if(him.indexOf(".")==-1)
		{
			var eyesight = get_saw(me,him);
			if(eyesight) 
			{
				new_position = get_position(me,items[i],action);
				pos[seeing]= {x:new_position.x,y:new_position.y,distance:new_position.distance,weight:0,element:items[i]};
				total_distance += new_position.distance;
				seeing++;
				var me_o = $("#"+me);
				if(new_position.distance<=me_o.width()*5)
				{
					me_o.attr("danger","danger");
				}
				else
				{
					me_o.attr("danger","safe");
				}
			}
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

function patrol(me){
	// console.log("patrolling-->" + me);
	// get_position(me,"imaginary","get_closer");
}

function touch(me,to,distance)
{
	var me_o = $("#"+me);
	var to_o = $("#"+to);
	
	if((me_o.attr("type")=="hunter" && to_o.attr("type")=="prey") || (me_o.attr("type")=="prey" && to_o.attr("type")=="food"))
	{
		var to_w = to_o.width();
		var to_h = to_o.height();
		var hip = Math.sqrt(Math.pow(to_w,2)+Math.pow(to_h,2));

		if(distance<=hip)
		{
			me_o.attr("energy",parseInt(me_o.attr("energy"))+parseInt(to_o.attr("energy")/2));
			to_o.remove();
			console.log(me_o.attr("type") + " killed " + to_o.attr("type"));
		}
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
			// check if touches
			touch(me,pos[i].element,pos[i].distance);
		};
		for (var i=0; i < pos.length; i++) {
			percent = pos[i].weight/total_we;
			// console.log(percent);
			if(percent>0.7)
			{
				posx = pos[i].x;
				posy = pos[i].y;
				break;
			}
			else
			{
				posx += percent * pos[i].x;
				posy += percent * pos[i].y;
			}
		};
	
		go(me,posx,posy);
		var timer = 30;
	}
	else
	{
		patrol(me);
		var timer = 1000;
	}
	
	return timer;
}

