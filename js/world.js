function World(options) {
    Util.extend(this,options)
}

World.getInstance = function ( options,isNewInstance ) {
    World._instance = isNewInstance ? new World(options) :(World._instance || new World(options));
    return World._instance;
}
World.prototype = {
    isDropOnGrounp: function (y) {
        if (y >= this.bottom) {
            // console.log('on Ground');
            return true;

        }
    }
}