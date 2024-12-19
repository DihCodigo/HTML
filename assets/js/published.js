(function loadGPT() {
    const script = document.createElement('script');
    script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);
})();

window.googletag = window.googletag || { cmd: [] };
  
    var anchor_slot;
    var REFRESH_KEY = 'refresh';
    var REFRESH_VALUE = 'true';

googletag.cmd.push(function () {
    var mapping_header = googletag.sizeMapping()
        .addSize([200, 200], [[320, 50], [320, 100]])
        .addSize([980, 200], [[970, 250], [728, 90]])
        .build();
    
    var mapping_retangle = googletag.sizeMapping()
        .addSize([200, 200], [[300, 250]])
        .addSize([980, 200], [[300, 250]])
        .build();
  

    googletag.defineSlot('/7542/parceiros/amomeupet', [[970, 250]], 'r7_header')
        .defineSizeMapping(mapping_header)
        .setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .setTargeting('refreshed_slot', 'false')
        .addService(googletag.pubads());
  
    googletag.defineSlot('/7542/parceiros/amomeupet', [[300, 250]], 'r7_texto')
        .defineSizeMapping(mapping_retangle)
        .setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .setTargeting('refreshed_slot', 'false')
        .addService(googletag.pubads());
  
    anchor_slot = googletag.defineOutOfPageSlot('/7542/parceiros/anchorpbs', googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR);

    if(anchor_slot){
        anchor_slot.setTargeting(REFRESH_KEY, REFRESH_VALUE).setTargeting('refreshed_slot', 'false').addService(googletag.pubads());
    } else {
        console.log("Anchor not loaded");
    }

    var SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
    googletag.pubads().addEventListener('impressionViewable', function (event) {
        var slot = event.slot;
        if(slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
            slot.setTargeting('refreshed_slot', 'true');
            setTimeout(function () {
                googletag.pubads().refresh([slot]);
            }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
        }
    });

    googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 100,
        renderMarginPercent: 100,
        mobileScaling: 2.0
    });

    googletag.pubads().set('page_url', 'https://gam-demo.formula-ai.co/');
    googletag.pubads().setTargeting('gamGtmDemo', 'true');
    googletag.pubads().setCentering(true);
    googletag.enableServices();

    googletag.display(anchor_slot);
});
function appendAd(adUnitID) {
    var existingDiv = document.getElementById(adUnitID);
    
    if (existingDiv) {
        googletag.cmd.push(function () {
            googletag.display(adUnitID);
        });
    }
}

appendAd('r7_header');
    appendAd('r7_texto');