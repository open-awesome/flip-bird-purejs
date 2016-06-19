var Util = {
    cache: {},
    newImage: function (src, fn) {
        if (this.cache[src]) {
            fn(this.cache[src]);
        }
        var img = new Image();
        this.cache[src] = img;
        img.src = src;
        img.onload = function () {
            fn(img)
        };
    },
    extend:function(src, dst){
        for( i in dst){
            src[i]=dst[i];
        }
    },
    Number:{
        contain:function(x,start,end){
            if(x>start && x<end){
                return true;
            }
        }
    }
}