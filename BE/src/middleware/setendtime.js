function setendtime (start, duration) {
    var end = start.split(':');
    end = parseInt(end) + parseInt(duration);
    end = end.toString() + ':' + start.split(':')[1];
    console.log(end);
    return end;
}

module.exports = setendtime;