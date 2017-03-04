var questionsAnswers;
var questionCount = 0;
$(document).ready(function() {

//Declare quesions and answers variables
questionsAnswers = [
        {
        question: "In the song Dancing Through Life who has a crush on Galinda?",
            answers: ["Boq","Bic", "Fiyaro", "The Wizard"],
            correct: "Boq",
            imgUrl: "../images/boq.jpg"
        },
        {
        question: "In the song 'Defying Gravity' Where should you look to find Elphaba?",
            answers: ["Munchkin Land", "Western Sky", "Eastern Sky", "Oz"],
            correct: "Western Sky",
            imgUrl: "../images/westernsky.jpg"
        },
        {
        question: "Why does Elphaba loath Galinda at the beginning of the song 'What is this Feeling?'",
            answers: ["She is unusually and exeedingly peculiar", "She is Blonde", "She doesn't loathe her", "She is preppy"],
            correct: "She is Blonde",
            imgUrl: "../images/blonde.jpg"
        },
        {
        question: "Who is the Wicked Witch Of the West?",
            answers: ["Elphaba", "Galinda", "Nessa Rose", "Madame Morrible"],
            correct: "Elphaba",
            imgUrl: "../images/elphaba.jpg"
        },
        {
        question: "What type of Animal is Doctor Dillamond?",
            answers: ["a Lion", "a Goat", "an Owl", "a Fox"],
            correct: "a Goat",
            imgUrl: "../images/drdillamond.jpg"
        },
        {
        question: "What does Elphaba turn Fiyero into?",
            answers: ["a Statue", "a Tin Man", "a Lion", "a Scarecrow"],
            correct: "a Scarecrow",
            imgUrl: "../images/scarecrow.jpg"
        },
        {
        question: "What word correctly completes this lyric from 'No One Mourns The Wicked'? 'Let us be glad/Let us be grateful/Let us ______ that goodness could subdue/The wicked workings of you-know-who.'",
            answers: ["be happy", "celebrate", "rejoicify", "delightify"],
            correct: "rejoicify",
            imgUrl: "../images/rejoicify.jpg"
        },
        {
        question: "After Galinda and Elphaba become friends, what nickname does Galinda give Elphaba?",
            answers: ["Elphie", "Elpha", "Ellie", "Effie"],
            correct: "Elphie",
            imgUrl: "../images/elphie.jpg"
        },
        {
        question: "In the song 'Dancing Through Life', Galinda gives Elphaba something that becomes part of Elphaba's stereotypical image as a joke. What is this item?",
            answers: ["a Broomstick", "a Black Hat", "a Black Dress", "a Spellbook"],
            correct: "a Black Hat",
            imgUrl: "../images/blackhat.jpg"
        },
        {
        question: "What will Glinda and Elphaba be late for in 'One Short Day'?",
            answers: ["Dr. Dillamond's funeral", "history class", "Wizomania", "Nessa's Birthday Party"],
            correct: "Wizomania",
            imgUrl: "../images/wizomania.jpg"
        }
        ];

                
    var countTime = 30;
    var correctAnswers = 0;
    var IncorrectAnswers = 0;
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
// var correctID;
var timer = {
    start: function() {
        makeButtons();
        //Use setInterval to start the count here
        intervalId = setInterval(timer.count, 1000);

    },
    stop: function() {
        clearInterval(intervalId);
    },
    count: function() {
        $('.timeRemaining').text("Time Remaining: " + countTime);
        countTime--;
        if (countTime <= 0) {
            timer.evaluateAnswer(false);
        }     
    },
    
    evaluateAnswer: function (answer) {
        timer.stop();
        $(".timeRemaining").text(" ");
        $("#buttonHolder").hide();
        $("#questions").hide();
        $("#divAnswers").show();
        if(answer === false) {
            $('#results').text("You've run out of time! The correct answer was " + questionsAnswers[questionCount].correct + "!" + questionsAnswers[questionCount].imgUrl);
        
        }
        else if(answer === questionsAnswers[questionCount].correct) {
            console.log("correct");
            timer.correctMessage();
            correctAnswers++
        }
        else {
            console.log("incorrect");
            timer.incorrectMessage();
            correctAnswers--
        }
        setTimeout(timer.nextQuestion, 3000);
    },
    nextQuestion: function() {
        $("#divAnswers").hide();
        $("#questions").show();
        $("#buttonHolder").show();
        countTime = 30
        questionCount++;
        makeButtons();
        timer.start();
    },
    correctMessage: function() {
        $('#results').text("Correct!" + questionsAnswers[questionCount].imgUrl);
    },
    incorrectMessage: function() {
        $('#results').text("Oops! Wrong Answer! The correct answer was " + questionsAnswers[questionCount].correct + "!");
    },
    endOfGame: function() {
        //show results
        //reset variables to start game over
    }
};
$('#begin').on("click", function() {
    $(this).hide();
    timer.start();
})

$('.buttons').on("click", function () {
    var btnClicked = ($(this).text());
    timer.evaluateAnswer(btnClicked);
})

});