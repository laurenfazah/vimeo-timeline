var obj = {
        olympicDate:2024,
        pastDate:0,
        currentYear:new Date().getFullYear()
    },

    compiledDate = obj.olympicDate + obj.pastDate,
    // arbitrarily set olympics to july 1st 2024 (countdown requires month+1)
    olympics = new Date(compiledDate, 8-1, 10),

    date1 = {
        number:1,
        year:2007,
        startTime:0.01,
        endTime:10
    },
    date2 = {
        number:2,
        year:2010,
        startTime:100.01,
        endTime:110
    },
    date3 = {
        number:3,
        year:2013,
        startTime:180.01,
        endTime:190
    },
    date4 = {
        number:4,
        year:2015,
        startTime:236.543,
        endTime:236.544
    },

    activeDate,

    cardNum,

    cardSelector,

    overlaySelector,

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
        player.addEvent('playProgress', frameListen);
    });

    function onFinish(id) {
        // $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});
        $('#img').css("display","block");
        $('#replay').css("display","block");
        $('.interactive-img').css("display","block");
    }

    // jumps to appropriate time on video for timeline
    function jumpTo(time) {
        player.api('seekTo', time);
    }

    function frameListen (data, id) {
        if ((data.seconds < date1.endTime) ||
            (data.seconds > date2.startTime && data.seconds < date2.endTime) ||
            (data.seconds > date3.startTime && data.seconds < date3.endTime) ||
            (data.seconds > date4.startTime && data.seconds < date4.endTime)) {
            if (data.seconds < date1.endTime) {
                activeDate = date1;
                cardNum = 1;
            };

            if (data.seconds > date2.startTime && data.seconds < date2.endTime) {
                activeDate = date2;
                cardNum = 2;
            };

            if (data.seconds > date3.startTime && data.seconds < date3.endTime) {
                activeDate = date3;
                cardNum = 3;
            };

            if (data.seconds > date4.startTime && data.seconds < date4.endTime) {
                activeDate = date4;
                cardNum = 4;
            };
        } else {
            activeDate = undefined;
        }

        cardSelector = '.pop-up.' + cardNum;

        overlaySelector = ".info-card." + cardNum;

        if (activeDate !== undefined){
            $(cardSelector).addClass('active');
        } else {
            $('.pop-up').removeClass('active');
        }
    }

    // helping with jumping around video
    $(".year-button").click(function(){
        var buttonID = $(this).attr("id");

        switch(buttonID) {
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

    // replay button at end of video
    $("#replay").click(function(){
        $('#img').css("display","none");
        $('.interactive-img').css("display","none");
        jumpTo(0.00);
        player.api('play');
    })

    // creates overlay once pop up is clicked on
    $('.pop-up').click(function(){
        $(this).css('display', 'none');
        $('.overlay').css("display", "block");
        $(overlaySelector).css("display", "block");
        player.api('pause');
        // show X
    })

    // clicking out of informational overlay to resume video play
    $('.overlay').click(function(){
        $(this).css("display", 'none');
        $(cardSelector).css('display', 'block');
        $('.info-card').css("display", "none");
        player.api('play');
    })

    // on X click,
            // $('.overlay').css("display","none");
            // pop up hide
            // play video

});
