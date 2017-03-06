var questionsAnswers;
var questionCount = 0;
$(document).ready(function() {

//Declare quesions and answers variables
questionsAnswers = [
        {
        question: "In the song Dancing Through Life who has a crush on Galinda?",
            answers: ["Boq","Bic", "Fiyaro", "The Wizard"],
            correct: "Boq",
            imgUrl: "assets/images/boq.jpg"
        },
        {
        question: "In the song 'Defying Gravity' Where should you look to find Elphaba?",
            answers: ["Munchkin Land", "Western Sky", "Eastern Sky", "Oz"],
            correct: "Western Sky",
            imgUrl: "assets/images/westernsky.jpg"
        },
        {
        question: "Why does Elphaba loath Galinda at the beginning of the song 'What is this Feeling?'",
            answers: ["She is unusually and exeedingly peculiar", "She is Blonde", "She doesn't loathe her", "She is preppy"],
            correct: "She is Blonde",
            imgUrl: "assets/images/blonde.jpg"
        },
        {
        question: "Who is the Wicked Witch Of the West?",
            answers: ["Elphaba", "Galinda", "Nessa Rose", "Madame Morrible"],
            correct: "Elphaba",
            imgUrl: "assets/images/elphaba.jpg"
        },
        {
        question: "What type of Animal is Doctor Dillamond?",
            answers: ["a Lion", "a Goat", "an Owl", "a Fox"],
            correct: "a Goat",
            imgUrl: "assets/images/drdillamond.jpg"
        },
        {
        question: "What does Elphaba turn Fiyero into?",
            answers: ["a Statue", "a Tin Man", "a Lion", "a Scarecrow"],
            correct: "a Scarecrow",
            imgUrl: "assets/images/scarecrow.jpg"
        },
        {
        question: "What word correctly completes this lyric from 'No One Mourns The Wicked'? 'Let us be glad/Let us be grateful/Let us ______ that goodness could subdue/The wicked workings of you-know-who.'",
            answers: ["be happy", "celebrate", "rejoicify", "delightify"],
            correct: "rejoicify",
            imgUrl: "assets/images/rejoicify.jpg"
        },
        {
        question: "After Galinda and Elphaba become friends, what nickname does Galinda give Elphaba?",
            answers: ["Elphie", "Elpha", "Ellie", "Effie"],
            correct: "Elphie",
            imgUrl: "assets/images/elphie.jpg"
        },
        {
        question: "In the song 'Dancing Through Life', Galinda gives Elphaba something that becomes part of Elphaba's stereotypical image as a joke. What is this item?",
            answers: ["a Broomstick", "a Black Hat", "a Black Dress", "a Spellbook"],
            correct: "a Black Hat",
            imgUrl: "assets/images/blackhat.jpg"
        },
        {
        question: "What will Glinda and Elphaba be late for in 'One Short Day'?",
            answers: ["Dr. Dillamond's funeral", "History Class", "Wizomania", "Nessa's Birthday Party"],
            correct: "Wizomania",
            imgUrl: "assets/images/wizomania.gif"
        }
        ];

                
    var countTime = 30;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var playMusic = new Audio("./assets/");

$("#buttonHolder").hide();

//Display the questions and answers on the page
function makeButtons(){
    $("#questions").html(questionsAnswers[questionCount].question);
    $("#buttonHolder").show(); 
    $("#button01").html(questionsAnswers[questionCount].answers[0]);
    $("#button02").html(questionsAnswers[questionCount].answers[1]);
    $("#button03").html(questionsAnswers[questionCount].answers[2]);
    $("#button04").html(questionsAnswers[questionCount].answers[3]);
}
//Set a timer to answer the questions
var intervalId;
var timer = {
    //start game function-after the start button is pushed
    start: function() {
        makeButtons();
        timer.count();
        intervalId = setInterval(timer.count, 1000);

    },
    //stop timer function
    stop: function() {
        clearInterval(intervalId);
    },
    //timer countdown function
    count: function() {
        $('.timeRemaining').text("Time Remaining: " + countTime);
        countTime--;
        if (countTime <= 0) {
            timer.evaluateAnswer(false);
        }     
    },
    //check to see if answers are correct, incorrect, or unanswered and show message
    evaluateAnswer: function (answer) {
        timer.stop();
        $(".timeRemaining").text(" ");
        $("#buttonHolder").hide();
        $("#questions").hide();
        $("#divAnswers").show();
        if(answer === false) {
           timer.outOfTime(); 
           unansweredQuestions++ 
        }
        else if(answer === questionsAnswers[questionCount].correct) {
            console.log("correct");
            timer.correctMessage();
            correctAnswers++
        }
        else {
            console.log("incorrect");
            timer.incorrectMessage();
            incorrectAnswers++
        }
        if(questionCount > 10) {
            timer.endOfGame();
        } else { 
            setTimeout(timer.nextQuestion, 3000);
        }
    },
    //go to the next question
    nextQuestion: function() {
        $("#divAnswers").hide();
        $("#questions").show();
        $("#buttonHolder").show();
        countTime = 30
        questionCount++;
        makeButtons();
        timer.start();
    },
    //correct message function
    correctMessage: function() {
        $('#results').text("Correct!");
        insertPicture();
    },
    //incorrect message function
    incorrectMessage: function() {
        $('#results').text("Oops! Wrong Answer! The correct answer was " + questionsAnswers[questionCount].correct + "!");
        insertPicture();
    },
    outOfTime: function() {
        $('#results').text("You've run out of time! The correct answer was " + questionsAnswers[questionCount].correct + "!");
        insertPicture();
    },
    //show results after the game has been completed and return to start screen
    endOfGame: function() {
        //show results
        timer.stop();
        $(".timeRemaining").text(" ");
        $("#buttonHolder").hide();
        $("#questions").hide();
        $('#gameOverCorrect').text("Correct Answers: " + correctAnswers);
        $('#gameOverIncorrect').text("Incorrect Answers: " + incorrectAnswers);
        $('#unanswered').text("Unanswered: " + unanswered);
        //reset variables to start game over
    },
};
$('#begin').on("click", function() {
    $(this).hide();
    timer.start();
})

$('.buttons').on("click", function () {
    var btnClicked = ($(this).text());
    timer.evaluateAnswer(btnClicked);
})

function insertPicture() {
    $('#pic').html('<img src="' + questionsAnswers[questionCount].imgUrl + '" width="500px">');
    }

});