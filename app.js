window.filterUp = function (timeLimit, rateMax, ratioScore, delay) {
    $('#header_balance').append($('<span></span>', { class: 'consoleLog' }));

    setInterval(function () {
        var counter = 0;
        function switchUp($line, squares) {
            $line.removeAttr('style');
            $line.css('background', '#C5E384');

            squares.elems.forEach(function (priceItem) {
                $(priceItem).removeAttr('style').css('background', '#9ACD32');
            });
        }

        $('[data-event-treeid]')
            .filter(function (indx) {
                var currentTime = $(this).find('.time-description > .green').text().split(':', 1)[0];
                if (currentTime >= timeLimit)
                    return true;
                return false;
            })
            .each(function (indx, dom) {
                var score, rates = { count: 0, elems: [] };

                score = $(dom).find('.result-row .red').text().split(" ", 3)[2].split(':').sort(function (a, b) { return a - b; });
                //console.log(score);
                score = (typeof score == 'object') ? (score[0] / score[1] < ratioScore) : false;


                $(dom).find('.price').each(function (i, elem) {
                    var currentRate = $(elem).find('[data-selection-price]').data('selection-price');
                    if (typeof currentRate == 'number' && (currentRate > rateMax && currentRate < rateMax * 1.1)) {
                        rates.count++;
                        rates.elems[rates.count] = elem;
                    }
                });

                //console.log('SCORE: ' + score + '\nRATES: ' + rates.count + '\n\n');

                if (score && rates.count == 1) {
                    counter++;

                    switchUp($(dom), rates);
                }
            });

            $('.consoleLog').text('FIND! ' + counter + ' matches.');
    }, delay);
};