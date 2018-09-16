"use strict";
var Webf = Object.create(null);
window.Webf.filterUp = function(timeMax, rateMax) {
    var counter = 0;
    $('[data-selection-price]').each(function (index, dom) {
        var rate = parseFloat($(dom).data('selection-price')),
            time = parseInt($(dom).siblings('.time-description > div').text().substr(0, 2), 10);

        if (rate < rateMax && time < timeMax) {
            counter++;
            $(dom).parents('[data-event-treeid]').css('background', '#C5E384');
            $(dom).parent().css('border', '2px solid #E32636');
        }
    });

    if(counter > 0)
        console.log('FIND! '+ counter +' matches.');
};