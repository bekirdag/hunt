var window_w = $(window).width();
var window_h = $(window).height();
var speed_factor = 0.2;
var creatures = {};
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

function create_item(type,speed,eyesightfactor,x,y,color,family,energy,threshold,linger_rate,danger_distance,danger_time,gender,store,store_using_threshold,sex_desire,sex_threshold,patrol_threshold)
{
	var types = ["hunter","prey"];
	var ran_num = Math.floor((Math.random()*100)+0);
	ran_num = (ran_num>50) ? 1 : 0;
	var ran_type = types[ran_num];
	var ran_speed = Math.floor((Math.random()*50)+0);
	var ran_eyesightfactor = Math.floor((Math.random()*50)+10);
	var ran_x = Math.floor((Math.random()*window_w)+0);
	var ran_y = Math.floor((Math.random()*window_h)+0);
	var patrolx = 0;
	var patroly = 0;
	var patrolset = "false";
	var ran_energy = Math.floor((Math.random()*100)+10);
	var ran_threshold = Math.floor((Math.random()*100)+0);
	var ran_danger_time = Math.floor((Math.random()*10)+1);
	var ran_linger_rate = Math.floor((Math.random()*100)+0);
	var ran_danger_distance = Math.floor((Math.random()*20)+0);
	var ran_gender = Math.floor((Math.random()*100)+0);
	var ran_store = Math.floor((Math.random()*200)+0);
	var ran_store_using_threshold = Math.floor((Math.random()*200)+0);
	var sex_desire = Math.floor((Math.random()*100)+0);
	var sex_threshold = Math.floor((Math.random()*100)+0);
	var ran_patrol_threshold = Math.floor((Math.random()*ran_threshold)+0);
	ran_gender = (ran_gender>50) ? "m" : "f";
	var ran_color = get_random_color();
	type = (typeof type === 'undefined') ? ran_type : type;
	speed = (typeof speed === 'undefined') ? ran_speed : speed;
	eyesightfactor = (typeof eyesightfactor === 'undefined') ? ran_eyesightfactor : eyesightfactor;
	x = (typeof x === 'undefined') ? ran_x : x;
	y = (typeof y === 'undefined') ? ran_y : y;
	color = (typeof color === 'undefined') ? ran_color : color;
	color = (type=="food") ? "#2AB811" : color;
	family = (typeof family === 'undefined') ? color : family;
	energy = (typeof energy === 'undefined') ? ran_energy : energy;
	threshold = (typeof threshold === 'undefined') ? ran_threshold : threshold;
	danger_time = (typeof danger_time === 'undefined') ? ran_danger_time : danger_time;
	linger_rate = (typeof linger_rate === 'undefined') ? ran_linger_rate : linger_rate;
	danger_distance = (typeof danger_distance === 'undefined') ? ran_danger_distance : danger_distance;
	gender = (typeof gender === 'undefined') ? ran_gender : gender;
	store = 0;
	store_using_threshold = (typeof store_using_threshold === 'undefined') ? ran_store_using_threshold : store_using_threshold;
	sex_desire = (typeof sex_desire === 'undefined') ? ran_sex_desire : sex_desire;
	sex_threshold = (typeof sex_threshold === 'undefined') ? ran_sex_threshold : sex_threshold;
	patrol_threshold = (typeof patrol_threshold === 'undefined') ? ran_patrol_threshold : patrol_threshold;
	border_radius = (type=="hunter") ? 3 : 10;
	var ran_id = rand_id(type);
	var danger_time_long = danger_time;
	var svg = $('#canvas').svg('get');

	if(type=="hunter")
	{
		svg.rect(x, y, 20, 20,
		{fill: color, id:ran_id, class: 'org '+ type});

	}
	else if(type=="prey")
	{
		svg.circle(x, y, 10, 
			{fill: color, id:ran_id, class: 'org '+ type});
	}
	else if(type=="food")
	{
		svg.circle(x, y, 5, 
			{fill: color, id:ran_id, class: 'org '+ type});
	}	
	creatures[ran_id] = {x:x, y:y, width:10, height: 10, r:10, fill: color, mode: 'sleep', id:ran_id, age:0, type:type, color:color, sex_desire:sex_desire, sex_threshold:sex_threshold, store:store, store_using_threshold:store_using_threshold, gender:gender, danger_distance:danger_distance, linger_rate:linger_rate, threshold:threshold, speed:speed, eyesightfactor:eyesightfactor, class: 'org '+ family, family:family, energy:energy, danger_time: danger_time, danger_time_long:danger_time_long, patrolx: patrolx, patroly:patroly, patrolset:patrolset, patrol_threshold:patrol_threshold};
	
	creature_start(ran_id);
	return ran_id;
}

function check_exists(id)
{
	if(creatures[id] == undefined){
		// console.log(id);
	   return true;
	}
	else
	{
		return true;
	}
}

function creature_start(id)
{
	// console.log(creatures[id]);
	if(!check_exists(id))
	{
		return false;
	}
	var my_cr = creatures[id];
	var type = my_cr.type;

	if(type=="prey" || type=="hunter")
	{
		keep_going(type,id);
		$("#"+id).attr("stroke-width","3");
	}
	// $(".org").draggable();
	$("#"+id).click(function(){
		clearTimeout(timers["info_box"]);
		info_box(id);
		$(".org").attr("stroke-width",3);
		$("#"+id).attr("stroke-width",10);
	});
}

function mark_oldest(type)
{
	var max_age = 0;
	var id = "";
	$("."+type).each(function(){
		var item = creatures[$(this).attr("id")];
		
		if(parseInt(item.age)>max_age)
		{
			max_age = parseInt(item.age);
			id = $(this).attr("id");
		}
	});
	if(id!=="")
	{
		$(".org").attr("stroke-width",3);
		$("#"+id).attr("stroke-width",10);
		clearTimeout(timers["info_box"]);
		info_box(id);
	}
	
	return id;
}

function info_box(id)
{
	if(!check_exists(id))
	{
		return false;
	}
	var my_cr = creatures[id];
	var item_html = "<ul>\
		<li>Age: "+my_cr.age+"</li>\
		<li>Speed: "+my_cr.speed+"</li>\
		<li>Danger distance: "+my_cr.danger_distance+"</li>\
		<li>Linger rate: "+my_cr.linger_rate+"</li>\
		<li>Threshold: "+my_cr.threshold+"</li>\
		<li>Eyesightfactor: "+my_cr.eyesightfactor+"</li>\
		<li>Energy: "+my_cr.energy+"</li>\
		<li>Danger time: "+my_cr.danger_time+"</li>\
		<li>Danger time long: "+my_cr.danger_time_long+"</li>\
		<li>Mode: "+my_cr.mode+"</li>\
		<li>Sex desire: "+my_cr.sex_desire+"</li>\
		<li>Sex threshold: "+my_cr.sex_threshold+"</li>\
		<li>Store: "+my_cr.store+"</li>\
		<li>Store using threshold: "+my_cr.store_using_threshold+"</li>\
		<li>Patrol: "+my_cr.patrolx+","+my_cr.patroly+"</li>\
		<li>Patrolset: "+my_cr.patrolset+"</li>\
		<li>Patrol threshold: "+my_cr.patrol_threshold+"</li>\
		<li>Family: "+my_cr.family+"</li>\
	</ul>";
	$("#oldest").html(item_html);
	timers["info_box"] = setTimeout("info_box('"+id+"')",1000);
}

// modes:
// hunt
// sleep
// have sex

function keep_going(type,id)
{
	if(!check_exists(id))
	{
		return false;
	}
	var my_cr = creatures[id];
	var energy = energy_control(id);
	if(energy)
	{
		if(type=="hunter")
		{
			creatures[id].mode = "hunt";
			mode_color(id);
			
			var timer = tag(id,".prey","catch");
		}
		else if(type=="prey")
		{
			check_predator(id,"hunter");
			if(my_cr.danger_time>0){
				var timer = tag(id,".hunter","run");
			}
			else if(my_cr.danger_time==0)
			{
				creatures[id].mode = "hunt";
				mode_color(id);
				
				var timer = tag(id,".food","catch");
			}
		}
	}
	else
	{
		sex_threshold = my_cr.sex_threshold;
		sex_desire = my_cr.sex_desire;
		if(sex_desire>sex_threshold)
		{
			if(type=="hunter")
			{
				creatures[id].mode = "sex";
				mode_color(id);
				
				var timer = tag(id,".hunter","catch");
			}
			else if(type=="prey")
			{
				check_predator(id,"hunter");
				if(my_cr.danger_time>0){
					var timer = tag(id,".hunter","run");
				}
				else if(my_cr.danger_time==0)
				{
					creatures[id].mode = "sex";
					mode_color(id);
					
					var timer = tag(id,".prey","catch");
				}
			}
		}
		else
		{
			if(type=="prey"){
				check_predator(id,"hunter");
				if(my_cr.danger_time>0){
					creatures[id].mode=="danger";
					
					var timer = tag(id,".hunter","run");
				}
				else if(my_cr.danger_time==0)
				{
					creatures[id].mode = "sleep";
					mode_color(id);
					
					var timer = 1000;
				}
			}
		}
	}
	// clearTimeout(timers["keep_going"+id]);
	timers["keep_going"+id] = setTimeout("keep_going('"+type+"','"+id+"')",timer);
}

function check_predator(me,run_from)
{
	if(!check_exists(me))
	{
		return false;
	}
	if(!check_exists(run_from))
	{
		return false;
	}
	var my_cr = creatures[me];
	// var me_o = $("#"+me);
	var danger_time = my_cr.danger_time;
	var mode = my_cr.mode;
	
	var h_el = $("."+run_from);
	h_el.each(function(){
	if($(this).length>0)
	{
		var eyesight = get_saw(me,$(this).attr("id"));

		if(eyesight) 
		{
			new_position = get_position(me,$(this).attr("id"),"run");

			var me_o = $("#"+me);
			if(new_position.distance<=my_cr.width*my_cr.danger_distance)
			{
				creatures[me].mode = "danger";
				mode_color(me);

				creatures[me].danger_time = my_cr.danger_time_long;
			}
			else
			{
				if(creatures[me].danger_time<=0)
				{
					creatures[me].mode="sleep";
					mode_color(me);

				}
			}
		}
	}
	});
}

function kill_slowly()
{
	$(".org").each(function(){
		var this_id = $(this).attr("id");
		var my_cr = creatures[this_id];
		if(!check_exists(this_id))
		{
			return false;
		}
		var reduce = -1;
		if(my_cr.mode=="danger" || my_cr.mode=="hunt")
		{
			reduce = -2;
		}
		if(my_cr.mode=="patrol")
		{
			reduce = -3;
		}
		energy_change(my_cr.id,reduce);
		
		var item = $(this);
		if(my_cr.mode == "sleep" && my_cr.store>0 && my_cr.store>my_cr.store_using_threshold)
		{
			var new_level = parseInt(my_cr.store)-1;
			my_cr.store = new_level;
			
			var new_level = parseInt(my_cr.energy)+1;
			my_cr.energy = new_level;
		}
		
		var new_age = parseInt(my_cr.age)+1;
		my_cr.age = new_age;
		
		//reduce danger times
		var danger_time = my_cr.danger_time;
		var sex_desire = parseInt(my_cr.sex_desire);
		var mode = my_cr.mode;

		if(sex_desire<100)
		{
			my_cr.sex_desire = sex_desire+1;
		}
		
		if (danger_time>0) {
			// console.log(attr);
		    my_cr.danger_time = danger_time-1;
			
		}
		
		creatures[$(this).attr("id")] = my_cr;
	});
	setTimeout("kill_slowly()",1000);
}

function mode_color(me)
{
	var my_cr = creatures[me];
	switch (my_cr.mode)
	{
		case "danger":
			var color = "red";
			break;
		case "hunt":
			var color = "blue";
			break;
		case "sleep":
			var color = "gray";
			break;
		case "patrol":
			var color = "orange";
			break;
		case "sex":
			var color = "pink";
			break;
	}
	$("#"+me).attr("stroke",color);
}


function energy_control(id)
{
	var my_cr = creatures[id];
	var energy = parseInt(my_cr.energy);
	var store = parseInt(my_cr.store);
	var threshold = parseInt(my_cr.threshold);
	var store_using_threshold = parseInt(my_cr.store_using_threshold);
	
	if((energy+store)>(threshold+store_using_threshold))
	{
		return false;
	}
	else if((energy+store)<(threshold+store_using_threshold) && energy>0)
	{
		return true;
	}
}

function energy_change(id,num)
{
	if(!check_exists(id))
	{
		return false;
	}
	var my_cr = creatures[id];

	if(my_cr.mode=="sleep")
	{
		if(my_cr.store>0 && my_cr.store>my_cr.store_using_threshold)
		{
			var new_level = parseInt(my_cr.store)+parseInt(num);
			creatures[id].store = new_level;
		}
		else
		{
			var new_level = parseInt(my_cr.energy)+parseInt(num);
			creatures[id].energy = new_level;
			if(new_level<=0)
			{
				delete creatures[id];
				var item = $("#"+id);
				clearTimeout(timers["keep_going"+id]);
				item.remove();
				// var svg_item = document.getElementById(id);
				// svg_item.parentNode.removeChild(svg_item);
			}
		}
	}
	else
	{
		var new_level = parseInt(my_cr.energy)+parseInt(num);
		creatures[id].energy = new_level;
		if(new_level<=0)
		{
			delete creatures[id];
			var item = $("#"+id);
			// var svg_item = document.getElementById(id);
			// svg_item.parentNode.removeChild(svg_item);
			clearTimeout(timers["keep_going"+id]);
			item.remove();
		}
	}
}

function go(me,x,y) {
	var my_cr = creatures[me];
	if(!check_exists(me))
	{
		return false;
	}
	var me_o = $("#"+me);
	var speed = my_cr.speed*(1/(parseInt(my_cr.store/30)+1));
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

	if(isNaN(x))
	{
		x = my_cr.x;
	}
	if(isNaN(y))
	{
		y = my_cr.y;
	}

	if(my_cr.type=="hunter")
	{
		me_o.attr("x",x);
		me_o.attr("y",y);
	}
	else
	{
		me_o.attr("cx",x);
		me_o.attr("cy",y);
	}

	creatures[me].x = x;
	creatures[me].y = y;
}

function get_atts(me)
{
	if(!check_exists(me))
	{
		return false;
	}
	var my_cr = creatures[me];
	
	return {x:parseFloat(my_cr.x),y:parseFloat(my_cr.y),w:parseFloat(my_cr.width),h:parseFloat(my_cr.height)};
}

function get_position(me,him,action) {
	// him could be imaginary
	var my_cr = creatures[me];
	if(!check_exists(me))
	{
		return false;
	}
	if(him!=="imaginary" && !check_exists(him)){
	   return false;
	}
	var me_prop = get_atts(me);
	var my_x = me_prop.x;
	var my_y = me_prop.y;
	
	var my_speed = my_cr.speed;

	if(him=="imaginary")
	{
		var m_x = my_cr.patrolx;
		var m_y = my_cr.patroly;
		
		var x2 = my_x-m_x;
		var y2 = my_y-m_y;
		
	}
	else
	{
		him_o = $("#"+him);
		if(him_o.length<=0)
		{
			return false;
		}
		var his_prop = get_atts(him);
		var his_x = his_prop.x;
		var his_y = his_prop.y;

		var x2 = my_x-his_x;
		var y2 = my_y-his_y;
	}

	var abs_x2 = Math.abs(x2);
	var abs_y2 = Math.abs(y2);

    var distance = Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2));

	var factor = (action=="catch") ? 1 : -1;

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

	var final_x = new_x_way*my_speed*speed_factor + my_x;
	var final_y = new_y_way*my_speed*speed_factor + my_y;

	return {x:final_x,y:final_y,distance:distance};
}

function get_saw(me,him)
{
	if(!check_exists(me))
	{
		return false;
	}
	if(!check_exists(him))
	{
		return false;
	}
	var my_cr = creatures[me];
	var to_cr = creatures[him];

	var me_prop = get_atts(me);
	var his_prop = get_atts(him);
	
	var my_x = me_prop.x;
	var my_y = me_prop.y;
	var his_x = his_prop.x;
	var his_y = his_prop.y;
	var my_w = me_prop.w;
	var my_h = me_prop.h;

	var x2 = my_x-his_x;
	var y2 = my_y-his_y;

	// also look from the edge of the window

	var abs_x2 = Math.abs(x2);
	var abs_y2 = Math.abs(y2);

	var x2_alt = window_w - abs_x2;
	var y2_alt = window_h - abs_y2;

	x2 = (x2_alt<abs_x2) ? x2_alt : abs_x2;
	y2 = (y2_alt<abs_y2) ? y2_alt : abs_y2;

	var eyesight = my_cr.eyesightfactor * (my_w + my_h)/5;

	var distance = Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2));

	var saw = (eyesight>distance) ? true : false;
	return saw;
}

function seeing(me,him,action) {
	if(!check_exists(me))
	{
		return false;
	}
	if(!check_exists(him))
	{
		return false;
	}
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
				if($(this).attr("id")!==me && $(this).length>0)
				{
					var eyesight = get_saw(me,$(this).attr("id"));
					if(eyesight) 
					{
						new_position = get_position(me,$(this).attr("id"),action);
						pos[seeing]= {x:new_position.x,y:new_position.y,distance:new_position.distance,weight:0,element:$(this).attr("id")};
						total_distance += new_position.distance;
						seeing++;
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
	var my_cr = creatures[me];
	if(!check_exists(me))
	{
		return false;
	}
	if(my_cr.patrolset=="false")
	{
		var patrolx = Math.floor((Math.random()*window_w)+0);
		var patroly = Math.floor((Math.random()*window_h)+0);
		creatures[me].patrolset = "true";
		creatures[me].patrolx = patrolx;
		creatures[me].patroly = patroly;
	}
	var data = get_position(me,"imaginary","catch");
	// console.log(data.distance);
	if(data.distance<10)
	{
		var patrolx = Math.floor((Math.random()*window_w)+0);
		var patroly = Math.floor((Math.random()*window_h)+0);
		creatures[me].patrolset = "true";
		creatures[me].patrolx = patrolx;
		creatures[me].patroly = patroly;
	}
	else
	{
		go(me,data.x,data.y);
	}
}

function rand_choose(me,to){
	if(!check_exists(me))
	{
		return false;
	}
	if(!check_exists(to))
	{
		return false;
	}
	var ran_num = Math.floor((Math.random()*100)+0);
	var item = (ran_num>50) ? me : to;
	return item;
}

function cross_two(me,to)
{
	if(!check_exists(me))
	{
		return false;
	}
	if(!check_exists(to))
	{
		return false;
	}
	var my_cr = creatures[me];
	var to_cr = creatures[to];
	
	var new_energy = parseInt(my_cr.energy)-10;
	creatures[me].energy = new_energy;
	
	var new_energy = parseInt(to_cr.energy)-10;
	creatures[to].energy = new_energy;
	
	var my_prop = get_atts(me);
	var my_x = my_prop.x;
	var my_y = my_prop.y;
	
	var animal_number = $(".hunter").size() + $(".prey").size();
	var left = animal_size - animal_number;
	if((my_cr.type == "hunter" && $(".hunter").size()>=animal_size/3) || (my_cr.type == "prey" && $(".prey").size()>=2*animal_size/3))
	{
		left = 0;
	}
	if(left>0)
	{
		type = creatures[rand_choose(me,to)].type;
		speed = creatures[rand_choose(me,to)].speed;
		eyesightfactor = creatures[rand_choose(me,to)].eyesightfactor;
		x = my_x;
		y = my_y;
		color = creatures[rand_choose(me,to)].color;
		family = creatures[rand_choose(me,to)].family;
		energy = 150;
		threshold = creatures[rand_choose(me,to)].threshold;
		linger_rate = creatures[rand_choose(me,to)].linger_rate;
		danger_distance = creatures[rand_choose(me,to)].danger_distance;
		danger_time = creatures[rand_choose(me,to)].danger_time;
		gender = creatures[rand_choose(me,to)].gender;
		store = 0;
		store_using_threshold = creatures[rand_choose(me,to)].store_using_threshold;
		sex_desire = creatures[rand_choose(me,to)].sex_desire;
		sex_threshold = creatures[rand_choose(me,to)].sex_threshold;
		patrol_threshold = creatures[rand_choose(me,to)].patrol_threshold;
		var id = create_item(type,speed,eyesightfactor,x,y,color,family,energy,threshold,linger_rate,danger_distance,danger_time,gender,store,store_using_threshold,sex_desire,sex_threshold,patrol_threshold);
	}
}

function touch(me,to,distance)
{
	if(!check_exists(me))
	{
		return false;
	}
	if(!check_exists(to))
	{
		return false;
	}
	var my_cr = creatures[me];
	var to_cr = creatures[to];
	
	var my_type = my_cr.type;
	var his_type = to_cr.type;
	
	var his_prop = get_atts(to);
	var to_w = his_prop.w;
	var to_h = his_prop.h;
	
	var hip = Math.sqrt(Math.pow(to_w,2)+Math.pow(to_h,2));
	
	if(distance<=hip)
	{
		if((my_type=="hunter" && his_type=="prey") || (my_type=="prey" && his_type=="food"))
		{
			var new_energy = parseInt(my_cr.energy)+parseInt(to_cr.energy/2);
			if(new_energy>200)
			{
				creatures[me].energy = 200;
				creatures[me].store = new_energy-200;
				creatures[me].mode = "sleep";
				mode_color(me);
			}
			else
			{
				creatures[me].energy = new_energy;
				creatures[me].mode = "sleep";
				mode_color(me);
				
			}
			var to_o = $("#"+to);
			clearTimeout(timers["keep_going"+to]);
			to_o.remove();
			// var svg_item = document.getElementById(to);
			// svg_item.parentNode.removeChild(svg_item);
		}
		else if (my_type == his_type)
		{
			creatures[me].sex_desire = 0;
			creatures[to].sex_desire = 0;
			cross_two(me,to);
			creatures[me].mode = "sleep";
			mode_color(me);
			mode_color(to);
			creatures[to].mode = "sleep";
			
		}
	}
}

function tag(me,from,action) {
	if(!check_exists(me))
	{
		return false;
	}
	if(!check_exists(from))
	{
		return false;
	}
	var my_cr = creatures[me];
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
			touch(me,pos[i].element,pos[i].distance);
		};
		for (var i=0; i < pos.length; i++) {
			percent = pos[i].weight/total_we;
			if(percent>my_cr.linger_rate/100)
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
		var timer = 50;
	}
	else
	{
		if(creatures[me].mode == "hunt" || creatures[me].mode == "sex")
		{
			if(my_cr.energy<my_cr.patrol_threshold)
			{
				creatures[me].mode = "patrol";
				patrol(me);
				mode_color(me);
			}
			else
			{
				creatures[me].mode = "sleep";
				mode_color(me);
			}
		}
		var timer = 50;
	}
	
	return timer;
}


