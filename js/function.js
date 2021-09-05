$(function(){
    
	$(window).on("load resize",function(){
		$("#gnb>.gnb_container").height($(this).height());
		$("#partner>.pt_container").height($(this).height());
		$("section").height($(this).height());
	});
   
    //전체메뉴
    $("#gnb>.gnb_style").on("click",function(){
        $("#gnb>.gnb_container").stop().animate({
           right:0 
        });
		$("section .cont_list>li>figure>img,#partner,section>.contents>.cont_list>li>.list_txt").stop().animate({
			opacity:0.3
		});
		$(window).on("load resize",function(){
			$("#gnb>.gnb_container").css({
			   right:0
			});
		});
    });
    $("#gnb>.gnb_container>.close>a").on("click",function(evt){
		evt.preventDefault();
        $("#gnb>.gnb_container").stop().animate({
           right:-1000
        });
		$("section .cont_list>li>figure>img").stop().animate({
			opacity:0.8
		});
		$("#partner,section>.contents>.cont_list>li>.list_txt").stop().animate({
			opacity:1
		});
		if($(window).width()<769){
			$("#gnb>.gnb_container").stop().animate({
           		right:-300 
        	});
		}
		
		$(window).on("load resize",function(){
			$("#gnb>.gnb_container").css({
			   right:-1000
			});
			if($(window).width()<769){
				$("#gnb>.gnb_container").css({
					right:-300 
				});
			}
		});
    }); 
	
	$("#gnb .gnb_family_lang>div>p>a").on("click",function(evt){
		evt.preventDefault();
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			$("#gnb .gnb_family_lang>div>ul").stop().animate({
				height:400
			});
			if($(window).width()<769){
				$("#gnb .gnb_family_lang>div>ul").stop().animate({
					height:350
				});
			}
		}else{
			$("#gnb .gnb_family_lang>div>ul").stop().animate({
				height:0
			});
		}
	});
    
	//사업장소개
	$("#partner>.mnu_open").on("click",function(){
		$("#partner>.pt_container").stop().animate({
			left:0
		});
		$("section .cont_list>li>figure>img,#gnb,section .contents_btn,section>.contents>.cont_list>li>.list_txt").stop().animate({
			opacity:0.3
		});
	});
	$("#partner>.pt_container>.close>a").on("click",function(evt){
		evt.preventDefault();
		$("#partner>.pt_container").stop().animate({
			left:-1200
		});
		$("section .cont_list>li>figure>img").stop().animate({
			opacity:0.8
		});
		$("#gnb,section .contents_btn,section>.contents>.cont_list>li>.list_txt").stop().animate({
			opacity:1
		});	
		
		if($(window).width()<769){
			$("#partner>.pt_container").stop().animate({
           		left:-300 
        	});
		}
		
		$(window).on("load resize",function(){
			$("#partner>.pt_container").css({
			   left:-1200
			});
			if($(window).width()<769){
				$("#partner>.pt_container").css({
					left:-300 
				});
			}
		});	
	});
	
	$("#partner>.pt_container>ul>li").on("mouseover",function(){
		if($(window).width()>768){
			$(this).css({
			"box-shadow": "0 0 20px rgba(0,0,0,0.5)",
			"transition":"all 1s"
			});
			$(this).find("img").css({
				opacity: 0.5,
				"transition":"all 1s"
			});
			$(this).find(".txt").stop().animate({
				top:"50%"
			},function(){
				$(this).find("p").addClass("on");
			});
		}
	});	
	$("#partner>.pt_container>ul>li").on("mouseout",function(){
		if($(window).width()>768){
			$(this).stop().css({
				"box-shadow":"none",
				"transition":"all 1s"
			});	
			$(this).find("img").css({
				opacity: 1,
				"transition":"all 1s"
			});		
			$(this).find(".txt").stop().animate({
				top:"60%"
			},function(){
				$(this).find("p").removeClass("on");
			});
		}
	});

	//section
	var $list=$("section>.contents>.cont_list>li");
	var nowIdx=0;
	var oldIdx=nowIdx;
	
	var aniChk=false;
	
	$(window).on("load resize",function(){
		$list.eq(0).children(".list_txt").fadeIn().addClass("on");
		mousewheel();
	});
	
	$(document).on("scroll",function(){
		mousewheel();
	});
	
	var pageUp=function(){
		aniChk=true;
		$list.children(".list_txt").fadeOut().removeClass("on");
		$list.eq(nowIdx).stop().animate({
			"top":0
		},700,function(){
			aniChk=false;		
			$list.eq(nowIdx).children(".list_txt").fadeIn().addClass("on");
		});
		
	};

	var pageDown=function(){
		aniChk=true;
		$list.children(".list_txt").fadeOut().removeClass("on");
		$list.eq(oldIdx).stop().animate({
			"top":"100%"
		},700,function(){
			aniChk=false;
			$list.eq(nowIdx).children(".list_txt").fadeIn().addClass("on");
		});
	};	
	
	var mousewheel=function(){
		$("section").on("mousewheel DOMMouseScroll",function(evt){
			if(aniChk==false){
				//console.log("마우스휠 이벤트 발생");
				evt.originalEvent.wheelDelta; //크롬 Up:120(양수), Down:-120(음수)
				evt.originalEvent.detail; //파이어폭스 Up:-3(음수), Down:3(양수)

				if(evt.originalEvent.wheelDelta>0 || evt.originalEvent.detail<0){
					//마우스 휠을 위쪽으로 스크롤
					oldIdx=nowIdx;
					nowIdx--;
					if(nowIdx>=0){					
						pageDown();
					}else{
						nowIdx=0;
					};
					console.log(aniChk);

					if(aniChk==true){
						$(this).animate({
							"margin-top":0
						});
						$("footer").animate({
							bottom:-100
						});
						
					}

				}else{
					//마우스 휠을 아래쪽으로 스크롤
					if(nowIdx<3){
						nowIdx++;
						pageUp();
					}
					//console.log(nowIdx,oldIdx);
					console.log(aniChk);
					if(aniChk==false){
						$(this).animate({
							"margin-top":-80
						});
						$("footer").animate({
							bottom:0
						});
						
					}
				}
				$("section .contents_btn>ul>li").eq(nowIdx).addClass("on").siblings().removeClass("on");	
			};		
		});
	}
	
	$("section .contents_btn>ul>li>a").on("click",function(evt){
		evt.preventDefault();
		var mnuIdx=nowIdx;
		nowIdx=$(this).parent().index();
		
		if(mnuIdx>nowIdx){//Up
			$list.eq(mnuIdx).stop(true,false).animate({'top':'100%'});
			$list.eq(nowIdx).stop(true,false).animate({'top':'0%'})
					.siblings().stop(true,false).animate({'top':'100%'});
			console.log('up');
		}else{//Down
			$list.eq(nowIdx).stop(true,false).animate({'top':'0%'});
			console.log('down');
		}		
		console.log(mnuIdx,nowIdx);
		$list.eq(nowIdx).children(".list_txt").delay(300).fadeIn().addClass("on");
		$("section .contents_btn>ul>li").eq(nowIdx).addClass("on").siblings().removeClass("on");
	});
	
	$("footer .quick_menu>.family>.btn>a").click(function(evt){
		evt.preventDefault();
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			$("footer .quick_menu>.family>.site_list").fadeIn();
		}else{
			$("footer .quick_menu>.family>.site_list").fadeOut();
		}
	});
});