totalPress = 0;
correctPress = 0;
correctClick = 0;
totalClick = 0;
gameStarted = false;
totalClickBoxes = 0
totalKeyBoxes = 0


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
         	totalKeyBoxes += 1;
         }
     }
    if (gameOver !== true){
     	setTimeout("makeTextBox()",randomFromInterval(100, 1300));
 	} else {
 	    $(".text").remove();
 	}
}

makeClickBox = function(){
    if ($('.clickable').length <= 17){
        clickBox = $("<div></div>");
        $(clickBox).addClass("clickable");
        var randX = randomFromInterval(10, 800);
		var randY = randomFromInterval(10, 500);
		$(clickBox).css('left', randX+'px');
		$(clickBox).css('top', randY+'px');
		$("body").append(clickBox);
		totalClickBoxes += 1
	};
	if (gameOver !== true){
     	setTimeout("makeClickBox()",randomFromInterval(100, 1300));
    } else {
        $(".clickable").remove();
    }
}

function doTimer() {
    makeTextBox();
    setTimeout("makeClickBox()", randomFromInterval(100, 1300))
    setTimeout("endGame()", 60000)
    totalClick = 0;
    totalClick -= 1;
    totalPress = 0;
}

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

var allStrings = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', '1', '2', '3', '4']
var strings = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', '1', '2', '3', '4']
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
    savedCookie['clickRatio'] = correctClick/totalClickBoxes
    savedCookie['keyRatio'] = correctPress/totalKeyBoxes
    $.ajax({
        url: 'http://source5.org/statsapp/submit/',
        // url: 'http://localhost:8000/submit/',
        data: savedCookie,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',        
    });
    gameOver = true;
    console.log(savedCookie)
    $(".clickable").remove();
    $(".text").remove();
    $("#accuracies").remove()
    var clickAcc = correctClick/totalClick
    var keyAcc = correctPress/totalPress
    var clickRatio = correctClick/totalClickBoxes
    var keyRatio = correctPress/totalKeyBoxes
    var finalScore = $("<div></div>")
    finalScore.addClass("final-score")
    finalScore.append("Click accuracy: "+round(clickAcc*100)+"%<br />")
    finalScore.append("Keyboard accuracy: "+round(keyAcc*100)+"%<br />")
    finalScore.append("Boxes clicked: "+round(clickRatio*100)+"%<br />")
    finalScore.append("Keys pressed: "+round(keyRatio*100)+"%<br /><br />")
    finalScore.append("<span>Final Score: "+round(((keyRatio+clickRatio)/2)*((clickAcc+keyAcc)/2)*10000)+"</span>")
    $("body").append(finalScore)
    var leaderBoard = $("<div></div>");
    leaderBoard.addClass("leader-link");
    leaderBoard.append('<a href="http://source5.org/statsapp/leaderboard/'+savedCookie['guid']+'/">Leaderboard</a>')
    $("body").append(leaderBoard)
}

function makeGUID() {
    d = new Date()
    time = String(d.getTime())
    rand = String(randomFromInterval(1000, 9999))
    return time+rand
}
