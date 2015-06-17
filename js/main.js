var obj = {
        olympicDate:2024,
        pastDate:0,
        currentYear:new Date().getFullYear()
    }

// $(function countDown() {
setInterval(function(){
    var compiledDate = obj.olympicDate + obj.pastDate;
    var olympics = new Date(compiledDate, 8-1, 10);
    $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});
    console.log("test", obj.pastDate);
},1000);

$(function() {
    var iframe = $('#player1')[0];
    var player = $f(iframe);
    var status = $('.status');

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        status.text('ready');

        player.addEvent('pause', onPause);
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', onPlayProgress);
        player.addEvent('playProgress', year);
    });

    // Call the API when a button is pressed
    $('button').bind('click', function() {
        player.api($(this).text().toLowerCase());
    });

    function onPause(id) {
        status.text('paused');
    }

    function onFinish(id) {
        status.text('done-zo');
    }

    function onPlayProgress(data, id) {
        status.text(data.seconds + 's played');
    }

    function year (data, id) {
        if (data.seconds > 3 && data.seconds < 4) {
            // 2007 marker on timeline
            obj.pastDate = obj.currentYear - 2007;
            console.log(obj.pastDate);
        };
        if (data.seconds > 6 && data.seconds < 7) {
            // 2010 marker on timeline
            obj.pastDate = obj.currentYear - 2010;
            console.log(obj.pastDate);
        };
        if (data.seconds > 10 && data.seconds < 11) {
            // 2013 marker on timeline
            obj.pastDate = obj.currentYear - 2013;
            console.log(obj.pastDate);
        };
        if (data.seconds > 14 && data.seconds < 15) {
            // 2015 marker on timeline
            obj.pastDate = obj.currentYear - 2015;
            console.log(obj.pastDate);
        };
    }

});

// obj.watch('pastDate', function(id, oldval, newval){
//     var compiledDate = obj.olympicDate + obj.pastDate;
//     var olympics = new Date(compiledDate, 8-1, 10);
//     $('#countdown-banner').countdown({until: olympics, format: 'YOWDHMS'});
// })


