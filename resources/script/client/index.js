require(['dojo/dom',
    'client/module/Slider',
	'client/module/Activity',
	'client/module/ListActivity',
	'dojo/dom-construct',
	'dojo/request',
	'dojo/_base/array',
    'dojo/domReady!'],
    function (dom, Slider, Activity, ListActivity, domStruct, request, array) {
        var node = dom.byId('slider');
        node && new Slider({
            layout: [
                {
                    href: 'http://www.google.com',
                    target: '_blank',
                    src: 'resources/images/image-slider-1.jpg',
                    alt: 'Welcome to YouthClub'
                },
                {
                    src: 'resources/images/image-slider-2.jpg',
                    alt: 'Taste of Happniess'
                },
                {
                    src: 'resources/images/image-slider-3.jpg',
                    alt: 'Pure Javascript. No jQuery. No flash.'
                }
            ]
        }, node);
		
		/* hot activity*/
		request("/client/server/rest/data/hot.json", {
			handleAs : "json"
			}).then(function(hot){
				var latest = dom.byId('hot');
				var left = domStruct.create('div', {className:'listleft'}, latest);
				var right = domStruct.create('div', {className:'listright'}, latest);
				var firstline = domStruct.create('ul', {className:'figrueslist'}, right);
				var secondline = domStruct.create('ul', {className:'figrueslist'}, right);
				
				array.forEach(hot, function(act, idx){
					if(0 == idx){
						act.imageWidth = 300;
						act.imageHeight = 235;
						var actLeft = new Activity(act).placeAt(left);
					}
					else{
						act.imageWidth = 186;
						act.imageHeight = 83;
						var pos = null;
						if(idx>=1 && idx<=2){
							pos = firstline;
						}
						else if(idx>=3 && idx<=4){
							pos = secondline;								
						}

						var li = domStruct.create('li',{className:'figure'}, pos);
						var actFirst = new Activity(act).placeAt(li);
					}
				});
			});

		/* latest activity*/
		request("/client/server/rest/data/latest.json", {
			handleAs : "json"
			}).then(function(hot){
				var latest = dom.byId('latest');
				var left = domStruct.create('div', {className:'listleft'}, latest);
				var right = domStruct.create('div', {className:'listright'}, latest);
				var firstline = domStruct.create('ul', {className:'figrueslist'}, right);
				var secondline = domStruct.create('ul', {className:'figrueslist'}, right);
				
				array.forEach(hot, function(act, idx){
					if(0 == idx){
						act.imageWidth = 300;
						act.imageHeight = 235;
						var actLeft = new Activity(act).placeAt(left);
					}
					else{
						act.imageWidth = 186;
						act.imageHeight = 83;
						var pos = null;
						if(idx>=1 && idx<=2){
							pos = firstline;
						}
						else if(idx>=3 && idx<=4){
							pos = secondline;								
						}

						var li = domStruct.create('li',{className:'figure'}, pos);
						var actFirst = new Activity(act).placeAt(li);
					}
				});
			});

		/*travel*/
		request("/client/server/rest/data/travel.json", {
				handleAs : "json"
			}).then(function(travels){
				var ul = domStruct.create("ul", null, 'travel');
				array.forEach(travels, function(travel){
					var li = domStruct.create("li", null, ul);
					domStruct.create("a", {innerHTML:travel.title, href:travel.target}, li);
				});
			});

		/*right Pane*/
		domStruct.create("h3",{class:'title', innerHTML:'Recent Activity'}, 'recent');
		domStruct.create("h3",{class:'title', innerHTML:'Recommendation'}, 'recommendation');
		domStruct.create("h3",{class:'title', innerHTML:'Advisory Commen Sense'}, 'advisory');

		request("/client/server/rest/data/recent.json", {
				handleAs : "json"
			}).then(function(acts){
				var ul = domStruct.create("ul", null, 'recent');
				array.forEach(acts, function(act){
					var li = domStruct.create("li", null, ul);
					var listact = new ListActivity(act).placeAt(li);
				});
			});

		request("/client/server/rest/data/recommendation.json", {
				handleAs : "json"
			}).then(function(routes){
				var ul = domStruct.create("ul", null, 'recommendation');
				array.forEach(routes, function(route){
					var li = domStruct.create("li", null, ul);
					var listact = new ListActivity(route).placeAt(li);
				});
			});

		request("/client/server/rest/data/advisory.json", {
			handleAs : "json"
			}).then(function(advisory){
				var ul = domStruct.create("ul", null, 'advisory');
				array.forEach(advisory, function(adv){
					var li = domStruct.create("li", null, ul);
					domStruct.create("a", {innerHTML:adv.title, href:adv.target}, li);
				});
		});
    });