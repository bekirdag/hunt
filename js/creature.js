Creature = {
	window_w : $(window).width(),
	window_h : $(window).height(),
	speed_factor : 0.2,
	creatures : {},
	timers :[],
	total_creations: 0,
	num_of_mutations: 0,
	settings : {
		x:this.window_w, 
		y:this.window_h, 
		sex_desire:100, 
		sex_threshold:100, 
		store:100, 
		store_using_threshold:100, 
		danger_distance:40, 
		linger_rate:100, 
		threshold:100, 
		speed:100, 
		eyesightfactor:50, 
		energy:100, 
		danger_time: 10, 
		patrol_threshold:1000,
		mutation_rate:0.01,
		copy_prey:0,
		copy_hunter:0,
		hunter_prey_ratio:0.33,
		max_storage:100,
		power:100,
		hunter_power_rate:20,
		prey_power_rate:1,
		defence:100,
		hunter_defence_rate:1,
		prey_defence_rate:3,
		fight_energy_rate:100,
		escape_rate:100,
		fight_rate:100,
		escape_long:10,
		aggression:100,
	},
	get_random_color : function ()
	{
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.round(Math.random() * 15)];
	    }
	    return color;
	},
	rand_id : function (type)
	{
		var id = Math.floor((Math.random()*1000)+0);
		if($('#hunter').length>0)
		{
			return Creature.rand_id(type);
		}
		else
		{
			return type+id;
		}
	},
	create_item: function(data)
	{
		var types = ["hunter","prey"];
		var ran_num = Math.floor((Math.random()*100)+0);
		ran_num = (ran_num>50) ? 1 : 0;
		var ran_type = types[ran_num];
		var ran_speed = Math.floor((Math.random()*Creature.settings.speed)+0);
		var ran_eyesightfactor = Math.floor((Math.random()*Creature.settings.eyesightfactor)+10);
		var ran_x = Math.floor((Math.random()*Creature.window_w)+0);
		var ran_y = Math.floor((Math.random()*Creature.window_h)+0);
		var patrolx = 0;
		var patroly = 0;
		var patrolset = "false";
		var ran_energy = Math.floor((Math.random()*Creature.settings.energy)+0);
		var ran_threshold = Math.floor((Math.random()*Creature.settings.threshold)+0);
		var ran_danger_time = Math.floor((Math.random()*Creature.settings.danger_time)+1);
		var ran_linger_rate = Math.floor((Math.random()*Creature.settings.linger_rate)+0);
		var ran_danger_distance = Math.floor((Math.random()*Creature.settings.danger_distance)+0);
		var ran_gender = Math.floor((Math.random()*100)+0);
		var ran_store = Math.floor((Math.random()*Creature.settings.store)+20);
		var ran_store_using_threshold = Math.floor((Math.random()*Creature.settings.store_using_threshold)+20);
		var ran_sex_desire = Math.floor((Math.random()*Creature.settings.sex_desire)+0);
		var ran_sex_threshold = Math.floor((Math.random()*Creature.settings.sex_threshold)+10);
		var ran_max_storage = Math.floor((Math.random()*Creature.settings.max_storage)+0);
		var ran_patrol_threshold = Math.floor((Math.random()*ran_threshold)+0);
		var ran_power = Math.floor((Math.random()*Creature.settings.power)+0);
		var ran_defence = Math.floor((Math.random()*Creature.settings.defence)+0);
		var ran_fight_energy_rate = Math.floor((Math.random()*Creature.settings.fight_energy_rate)+0);
		var ran_escape_rate = Math.floor((Math.random()*Creature.settings.escape_rate)+0);
		var ran_fight_rate = Math.floor((Math.random()*Creature.settings.fight_rate)+0);
		var ran_escape_long = Math.floor((Math.random()*Creature.settings.escape_long)+0);
		var ran_aggression = Math.floor((Math.random()*Creature.settings.aggression)+0);
		ran_gender = (ran_gender>50) ? "m" : "f";
		var ran_color = Creature.get_random_color();
		type = (!data.hasOwnProperty("type")) ? ran_type : data.type;
		speed = (!data.hasOwnProperty("speed")) ? ran_speed : data.speed;
		eyesightfactor = (!data.hasOwnProperty("eyesightfactor")) ? ran_eyesightfactor : data.eyesightfactor;
		x = (!data.hasOwnProperty("x")) ? ran_x : data.x;
		y = (!data.hasOwnProperty("y")) ? ran_y : data.y;
		color = (!data.hasOwnProperty("color")) ? ran_color : data.color;
		color = (type=="food") ? "#2AB811" : color;
		family = (!data.hasOwnProperty("family")) ? color : data.family;
		energy = (!data.hasOwnProperty("energy")) ? ran_energy : data.energy;
		threshold = (!data.hasOwnProperty("threshold")) ? ran_threshold : data.threshold;
		danger_time = (!data.hasOwnProperty("danger_time")) ? ran_danger_time : data.danger_time;
		linger_rate = (!data.hasOwnProperty("linger_rate")) ? ran_linger_rate : data.linger_rate;
		danger_distance = (!data.hasOwnProperty("danger_distance")) ? ran_danger_distance : data.danger_distance;
		gender = (!data.hasOwnProperty("gender")) ? ran_gender : data.gender;
		age = (!data.hasOwnProperty("age")) ? 0 : data.age;
		store = ran_max_storage;
		store_using_threshold = (!data.hasOwnProperty("store_using_threshold")) ? ran_store_using_threshold : data.store_using_threshold;
		sex_desire = (!data.hasOwnProperty("sex_desire")) ? ran_sex_desire : data.sex_desire;
		sex_threshold = (!data.hasOwnProperty("sex_threshold")) ? ran_sex_threshold : data.sex_threshold;
		patrol_threshold = (!data.hasOwnProperty("patrol_threshold")) ? ran_patrol_threshold : data.patrol_threshold;
		max_storage = (!data.hasOwnProperty("max_storage")) ? ran_max_storage : data.max_storage;
		power = (!data.hasOwnProperty("power")) ? ran_power : data.power;
		fight_energy_rate = (!data.hasOwnProperty("fight_energy_rate")) ? ran_fight_energy_rate : data.fight_energy_rate;
		escape_rate = (!data.hasOwnProperty("escape_rate")) ? ran_escape_rate : data.escape_rate;
		defence = (!data.hasOwnProperty("defence")) ? ran_defence : data.defence;
		fight_rate = (!data.hasOwnProperty("fight_rate")) ? ran_fight_rate : data.fight_rate;
		escape_long = (!data.hasOwnProperty("escape_long")) ? ran_escape_long : data.escape_long;
		aggression = (!data.hasOwnProperty("aggression")) ? ran_aggression : data.aggression;
		escape_time = 0;
		border_radius = (type=="hunter") ? 3 : 10;
		var ran_id = Creature.rand_id(type);
		var danger_time_long = danger_time;
		var svg = $('#canvas').svg('get');

		if(Creature.not_exists(ran_id))
		{
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
		
			Creature.creatures[ran_id] = {x:x, y:y, width:10, height: 10, r:10, fill: color, mode: 'sleep', id:ran_id, age:age, type:type, color:color, sex_desire:sex_desire, sex_threshold:sex_threshold, store:store, store_using_threshold:store_using_threshold, gender:gender, danger_distance:danger_distance, linger_rate:linger_rate, threshold:threshold, speed:speed, eyesightfactor:eyesightfactor, class: 'org '+ family, family:family, energy:energy, danger_time: danger_time, danger_time_long:danger_time_long, patrolx: patrolx, patroly:patroly, patrolset:patrolset, patrol_threshold:patrol_threshold, max_storage:max_storage, power:power, defence:defence, fight_energy_rate:fight_energy_rate, escape_rate:escape_rate, fight_rate:fight_rate, escape_long:escape_long, escape_time: escape_time, aggression: aggression};
			Creature.creature_start(ran_id);
		}
		
		return ran_id;
	},
	not_exists: function(id)
	{
		if(typeof Creature.creatures[id] === "undefined"){
		   return true;
		}
		else
		{
			return false;
		}
	},
	creature_start: function(id)
	{
		var my_cr = Creature.creatures[id];
		var type = my_cr.type;

		if(type=="prey" || type=="hunter")
		{
			Creature.keep_going(type,id);
			$("#"+id).attr("stroke-width","3");
		}
		// $(".org").draggable();
		if(my_cr.type!=="food")
		{
			$("#"+id).click(function(){
				clearTimeout(Creature.timers["info_box"]);
				Creature.info_box(id);
				$("."+my_cr.type).attr("stroke-width",3);
				$("#"+id).attr("stroke-width",10);
			});
		}
		
	},
	mark_oldest: function (type)
	{
		var max_age = 0;
		var id = "";
		$("."+type).each(function(){
			var item = Creature.creatures[$(this).attr("id")];

			if(parseInt(item.age)>max_age)
			{
				max_age = parseInt(item.age);
				id = $(this).attr("id");
			}
		});
		if(id!=="")
		{
			$(".hunter").attr("stroke-width",3);
			$(".prey").attr("stroke-width",3);
			$("#"+id).attr("stroke-width",10);
			clearTimeout(Creature.timers["info_box"]);
			Creature.info_box(id);
			return id;
		}
		else
		{
			return false;
		}
	},
	info_box: function (id)
	{
		if(Creature.not_exists(id)){return false;}
		var my_cr = Creature.creatures[id];
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
			<li>Maximum storage: "+my_cr.max_storage+"</li>\
			<li>Patrol: "+my_cr.patrolx+","+my_cr.patroly+"</li>\
			<li>Patrolset: "+my_cr.patrolset+"</li>\
			<li>Patrol threshold: "+my_cr.patrol_threshold+"</li>\
			<li>Family: "+my_cr.family+"</li>\
			<li>Power: "+my_cr.power+"</li>\
			<li>Defence: "+my_cr.defence+"</li>\
			<li>Escape rate: "+my_cr.escape_rate+"</li>\
			<li>Fight energy rate: "+my_cr.fight_energy_rate+"</li>\
			<li>Fight rate: "+my_cr.fight_rate+"</li>\
			<li>Escape time: "+my_cr.escape_time+"</li>\
			<li>Escape long: "+my_cr.escape_long+"</li>\
			<li>Aggression: "+my_cr.aggression+"</li>\
		</ul>";
		$("#oldest").html(item_html);
		Creature.timers["info_box"] = setTimeout("Creature.info_box('"+id+"')",1000);
	},
	keep_going : function (type,id)
	{
		if(Creature.not_exists(id)){return false;}
		var my_cr = Creature.creatures[id];
		var energy = Creature.energy_control(id);
		
		if(energy)
		{
			if(type=="hunter")
			{
				Creature.creatures[id].mode = "hunt";
				Creature.mode_color(id);

				var timer = Creature.tag(id,".prey","catch");
			}
			else if(type=="prey")
			{
				Creature.check_predator(id,"hunter");
				if(my_cr.danger_time>0){
					var timer = Creature.tag(id,".hunter","run");
				}
				else if(my_cr.danger_time==0)
				{
					Creature.creatures[id].mode = "hunt";
					Creature.mode_color(id);

					var timer = Creature.tag(id,".food","catch");
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
					Creature.creatures[id].mode = "sex";
					Creature.mode_color(id);

					var timer = Creature.tag(id,".hunter","catch");
				}
				else if(type=="prey")
				{
					Creature.check_predator(id,"hunter");
					if(my_cr.danger_time>0){
						var timer = Creature.tag(id,".hunter","run");
					}
					else if(my_cr.danger_time==0)
					{
						Creature.creatures[id].mode = "sex";
						Creature.mode_color(id);

						var timer = Creature.tag(id,".prey","catch");
					}
				}
			}
			else
			{
				if(type=="prey"){
					Creature.check_predator(id,"hunter");
					if(my_cr.danger_time>0){
						Creature.creatures[id].mode=="danger";

						var timer = Creature.tag(id,".hunter","run");
					}
					else if(my_cr.danger_time==0)
					{
						Creature.creatures[id].mode = "sleep";
						Creature.mode_color(id);

						var timer = 600;
					}
				}
			}
		}
		// clearTimeout(timers["Creature.keep_going"+id]);
		Creature.timers["keep_going"+id] = setTimeout("Creature.keep_going('"+type+"','"+id+"')",timer);
	},
	check_predator: function (me,run_from)
	{
		var my_cr = Creature.creatures[me];
		// var me_o = $("#"+me);
		var danger_time = my_cr.danger_time;
		var mode = my_cr.mode;

		var h_el = $("."+run_from);
		h_el.each(function(){
			if($(this).length>0)
			{
				var eyesight = Creature.get_saw(me,$(this).attr("id"));

				if(eyesight) 
				{
					new_position = Creature.get_position(me,$(this).attr("id"),"run");

					var me_o = $("#"+me);
					if(new_position.distance<=my_cr.width*my_cr.danger_distance)
					{
						Creature.creatures[me].mode = "danger";
						Creature.mode_color(me);

						Creature.creatures[me].danger_time = my_cr.danger_time_long;
					}
					else
					{
						if(Creature.creatures[me].danger_time<=0)
						{
							Creature.creatures[me].mode="sleep";
							Creature.mode_color(me);

						}
					}
				}
			}
		});
	},
	kill_slowly:function()
	{
		$(".org").each(function(){
			var this_id = $(this).attr("id");
			if(Creature.not_exists(this_id)){return false;}
			var my_cr = Creature.creatures[this_id];
			var reduce = -1;

			if(my_cr.mode=="danger" || my_cr.mode=="hunt")
			{
				reduce = -2;
			}
			if(my_cr.mode=="patrol")
			{
				reduce = -3;
			}
			Creature.energy_change(my_cr.id,reduce);

			var item = $(this);
			if(my_cr.mode == "sleep" && my_cr.store>0 && my_cr.store>my_cr.store_using_threshold)
			{
				var new_level = parseInt(my_cr.store)-1;
				my_cr.store = new_level;

				var new_level = parseInt(my_cr.energy)+1;
				if(new_level<=Creature.settings.energy)
				{
					my_cr.energy = new_level;
				}
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
			    my_cr.danger_time = danger_time-1;
			}
			else
			{
				my_cr.mode = "sleep";
				Creature.mode_color(this_id);
			}
			
			if (my_cr.escape_time>0) {
			    my_cr.escape_time -= 1;
			}
			else
			{
				my_cr.mode = "sleep";
				// $(this).attr("stroke-width",3);
				Creature.mode_color(this_id);
			}

			Creature.creatures[$(this).attr("id")] = my_cr;
		});
		setTimeout("Creature.kill_slowly()",1000);
	},
	mode_color:function(me)
	{
		if(Creature.not_exists(me)){return false;}
		var my_cr = Creature.creatures[me];
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
			case "fight":
				var color = "#1BE028";
				break;	
			case "run_from_own":
				var color = "brown";
				break;							
		}
		$("#"+me).attr("stroke",color);
	},
	energy_control:function(id)
	{
		if(Creature.not_exists(id)){return false;}
		var my_cr = Creature.creatures[id];
		var energy = parseInt(my_cr.energy);
		var store = parseInt(my_cr.store);
		var threshold = parseInt(my_cr.threshold);
		var store_using_threshold = parseInt(my_cr.store_using_threshold);

		if(energy>threshold)
		{
			return false;
		}
		else if(energy<threshold && energy>0)
		{
			return true;
		}
	},
	energy_change: function (id,num)
	{
		if(Creature.not_exists(id)){return false;}
		var my_cr = Creature.creatures[id];

		if(my_cr.mode=="sleep")
		{
			if(my_cr.store>0 && my_cr.store>my_cr.store_using_threshold)
			{
				var new_level = parseInt(my_cr.store)+parseInt(num);
				Creature.creatures[id].store = new_level;
				if(new_level<=0)
				{
					Creature.kill_one(id);
				}
			}
			else
			{
				var new_level = parseInt(my_cr.energy)+parseInt(num);
				Creature.creatures[id].energy = new_level;
				if(new_level<=0)
				{
					Creature.kill_one(id);
				}
			}
		}
		else
		{
			var new_level = parseInt(my_cr.energy)+parseInt(num);
			Creature.creatures[id].energy = new_level;
			if(new_level<=0)
			{
				Creature.kill_one(id);
			}
		}
	},
	go: function (me,x,y) {
		if(Creature.not_exists(me)){return false;}
		var my_cr = Creature.creatures[me];
		var me_o = $("#"+me);
		var speed = my_cr.speed*(1/(parseInt(my_cr.store/100)+1));
		var count = speed;
		var in_edge_x = false;
		var in_edge_y = false;
		if(x>=Creature.window_w+20)
		{
			x = -9.99*2;
			in_edge_x = true;
		}
		else if (x<-20){
			x = Creature.window_w-0.02;
			in_edge_x = true;
		}

		if(y>=Creature.window_h+20)
		{
			y = -9.99*2;
			in_edge_y = true;
		}
		else if (y<-20){
			y = Creature.window_h-0.02;
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

		Creature.creatures[me].x = x;
		Creature.creatures[me].y = y;
	},
	get_atts: function (me)
	{
		if(Creature.not_exists(me)){return false;}
		var my_cr = Creature.creatures[me];

		return {x:parseFloat(my_cr.x),y:parseFloat(my_cr.y),w:parseFloat(my_cr.width),h:parseFloat(my_cr.height)};
	},
	get_position: function (me,him,action) {
		// him could be imaginary
		var my_cr = Creature.creatures[me];
		// var his_cr = Creature.creatures[him];
		var me_prop = Creature.get_atts(me);
		var my_x = me_prop.x;
		var my_y = me_prop.y;

		var my_speed = my_cr.speed*(1/(parseInt(my_cr.store/100)+1));

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
			var his_prop = Creature.get_atts(him);
			var his_x = his_prop.x+10;
			var his_y = his_prop.y+10;

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
			if(abs_x2<Creature.window_w/2){
				new_x_way = new_x_way * (-1);
			}
		}
		else
		{
			if(abs_x2>Creature.window_w/2){
				new_x_way = new_x_way * (-1);
			}
		}

		if(y2>0)
		{
			if(abs_y2<Creature.window_h/2){
				new_y_way = new_y_way * (-1);
			}
		}
		else
		{
			if(abs_y2>Creature.window_h/2){
				new_y_way = new_y_way * (-1);
			}
		}

		var final_x = new_x_way*my_speed*Creature.speed_factor + my_x;
		var final_y = new_y_way*my_speed*Creature.speed_factor + my_y;

		return {x:final_x,y:final_y,distance:distance};
	},
	get_saw: function (me,him)
	{
		if(Creature.not_exists(me)){return false;}
		if(Creature.not_exists(him)){return false;}
		
		var my_cr = Creature.creatures[me];
		var to_cr = Creature.creatures[him];

		var me_prop = Creature.get_atts(me);
		var his_prop = Creature.get_atts(him);

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

		var x2_alt = Creature.window_w - abs_x2;
		var y2_alt = Creature.window_h - abs_y2;

		x2 = (x2_alt<abs_x2) ? x2_alt : abs_x2;
		y2 = (y2_alt<abs_y2) ? y2_alt : abs_y2;

		var eyesight = my_cr.eyesightfactor * (my_w + my_h)/5;

		var distance = Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2));

		var saw = (eyesight>distance) ? true : false;
		return saw;
	},
	seeing: function (me,him,action) {
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
						var eyesight = Creature.get_saw(me,$(this).attr("id"));
						if(eyesight) 
						{
							new_position = Creature.get_position(me,$(this).attr("id"),action);
							pos[seeing]= {x:new_position.x,y:new_position.y,distance:new_position.distance,weight:0,element:$(this).attr("id")};
							total_distance += new_position.distance;
							seeing++;
						}
					}
				});
			}
			else if(him.indexOf(".")==-1)
			{
				var eyesight = Creature.get_saw(me,him);
				if(eyesight) 
				{
					new_position = Creature.get_position(me,items[i],action);
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

	},
	patrol: function (me){
		var my_cr = Creature.creatures[me];

		if(my_cr.patrolset=="false")
		{
			var patrolx = Math.floor((Math.random()*Creature.window_w)+0);
			var patroly = Math.floor((Math.random()*Creature.window_h)+0);
			Creature.creatures[me].patrolset = "true";
			Creature.creatures[me].patrolx = patrolx;
			Creature.creatures[me].patroly = patroly;
		}
		var data = Creature.get_position(me,"imaginary","catch");
		if(data.distance<10)
		{
			var patrolx = Math.floor((Math.random()*Creature.window_w)+0);
			var patroly = Math.floor((Math.random()*Creature.window_h)+0);
			Creature.creatures[me].patrolset = "true";
			Creature.creatures[me].patrolx = patrolx;
			Creature.creatures[me].patroly = patroly;
		}
		else
		{
			Creature.go(me,data.x,data.y);
		}
	},
	rand_choose: function (me,to){
		var ran_num = Math.floor((Math.random()*100)+0);
		var item = (ran_num>50) ? me : to;
		return item;
	},
	cross_two: function (me,to)
	{
		var my_cr = Creature.creatures[me];
		var to_cr = Creature.creatures[to];

		var new_energy = parseInt(my_cr.energy)-10;
		Creature.creatures[me].energy = new_energy;
		if(new_energy<=0)
		{
			Creature.kill_one(me);
			return false;
		}

		var new_energy = parseInt(to_cr.energy)-10;
		Creature.creatures[to].energy = new_energy;
		if(new_energy<=0)
		{
			Creature.kill_one(to);
			return false;
		}

		var my_prop = Creature.get_atts(me);
		var my_x = my_prop.x;
		var my_y = my_prop.y;

		var animal_number = $(".hunter").size() + $(".prey").size();
		var left = animal_size - animal_number;
		if((my_cr.type == "hunter" && $(".hunter").size()>=Creature.settings.hunter_prey_ratio*animal_size) || (my_cr.type == "prey" && $(".prey").size()>=(1-Creature.settings.hunter_prey_ratio)*animal_size))
		{
			left = 0;
		}

		if(left>0)
		{
			var cr_data = {};
			cr_data.type = Creature.creatures[Creature.rand_choose(me,to)].type;
			cr_data.speed = Creature.creatures[Creature.rand_choose(me,to)].speed;
			cr_data.eyesightfactor = Creature.creatures[Creature.rand_choose(me,to)].eyesightfactor;
			// cr_data.x = my_x;
			// cr_data.y = my_y;
			cr_data.x = Math.floor((Math.random()*Creature.window_w)+0);
			cr_data.y = Math.floor((Math.random()*Creature.window_h)+0);
			cr_data.color = Creature.creatures[Creature.rand_choose(me,to)].color;
			cr_data.family = Creature.creatures[Creature.rand_choose(me,to)].family;
			// cr_data.energy = (parseInt(Creature.creatures[me])+parseInt(Creature.creatures[to]))/2;
			cr_data.energy = 50;
			cr_data.threshold = Creature.creatures[Creature.rand_choose(me,to)].threshold;
			cr_data.linger_rate = Creature.creatures[Creature.rand_choose(me,to)].linger_rate;
			cr_data.danger_distance = Creature.creatures[Creature.rand_choose(me,to)].danger_distance;
			cr_data.danger_time = Creature.creatures[Creature.rand_choose(me,to)].danger_time;
			cr_data.gender = Creature.creatures[Creature.rand_choose(me,to)].gender;
			cr_data.store = 0;
			cr_data.store_using_threshold = Creature.creatures[Creature.rand_choose(me,to)].store_using_threshold;
			cr_data.sex_desire = Creature.creatures[Creature.rand_choose(me,to)].sex_desire;
			cr_data.sex_threshold = Creature.creatures[Creature.rand_choose(me,to)].sex_threshold;
			cr_data.patrol_threshold = Creature.creatures[Creature.rand_choose(me,to)].patrol_threshold;
			cr_data.max_storage = Creature.creatures[Creature.rand_choose(me,to)].max_storage;
			cr_data.power = Creature.creatures[Creature.rand_choose(me,to)].power;
			cr_data.defence = Creature.creatures[Creature.rand_choose(me,to)].defence;
			cr_data.fight_rate = Creature.creatures[Creature.rand_choose(me,to)].fight_rate;
			cr_data.fight_energy_rate = Creature.creatures[Creature.rand_choose(me,to)].fight_energy_rate;
			cr_data.escape_rate = Creature.creatures[Creature.rand_choose(me,to)].escape_rate;
			cr_data.escape_long = Creature.creatures[Creature.rand_choose(me,to)].escape_long;
			cr_data.aggression = Creature.creatures[Creature.rand_choose(me,to)].aggression;

			// Creature.creatures[me] = parseInt(Creature.creatures[me])/2;
			// Creature.creatures[to] = parseInt(Creature.creatures[to])/2;

			Creature.total_creations++;
			var mutation_cons = 1/Creature.settings.mutation_rate;
			var mutation = Math.floor((Math.random()*mutation_cons)+0);
			if(mutation*Creature.settings.mutation_rate>=0.99)
			{
				Creature.num_of_mutations++;
				var can_mutate = ["speed","eyesightfactor","threshold","linger_rate","danger_distance","danger_time","store_using_threshold","sex_desire","sex_desire","patrol_threshold","max_storage","power","defence","fight_rate","fight_energy_rate","escape_rate","escape_long","aggression"];
				var ran_attr = Math.floor((Math.random()*can_mutate.length)+0);
				var mut_attr = can_mutate[ran_attr];
				var new_attr = Math.floor((Math.random()*Creature.settings[mut_attr])+0);
				cr_data[mut_attr] = new_attr;
			}

			var id = Creature.create_item(cr_data);
			// console.log("new born");
		}
	},
	touch: function (me,to,distance)
	{
		if(Creature.not_exists(to)){return false;}
		if(Creature.not_exists(me)){return false;}
		var my_cr = Creature.creatures[me];
		var to_cr = Creature.creatures[to];

		var my_type = my_cr.type;
		var his_type = to_cr.type;

		var his_prop = Creature.get_atts(to);
		var to_w = his_prop.w;
		var to_h = his_prop.h;

		// var hip = Math.sqrt(Math.pow((to_w+to_cr.speed),2)+Math.pow((to_h+to_cr.speed),2));
		var hip = 20;

		if(distance<=hip)
		{
			if(my_type=="hunter" && his_type=="prey")
			{
				// console.log("before"+my_cr.energy);
				var attack = Creature.fight(me,to);
				
				if(attack==me)
				{
					var new_energy = parseInt(my_cr.energy)+parseInt(to_cr.store);
					if(new_energy>parseInt(Creature.settings.energy))
					{
						Creature.creatures[me].energy = Creature.settings.energy;
						Creature.creatures[me].store += new_energy-Creature.settings.energy;
						Creature.creatures[me].store = (Creature.creatures[me].store>Creature.creatures[me].max_storage) ? max_storage : Creature.creatures[me].store;
						Creature.creatures[me].mode = "sleep";
						Creature.mode_color(me);
					}
					else
					{
						Creature.creatures[me].energy = new_energy;
						Creature.creatures[me].mode = "sleep";
						Creature.mode_color(me);

					}
					Creature.kill_one(to);
				}
				// console.log("after"+my_cr.energy);
			}
			else if(my_type=="prey" && his_type=="food")
			{
				var new_energy = parseInt(my_cr.energy)+parseInt(to_cr.energy/2);
				if(new_energy>parseInt(Creature.settings.energy))
				{
					Creature.creatures[me].energy = Creature.settings.energy;
					Creature.creatures[me].store += new_energy-Creature.settings.energy;
					Creature.creatures[me].store = (Creature.creatures[me].store>Creature.creatures[me].max_storage) ? max_storage : Creature.creatures[me].store;
					Creature.creatures[me].mode = "sleep";
					Creature.mode_color(me);
				}
				else
				{
					Creature.creatures[me].energy = new_energy;
					Creature.creatures[me].mode = "sleep";
					Creature.mode_color(me);

				}
				Creature.kill_one(to,me);
			}
			else if (my_type == his_type)
			{
				var fight_mode_on = false;
				if(to_cr.escape_time>0 && my_cr.mode!=="sex" && fight_mode_on)
				{
					return false;
				}
				else if(to_cr.sex_desire<to_cr.sex_threshold && fight_mode_on)
				{
					var result = Creature.decide_what_to_do(to,me);
					if(result)
					{
						Creature.have_sex(me,to);
					}
					else
					{
						if(Creature.not_exists(to)){return false;}
						if(Creature.not_exists(me)){return false;}
						// Creature.creatures[me].mode = "sleep";
						// Creature.mode_color(me);
						// Creature.creatures[me].mode = "run_from_own";
						Creature.creatures[me].sex_desire -= 2;
						// Creature.mode_color(me);
						// Creature.run_away(me,to);
					}
				}
				else
				{
					Creature.have_sex(me,to);
				}
			}
		}
	},
	have_sex : function(me,to){
		Creature.creatures[me].sex_desire = 0;
		Creature.creatures[to].sex_desire = 0;
		Creature.cross_two(me,to);
		if(Creature.not_exists(to)){return false;}
		if(Creature.not_exists(me)){return false;}
		Creature.creatures[me].mode = "sleep";
		Creature.mode_color(me);
		Creature.mode_color(to);
		Creature.creatures[to].mode = "sleep";
	},
	run_away : function(me,to)
	{
		if(Creature.not_exists(me)){return false;}
		var my_cr = Creature.creatures[me];

		if(my_cr.escape_time<=0)
		{
			clearTimeout(Creature.timers["run_away"+me]);
			Creature.keep_going(my_cr.type,me);
		}
		else
		{
			clearTimeout(Creature.timers["keep_going"+me]);
			var timer = Creature.tag(me,to,"run");
			Creature.timers["run_away"+me] = setTimeout("Creature.run_away('"+me+"','"+to+"')",timer);
		}
		return false;
	},
	decide_what_to_do : function(me,to) {
		var my_cr = Creature.creatures[me];
		var his_cr = Creature.creatures[to];
		if(my_cr.escape_time>0)
		{
			return false;
		}
		else if(my_cr.escape_rate>my_cr.fight_rate && my_cr.fight_rate>his_cr.energy)
		{
			// $("#"+me).attr("stroke-width",10);
			Creature.creatures[me].mode = "run_from_own";
			Creature.creatures[me].escape_time = my_cr.escape_long;
			Creature.mode_color(me);
			Creature.run_away(me,to);
			return false;
		}
		else if(my_cr.escape_rate<=my_cr.fight_rate)
		{
			// console.log("fighting");
			var result = Creature.fight(me,to);
			//if anyone died stop
			if(Creature.not_exists(to)){return false;}
			if(Creature.not_exists(me)){return false;}
			// if the other one wins let it go
			if(result==to)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			// $("#"+me).attr("stroke-width",10);
			Creature.creatures[me].mode = "run_from_own";
			Creature.creatures[me].escape_time = my_cr.escape_long;
			Creature.mode_color(me);
			Creature.run_away(me,to);
			return false;
		}
	},
	kill_one : function(id)
	{
		delete Creature.creatures[id];
		var item = $("#"+id);
		clearTimeout(Creature.timers["keep_going"+id]);
		item.remove();
	},
	fight : function(me,him) {
		if(Creature.not_exists(me)){return false;}
		if(Creature.not_exists(him)){return false;}
		
		var my_cr = Creature.creatures[me];
		var his_cr = Creature.creatures[him];
		
		var my_power_rate = (my_cr.type=="hunter") ? parseInt(Creature.settings.hunter_power_rate) : parseInt(Creature.settings.prey_power_rate);
		var his_power_rate = (his_cr.type=="hunter") ? parseInt(Creature.settings.hunter_power_rate) : parseInt(Creature.settings.prey_power_rate);
		
		var my_current_power = parseInt(my_cr.power)*parseInt(my_cr.energy)*my_power_rate/(100+parseInt(my_cr.store));
		var his_current_power = parseInt(his_cr.power)*parseInt(his_cr.energy)*his_power_rate/(100+parseInt(his_cr.store));
		
		var my_defence_rate = (my_cr.type=="hunter") ? parseInt(Creature.settings.hunter_defence_rate) : parseInt(Creature.settings.prey_defence_rate);
		var his_defence_rate = (his_cr.type=="hunter") ? parseInt(Creature.settings.hunter_defence_rate) : parseInt(Creature.settings.prey_defence_rate);
		
		var my_current_defence = (parseInt(my_cr.defence)*parseInt(my_cr.energy)*my_defence_rate+parseInt(my_cr.store))/100;
		var his_current_defence = (parseInt(his_cr.power)*parseInt(his_cr.energy)*his_defence_rate+parseInt(his_cr.store))/100;
		
		// decide who is attacking first
		// var who = Creature.rand_choose(me,him);
		// var who = (my_cr.aggression>his_cr.aggression) ? me : him;
		
		var ran_num = Math.floor((Math.random()*50)+0);
		if(my_cr.aggression-his_cr.aggression>0)
		{
			var who = (my_cr.aggression-his_cr.aggression>ran_num) ? me : him;
		}
		else
		{
			var who = (his_cr.aggression-my_cr.aggression>ran_num) ? him : me;
		}
		
		
		
		var my_condition = true;
		var his_condition = true;
		

		
		// check if it is in between same species or not
		var stop_rate = (my_cr.type==his_cr.type) ? my_cr.fight_energy_rate : 0;
		
		if(stop_rate>0)
		{
			who = me;
			// stop_rate = 0;
			// console.log(Creature.creatures[me].energy, " ", Creature.creatures[him].energy);
		}
		
		if(who==me)
		{
			his_current_power = my_current_power - his_current_defence;
			if(his_cr.energy<=stop_rate)
			{
				Creature.kill_one(him);
				his_condition = false;
				//wins the battle
				Creature.creatures[me].mode = "sleep";
				Creature.mode_color(me);
				return me;
			}
			else
			{
				his_condition = true;
				his_current_power = (his_current_power<10) ? 10 : his_current_power;
				Creature.creatures[him].energy -= Math.floor(Math.abs(his_current_power));
			}
		}
		else
		{
			my_current_power = his_current_power - my_current_defence;
			if(my_cr.energy<=stop_rate)
			{
				Creature.kill_one(me);
				my_condition = false;
				Creature.creatures[him].mode = "sleep";
				Creature.mode_color(him);
				return him;
			}
			else
			{
				my_condition = true;
				my_current_power = (my_current_power<10) ? 10 : my_current_power;
				Creature.creatures[me].energy -= Math.floor(Math.abs(my_current_power));
			}
		}
		
		
		// if we both are alive continue fighting
		if(my_condition || his_condition)
		{
			return Creature.fight(me,him);
		}
	},
	tag: function (me,from,action) {
		var my_cr = Creature.creatures[me];
		from_string = from;
		from = from.split(",");
		var saw = Creature.seeing(me,from,action);
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
				Creature.touch(me,pos[i].element,pos[i].distance);
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

			Creature.go(me,posx,posy);
			var timer = 50;
		}
		else
		{
			if(Creature.not_exists(me)){return timer;}
			if(Creature.creatures[me].mode == "hunt" || Creature.creatures[me].mode == "sex")
			{
				if(my_cr.energy<my_cr.patrol_threshold)
				{
					Creature.creatures[me].mode = "patrol";
					Creature.patrol(me);
					Creature.mode_color(me);
				}
				else
				{
					Creature.creatures[me].mode = "sleep";
					Creature.mode_color(me);
				}
			}
			var timer = 50;
		}

		return timer;
	},
	create_animals: function ()
	{
		var animal_number = $(".hunter").size() + $(".prey").size();
		var left = (animal_size - animal_number);
		for(var i=0;i<left;i++)
		{
			if($(".hunter").size()>=Creature.settings.hunter_prey_ratio*animal_size)
			{
				if(Creature.settings.copy_hunter>0)
				{
					var id = Creature.mark_oldest("prey");
				}
				
				if(!id)
				{
					var obj = {type:"prey"};
				}
				else
				{
					var obj = Creature.creatures[id];
				}
				Creature.create_item(obj);
			}
			else
			{
				if(Creature.settings.copy_prey>0)
				{
					var id = Creature.mark_oldest("hunter");
				}
				if(!id)
				{
					var obj = {type:"hunter"};
				}
				else
				{
					var obj = Creature.creatures[id];
				}
				Creature.create_item(obj);
			}

		}
		Creature.timers["create_animals"] = setTimeout("Creature.create_animals()",Math.floor((Math.random()*60000)+30000));
		// console.log("size of habitat:" + Creature.obj_size(Creature.creatures));
	},
	create_plants: function ()
	{
		var plant_number = $(".food").size();
		var left = plant_size - plant_number;
		for(var i=0;i<left;i++)
		{
			var obj = {type:"food",speed:0,eyesightfactor:0};
			Creature.create_item(obj);
		}
		Creature.timers["create_plants"] = setTimeout("Creature.create_plants()",Math.floor((Math.random()*60000)+10000));
	},
	read_from_file: function()
	{
		// Creature.create_animals();
		// Creature.create_plants();
		// Creature.kill_slowly();
		// Creature.save_creatures();
		
		$.post( "inc/save.php", {
			action: "read",
		})
		.done(function( data ) {
			Creature.creatures = JSON.parse(data);
			if(Creature.obj_size(Creature.creatures)>0)
			{
				for (key in Creature.creatures) {
			        if (Creature.creatures.hasOwnProperty(key))
					{
						Creature.create_item(Creature.creatures[key]);
					}
			    }
			}
		
			Creature.create_animals();
			Creature.create_plants();
			Creature.kill_slowly();
			Creature.save_creatures();
		});
	},
	save_creatures: function()
	{
		var alive_creatures = {};
		$(".hunter").each(function(){
			var org_id = $(this).attr("id");
			alive_creatures[org_id] = Creature.creatures[org_id];
		});
		$(".prey").each(function(){
			var org_id = $(this).attr("id");
			alive_creatures[org_id] = Creature.creatures[org_id];
		});
		$.post( "inc/save.php", {
	    	action: "write",
		data: JSON.stringify(alive_creatures),
		  	});
		Creature.timers["save_creatures"] = setTimeout("Creature.save_creatures()",60000);
	},
	obj_size : function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	},
	start : function()
	{
		Creature.read_from_file();
		Creature.clean_memory();
	},
	clean_memory : function()
	{
		var alive_creatures = {};
		$(".org").each(function(){
			var org_id = $(this).attr("id");
			alive_creatures[org_id] = Creature.creatures[org_id];
		});
		Creature.creatures = alive_creatures;
		Creature.timers["clean_memory"] = setTimeout("Creature.clean_memory()",60000);
	}
}
