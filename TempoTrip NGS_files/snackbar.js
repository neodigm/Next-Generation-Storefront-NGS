var snck = (function(_d, eID) {
    var _nTimeout = 4400,
        _aQ = [];
    var _eSb = _d.getElementById(eID), // snackbar
        _eSbText = _eSb.querySelectorAll("P")[0];
    var _fClose = function() {
        _aQ.shift();
        _eSb.classList.remove("snackbar__cont--show");
        _eSb.classList.add("snackbar__cont--hide");
        if (_aQ.length != 0) { // fifo
            setTimeout(_fOpen, 1100);
        }
    };
    var _fOpen = function() { // show toast
        _eSbText.innerHTML = _aQ[0].replace("|", "<br>").replace("|", "<br>");
        _eSb.style.left = ((_d.body.clientWidth / 2) - (_eSb.clientWidth / 2)) + "px";
        _eSb.classList.remove("snackbar__cont--hide");
        _eSb.classList.add("snackbar__cont--show");
        if ("vibrate" in navigator) window.navigator.vibrate([16, 8]);
        setTimeout(_fClose, _nTimeout);
    };
    return {
        q: function(sMsg) {
            if (sMsg != _aQ[0]) _aQ.push(sMsg); // Debounce
            if (_aQ.length == 1) {
                _fOpen();
            }
        }
    }
})(document, "js-snackbar__id");