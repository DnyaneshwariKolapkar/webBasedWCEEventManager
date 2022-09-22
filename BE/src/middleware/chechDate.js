const currDate = function() {
    const currdate = new Date();
    
    const date = (currdate.getMonth() + 1) + '/' + currdate.getDate() + '/' + currdate.getFullYear();
    console.log(date);
    // console.log(currdate);
    // const result = currdate.toISOString().split('T')[0]
    return date;
}

module.exports = (currDate);