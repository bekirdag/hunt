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

function mark_oldest(type)
{
	var max_age = 0;
	var id = "";
	$("."+type).each(function(){
		$(this).removeClass("oldest");
		max_age = (parseInt($(this).attr("age"))>=max_age) ? $(this).attr("age") : max_age;
		id = ($(this).attr("age")>max_age) ? $(this).attr("id") : id;
	});
	$("#"+id).addClass("oldest");
	return id;
}

function create_item(type,speed,eyesightfactor,x,y,color,family,energy,threshold,linger_rate,danger_distance,danger_time,gender,store,store_using_threshold,sex_desire,sex_threshold)
{
	var types = ["hunter","prey"];
	var ran_num = Math.floor((Math.random()*100)+0);
	ran_num = (ran_num>50) ? 1 : 0;
	var ran_type = types[ran_num];
	var ran_speed = Math.floor((Math.random()*50)+0);
	var ran_eyesightfactor = Math.floor((Math.random()*50)+10);
	var ran_x = Math.floor((Math.random()*window_w)+0);
	var ran_y = Math.floor((Math.random()*window_h)+0);
	var ran_energy = Math.floor((Math.random()*100)+10);
	var ran_threshold = Math.floor((Math.random()*100)+0);
	var ran_danger_time = Math.floor((Math.random()*10)+1);
	var ran_linger_rate = Math.floor((Math.random()*100)+0);
	var ran_danger_distance = Math.floor((Math.random()*20)+0);
	var ran_gender = Math.floor((Math.random()*100)+0);
	var ran_store = Math.floor((Math.random()*100)+0);
	var ran_store_using_threshold = Math.floor((Math.random()*100)+0);
	var sex_desire = Math.floor((Math.random()*100)+0);
	var sex_threshold = Math.floor((Math.random()*100)+0);
	ran_gender = (ran_gender>50) ? "m" : "f";
	var ran_color = get_random_color();
	type = (typeof type === 'undefined') ? ran_type : type;
	speed = (typeof speed === 'undefined') ? ran_speed : speed;
	eyesightfactor = (typeof eyesightfactor === 'undefined') ? ran_eyesightfactor : eyesightfactor;
	x = (typeof x === 'undefined') ? ran_x : x;
	y = (typeof y === 'undefined') ? ran_y : y;
	color = (typeof color === 'undefined') ? ran_color : color;
	color = (type=="food") ? "#2AB811" : color;
	family = (typeof family === 'undefined') ? type : family;
	energy = (typeof energy === 'undefined') ? ran_energy : energy;
	threshold = (typeof threshold === 'undefined') ? ran_threshold : threshold;
	danger_time = (typeof danger_time === 'undefined') ? ran_danger_time : danger_time;
	linger_rate = (typeof linger_rate === 'undefined') ? ran_linger_rate : linger_rate;
	danger_distance = (typeof danger_distance === 'undefined') ? ran_danger_distance : danger_distance;
	gender = (typeof gender === 'undefined') ? ran_gender : gender;
	// store = (typeof store === 'undefined') ? ran_store : store;
	store = 0;
	store_using_threshold = (typeof store_using_threshold === 'undefined') ? ran_store_using_threshold : store_using_threshold;
	sex_desire = (typeof sex_desire === 'undefined') ? ran_sex_desire : sex_desire;
	sex_threshold = (typeof sex_threshold === 'undefined') ? ran_sex_threshold : sex_threshold;
	border_radius = (type=="hunter") ? 3 : 10;
	var ran_id = rand_id(type);
	var danger_time_long = danger_time;
	var prey_attr = (type=="prey") ? " danger_time='"+danger_time+"' danger_time_long='"+danger_time_long+"' " : "";
	$("#canvas").append("<div mode='sleep' id='"+ran_id+"' age='0' type='"+type+"' color='"+color+"' sex_desire='"+sex_desire+"' sex_threshold='"+sex_threshold+"' store='"+store+"' store_using_threshold='"+store_using_threshold+"' gender='"+gender+"' danger_distance='"+danger_distance+"' linger_rate='"+linger_rate+"' threshold='"+threshold+"' "+prey_attr+" speed='"+speed+"' eyesightfactor='"+eyesightfactor+"' class='org "+family+"' energy='"+energy+"'></div>");
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

	if(type=="prey" || type=="hunter")
	{
		keep_going(type,id);
	}
	$(".org").draggable();
	$("#"+id).click(function(){
		var item_html = "<ul>\
			<li>Age: "+$(this).attr("age")+"</li>\
			<li>Speed: "+$(this).attr("speed")+"</li>\
			<li>Danger distance: "+$(this).attr("danger_distance")+"</li>\
			<li>Linger rate: "+$(this).attr("linger_rate")+"</li>\
			<li>Threshold: "+$(this).attr("threshold")+"</li>\
			<li>Eyesightfactor: "+$(this).attr("eyesightfactor")+"</li>\
			<li>Energy: "+$(this).attr("energy")+"</li>\
			<li>Danger time: "+$(this).attr("danger_time")+"</li>\
			<li>Danger time long: "+$(this).attr("danger_time_long")+"</li>\
			<li>Mode: "+$(this).attr("mode")+"</li>\
			<li>Sex desire: "+$(this).attr("sex_desire")+"</li>\
			<li>Sex threshold: "+$(this).attr("sex_threshold")+"</li>\
			<li>Store: "+$(this).attr("store")+"</li>\
			<li>Store using threshold: "+$(this).attr("store_using_threshold")+"</li>\
		</ul>";
		$("#oldest").html(item_html);
	});
}

// modes:
// hunt
// sleep
// have sex

function keep_going(type,id)
{
	var me_o = $("#"+id);
	var energy = energy_control(id);
	if(energy)
	{
		if(type=="hunter")
		{
			var timer = tag(id,".prey","catch");
			me_o.attr("mode","hunt");
			me_o.removeClass("danger hunt sex patrol sleep");
			me_o.addClass("hunt");
		}
		else if(type=="prey")
		{
			check_predator(id,"hunter");
			if(me_o.attr("mode")=="danger" || me_o.attr("danger_time")>0){
				var timer = tag(id,".hunter","run");
				me_o.removeClass("danger hunt sex patrol sleep");
				me_o.addClass("hunt");
			}
			else if(me_o.attr("danger_time")==0)
			{
				me_o.attr("mode","hunt");
				me_o.removeClass("danger hunt sex patrol sleep");
				me_o.addClass("hunt");
				var timer = tag(id,".food","catch");
			}
		}
	}
	else
	{
		sex_threshold = me_o.attr("sex_threshold");
		sex_desire = me_o.attr("sex_desire");
		if(sex_desire>sex_threshold)
		{
			if(type=="hunter")
			{
				var timer = tag(id,".hunter","catch");
				me_o.removeClass("danger hunt sex patrol sleep");
				me_o.addClass("sex");
				me_o.attr("mode","sex");
			}
			else if(type=="prey")
			{
				check_predator(id,"hunter");
				if(me_o.attr("mode")=="danger" || me_o.attr("danger_time")>0){
					var timer = tag(id,".hunter","run");
				}
				else if(me_o.attr("danger_time")==0)
				{
					me_o.attr("mode","sex");
					me_o.removeClass("danger hunt sex patrol sleep");
					me_o.addClass("sex");
					var timer = tag(id,".prey","catch");
				}
			}
		}
		else
		{
			me_o.attr("mode","sleep");
			me_o.removeClass("danger hunt sex patrol sleep");
			me_o.addClass("sleep");
			var timer = 2000;
			if(type=="prey"){
				check_predator(id,"hunter");
				if(me_o.attr("mode")=="danger" || me_o.attr("danger_time")>0){
					var timer = tag(id,".hunter","run");
				}
			}
		}
	}
	// clearTimeout(timers["keep_going"+id]);
	timers["keep_going"+id] = setTimeout("keep_going('"+type+"','"+id+"')",timer);
}

function check_predator(me,run_from)
{
	var me_o = $("#"+me);
	var danger_time = me_o.attr('danger_time');
	var mode = me_o.attr('mode');
	
	var h_el = $("."+run_from);
	h_el.each(function(){
		var eyesight = get_saw(me,$(this).attr("id"));
		if(eyesight) 
		{
			new_position = get_position(me,$(this).attr("id"),"run");
			var me_o = $("#"+me);
			if(new_position.distance<=me_o.width()*me_o.attr("danger_distance"))
			{
				me_o.attr("mode","danger");
				me_o.attr("danger_time",me_o.attr("danger_time_long"));
				me_o.removeClass("danger hunt sex patrol sleep");
				me_o.addClass("danger");
			}
			else
			{
				me_o.removeClass("danger hunt sex patrol sleep");
				me_o.addClass("sleep");
				me_o.attr("mode","sleep");
				// if(danger_time<1)
				// {
				// 	if(me_o.attr("mode")=="danger")
				// 	{
				// 		me_o.attr("mode","sleep");
				// 		me_o.removeClass("danger");
				// 	}
				// }
			}
		}
	});
}

function kill_slowly()
{
	$(".org").each(function(){
		energy_change($(this).attr("id"),-1);
		
		var item = $(this);
		if(item.attr("mode") == "sleep" && item.attr("store")>0 && item.attr("store")>item.attr("store_using_threshold"))
		{
			var new_level = parseInt(item.attr("store"))-1;
			item.attr("store", new_level);
			
			var new_level = parseInt(item.attr("energy"))+1;
			item.attr("energy", new_level);
		}
		
		var new_age = parseInt($(this).attr("age"))+1;
		$(this).attr("age", new_age);
		
		//reduce danger times
		var danger_time = $(this).attr('danger_time');
		var sex_desire = parseInt($(this).attr('sex_desire'));
		var mode = $(this).attr('mode');

		if(sex_desire<100)
		{
			$(this).attr('sex_desire',sex_desire+1);
		}
		
		if (danger_time>0) {
			// console.log(attr);
		    $(this).attr('danger_time',danger_time-1);
			
		}
	});
	setTimeout("kill_slowly()",1000);
}


function energy_control(id)
{
	var item = $("#"+id);
	var energy = parseInt(item.attr("energy"));
	var store = parseInt(item.attr("store"));
	var threshold = parseInt(item.attr("threshold"));
	var store_using_threshold = parseInt(item.attr("store_using_threshold"));
	
	if((energy+store)>(threshold+store_using_threshold))
	{
		return false;
	}
	else if((energy+store)<(threshold+store_using_threshold) && energy>0)
	{
		return true;
	}
	else if(energy<0)
	{
		item.remove();
		return true;
	}
}

function energy_change(id,num)
{
	var item = $("#"+id);
	if(item.attr("mode")=="sleep")
	{
		if(item.attr("store")>0 && item.attr("store")>item.attr("store_using_threshold"))
		{
			var new_level = parseInt(item.attr("store"))+parseInt(num);
			item.attr("store", new_level);
		}
		else
		{
			var new_level = parseInt(item.attr("energy"))+parseInt(num);
			item.attr("energy", new_level);
			if(new_level<=0)
			{
				item.remove();
			}
		}
	}
	else
	{
		var new_level = parseInt(item.attr("energy"))+parseInt(num);
		item.attr("energy", new_level);
		if(new_level<=0)
		{
			item.remove();
		}
	}
}

function go(me,x,y) {
	me_o = document.getElementById(me);
	var speed = me_o.getAttribute("speed")*(1/(parseInt(me_o.getAttribute("store")/100)+1));
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

		var my_speed = me_o.attr("speed");
		var his_position = $("#"+him).position();

		if(him=="imaginary")
		{
			var m_x = my_position.left-1;
			var m_y = my_position.top-1;
			var ran_x = Math.floor((Math.random()*window_w)+0);
			var ran_y = Math.floor((Math.random()*window_h)+0);
			
			var x2 = my_position.left-ran_x;
			var y2 = my_position.top-ran_y;
			
		}
		else
		{
			him_o = $("#"+him);
			if(him_o.length<=0)
			{
				return false;
			}

			var x2 = my_position.left-his_position.left;
			var y2 = my_position.top-his_position.top;
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

		var eyesight = me_el.attr("eyesightfactor") * (me_el.width() + me_el.height())/5;

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
				if($(this).attr("id")!==me)
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
	// console.log("patrolling-->" + me);
	var new_pos = get_position(me,"imaginary","catch");
	go(me,new_pos.x,new_pos.y);
}

function rand_choose(me,to){
	var ran_num = Math.floor((Math.random()*100)+0);
	var item = (ran_num>50) ? me : to;
	return item;
}


function cross_two(me,to)
{
	var me_o = $("#"+me);
	var to_o = $("#"+to);
	
	var new_energy = parseInt(me_o.attr("energy"))-10;
	me_o.attr("energy", new_energy);
	
	var new_energy = parseInt(to_o.attr("energy"))-10;
	to_o.attr("energy", new_energy);
	
	var my_position = me_o.position();
	
	// var to_o = $("#"+to);
	console.log("sex:"+me+"+"+to);
	var animal_number = $(".hunter").size() + $(".prey").size();
	var left = animal_size - animal_number;
	if((me_o.attr("type") == "hunter" && $(".hunter").size()>=animal_size/3) || (me_o.attr("type") == "prey" && $(".prey").size()>=2*animal_size/3))
	{
		left = 0;
	}
	if(left>0)
	{
		type = $("#"+rand_choose(me,to)).attr("type");
		speed = $("#"+rand_choose(me,to)).attr("speed");
		eyesightfactor = $("#"+rand_choose(me,to)).attr("eyesightfactor");
		x = my_position.left;
		y = my_position.top;
		color = $("#"+rand_choose(me,to)).attr("color");
		family = $("#"+rand_choose(me,to)).attr("family");
		energy = 100;
		threshold = $("#"+rand_choose(me,to)).attr("threshold");
		linger_rate = $("#"+rand_choose(me,to)).attr("linger_rate");
		danger_distance = $("#"+rand_choose(me,to)).attr("danger_distance");
		danger_time = $("#"+rand_choose(me,to)).attr("danger_time");
		gender = $("#"+rand_choose(me,to)).attr("gender");
		store = 0;
		store_using_threshold = $("#"+rand_choose(me,to)).attr("store_using_threshold");
		sex_desire = $("#"+rand_choose(me,to)).attr("sex_desire");
		sex_threshold = $("#"+rand_choose(me,to)).attr("sex_threshold");
		var id = create_item(type,speed,eyesightfactor,x,y,color,family,energy,threshold,linger_rate,danger_distance,danger_time,gender,store,store_using_threshold,sex_desire,sex_threshold);
		console.log(id + " is born with color:" + color);
	}
}

function touch(me,to,distance)
{
	var me_o = $("#"+me);
	var to_o = $("#"+to);
	var my_type = me_o.attr("type");
	var his_type = to_o.attr("type");
	
	var to_w = to_o.width();
	var to_h = to_o.height();
	var hip = Math.sqrt(Math.pow(to_w,2)+Math.pow(to_h,2));
	
	if(distance<=hip)
	{
		if((my_type=="hunter" && his_type=="prey") || (my_type=="prey" && his_type=="food"))
		{
			var new_energy = parseInt(me_o.attr("energy"))+parseInt(to_o.attr("energy")/2);
			if(new_energy>100)
			{
				me_o.attr("energy",100);
				me_o.attr("store",new_energy-100);
				me_o.attr("mode","sleep");
				me_o.removeClass("blue");
			}
			else
			{
				me_o.attr("energy",new_energy);
				me_o.attr("mode","sleep");
				me_o.removeClass("blue");
			}

			to_o.remove();
			console.log(me_o.attr("type") + " killed " + to_o.attr("type"));
		}
		else if (my_type == his_type)
		{
			me_o.attr("sex_desire",0);
			to_o.attr("sex_desire",0);
			me_o.removeClass("pink");
			to_o.removeClass("pink");
			cross_two(me,to);
			me_o.attr("mode","sleep");
		}
	}
}

function tag(me,from,action) {
	from_string = from;
	from = from.split(",");
	var saw = seeing(me,from,action);
	var me_o = $("#"+me);
	if(saw)
	{
		me_o.removeClass("patrol");
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
			if(percent>me_o.attr("linger_rate")/100)
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
		me_o.removeClass("danger hunt sex patrol sleep");
		me_o.addClass("patrol");
		me_o.attr("mode","patrol");
		patrol(me);
		var timer = 1000;
	}
	
	return timer;
}


