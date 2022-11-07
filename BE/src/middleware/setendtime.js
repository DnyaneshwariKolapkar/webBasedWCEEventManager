// function setendtime (start, duration) {
//     var end = start.split(':');
//     end = parseInt(end) + parseInt(duration);
//     end = end.toString() + ':' + start.split(':')[1];
//     // console.log(end);
//     return end;
// }

function setendtime (start, duration) {
    var starthour = start.split(':');
    var startmin = starthour[1];
    var durhour = duration.split(':');
    var durmin = durhour[1];
    var endhour = parseInt(starthour) + parseInt(durhour);
    var endmin = parseInt(startmin) + parseInt(durmin);
    if(endmin > 60){
        endhour = endhour + 1;
        endmin = endmin - 60;
    }
    endhour = endhour.toString();
    endmin = endmin.toString();
    if(endhour.length == 1){
        endhour = '0' + endhour;
    }
    if(endmin.length == 1){
        endmin = '0' + endmin;
    }
    const endtime = endhour + ':' + endmin;
    console.log(endtime);
    return endtime;
}

function setstarttime (start) {

    var start = start.split(':');
    if( start[0]. length == 1) {
        start[0] = '0' + start[0];
    }
    if( start[1]. length == 1) {
        start[1] = '0' + start[1];
    }
    start = start[0] + ':' + start[1];
    console.log(start);
    return start;
}

module.exports = { setendtime, setstarttime };