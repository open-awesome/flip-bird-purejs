(function (win) {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var screenDim = {};
    var global = {score: 0};

    function setCanvasDim() {
        var rect = document.body.getBoundingClientRect();
        var w = rect.width, h = rect.height;
        screenDim.w = w;
        screenDim.h = h;

        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
    };
    setCanvasDim();


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

    function bindEvent(bird) {
        var piece = document.querySelector('.pieces');
        Event.on('resize', window,function(){
            //alert('resize');
            setCanvasDim();
            main(true);
        });
        Event.on('click', piece, function () {
            location.reload();
        })
        Event.on(Setting.Event.GAMEOVER, function () {
            bird.goDie();
            var cls = piece.getAttribute('class');
            piece.innerText="挂掉了"
            piece.setAttribute('class', cls + ' gameover');
        })
        Event.on(Setting.Event.SCORE, function () {
            global.score += 1;

            piece.innerText = global.score;
            if(global.score>=3){
                global.score = 0;
                //难度增加
                Setting.Bird.GScale+=0.5;
                Setting.Obstacle.GapScale -=0.5;
                main(true);
            }

        })
        Event.on('keydown touchstart', document.querySelector('body'), function (e) {

            if ((e.type = 'keydown' && e.keyCode == Event.keys.SPACE) || e.type == 'touchstart') {

                bird.isDie() || bird.setPushUp(true);
            }

        })
    }

    function cycle(bird,world, isNew ) {

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

        ObstacleS(world, ctx, bird, isNew);
        isNew && (isNew=false);
        requestAnimationFrame(function () {
            cycle(bird,world, isNew);
        })
    }

    function main(isNew) {
        var bird = Bird.getInstance({x: screenDim.w / 2, y: screenDim.h / 2},isNew);
        var world = World.getInstance({bottom: screenDim.h, dim: screenDim},isNew);
        cycle(bird,world,isNew);
        bindEvent(bird);

    }


    main();

    win.main = main;

}(window))