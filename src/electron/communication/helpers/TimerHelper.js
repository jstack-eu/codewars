module.exports = ( func, delay ) => {
    const instance = { };

    function tick( func, delay ) {
        if ( ! instance.started ) {
            instance.func = func;
            instance.delay = delay;
            instance.startTime = new Date().valueOf();
            instance.target = delay;
            instance.started = true;

            setTimeout( tick, delay );
        } else {
            const elapsed = new Date().valueOf() - instance.startTime,
                adjust = instance.target - elapsed;

            instance.func();
            instance.target += instance.delay;

            setTimeout( tick, instance.delay + adjust );
        }
    }

    return tick( func, delay );
};