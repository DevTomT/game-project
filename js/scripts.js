$(document).ready(function () {
   "use strict";

   var choiceCounter = 6;
   var showedLettersCounter = 0;
   var i = 0;

   // Show actual counter state.
   var counter = $(".counter");

   function counterState(count) {
      counter.text("Pozostało szans: " + count + "/6");
   }

   // Counter aniamtion.
   function counterTransform() {
      counter.slideToggle(200, function () {
         counter.slideToggle(200);
      });
   }

   // Create expression constructor.
   function ExpressionToGuess(category, statement) {
      this.category = category;
      this.statement = statement;
   }

   // Some categories. 
   var person = "Osoba";
   var thing = "Rzecz";
   var book = "Tytuł książki";
   var animal = "Zwierzę"

   // Table with expressions to guess.
   var expressions = [
      new ExpressionToGuess(person, "Adam Małysz"),
      new ExpressionToGuess(thing, "motocykl"),
      new ExpressionToGuess(thing, "papierosy"),
      new ExpressionToGuess(book, "Krzyżacy"),
      new ExpressionToGuess(thing, "telewizor"),
      new ExpressionToGuess(person, "Mariusz Pudzianowski"),
      new ExpressionToGuess(animal, "wiewiórka"),
      new ExpressionToGuess(animal, "krokodyl"),
      new ExpressionToGuess(person, "Barack Obama"),
      new ExpressionToGuess(animal, "myszoskoczek")
   ];

   // Keyboard
   var letters = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "o", "ó", "p", "r", "s", "t", "u", "w", "y", "z", "ź", "ż"];
   var lettersLength = letters.length;

   var lettersContainer = $(".letters-container");
   for (i = 0; i < lettersLength; i++) {
      lettersContainer.append("<button class='letter'>" + letters[i] + "</button>");
   }

   var cat = $(".category");
   var expressionsLength = expressions.length;

   // Display category and expression(without letters).
   var index = 0;

   function getExpression() {
      var expression = expressions[index].statement;
      var category = expressions[index].category;

      if (index < (expressionsLength - 1)) {
         $(".expression-container").children().remove();
         cat.text((index + 1) + ". Kategoria: " + category);

         for (i = 0; i < expression.length; i++) {
            if (expression.charAt(i) == " ") {
               $(".expression-container").append("&nbsp;&nbsp;&nbsp;&nbsp;");
               continue;
            }
            $(".expression-container").append("<button class='expression-letter'><span>" + expression.charAt(i) + "</span></button>");
         }
         index++;
      } else {
         cat.text("KONIEC GRY");
      }
   }

   // Display next expression aftrer click "Nowa gra".
   $(".new-game").click(function () {
      showedLettersCounter = 0;
      choiceCounter = 6;
      counterState(choiceCounter);
      getExpression();
   });

   // Action after click on keyboard.
   $(".letter").click(function () {

      var clickedLetter = $(this).text();
      var expressionLetters = $(".expression-letter").children();
      var expressionLength = expressionLetters.length;
      var goodLetterChoice = false;

      // Don't react if game isn't begin.
      if (expressionLength === 0) {
         return;
      }

      // Display letter if expression contains it.
      for (i = 0; i < expressionLength; i++) {
         if (expressionLetters.get(i).textContent.toLowerCase() === clickedLetter && $(expressionLetters.get(i)).css("display") === "inline") {
            return;
         }
         if (expressionLetters.get(i).textContent.toLowerCase() === clickedLetter) {
            $(expressionLetters.get(i)).css("display", "inline");
            goodLetterChoice = true;
            showedLettersCounter++;
         }
      }

      // If expression doesn't contain letter: choiceCounter--.
      if (goodLetterChoice === false) {
         choiceCounter--;
         counterState(choiceCounter);
         counterTransform();
      }

      // If choiceCounter = 0 -> info(loss).
      if (choiceCounter === 0) {
         $(".info").text("Przegrana").show(500).toggleClass("hide");

         showedLettersCounter = 0;
         counterState(choiceCounter);
         choiceCounter = 6;
      }

      // If all letters in expression are displayed -> info(win).
      if (showedLettersCounter === expressionLength) {
         $(".info").text("Wygrana").show(500).toggleClass("hide");

         showedLettersCounter = 0;
         counterState(choiceCounter);
         choiceCounter = 6;
      }
   });

   // Hide info after click on it.
   $(".info").click(function () {
      $(this).hide(500).toggleClass("hide");
      getExpression();
      choiceCounter = 6;
      showedLettersCounter = 0;
      counterState(choiceCounter);
   });

});
