// ref https://github.com/WICG/EventListenerOptions/pull/30
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch (e) { }
    return supportsPassiveOption;
}

var myScroll;

function loaded() {
    myScroll = new IScroll('#third', {
        mouseWheel: true,
        bindToWrapper: false,
        // Options.scrollbars: true,
        indicators: [{
            el: document.getElementById('starfield1'),
            resize: false,
            ignoreBoundaries: true,
            speedRatioY: 0.4
        }, {
            el: document.getElementById('starfield2'),
            resize: false,
            ignoreBoundaries: true,
            speedRatioY: 0.2
        }]
    });
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
    capture: false,
    passive: false
} : false);