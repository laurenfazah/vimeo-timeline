var obj = {
        olympicDate:2024,
        pastDate:0,
        currentYear:new Date().getFullYear()
    },

    compiledDate = obj.olympicDate + obj.pastDate,
    // arbitrarily set olympics to july 1st 2024 (countdown requires month+1)
    olympics = new Date(compiledDate, 8-1, 10),

    date1 = {
        year:2007,
        startTime:0.01,
        endTime:50
    },
    date2 = {
        year:2010,
        startTime:50.01,
        endTime:80
    },
    date3 = {
        year:2013,
        startTime:80.01,
        endTime:140
    },
    date4 = {
        year:2015,
        startTime:230.01,
        endTime:236.544
    },

    activeDate,

    resetCountdown = function(year) {
        obj.pastDate = obj.currentYear - year;
        compiledDate = obj.olympicDate + obj.pastDate;
        olympics = new Date(compiledDate, 8-1, 10);
        $('#countdown-banner').countdown('destroy');
        $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});
    };

$(function() {
    // $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});

    var iframe = $('#player1')[0],
        player = $f(iframe);

    // when the player is ready, add listeners
    player.addEvent('ready', function() {
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', changeYear);
    });

    function onFinish(id) {
        $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});
    }

    // jumps to appropriate time on video for timeline
    function jumpTo(time) {
        player.api('seekTo', time);
    }

    function changeYear (data, id) {
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

        if (activeDate !== undefined){
            resetCountdown(activeDate.year);
        }
    }

    $("button").click(function(){
        var buttonClass = $(this).attr("class");

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

        jumpTo(activeDate.startTime);
    });
});
