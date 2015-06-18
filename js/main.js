var obj = {
        olympicDate:2024,
        pastDate:0,
        currentYear:new Date().getFullYear()
    },

    compiledDate = obj.olympicDate + obj.pastDate,
    olympics = new Date(compiledDate, 8-1, 10),

    date1 = {
        year:2007,
        startTime:0,
        endTime:3
    },
    date2 = {
        year:2010,
        startTime:6,
        endTime:7
    },
    date3 = {
        year:2013,
        startTime:10,
        endTime:11
    },
    date4 = {
        year:2015,
        startTime:14,
        endTime:15
    },

    resetCountdown = function(year) {
        obj.pastDate = obj.currentYear - year;
        compiledDate = obj.olympicDate + obj.pastDate;
        olympics = new Date(compiledDate, 8-1, 10);
        $('#countdown-banner').countdown('destroy');
        $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});
    };

$(function() {
    // may need to move back to its own anon function
    $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});

    var iframe = $('#player1')[0],
        player = $f(iframe);

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', changeYear);
        player.addEvent('seekTo', jumpTo);
    });

    function onFinish(id) {
        // will toggle next video
    }

    function jumpTo(seconds) {
        player.api(seekTo(seconds));
    }

    function changeYear (data, id) {
        var activeDate = {};

        if (data.seconds < date1.endTime) {
            activeDate = date1;
        };

        if (data.seconds > date2.startTime && data.seconds < date2.endTime) {
            activeDate = date2;
        };

        if (data.seconds > date3.startTime && data.seconds < date3.endTime) {
            activeDate = date3;
        };

        if (data.seconds > date4.startTime && data.seconds < date4.endTime) {
            activeDate = date4;
        };

        resetCountdown(activeDate.year);
    }

    $("button").click(function(){
        var buttonClass = $(this).attr("class"),
            activeDate = {};

        switch(buttonClass) {
            case "yr2007":
                activeDate = date1;
                break;
            case "yr2010":
                activeDate = date2;
                break;
            case "yr2013":
                activeDate = date3;
                break;
            case "yr2015":
                activeDate = date4;
                break;
        }

        resetCountdown(activeDate.year);
        jumpTo(activeDate.startTime); //start at beginning of year's frame
    });
});
