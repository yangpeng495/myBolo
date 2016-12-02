
/*
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    initialSlide : 0,

    onTransitionEnd :function(swiper){
        var curIndex = swiper.activeIndex;
        var slides = swiper.slides;
        [].forEach.call(slides,function(item,index){
            var name = item.firstElementChild.className;
            item.firstElementChild.id = "";
            if(index == 0){
                navClose();
            }
            if(curIndex == index){
                item.firstElementChild.id = name;
                if(index == 0){
                    navOpen();
                }
            }
        })
    }
})
navOpen();
function navOpen(){
    if ( $.fn.makisu.enabled ) {
        var $maki = $( '.maki' );
        $maki.makisu({
            selector: 'dd',
            overlap: 0.6,
            speed: 0.6
        });
        $( '.list' ).makisu( 'open' );
    }
}

function navClose(){
    if ( $.fn.makisu.enabled ) {
        var $maki = $( '.maki' );
        $maki.makisu({
            selector: 'dd',
            overlap: 0.6,
            speed: 0.6
        });
        $( '.list' ).makisu( 'close' );
    }
}
*/
var mySwiper = new Swiper(".swiper-container", {
    direction: "vertical",
    loop: true,
    onSlideChangeEnd: function (swiper) {
        var slideAry = swiper.slides;
        var trueSlideNum = slideAry.length - 2;
        var lastNum = trueSlideNum + 1;
        var curIn = swiper.activeIndex;
        [].forEach.call(slideAry, function (item, index) {
            item.id = null;
            if (curIn == index) {
                switch (curIn) {
                    case 0 :
                        item.id = "page" + trueSlideNum;
                        break;
                    case lastNum :
                        item.id = "page1";
                        break;
                    default :
                        item.id = "page" + curIn;
                }
            }

        })

    }
})
~(function () {
    var music = document.querySelector(".music");
    var audioMusic = document.querySelector("#audioMusic");
    music.addEventListener("click", function () {
        if (audioMusic.paused) {
            audioMusic.play();
            music.className = "music musicMove";
            return;
        }
        audioMusic.pause();
        music.className = "music";
        music.style.opacity = 1;
    });
    window.setTimeout(function () {
        audioMusic.play();
        audioMusic.addEventListener("canplay", function () {
            music.className = "music musicMove";
        })
    }, 1000)
})()
