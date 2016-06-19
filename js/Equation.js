var Equation = {
    G: 9.8,
    distance: function (v0, t, a) {
        t = t / 1000;
        return v0 * t + a * Math.pow(t, 2);
    },
    vt: function (v0, t, a) {
        t = t / 1000;
        return v0 + a * t;
    }
};