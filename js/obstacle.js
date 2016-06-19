function Obstacle(options) {
    this.dim = {
        x: 0,
        y: 0,
        w: 30,
        h: 30
    };
    this.imgSrc = '';

    Util.extend(this, options);

}

Obstacle.prototype = {
    translateX: function (x) {

        this.dim.x += x;
        if (this.dim.x <= 0) {
            this.dim.x = this.world.dim.w;
        }
    },
    isCollide: function (dim) {
        var d = this.dim;
        var number = Util.Number;
        var collideObj = {isCollide: false, collideX: 0};
        if (number.contain(dim.x, d.x, d.x + d.w) && number.contain(dim.y, d.y, d.y + d.h)) {
            // console.log([number.contain(dim.x,d.x, d.x+ d.w) , number.contain( dim.y, d.y, d.y+ d.h)])
            collideObj = {isCollide: true, collideX: dim.x - d.x};
        }
        return collideObj;

    },
    draw: function (ctx) {
        var _this = this;
        Util.newImage(this.src, function (img) {
            var dim = _this.dim;
            ctx.drawImage(img, dim.x, dim.y, _this.dim.w, dim.h)
        })
    }
}

function ObstacleS(world, ctx, bird, isNew) {
    var birdH = Setting.birdH;
    isNew&&( ObstacleS._obstacles = []);
    var defaultOpts = ObstacleS.defaultOpts || (ObstacleS.defaultOpts = {
            obstacleCount: 5,
            obstaclePercent: 0.2,
            YScale: 0.5,
            birdGapScale: Setting.Obstacle.GapScale,
            obstacleTranslateX: world.dim.w,
            translateXScale: 0.01
        });
    var obstacleUnitW = world.dim.w / defaultOpts.obstacleCount;
    var obstacleW = obstacleUnitW * defaultOpts.obstaclePercent;
    var _obstacles = ObstacleS._obstacles || (ObstacleS._obstacles = []);
    var unitTranslateX = defaultOpts.translateXScale * obstacleUnitW;
    for (var i = 0; i < defaultOpts.obstacleCount; i++) {


        if (_obstacles[i * 2] && _obstacles[i * 2 + 1]) {
            var x = ObstacleS.isGameOver ? 0 : unitTranslateX;
            _obstacles[i * 2].translateX(-x)
            _obstacles[i * 2 + 1].translateX(-x)
            var isCollidaUp = _obstacles[i * 2].isCollide(bird),
                isCollidaDown = _obstacles[i * 2 + 1].isCollide(bird);
            if (isCollidaUp.isCollide || isCollidaDown.isCollide) {
                ObstacleS.isGameOver = true,
                isCollidaUp.isCollide && bird.translateX(-1 * (isCollidaUp.collideX + bird.dim.w)),
                isCollidaDown.isCollide && bird.translateX(-1 * (isCollidaDown.collideX + bird.dim.w)),
                    Event.trigger(Setting.Event.GAMEOVER)
            } else {
                var dim =_obstacles[i * 2].dim;
                //debugger;
                if(Util.Number.contain( bird.x, dim.x, dim.x+unitTranslateX*1.1 ) ){
                    Event.trigger(Setting.Event.SCORE)
                }
            }

        }
        else {
            //create new
            var x = ((1 - defaultOpts.obstaclePercent) / 2 + i) * obstacleUnitW + defaultOpts.obstacleTranslateX;
            var h = (world.dim.h - birdH * defaultOpts.birdGapScale) / 2;
            var scaleY = h * (1 - 1 / 2 * Math.random());

            _obstacles[i * 2] = new Obstacle({
                dim: {
                    x: x,
                    y: 0,
                    w: obstacleW,
                    h: scaleY
                }, src: 'img/obstacle_top.png', world: world
            });
            _obstacles[i * 2 + 1] || (_obstacles[i * 2 + 1] = new Obstacle({
                dim: {
                    x: x,
                    y: scaleY + birdH * defaultOpts.birdGapScale,
                    w: obstacleW,
                    h: h + scaleY
                }, src: 'img/obstacle_bottom.png', world: world
            }));
        }
        var topObstacle = _obstacles[i * 2]
            , bottomObstacle = _obstacles[i * 2 + 1];
        topObstacle.draw(ctx);
        bottomObstacle.draw(ctx);
    }
}
