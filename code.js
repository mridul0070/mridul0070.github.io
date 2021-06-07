//Variables
var dict = {};
var rDict={};
var checkDict={};


function initializeColors() {
	randomizeColors()
	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++){
			name_str = (i+1).toString() + (j+1).toString();
			if (name_str == "55"){
				document.getElementById(name_str).style.backgroundColor = "white";

			}
			else{
				document.getElementById(name_str).style.backgroundColor = dict[name_str];
			}
			
		}
	}
	setrefColor();
}


function randomizeColors(){
	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++){
			ns = (i + 1).toString() + (j+1).toString();
			dict[ns] = getRandomColor();
		}
	}
	dict["55"]="white";
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

			else if(dict[colorIndex]=="white"){
				count++;
				console.log("avoided");
			} 
		    else {
				checkDict[colorIndex]=1;
			}
		}

		rDict[i]=colorIndex;
	}		 
			

	for(i=0;i<3;i++) {
		for(j=0;j<3;j++)
		{
			rname_str= "r" + (i+1).toString() + (j+1).toString();
			document.getElementById(rname_str).style.backgroundColor = dict[rDict[iteration]];
			iteration++;

		}
	}
}


function canSwap(identity){
	if(dict[identity-10]=="white") swap(identity-10,identity);

	else if(dict[identity+10]=="white") swap(identity+10,identity);

	else if(dict[identity-1]=="white") swap(identity-1,identity);

	else if(dict[identity+1]=="white") swap(identity+1, identity);

	checkWin();

}


function swap(x,y){
    var a= x.toString();
    var b= y.toString();
	temp=dict[b];
	dict[b]=dict[a];
	dict[a]=temp;
	document.getElementById(a).style.backgroundColor = dict[a];
    document.getElementById(b).style.backgroundColor = dict[b];
}


function checkWin() {
	for(i=0;i<3;i++) {
		for(j=0;j<3;j++) {
			 alpha= (i+1).toString() + (j+1).toString();
			 beta= "r" + (i+2).toString() + (j+2).toString();

			if(document.getElementById(alpha).style.backgroundColor != document.getElementById(beta).style.backgroundColor) {
				return
			}
		}
	}
	document.getElementById("win").innerHTML="victory!";
	var audio = new Audio('audio_file.mp3');
	audio.play();

}