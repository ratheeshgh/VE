<style>body{color:#fff;padding:0;margin:0;font-size:13px;}.swiper-container{width:230px;height:320px;background:#000;-webkit-perspective:1200px;-moz-perspective:1200px;-ms-perspective:1200px;perspective:1200px;border-radius:3px;}.swiper-wrapper,.swiper-slide{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d;}.swiper-slide{position:relative;}.title{line-height:320px;text-align:center;font-weight:100;color:#fff;background:#0C599A;}.title span{font-size:60px;line-height:70px;display:inline-block;vertical-align:middle;}.mediumtitle{line-height:320px;text-align:center;font-weight:100;color:#fff;background:#0C599A;}.mediumtitle span{font-size:48px;line-height:50px;display:inline-block;vertical-align:middle;}.inner{padding:20px;font-size:12px;font-weight:300;color:#fff;background:#0C599A;}.caption{font-size:24px;font-weight:100;position:absolute;left:0;bottom:0;width:100%;text-align:center;background:rgba(0,0,0,0.5);padding:10px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;color:#fff;}.device{padding:30px 10px;background:#222;margin:10px auto;width:260px;border-radius:20px;border:4px solid #fff;box-shadow:0px 0px 10px rgba(0,0,0,0.5);}</style>
<div class="device">
<div class="swiper-container">
<div class="swiper-wrapper">
<div class="swiper-slide">
<div class="title">
<span>Welcome</span>
</div>
</div>
<div class="swiper-slide">
<div class="mediumtitle">
<span>Bank to determine what the tour will cover</span>
</div>
</div>
</div>
</div>
</div>
<script src="./templates/widgets/carousel/js/idangerous.swiper.js"></script>
<script src="./templates/widgets/carousel/js/idangerous.swiper.progress.js"></script>
<script>
    var mySwiper = new Swiper('.swiper-container',{
      progress:true,
      onProgressChange: function(swiper){
        for (var i = 0; i < swiper.slides.length; i++){
          var slide = swiper.slides[i];
          var progress = slide.progress;
          var rotate = -90*progress;
          if (rotate<-90) rotate=-90;
          if (rotate>90) rotate=90;
          var translate = progress*swiper.width/2;  
          var opacity = 1 - Math.min(Math.abs(progress),1);
          slide.style.opacity = opacity;
          swiper.setTransform(slide,'rotateY('+rotate+'deg) translate3d('+translate+'px,0,0)');
        }
      },
      onTouchStart:function(swiper){
        for (var i = 0; i < swiper.slides.length; i++){
          swiper.setTransition(swiper.slides[i], 0);
        }
      },
      onSetWrapperTransition: function(swiper) {
        for (var i = 0; i < swiper.slides.length; i++){
          swiper.setTransition(swiper.slides[i], swiper.params.speed);
        }
      }
    })
  </script>