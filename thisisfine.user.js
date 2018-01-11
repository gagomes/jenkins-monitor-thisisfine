// ==UserScript==
// @name         jenkins-monitor-thisisfine
// @namespace    http://github.com/gagomes
// @version      0.1
// @description  Change red (broken) builds background to the "this is fine" gif
//		 in the jenkins monitor plugin
// @author       Goncalo Gomes
// @match        http*://*/view/*
// @grant        none
// ==/UserScript==

function xpathify(xpath)
{
    let results = [];
    let query = document.evaluate(xpath, document,
                                  null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);

    for (i = 0, length=query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }

    return results;
}

function _start()
{
    nodes = xpathify("//li[@class='failing basic project widget']");
    for (i = 0; i < nodes.length; i++) {
        nodes[i].innerHTML = "";
        nodes[i].style.backgroundImage = "url('https://raw.githubusercontent.com/gagomes/jenkins-monitor-thisisfine/master/thisisfine.gif')";
        nodes[i].style.backgroundRepeat = "no-repeat-y";
        nodes[i].style.backgroundSize = "40%";
    }
}

(function() {
    'use strict';

    window.setInterval(function(){
        _start();
    }, 1500);
})();
