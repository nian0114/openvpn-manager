const APIURL = 'http://10.10.10.28:12888/b.php';
const APIKEY = 'LbT6pbaJtKuxCsUUev8q7';

$(function () {
    translate();
    getJson(json => {
        init(json);
    });
});

setInterval(()=>{
    getJson(json => {
        init(json);
    });
}, 60000);
//Can't go under 10s for the refresh rate since the file openvpn-status.log is refreshed every 10s server side.

function init(json) {
    if (json.status === 'success') {
        var onlineUsers = $('#online')[0];
        var updated = $('#updated')[0];
        var connectionList = $('#connectionList')[0];
        var users = json.users.length;

        onlineUsers.innerText = (users < 2) ? chrome.i18n.getMessage("onlineUser", [users]) : chrome.i18n.getMessage("onlineUsers", [users]);
        updated.innerText = json.updated;

        $(connectionList).empty();
        for (var i = 0; i < json.users.length; i++) {
            var user = json.users[i];
            var tr = $('<tr></tr>');
            tr.append('<td class="column1">' + user.CommonName + '</td>');
            tr.append('<td class="column2">' + user.RealAddress + '</td>');
            tr.append('<td class="column3">' + user.BytesReceived + '</td>');
            tr.append('<td class="column4">' + user.BytesSent + '</td>');
            tr.append('<td class="column5">' + user.VirtualAddress + '</td>');
            tr.append('<td class="column6">' + user.Since + '</td>');
            $(connectionList).append(tr);
        }
    }
    else {
        //error
    }
}

function getJson(callback) {
    $.get(APIURL, {key: APIKEY}, json => {
        callback(json);
    });
}

function translate() {
    $('[data-resource]').each(function () {
        var el = $(this);
        var resourceName = el.data('resource');
        var resourceText = chrome.i18n.getMessage(resourceName);
        el.text(resourceText);
    });
}