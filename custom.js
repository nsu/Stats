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
     	setTimeout("makeTextBox()",randomFromInterval(500, 1400));
 	} else {
 	    $(".text").remove();
 	}
}

makeClickBox = function(){
    if ($('.clickable').length <= 14){
        clickBox = $("<div></div>");
        $(clickBox).addClass("clickable");
        var randX = randomFromInterval(10, 800);
		var randY = randomFromInterval(10, 500);
		$(clickBox).css('left', randX+'px');
		$(clickBox).css('top', randY+'px');
		$("body").append(clickBox);
	};
	if (gameOver !== true){
     	setTimeout("makeClickBox()",randomFromInterval(500, 1400));
    } else {
        $(".clickable").remove();
    }
}

function doTimer() {
    makeTextBox();
    setTimeout("makeClickBox()", randomFromInterval(500, 1400))
    setTimeout("endGame()", 30000)
}

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

var allStrings = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v']
var strings = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v']
totalPress = 0;
correctPress = 0;
totalClick = 0;
correctClick = 0;
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
    console.log(correctClick/totalClick)
    console.log(correctPress/totalPress)
    gameOver = true;
    $(".clickable").remove();
    $(".text").remove();
}