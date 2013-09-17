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
		danger_distance:20, 
		linger_rate:100, 
		threshold:100, 
		speed:50, 
		eyesightfactor:50, 
		energy:100, 
		danger_time: 10, 
		patrol_threshold:100,
		mutation_rate:0.01,
		copy_prey:0,
		copy_hunter:0,
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
			return this.rand_id(type);
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
		var ran_speed = Math.floor((Math.random()*this.settings.speed)+0);
		var ran_eyesightfactor = Math.floor((Math.random()*this.settings.eyesightfactor)+10);
		var ran_x = Math.floor((Math.random()*this.window_w)+0);
		var ran_y = Math.floor((Math.random()*this.window_h)+0);
		var patrolx = 0;
		var patroly = 0;
		var patrolset = "false";
		var ran_energy = Math.floor((Math.random()*this.settings.energy)+10);
		var ran_threshold = Math.floor((Math.random()*this.settings.threshold)+0);
		var ran_danger_time = Math.floor((Math.random()*this.settings.danger_time)+1);
		var ran_linger_rate = Math.floor((Math.random()*this.settings.linger_rate)+0);
		var ran_danger_distance = Math.floor((Math.random()*this.settings.danger_distance)+0);
		var ran_gender = Math.floor((Math.random()*100)+0);
		var ran_store = Math.floor((Math.random()*this.settings.store)+0);
		var ran_store_using_threshold = Math.floor((Math.random()*this.settings.store_using_threshold)+0);
		var ran_sex_desire = Math.floor((Math.random()*this.settings.sex_desire)+0);
		var ran_sex_threshold = Math.floor((Math.random()*this.settings.sex_threshold)+0);
		var ran_patrol_threshold = Math.floor((Math.random()*ran_threshold)+0);
		ran_gender = (ran_gender>50) ? "m" : "f";
		var ran_color = this.get_random_color();
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
		store = 0;
		store_using_threshold = (!data.hasOwnProperty("store_using_threshold")) ? ran_store_using_threshold : data.store_using_threshold;
		sex_desire = (!data.hasOwnProperty("sex_desire")) ? ran_sex_desire : data.sex_desire;
		sex_threshold = (!data.hasOwnProperty("sex_threshold")) ? ran_sex_threshold : data.sex_threshold;
		patrol_threshold = (!data.hasOwnProperty("patrol_threshold")) ? ran_patrol_threshold : data.patrol_threshold;
		border_radius = (type=="hunter") ? 3 : 10;
		var ran_id = this.rand_id(type);
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
		this.creatures[ran_id] = {x:x, y:y, width:10, height: 10, r:10, fill: color, mode: 'sleep', id:ran_id, age:0, type:type, color:color, sex_desire:sex_desire, sex_threshold:sex_threshold, store:store, store_using_threshold:store_using_threshold, gender:gender, danger_distance:danger_distance, linger_rate:linger_rate, threshold:threshold, speed:speed, eyesightfactor:eyesightfactor, class: 'org '+ family, family:family, energy:energy, danger_time: danger_time, danger_time_long:danger_time_long, patrolx: patrolx, patroly:patroly, patrolset:patrolset, patrol_threshold:patrol_threshold};

		this.creature_start(ran_id);
		return ran_id;
	},
	check_exists: function(id)
	{
		if(this.creatures[id] == undefined){
			// console.log(id);
		   return true;
		}
		else
		{
			return true;
		}
	},
	creature_start: function(id)
	{
		// console.log(this.creatures[id]);
		if(!this.check_exists(id))
		{
			return false;
		}
		var my_cr = this.creatures[id];
		var type = my_cr.type;

		if(type=="prey" || type=="hunter")
		{
			this.keep_going(type,id);
			$("#"+id).attr("stroke-width","3");
		}
		// $(".org").draggable();
		$("#"+id).click(function(){
			clearTimeout(Creature.timers["info_box"]);
			Creature.info_box(id);
			$(".org").attr("stroke-width",3);
			$("#"+id).attr("stroke-width",10);
		});
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
			$(".org").attr("stroke-width",3);
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
		if(!this.check_exists(id))
		{
			return false;
		}
		var my_cr = this.creatures[id];
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
		this.timers["info_box"] = setTimeout("Creature.info_box('"+id+"')",1000);
	},
	keep_going : function (type,id)
	{
		if(!this.check_exists(id))
		{
			return false;
		}
		var my_cr = this.creatures[id];
		var energy = this.energy_control(id);
		if(energy)
		{
			if(type=="hunter")
			{
				this.creatures[id].mode = "hunt";
				this.mode_color(id);

				var timer = this.tag(id,".prey","catch");
			}
			else if(type=="prey")
			{
				this.check_predator(id,"hunter");
				if(my_cr.danger_time>0){
					var timer = this.tag(id,".hunter","run");
				}
				else if(my_cr.danger_time==0)
				{
					this.creatures[id].mode = "hunt";
					this.mode_color(id);

					var timer = this.tag(id,".food","catch");
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
					this.creatures[id].mode = "sex";
					this.mode_color(id);

					var timer = this.tag(id,".hunter","catch");
				}
				else if(type=="prey")
				{
					this.check_predator(id,"hunter");
					if(my_cr.danger_time>0){
						var timer = this.tag(id,".hunter","run");
					}
					else if(my_cr.danger_time==0)
					{
						this.creatures[id].mode = "sex";
						this.mode_color(id);

						var timer = this.tag(id,".prey","catch");
					}
				}
			}
			else
			{
				if(type=="prey"){
					this.check_predator(id,"hunter");
					if(my_cr.danger_time>0){
						this.creatures[id].mode=="danger";

						var timer = this.tag(id,".hunter","run");
					}
					else if(my_cr.danger_time==0)
					{
						this.creatures[id].mode = "sleep";
						this.mode_color(id);

						var timer = 1000;
					}
				}
			}
		}
		// clearTimeout(timers["this.keep_going"+id]);
		this.timers["keep_going"+id] = setTimeout("Creature.keep_going('"+type+"','"+id+"')",timer);
	},
	check_predator: function (me,run_from)
	{
		if(!this.check_exists(me))
		{
			return false;
		}
		if(!this.check_exists(run_from))
		{
			return false;
		}
		var my_cr = this.creatures[me];
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
			var my_cr = Creature.creatures[this_id];
			if(!Creature.check_exists(this_id))
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
			Creature.energy_change(my_cr.id,reduce);

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

			Creature.creatures[$(this).attr("id")] = my_cr;
		});
		setTimeout("Creature.kill_slowly()",1000);
	},
	mode_color:function(me)
	{
		var my_cr = this.creatures[me];
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
	},
	energy_control:function(id)
	{
		var my_cr = this.creatures[id];
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
	},
	energy_change: function (id,num)
	{
		if(!this.check_exists(id))
		{
			return false;
		}
		var my_cr = this.creatures[id];

		if(my_cr.mode=="sleep")
		{
			if(my_cr.store>0 && my_cr.store>my_cr.store_using_threshold)
			{
				var new_level = parseInt(my_cr.store)+parseInt(num);
				this.creatures[id].store = new_level;
			}
			else
			{
				var new_level = parseInt(my_cr.energy)+parseInt(num);
				this.creatures[id].energy = new_level;
				if(new_level<=0)
				{
					delete this.creatures[id];
					var item = $("#"+id);
					clearTimeout(this.timers["keep_going"+id]);
					item.remove();
					// var svg_item = document.getElementById(id);
					// svg_item.parentNode.removeChild(svg_item);
				}
			}
		}
		else
		{
			var new_level = parseInt(my_cr.energy)+parseInt(num);
			this.creatures[id].energy = new_level;
			if(new_level<=0)
			{
				delete this.creatures[id];
				var item = $("#"+id);
				// var svg_item = document.getElementById(id);
				// svg_item.parentNode.removeChild(svg_item);
				clearTimeout(this.timers["keep_going"+id]);
				item.remove();
			}
		}
	},
	go: function (me,x,y) {
		var my_cr = this.creatures[me];
		if(!this.check_exists(me))
		{
			return false;
		}
		var me_o = $("#"+me);
		var speed = my_cr.speed*(1/(parseInt(my_cr.store/30)+1));
		var count = speed;
		var in_edge_x = false;
		var in_edge_y = false;
		if(x>=this.window_w+20)
		{
			x = -9.99*2;
			in_edge_x = true;
		}
		else if (x<-20){
			x = this.window_w-0.02;
			in_edge_x = true;
		}

		if(y>=this.window_h+20)
		{
			y = -9.99*2;
			in_edge_y = true;
		}
		else if (y<-20){
			y = this.window_h-0.02;
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

		this.creatures[me].x = x;
		this.creatures[me].y = y;
	},
	get_atts: function (me)
	{
		if(!this.check_exists(me))
		{
			return false;
		}
		var my_cr = this.creatures[me];

		return {x:parseFloat(my_cr.x),y:parseFloat(my_cr.y),w:parseFloat(my_cr.width),h:parseFloat(my_cr.height)};
	},
	get_position: function (me,him,action) {
		// him could be imaginary
		var my_cr = this.creatures[me];
		if(!this.check_exists(me))
		{
			return false;
		}
		if(him!=="imaginary" && !this.check_exists(him)){
		   return false;
		}
		var me_prop = this.get_atts(me);
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
			var his_prop = this.get_atts(him);
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
			if(abs_x2<this.window_w/2){
				new_x_way = new_x_way * (-1);
			}
		}
		else
		{
			if(abs_x2>this.window_w/2){
				new_x_way = new_x_way * (-1);
			}
		}

		if(y2>0)
		{
			if(abs_y2<this.window_h/2){
				new_y_way = new_y_way * (-1);
			}
		}
		else
		{
			if(abs_y2>this.window_h/2){
				new_y_way = new_y_way * (-1);
			}
		}

		var final_x = new_x_way*my_speed*this.speed_factor + my_x;
		var final_y = new_y_way*my_speed*this.speed_factor + my_y;

		return {x:final_x,y:final_y,distance:distance};
	},
	get_saw: function (me,him)
	{
		if(!this.check_exists(me))
		{
			return false;
		}
		if(!this.check_exists(him))
		{
			return false;
		}
		var my_cr = this.creatures[me];
		var to_cr = this.creatures[him];

		var me_prop = this.get_atts(me);
		var his_prop = this.get_atts(him);

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

		var x2_alt = this.window_w - abs_x2;
		var y2_alt = this.window_h - abs_y2;

		x2 = (x2_alt<abs_x2) ? x2_alt : abs_x2;
		y2 = (y2_alt<abs_y2) ? y2_alt : abs_y2;

		var eyesight = my_cr.eyesightfactor * (my_w + my_h)/5;

		var distance = Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2));

		var saw = (eyesight>distance) ? true : false;
		return saw;
	},
	seeing: function (me,him,action) {
		if(!this.check_exists(me))
		{
			return false;
		}
		if(!this.check_exists(him))
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
				var eyesight = this.get_saw(me,him);
				if(eyesight) 
				{
					new_position = this.get_position(me,items[i],action);
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
		var my_cr = this.creatures[me];
		if(!this.check_exists(me))
		{
			return false;
		}
		if(my_cr.patrolset=="false")
		{
			var patrolx = Math.floor((Math.random()*this.window_w)+0);
			var patroly = Math.floor((Math.random()*this.window_h)+0);
			this.creatures[me].patrolset = "true";
			this.creatures[me].patrolx = patrolx;
			this.creatures[me].patroly = patroly;
		}
		var data = this.get_position(me,"imaginary","catch");
		// console.log(data.distance);
		if(data.distance<10)
		{
			var patrolx = Math.floor((Math.random()*this.window_w)+0);
			var patroly = Math.floor((Math.random()*this.window_h)+0);
			this.creatures[me].patrolset = "true";
			this.creatures[me].patrolx = patrolx;
			this.creatures[me].patroly = patroly;
		}
		else
		{
			this.go(me,data.x,data.y);
		}
	},
	rand_choose: function (me,to){
		if(!this.check_exists(me))
		{
			return false;
		}
		if(!this.check_exists(to))
		{
			return false;
		}
		var ran_num = Math.floor((Math.random()*100)+0);
		var item = (ran_num>50) ? me : to;
		return item;
	},
	cross_two: function (me,to)
	{
		if(!this.check_exists(me))
		{
			return false;
		}
		if(!this.check_exists(to))
		{
			return false;
		}
		var my_cr = this.creatures[me];
		var to_cr = this.creatures[to];

		var new_energy = parseInt(my_cr.energy)-10;
		this.creatures[me].energy = new_energy;

		var new_energy = parseInt(to_cr.energy)-10;
		this.creatures[to].energy = new_energy;

		var my_prop = this.get_atts(me);
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
			var cr_data = {};
			cr_data.type = this.creatures[this.rand_choose(me,to)].type;
			cr_data.speed = this.creatures[this.rand_choose(me,to)].speed;
			cr_data.eyesightfactor = this.creatures[this.rand_choose(me,to)].eyesightfactor;
			cr_data.x = my_x;
			cr_data.y = my_y;
			cr_data.color = this.creatures[this.rand_choose(me,to)].color;
			cr_data.family = this.creatures[this.rand_choose(me,to)].family;
			cr_data.energy = 150;
			cr_data.threshold = this.creatures[this.rand_choose(me,to)].threshold;
			cr_data.linger_rate = this.creatures[this.rand_choose(me,to)].linger_rate;
			cr_data.danger_distance = this.creatures[this.rand_choose(me,to)].danger_distance;
			cr_data.danger_time = this.creatures[this.rand_choose(me,to)].danger_time;
			cr_data.gender = this.creatures[this.rand_choose(me,to)].gender;
			cr_data.store = 0;
			cr_data.store_using_threshold = this.creatures[this.rand_choose(me,to)].store_using_threshold;
			cr_data.sex_desire = this.creatures[this.rand_choose(me,to)].sex_desire;
			cr_data.sex_threshold = this.creatures[this.rand_choose(me,to)].sex_threshold;
			cr_data.patrol_threshold = this.creatures[this.rand_choose(me,to)].patrol_threshold;

			this.total_creations++;
			this.num_of_mutations++;
			// console.log("total_creations: " + total_creations);
			var mutation_cons = 1/this.settings.mutation_rate;
			var mutation = Math.floor((Math.random()*mutation_cons)+0);
			// console.log(mutation*this.settings.mutation_rate);
			if(mutation*this.settings.mutation_rate>=0.99)
			{
				num_of_mutations++;
				// console.log("number of mutations: " + num_of_mutations);

				var can_mutate = ["speed","eyesightfactor","threshold","linger_rate","danger_distance","danger_time","store_using_threshold","sex_desire","sex_desire","patrol_threshold"];
				var ran_attr = Math.floor((Math.random()*can_mutate.length)+0);
				var mut_attr = can_mutate[ran_attr];
				var new_attr = Math.floor((Math.random()*this.settings[mut_attr])+0);
				// console.log("mutated:  attr was:"+cr_data[mut_attr]+ " now:"+new_attr);
				cr_data[mut_attr] = new_attr;
			}

			var id = this.create_item(cr_data);
		}
	},
	touch: function (me,to,distance)
	{
		if(!this.check_exists(me))
		{
			return false;
		}
		if(!this.check_exists(to))
		{
			return false;
		}
		var my_cr = this.creatures[me];
		var to_cr = this.creatures[to];

		var my_type = my_cr.type;
		var his_type = to_cr.type;

		var his_prop = this.get_atts(to);
		var to_w = his_prop.w;
		var to_h = his_prop.h;

		var hip = Math.sqrt(Math.pow(to_w,2)+Math.pow(to_h,2));

		if(distance<=hip)
		{
			if((my_type=="hunter" && his_type=="prey") || (my_type=="prey" && his_type=="food"))
			{
				var new_energy = parseInt(my_cr.energy)+parseInt(to_cr.energy/2);
				if(new_energy>this.settings.energy)
				{
					this.creatures[me].energy = this.settings.energy;
					this.creatures[me].store = new_energy-this.settings.energy;
					this.creatures[me].mode = "sleep";
					this.mode_color(me);
				}
				else
				{
					this.creatures[me].energy = new_energy;
					this.creatures[me].mode = "sleep";
					this.mode_color(me);

				}
				var to_o = $("#"+to);
				clearTimeout(this.timers["keep_going"+to]);
				to_o.remove();
				// var svg_item = document.getElementById(to);
				// svg_item.parentNode.removeChild(svg_item);
			}
			else if (my_type == his_type)
			{
				this.creatures[me].sex_desire = 0;
				this.creatures[to].sex_desire = 0;
				this.cross_two(me,to);
				this.creatures[me].mode = "sleep";
				this.mode_color(me);
				this.mode_color(to);
				this.creatures[to].mode = "sleep";

			}
		}
	},
	tag: function (me,from,action) {
		if(!this.check_exists(me))
		{
			return false;
		}
		if(!this.check_exists(from))
		{
			return false;
		}
		var my_cr = this.creatures[me];
		from_string = from;
		from = from.split(",");
		var saw = this.seeing(me,from,action);
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
				this.touch(me,pos[i].element,pos[i].distance);
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

			this.go(me,posx,posy);
			var timer = 50;
		}
		else
		{
			if(this.creatures[me].mode == "hunt" || this.creatures[me].mode == "sex")
			{
				if(my_cr.energy<my_cr.patrol_threshold)
				{
					this.creatures[me].mode = "patrol";
					this.patrol(me);
					this.mode_color(me);
				}
				else
				{
					this.creatures[me].mode = "sleep";
					this.mode_color(me);
				}
			}
			var timer = 50;
		}

		return timer;
	},
	create_animals: function ()
	{
		var animal_number = $(".hunter").size() + $(".prey").size();
		var left = animal_size - animal_number;
		var hunter_copied = 0;
		var prey_copied = 0;
		for(var i=0;i<left;i++)
		{
			if($(".hunter").size()>=animal_size/4)
			{
				if(this.settings.copy_hunter>0)
				{
					var id = this.mark_oldest("prey");
				}
				
				if(!id || hunter_copied>=this.settings.copy_hunter)
				{
					// console.log("newly created");
					var obj = {type:"prey"};
				}
				else
				{
					// console.log("copied: "+id);
					hunter_copied++;
					var obj = this.creatures[id];
				}
				this.create_item(obj);
			}
			else
			{
				if(this.settings.copy_prey>0)
				{
					var id = this.mark_oldest("hunter");
				}
				if(!id || hunter_copied>=this.settings.copy_prey)
				{
					// console.log("newly created");
					var obj = {type:"hunter"};
				}
				else
				{
					// console.log("copied: "+id);
					hunter_copied++;
					var obj = this.creatures[id];
				}
				this.create_item(obj);
			}

		}
		setTimeout("Creature.create_animals()",10000);
	},
	create_plants: function ()
	{
		var plant_number = $(".food").size();
		var left = plant_size - plant_number;
		for(var i=0;i<left;i++)
		{
			var obj = {type:"food",speed:0,eyesightfactor:0};
			this.create_item(obj);
		}
		setTimeout("Creature.create_plants()",15000);
	}
}
