var playing = false;
var score = 0;
var action;
var timeRemain = 60;
var correctAnswer = 0;
var wrongCounter = 1;
//Click 

document.getElementById("start").onclick =
function()
{
    //if playing
    if(playing == true){
        location.reload();
    }else {
        playing = true;
        // if not playing
          //set score to 0
        document.getElementById("scoreValue").innerHTML = score;
        //show countdown box
        timeRemain = 61;
        show("timer");
        //hide the game over banner
       
        hide("gameover");
         //change button to reset
        document.getElementById('start').innerHTML = "Reset Game";
         //countdown time by sec
        startCountdown();
        //generate new Q&A
        generateQA();

    }

}
    
// if we click on answer box
for(var i = 1;i < 5;i++){
    document.getElementById("box"+i).onclick = function()
    {
        //if playing
        if(playing == true){
            //if correct
            if(this.innerHTML == correctAnswer){
                show("correct");
                score ++;
                document.getElementById("scoreValue").innerHTML = score;
                hide ("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                //Generate QA
                generateQA();

            }else {               
                show("wrong");
                hide ("correct");
                wrongCounter --;
                setTimeout(function(){
                    hide("wrong");
                },1000);
                if (wrongCounter >= 0){
                    if(score > 0){
                        score --;
                    }else {
                        score =0;
                    }
                }                
              //Generate QA
               // generateQA();
                document.getElementById("scoreValue").innerHTML = score;
                  
            }
                
        }
    } 
}
    
        //if correct
            //yes
                //inscrease score
                //show correctbox for one sec
                //generate new Q&A
            //no
                //show try again box
//Start Counter
function startCountdown(){
    action = setInterval(function(){
        timeRemain -= 1;
        document.getElementById("timerValue").innerHTML = timeRemain;
        if(timeRemain == 0){
            //Game Over
            clearInterval(action);
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over! <br /> YOUR SCORE IS "+ score +"!</p>"
            hide("timer");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById('start').innerHTML = "Start Game";

        }
    },1000);    
}
//hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
//display an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate QA
function generateQA(){
    var x = 1 + Math.round(9*Math.random()); 
    var y = 1 + Math.round(9*Math.random()); 
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition =  1 + Math.round(3*Math.random()); 
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //Fill one box with correct answer

    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];

    for (var i=1; i < 5; i++) {
        if(i !== correctPosition){
            var wrongAnswer; 
           do{
            wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random())); //wrong answer
           }while (answers.indexOf(wrongAnswer) > -1 || wrongAnswer <= correctAnswer) 
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

