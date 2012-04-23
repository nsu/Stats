totalPress = 0;
correctPress = 0;
correctClick = 0;
totalClick = 0;
gameStarted = false;

makeTextBox = function(){
    if (strings.length != 0) {
        letter = randomLetter();
        val = $("<div></div>");
        $(val).addClass("text");
        $(val).attr("id", letter);
        $(val).html(letter);
        var randX = randomFromInterval(10, 800);
		var randY = randomFromInterval(10, 500);
		$(val).css('left', randX+'px');
		$(val).css('top', randY+'px');
		if ($("#"+letter)[0] == undefined){
         	$("body").append(val);
         }
     }
    if (gameOver !== true){
     	setTimeout("makeTextBox()",randomFromInterval(200, 1400));
 	} else {
 	    $(".text").remove();
 	}
}

makeClickBox = function(){
    if ($('.clickable').length <= 13){
        clickBox = $("<div></div>");
        $(clickBox).addClass("clickable");
        var randX = randomFromInterval(10, 800);
		var randY = randomFromInterval(10, 500);
		$(clickBox).css('left', randX+'px');
		$(clickBox).css('top', randY+'px');
		$("body").append(clickBox);
	};
	if (gameOver !== true){
     	setTimeout("makeClickBox()",randomFromInterval(200, 1400));
    } else {
        $(".clickable").remove();
    }
}

function doTimer() {
    makeTextBox();
    setTimeout("makeClickBox()", randomFromInterval(200, 1400))
    setTimeout("endGame()", 10000)
    totalClick = 0;
    totalClick -= 1;
    totalPress = 0;
}

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

var allStrings = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v']
var strings = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v']
gameOver = false

function randomLetter()
{
    strings = shuffle(strings);
    return strings.pop();
}

function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}

function round(n) {
	return Math.round(n*100+((n*1000)%10>4?1:0))/100;
}

function endGame() {
    name = "753848ea5e4c9568d6167c28dac1e532644027be";
    savedCookie = $.JSONCookie(name);
    savedCookie['clickAcc'] = correctClick/totalClick
    savedCookie['keyAcc'] = correctPress/totalPress
    savedCookie['clickRemaining'] = $(".clickable").length
    savedCookie['keyRemaining'] = $('.text').length
    savedCookie['correctClick'] = correctClick
    savedCookie['correctPress'] = correctPress
    $.ajax({
        url: 'http://source5.org/statsapp/submit/',
        data: savedCookie,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',        
    });
    gameOver = true;
    $(".clickable").remove();
    $(".text").remove();
    $("#accuracies").remove()
    var clickAcc = correctClick/totalClick
    var keyAcc = correctPress/totalPress
    var finalScore = $("<div></div>")
    finalScore.addClass("final-score")
    finalScore.append("Click accuracy: "+round(clickAcc*100)+"%<br />")
    finalScore.append("Keyboard accuracy: "+round(keyAcc*100)+"%<br />")
    finalScore.append("Total correct clicks: "+correctClick+"<br />")
    finalScore.append("Total correct keypresses: "+correctPress+"<br /><br />")
    finalScore.append("<span>Final Score: "+round(((correctPress+correctClick)/2)*((clickAcc+keyAcc)/2)*100)+"</span>")
    $("body").append(finalScore)
}

function makeGUID() {
    d = new Date()
    time = String(d.getTime())
    rand = String(randomFromInterval(0, 10000))
    return time+rand
}
