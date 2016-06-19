var Event = {
    on: function (type, ele, fn) {
        if (fn) {
            type = type.split(' ');
            type.forEach(function (t, i) {
                ele.addEventListener(t, fn, true);
            })
        }
        if (!fn) {
            fn = ele;
            Event._map = Event._map || (Event._map = {});
            Event._map[type] = {fn: fn};
        }
    },
    keydown: function (ele, fn) {
        this.on('keydown', ele, fn);
    },
    trigger: function (type, ctx, param) {
        var meta = Event._map[type];
        meta && meta.fn.call(ctx || window, param);
    },
    keys: {
        SPACE: 32
    }
}