
;(function($,document,window) {
	
	var $doc = $(document), $window = $(window);

	var winOffset = function(){
			return window.pageYOffset;
		};

	var randomNum = function(){
			var randNum = Math.random();
			return randNum;
	};

	/*Functions and variables for scrambling title*/

	var myName = ["S","U","N","I","L","U", "N", "K", "A"],
		refArray = [];	//Array for scrambleIn to check against

	
	function introFade(a) {
		var $iA = $("#"+a),
			$body = $("body");
		$iA.fadeOut(2000, function(){
			$body.removeClass("noscroll")	
		});
		return;
	};




	function scrambleIn(array, duration, ident) {
		var newNum = Math.floor(randomNum()*array.length),
			i = newNum,
			letter = array[i], 
			whichId = document.getElementById(ident + [i]),
			isClr = whichId.innerHTML;
		if(isClr==="" && (refArray.length<array.length)) {
			refArray.push(array[i]);
			whichId.innerHTML=array[i];
			$("#"+ ident + [i]).fadeIn(duration, function() {
				scrambleIn(array, duration, ident);
			});
		} else if(isClr!=="" && (refArray.length<array.length)){
			scrambleIn(array, duration, ident);
		} else if(isClr!=="" && (refArray.length>=array.length)){
				introFade("introBkgd");
				return;
		};
	};


	function createEl(array, el, ident, col, row) {
		var parentEl = document.getElementById(el);
			elW = parentEl.scrollWidth,
			elH = parentEl.scrollHeight,
			lHW = elW/col,
			lHH = lHW,
			i = 0,
			len = array.length;
		
		for(i; i<len+1; i++) {
			var checkArray = document.getElementsByClassName("letterBlock"),
				letterHolder = "<div class='letterBlock introTitle'><h1 id="+ident+[i]+" style='display:none'></h1></div>";
			if(array.length > checkArray.length){
				$(parentEl).append(letterHolder);
				$(".letterBlock").css({
					"width": (lHW-1)+"px",
					"height": (lHH-1)+"px"
				});
			} else if(array.length === checkArray.length){
				$("#nameHolder").animate({
					"opacity": "1"
				},500, "swing")
			};
		};	
	
	};

	function introAnimation(){
			createEl(myName, "nameHolder", "tl",5,2);
			scrambleIn(myName,350,"tl");
	};

	/*Custom object constructor to resize title when page width changed so doesn't look out of place.*/

	function resizeTitle(pel,el, txtEl,x,y) {
		this.c = document.getElementsByClassName(el);
		this.p = document.getElementById(pel);
		this.px = function(){
				return this.p.scrollWidth;
			};
		this.py = function(){
				return this.p.scrollHeight;
			};
		this.cx = function(){
			return Math.floor(this.px()*(1/x)-1);
			};
		this.cy = function(){
				return Math.floor(this.py()*(1/y)-1); 
			};
		this.wx = function(){
				return window.innerWidth;
			};
		this.wy = function(){
				return window.innerHeight;
			};
		this.wd = function(){
			return this.p.getBoundingClientRect();
			};
		
		var ratio = {
				sl: 0.08,
				sx: 0.75,
				ml: 0.25,
				mx: 0.5,
				bl: 0.33,
				bx: 0.33
			};	

		this.t = function(){
				return Math.floor((this.wy()*0.10)-2);
			};

		this.w = function(xr){
			return Math.floor((this.wx()*xr)-2);
		};

		this.l = function(lr){
			return Math.floor((this.wx()*lr)-2);
		};	
	
		this.tfm = function(){	
			var	wx = this.wx(),
				wy = this.wy(),
				i = 0,
				len = this.c.length;
									
			if(wx >= 930){	
				this.p.style.width = this.w(ratio.bx)+"px";
				this.p.style.top = this.t()+"px";
				this.p.style.left = this.l(ratio.bl)+"px";
				for(i; i<len;i++){
					var t = document.getElementById(txtEl+[i]),
						c = this.c[i];	
					c.style.height = this.cx()+"px";
					c.style.width = this.cx() +"px";
					t.style.fontSize= this.cx()+"px";
				};
			} else if(wx <= 929 && wx >= 512) {
				this.p.style.width = this.w(ratio.mx)+"px";
				this.p.style.top = this.t()+"px";
				this.p.style.left = this.l(ratio.ml)+"px";
				for(i; i<len;i++){
					var t = document.getElementById(txtEl+[i]),
						c = this.c[i];	
					c.style.height = this.cx()+"px";
					c.style.width = this.cx() +"px";
					t.style.fontSize= this.cx()+"px";
				};
			} else if(wx <= 511) {
				this.p.style.width = this.w(ratio.sx)+"px";
				this.p.style.top = this.t()+"px";
				this.p.style.left = this.l(ratio.sl)+"px";
				for(i; i<len;i++){
					var t = document.getElementById(txtEl+[i]),
						c = this.c[i];	
					c.style.height = this.cx()+"px";
					c.style.width = this.cx() +"px";
					t.style.fontSize= this.cx()+"px";
				};
			};
		};	
	
	};	
	

	var trsz = new resizeTitle("nameHolder","letterBlock","tl",5,2);
		
	/*Parallax Functionality*/
	var plxFx = {
			wx: function(){
				return window.innerWidth;
			},
			
			sb: [6,5,6,5.5,6,6,6],
			sm: [6,9,9,5.5,6,8,7],
			ss: [6,10,10,10,10,10,9],
			plx: function(tgt){
				var p = document.getElementsByClassName(tgt),
					len = p.length,
					i = 0,
					wx = this.wx();
					for(i;i<len;i++){
						if(wx > 639) {
							p[i].style.top = (winOffset()/this.sb[i])+"px";
						} else if(wx <= 639) {
							p[i].style.top = (winOffset()/this.sm[i])+"px";
						} else if(wx <= 479) {
							p[i].style.top = (winOffset()/this.ss[i])+"px";
						};
					};
			},
	}

	/*function plx(tgt, v) {
		var p = document.getElementById(tgt);
			p.style.top = (winOffset()/v)+"px";
	};*/


	/*Slide down nav bar*/	
	function fixNav() {
		var pageTop = winOffset(),
			slidingEl = document.getElementById("contact"),
			$ctc = $("#"+slidingEl.id),
			triggerEl = document.getElementById("fintro"),
			navTrigger = triggerEl.clientHeight;
		if(pageTop >= navTrigger-140){
			$ctc.slideDown("fast");
		} else if(pageTop <= navTrigger-140) {
			$ctc.slideUp("fast");
		};
				
	};

	/*Object constructor to activate progress bars on scrolling*/

	function progBar(tel,cls, one, two, thr,fou,fiv,six) {
		this.cls = document.getElementsByClassName(cls);
		this.tel = document.getElementById(tel);
		this.pelWdth = this.cls[0].parentElement.scrollWidth;
		this.wy = function(){
			return window.innerHeight;;
		};
		this.tDimes = function(){
			return this.tel.getBoundingClientRect();
		};

		this.barWdth = [one,two,thr,fou,fiv,six];
		
		this.elWdth = function() {
			return this.cls[0].clientWidth;
		};

		this.grow = function(){
			var array = this.cls,
				i = 0,
				len = this.cls.length;
			for(i;i<len;i++){
				var ident = array[i].id,
					$tgtId = $("#"+ident),
					ebx = this.barWdth[i];
				$tgtId.stop().animate({
						"width": ebx+"%"
					}, 1000, "swing");
			};
		};
		this.shrink = function(){
			var array = this.cls,
				i = 0,
				len = array.length;
			for(i;i<len;i++){
				var ident = array[i].id,
					$tgtId = $("#"+ident),
					ebx = this.barWdth[i];
				$tgtId.stop().animate({
						"width": "1px"
					}, 100, "swing");
			};
		};
		this.isInFrame = function(){
			var wy = this.wy(),
				tb = this.tDimes().bottom,
				tt = this.tDimes().top,
				ew = this.elWdth();
			if(tb < wy && tt>0 && ew < 2) {
				this.grow();
			} else if((tb<0 || tt>wy) && (ew > 2)){
				this.shrink();
			};	
		};
	};

	var pg = new progBar("fewdSkills", "expBarInner", 75, 65, 50,45,20,5);
	

	var ctcMenu = {

		ww: function(){
			var ww = window.innerWidth;
			return ww;
		},

		rsz: function() {
			var $sm = $("#smlMenu")
			if(this.ww()>479){
				if($sm.is(":visible")){
					$sm.hide();
				};
			};
		},

		anim: function() {
			var $sm = $("#smlMenu");
			if($sm.is(":visible")){
				$sm.stop().slideUp("fast");
			} else {
				$sm.stop().slideDown("fast");
			};
		},

		showNavInfo: function(){
			$(".ctc" ).hover(function(){
			var hvr = $(this).attr("id"),
				$dp = $("#ddi p");
				console.log(hvr)
			switch(hvr) {
				case "pf":
					$dp.html("Have a look at my portfolio");
					break;
				case "pt":
					$dp.html("Fly back to the top of the page");
					break;
				case "gm":
					$dp.html("Flick me an email, it'd be great to hear from you.");
					break;
				case "gh":
					$dp.html("Check out my projects on Github.");
					break;
				case "gp":
					$dp.html("Jump into my circle on Google Plus");
					break;
				case "fb":
					$dp.html("Contact me on Facebook");
					break;
				case "menuBtn":
					$dp.html("Click to contact me!");
					break;	

			};
			$("#ddi").stop().slideToggle("fast");
			});
		}

	};


	var ampInfo = {
		
		aintro: function(){
			$doc.on("click", "#aOne", function(){
				$("#initAws").stop().slideDown("slow", function(){
					$("body").addClass("noscroll");
					$("#nameHolder").hide();
					return;
				});
			});
		},

		askill: function(){
			$doc.on("click", "#aTwo", function(){
				$("#skExpAws").stop().slideDown("slow", function(){
					$("body").addClass("noscroll");
					$("#nameHolder").hide();
					return;
				});
			});
		},
		
			
		clsAmp: function(){	
			$doc.on("click", ".closeTopic", function(){
				$(".dropInfoContainer").slideUp("slow", function(){
					$("body").removeClass("noscroll");
					trsz.tfm();
					$("#nameHolder").fadeIn("fast");
					return;
				});
			});
		}

	};

	var pageEvents = {
			init: function(){
					introAnimation();
					this.mseEvt();
					trsz.tfm();
					return;	
				},

			pgrsz: function() {
					trsz.tfm();
					plxFx.plx("plxBkgd");
					ctcMenu.rsz()
					return;
				},

			scrlEvt: function(){
					fixNav();
					pg.isInFrame();
					plxFx.plx("plxBkgd");
					return;
				},

			mseEvt: function(){
					
					ampInfo.aintro();
					ampInfo.askill();
					ampInfo.clsAmp();

					$(".pfObjOverlay").hover(function(){
						$(this).children(".pfInfo").stop().slideToggle("slow");
						return;
					});
					ctcMenu.showNavInfo();
					$doc.on("click", "#menuBtn", function(){
						event.preventDefault();
						ctcMenu.anim();
					});
					return;	
				}
			};

	$doc.ready(function(){

		pageEvents.init();

		window.onresize = (function(event){
			event.preventDefault();
			pageEvents.pgrsz();
		});

		window.onscroll = (function(event){
			event.preventDefault();
			pageEvents.scrlEvt();
		});

		
	});


}(jQuery, document, window));

