//Variables
var colorDict = {};
var refcolorIndex = [];
var checkDict = {};
var isBeginning = true;
var score=0;



function initializeColors() {
    
	randomizeColors()
	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++){
			name_str = (i+1).toString() + (j+1).toString();
			if (name_str == "55"){
				document.getElementById(name_str).style.backgroundColor = "white";

			}
			else{
				document.getElementById(name_str).style.backgroundColor = colorDict[name_str];
			}
			
		}
	}
	setrefColor();
}


function randomizeColors(){
	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++){
			ns = (i + 1).toString() + (j+1).toString();
			colorDict[ns] = getRandomColor();
		}
	}
	colorDict["55"]="white";
}


function getRandomColor(){
	colourArray=["red","blue","orange","green","yellow","violet"];
	return colourArray[Math.floor(Math.random()*6)];
}


function setrefColor(){
	iteration=0;

	for(i=0;i<9;i++) {
		count=1;
		while(count!=0)
		{
			count=0;
			colorIndex=(Math.floor(Math.random()*5)+1).toString()+ (Math.floor(Math.random()*5)+1).toString();
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
			

	for(i=0;i<3;i++) {
		for(j=0;j<3;j++)
		{
			rname_str= "r" + (i+1).toString() + (j+1).toString();
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
	    checkWin();
	    score++;

	} 

}


function swap(x,y){
    var a= x.toString();
    var b= y.toString();
	temp=colorDict[b];
	colorDict[b]=colorDict[a];
	colorDict[a]=temp;
	document.getElementById(a).style.backgroundColor = colorDict[a];
    document.getElementById(b).style.backgroundColor = colorDict[b];
    score++;
}


function checkWin() {

	for(i=0;i<3;i++) {
		for(j=0;j<3;j++) {
			 alpha= "r" + (i+1).toString() + (j+1).toString();
			 beta=  (i+2).toString() + (j+2).toString();

			if(document.getElementById(alpha).style.backgroundColor != document.getElementById(beta).style.backgroundColor) {
				
				return;
			}
		}
	}

    stop();
	document.getElementById("win").innerHTML="victory! ";
	var audio = new Audio('audio_file.mp3');
	audio.play();

	try {var hScore = localStorage.getItem("highScore");}
	catch(err){

		localStorage.setItem("highScore",0);

		 hScore=0;
	}
	if(score>=hScore)
	{
		hScore=score;
		localStorage.setItem("highScore", hScore);
	}

	document.getElementById("result").innerHTML="score: " + score.toString() + " time: " + timeElapsed.toString() + " seconds" + " High Score: " + hScore.toString() ;



}



var timeElapsed = 0;
var myTimer;

function tick(){
    timeElapsed++;
    document.getElementById("time").innerHTML = "Time Elapsed:" + (timeElapsed).toString();
}
function start(){
    //call the first setInterval
    myTimer = setInterval(tick, 1000);
}
function stop(){
    clearInterval(myTimer);
}

