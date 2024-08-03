var date = new Date();
var year = date.getFullYear();

var year = document.getElementById('year').textContent = year;


$(function(){
    setTimeout(function(){
        $("#section").addClass("sectionAfter");
    }, 850);
});


$(function(){
    setTimeout(function(){
        $("#aside").addClass("asideAfter");
    }, 1000);
});