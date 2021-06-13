//Variables
var colorDict = {};
var refcolorIndex = [];
var checkDict = {};
var isBeginning = true;
var moves=0;
var order=0;




function initialize() {

var diff= window.prompt("enter difficulty (easy , normal)")
if(diff=="normal") {
	order=6; 
	prefix="n"; 
	 document.getElementById("easy").style.display="none"
	}
else { 
	order=5; 
	prefix="e";  
	 document.getElementById("normal").style.display="none" ;
	}
console.log(order);


	randomizeColors()
	for(i = 0; i < order; i++){
		for(j = 0; j < order; j++){
			name_str = prefix + (i+1).toString() + (j+1).toString();
			index = (i+1).toString() + (j+1).toString();
			if (name_str == "55"){
				document.getElementById(name_str).style.backgroundColor = "white";

			}
			else{
				document.getElementById(name_str).style.backgroundColor = colorDict[index];
			}
			
		}
	}
	setrefColor();
}


function randomizeColors(){
	for(i = 0; i < order; i++){
		for(j = 0; j < order; j++){
			ns = (i + 1).toString() + (j+1).toString();
			colorDict[ns] = getRandomColor();
		}
	}
	colorDict["55"]="white";
}


function getRandomColor(){
	colourArray=["Purple","Gold","DarkRed","DarkGreen","DodgerBlue","Navy"];
	return colourArray[Math.floor(Math.random()*6)];
}


function setrefColor(){
	iteration=0;

	for(i=0;i<((order-2)*(order-2));i++) {
		count=1;
		while(count!=0)
		{
			count=0;
			colorIndex=(Math.floor(Math.random()*order)+1).toString()+ (Math.floor(Math.random()*order)+1).toString();
			if(colorIndex in checkDict){
				count++;
			}

			else if(colorDict[colorIndex]=="white"){
				count++;
				console.log("avoided");
			} 
		    else {
				checkDict[colorIndex]=1;
			}
		}
		refcolorIndex.push(colorIndex);
		
	}		 
			

	for(i=0;i<(order-2);i++) {
		for(j=0;j<(order-2);j++)
		{
			rname_str= prefix + "r" + (i+1).toString() + (j+1).toString();
			document.getElementById(rname_str).style.backgroundColor = colorDict[refcolorIndex[iteration]];
			iteration++;

		}
	}
}


function canSwap(identity){

 	if(isBeginning){
 		start();
 		isBeginning=false;
 	}

 	var par = [];
 	var swapped=true;
 		 if(colorDict[identity-10]=="white") par=[identity-10,identity];     


	else if(colorDict[identity+10]=="white") par=[identity+10,identity]

	else if(colorDict[identity-1]=="white") par=[identity-1,identity];

	else if(colorDict[identity+1]=="white") par=[identity+1, identity];

	else swapped=false;

	if(swapped){

		swap(par[0],par[1]);
	   setTimeout(checkWin , 250) ; // checkWin();
	    moves++;

	} 

}


function swap(x,y){
    var a= x.toString();
    var b= y.toString();
	temp=colorDict[b];
	colorDict[b]=colorDict[a];
	colorDict[a]=temp;
	document.getElementById(prefix+a).style.backgroundColor = colorDict[a];
    document.getElementById(prefix+b).style.backgroundColor = colorDict[b];
    moves++;
}


function checkWin() {

	for(i=0;i<(order-2);i++) {
		for(j=0;j<(order-2);j++) {
			 alpha= prefix + "r" + (i+1).toString() + (j+1).toString();
			 beta=  prefix + (i+2).toString() + (j+2).toString();

			if(document.getElementById(alpha).style.backgroundColor != document.getElementById(beta).style.backgroundColor) {
				
				return;
			}
		}
	}

    stop();
	document.getElementById("win").innerHTML="victory! ";
	var audio = new Audio('audio_file.mp3');
	audio.play();

	var score= ((1/moves)*(1000)).toFixed(2);

	try {var hScore = localStorage.getItem("highScore");}
	catch(err){

		localStorage.setItem("highScore",0);

		 hScore=0;
	}
	if(score>=hScore)
	{
		hScore=score;
		localStorage.setItem("highScore", hScore);
		var pName = window.prompt("enter player name");
		localStorage.setItem("highscorer",pName);
		 var hScorer = localStorage.getItem("highscorer");

	}

	


	document.getElementById("result").innerHTML = " moves: " + moves.toString()  +  " |  score:   " + score.toString() + " |  time:   " + (timeElapsed/100).toString() + " seconds" + " |  Highscore:   " + hScore.toString() + "(" + hScorer + ")" ;



}



var timeElapsed = 0;
var myTimer;

function tick(){
    timeElapsed++;
    document.getElementById("time").innerHTML = "TIME ELAPSED:" + ((timeElapsed/100).toFixed(2)).toString();
}
function start(){
    //call the first setInterval
    myTimer = setInterval(tick,10);
}
function stop(){
    clearInterval(myTimer);
}

