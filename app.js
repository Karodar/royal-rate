// Created by Karodar

window.filterUp = function (timeLimit, rateMax, ratioScore) {
    let delay = 3000,
        info = $('<span></span>', {
            class: 'consoleLog'
        });
    $('#header_balance').append(info);

    setInterval(function () {
        let counter = 0;

        function switchUp($line, $square, event = false) {
            $line.removeAttr('style');
            $square.removeAttr('style');

            $line.attr('sealed', 'line');
            $square.attr('sealed', 'square');
            if (event) $square.attr('sealed-event', true);
            backlight();
        }

        function backlight() {
            $('[sealed]').each(function (indx, dom) {
                switch ($(dom).attr('sealed')) {
                    case 'line':
                        $(dom).css('background', '#C5E384');
                        break;
                    case 'square':
                        $(dom).css('background', '#9ACD32');
                        if ($(dom).attr('sealed-event'))
                            $(dom).css('outline', '2px solid #B3446C');
                        break;
                }
            });
        }

        $('[data-event-treeid]').each(function (indx, dom) {
            let timeGame = $(this).find('.time-description > .green').text().trim().split(':', 1)[0];

            if (timeGame >= timeLimit || !Boolean(timeGame)) {
                let valScore = $(dom).find('.result-row .red').text().trim().split(" ", 1)[0].split(':').sort(function (a, b) { return a - b; });
                valScore = valScore[0] / valScore[1];

                if (valScore <= ratioScore) {
                    $(this).find('.price').each(function (square_indx, elem) {
                        $rate = $(elem).find('[data-selection-price]');
                        if ($rate.data('selection-price') >= rateMax && $rate.data('selection-price') <= rateMax * 1.1) {
                            counter++;
                            switchUp($(dom), $(elem));

                            $rate.parent().click(function (e) {
                                switchUp($(dom), $(elem), true);
                            });
                        }
                    });
                }
            }
        });
        
        info.fadeTo(delay / 2, 1).text('FIND! ' + counter + ' matches');
        info.fadeTo(delay / 2, 0.3);
    }, delay);
};