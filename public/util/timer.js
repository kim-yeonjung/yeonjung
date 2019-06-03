/*Inspired by the Dribble shot: "Timer UI Design (IWatch)" by Mark Gerkules
 https://dribbble.com/shots/2926263-Timer-UI-Design-IWatch*/

$(document).ready(function() {
    var timer = 'true',
        mmin = 20,
        min = 0,
        sec = 0,
        perc = 612,
        percm = perc;

    startTimer(timer);
    $('.o-opt-btn.display').html(mmin);
    $('.t-time').text(min + ':0' + sec);
    $('.oop').text('of ' + mmin);

    $('.pause-btn').on('click', function() {
        startTimer(timer);
        if ($('.watch-ui').hasClass('menu-open'))
            $('.watch-ui').removeClass('menu-open');
    });

    $('.repeat-btn').on('click', function() {
        min = 0;
        sec = 0;
        perc = 612;
        if ($('.watch-ui').hasClass('menu-open'))
            $('.watch-ui').removeClass('menu-open');
        $('.c-c').css('stroke-dashoffset', perc);
        $('.t-time').text(min + ':0' + sec);
    });

    $('.menu-btn').on('click', function() {
        $('.watch-ui').toggleClass('menu-open');
    });

    $('.o-opt-btn').on('click', function() {
        if ($(this).hasClass('b-inc')) {
            if (mmin < 99)
                mmin++;
        } else if ($(this).hasClass('b-dec')) {
            if (mmin > 1)
                mmin--;
        }
        $('.o-opt-btn.display').html(mmin);
        $('.oop').text('of ' + mmin);
    });

    function startTimer(func) {
        timer = !timer;
        if (func) {

            $('.pause-btn span').removeClass('glyphicon-play').addClass('glyphicon-pause');
            timerInt = setInterval(function() {
                sec++;
                perc = perc - (percm / 60);

                if (sec >= 60) {
                    sec = 0;
                    min++;
                    if (!(min >= mmin))
                        perc = 612;
                }

                if (sec <= 9)
                    sec = '0' + sec;

                $('.c-c').css('stroke-dashoffset', perc);
                $('.t-time').text(min + ':' + sec);

                if (min >= mmin) {
                    timer = !timer;
                    min = 0;
                    sec = 0;
                    perc = 612;
                    $('.pause-btn span').removeClass('glyphicon-pause').addClass('glyphicon-play');
                    clearInterval(timerInt);

                }
            }, 1000);
        } else {
            clearInterval(timerInt);
            $('.pause-btn span').removeClass('glyphicon-pause').addClass('glyphicon-play');

        }
    };

});