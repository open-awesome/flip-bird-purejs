(function () {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var screenDim = {};
    var global={score:0};

    (function setCanvasDim() {
        var rect = document.body.getBoundingClientRect();
        var w = rect.width, h = rect.height;
        screenDim.w = w;
        screenDim.h = h;

        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
    }());


    function drawScreen() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, screenDim.w, screenDim.h);
    }

    /**/


    function drawBackground(ctx, img) {
        ctx.drawImage(img, 0, 0, screenDim.w, screenDim.h);
    }
    function drawScore(ctx) {
      /*  ctx.fillStyle = '#cc55cc';
          ctx.font = "40px _sans"
         ctx.textBaseline = 'top';
        ctx.fillText(global.score, 100, 10);*/
    }

    function bindEvent(){
        var piece = document.querySelector('.pieces');
        Event.on('click',piece,function(){
            location.reload();
        })
        Event.on(Setting.Event.GAMEOVER,function(){
            bird.goDie();
            var cls = piece.getAttribute('class');
            piece.setAttribute('class',cls+' gameover');
        })
        Event.on(Setting.Event.SCORE,function(){
            global.score+=1;

            piece.innerText = global.score;
        })
        Event.on('keydown touchstart',document.querySelector('body'),function(e){

            if((e.type='keydown'&&e.keyCode == Event.keys.SPACE)|| e.type=='touchstart' ){

                bird.isDie() || bird.setPushUp(true);
            }

        })
    }
    function drawBird() {

        var img = new Image();
        img.src = bird.avatar;
        Util.newImage('img/background.png', function (backImg) {

            img.onload = function () {
                drawScreen();
                drawBackground(ctx, backImg);
                drawScore(ctx);
                world.isDropOnGrounp(bird.y + bird.dim.h) && bird.dropOnGround();
                bird.fly(ctx, img);

            }
        })

        ObstacleS(world,ctx,bird);
        requestAnimationFrame(function () {
            drawBird();
        })
    }

    var bird = Bird.getInstance({x:screenDim.w / 2,y:screenDim.h / 2});
    var world = World.getInstance({bottom:screenDim.h,dim:screenDim});
    drawBird();

    bindEvent();

}())