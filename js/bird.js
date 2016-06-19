/**
 *
 * bird {x,y,velocityY,}
 * */
function Bird( options ) {
    this.x = options.x;//screenDim.w / 2;
    this.y = options.y;// screenDim.h / 2;
    this.dim = {w: Setting.birdW, h: Setting.birdH };
    this.velocityY = 0;
    this.avatar = 'img/avatar.png';
    this.lastFlyTime = 0;
    this.isStopOnGround = false;
    this.isDead = false;

    this.pushUpState = false;
}

Bird.getInstance = function (options,isNewInstance) {
    Bird._instance = isNewInstance?new Bird(options):(Bird._instance || new Bird(options));
    return Bird._instance;
}
Bird.prototype = {
    YScale: 0.01,
    translateX:function( x ){
        //debugger;
        console.log(['xxx',x])
      this.x += x;
    },
    fly: function (ctx, img) {

        if (this.isStopOnGround) {
            ctx.save();
            ctx.setTransform(1,0,0,1,0,0);
            ctx.translate(this.x+15  ,this.y +15 );
            ctx.rotate(30*Math.PI/180);
            ctx.drawImage(img, -15, -15, this.dim.w, this.dim.h);
            ctx.restore();

        } else {
            var now = +new Date();
            var elapseTime = this.lastFlyTime ? now - this.lastFlyTime : 0;

            var g =  Equation.G*Setting.Bird.GScale;
            if(this.pushUpState){
                g= -10*g;
                this.velocityY = 0;
                this.setPushUp(false)
            }
            var s = Equation.distance(this.velocityY, elapseTime, g) / this.YScale;
            ctx.drawImage(img, this.x, this.y = this.y + s, this.dim.w, this.dim.h);
            g<0 ?console.warn(['路程',s,this.y]):console.log(['路程',s,this.y]);
            //console.log('draw bird');
            // console.log([this.x, this.y])
            this.lastFlyTime = +new Date();
            this.velocityY = Equation.vt(this.velocityY, elapseTime, g);
        }

    },

    setPushUp:function(isUP){
        this.pushUpState = isUP;
    },
    dropOnGround: function () {
        this.velocityY = 0;
        this.isStopOnGround = true;
    },
    goDie:function(){
        this.isDead = true;
    },
    isDie:function(){
        return this.isDead;
    }

}