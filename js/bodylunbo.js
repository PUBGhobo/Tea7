         //每个
         var index1=0;
         var index2=0;
         var index3=0;
         var index4=0;
         var len=$(".chearfix.xlb1 .item").eq(0).width();

/////////////////////
        $(".content-item.xlb1").hover(function(){
            // clearInterval(timer);
            $(".left.xlb1").fadeIn(300);
            $(".right.xlb1").fadeIn(300);
        },function(){
            // timer = setInterval(picLoop,1000);
            $(".left.xlb1").fadeOut(300);
            $(".right.xlb1").fadeOut(300);
        })
        $(".index.xlb1 li").mouseover(function(){
            $(this).css("background-color","red")
                   .siblings().css("background-color","rgba(100,100,100,0.3)");
            let index = $(this).index();
            $(".chearfix.xlb1").animate({"left":-len*index},600);

        })
         ////////点击事件
        $(".left.xlb1").click(function(e){
           
            let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
            let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
         

            index1--;
                if (index1==-1) {
                    index1=0;
                    return;
                }
                content.animate({"left":-len*index1},600);
                indexx.eq(index1).css("background-color","red")
                       .siblings().css("background-color","rgba(100,100,100,0.3)");

        });
        $(".right.xlb1").click(function(e){
           
            let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
            let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
         

            if(index1==3){
                index1=3;
                return;
            }     
            index1++;          
            content.animate({"left":-len*index1},600);          
            indexx.eq(index1).css("background-color","red")
                .siblings().css("background-color","rgba(100,100,100,0.3)");

        });

 ///////////////////////////////////
        $(".content-item.xlb2").hover(function(){
            // clearInterval(timer);
            $(".left.xlb2").fadeIn(300);
            $(".right.xlb2").fadeIn(300);
        },function(){
            // timer = setInterval(picLoop,1000);
            $(".left.xlb2").fadeOut(300);
            $(".right.xlb2").fadeOut(300);
        })

        $(".index.xlb2 li").mouseover(function(){
            $(this).css("background-color","red")
                   .siblings().css("background-color","rgba(100,100,100,0.3)");
            let index = $(this).index();
            $(".chearfix.xlb2").animate({"left":-len*index},600);

        })
                 ////////点击事件
                 $(".left.xlb2").click(function(e){
                
                    let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
                    let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
               
        
                    index2--;
                        if (index2==-1) {
                            index2=0;
                            return;
                        }
                        content.animate({"left":-len*index2},600);
                        indexx.eq(index2).css("background-color","red")
                               .siblings().css("background-color","rgba(100,100,100,0.3)");
        
                });
                $(".right.xlb2").click(function(e){
                  
                    let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
                    let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
                
        
        
                    if(index2==3){
                        index2=3;
                        return;
                    }     
                    index2++;          
                    content.animate({"left":-len*index2},600);          
                    indexx.eq(index2).css("background-color","red")
                        .siblings().css("background-color","rgba(100,100,100,0.3)");
        
                });
 ///////////////////////////
        $(".content-item.xlb3").hover(function(){
            // clearInterval(timer);
            $(".left.xlb3").fadeIn(500);
            $(".right.xlb3").fadeIn(500);
        },function(){
            // timer = setInterval(picLoop,1000);
            $(".left.xlb3").fadeOut(300);
            $(".right.xlb3").fadeOut(300);
        })
        $(".index.xlb3 li").mouseover(function(){
            $(this).css("background-color","red")
                   .siblings().css("background-color","rgba(100,100,100,0.3)");
            let index = $(this).index();
            $(".chearfix.xlb3").animate({"left":-len*index},600);

        })
                 ////////点击事件
                 $(".left.xlb3").click(function(e){
                    
                    let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
                    let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
      
        
                    index3--;
                        if (index3==-1) {
                            index3=0;
                            return;
                        }
                        content.animate({"left":-len*index3},600);
                        indexx.eq(index3).css("background-color","red")
                               .siblings().css("background-color","rgba(100,100,100,0.3)");
        
                });
                $(".right.xlb3").click(function(e){
                
                    let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
                    let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
    
        
                    if(index3==3){
                        index3=3;
                        return;
                    }     
                    index3++;          
                    content.animate({"left":-len*index3},600);          
                    indexx.eq(index3).css("background-color","red")
                        .siblings().css("background-color","rgba(100,100,100,0.3)");
        
                });
 ////////////////////////////
        $(".content-item.xlb4").hover(function(){
            // clearInterval(timer);
            $(".left.xlb4").fadeIn(300);
            $(".right.xlb4").fadeIn(300);
        },function(){
            // timer = setInterval(picLoop,1000);
            $(".left.xlb4").fadeOut(300);
            $(".right.xlb4").fadeOut(300);
        })
        $(".index.xlb4 li").mouseover(function(){
            $(this).css("background-color","red")
                   .siblings().css("background-color","rgba(100,100,100,0.3)");
            let index = $(this).index();
            $(".chearfix.xlb4").animate({"left":-len*index},600);

        })

                 ////////点击事件
                 $(".left.xlb4").click(function(e){
        
                    let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
                    let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
             
                    index4--;
                        if (index4==-1) {
                            index4=0;
                            return;
                        }
                        content.animate({"left":-len*index4},600);
                        indexx.eq(index4).css("background-color","red")
                               .siblings().css("background-color","rgba(100,100,100,0.3)");
        
                });
                $(".right.xlb4").click(function(e){
                  
                    let content=$(e.target).parent().children().eq(1).children().eq(0);//chearfix xlb content
                    let indexx=$(e.target).parent().children().eq(1).children().eq(1).children();//index xlb   li
         
        
        
                    if(index4==3){
                        index4=3;
                        return;
                    }     
                    index4++;          
                    content.animate({"left":-len*index4},600);          
                    indexx.eq(index4).css("background-color","red")
                        .siblings().css("background-color","rgba(100,100,100,0.3)");
        
                });
       

