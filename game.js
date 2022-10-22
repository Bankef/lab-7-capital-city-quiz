
let randomCountryElement = document.querySelector('#random-country');
let userAnswerElement = document.querySelector('#user-answer');
let submitButton = document.querySelector('#submit-answer');
let resultTextElement = document.querySelector('#result');
let playAgain = document.querySelector('#play-again');

let correctAnswer = "";

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array country names and two-letter country codes is provided in the countries.js file.
// Your browser treats all JavaScript files included with script elements as one big file,
// organized in the order of the script tags. So the countriesAndCodes array from countries.js
// is available to this script.

//console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available


// TODO when the page loads, select an element at random from the countriesAndCodes array
//Math.random() returns a number in the range 0 to less than 1, 1 not inclusive
//Whatever number selected is then used to multiply the length of the array in our JSON file
//Math.floor() is then used to remove the decimal part of the above equation to give us a value within the range
//of the Array and ensure we do not go out of range.
//I had help for this part of the Lab, I couldn't figure it out by myself, but i learn something new.

let randomElement = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)];

// let x = Math.random();
// console.log(x);
// console.log(x * countriesAndCodes.length);
// console.log(Math.floor(x * countriesAndCodes.length));
// console.log(countriesAndCodes[Math.floor(x * countriesAndCodes.length)]);

// TODO display the country's name in the randomCountryElement
randomCountryElement.innerHTML = randomElement.name;

// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message.
//  * If the API call was successful, extract the capital city from the World Bank API response.

submitButton.addEventListener('click', async function (){
    let userAnswer = userAnswerElement.value;
    //I had difficulty reading the JSON value named 'Alpha-2"
    //Eventually found two ways to do this and I left it in my code for future reference
    //let url = `https://api.worldbank.org/v2/country/${Object.values(randomElement)[1]}?format=json`;
    let url = `https://api.worldbank.org/v2/country/${randomElement["alpha-2"]}?format=json`;
    console.log(url);
    try {
        const response = await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                correctAnswer = data[1][0].capitalCity;
                console.log(correctAnswer);

            });

// TODO Compare the actual capital city to the user's answer.
//  You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//  as the World Bank data - make the comparison case insensitive.
//  If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
//  Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong.
//  For example 'Correct! The capital of Germany is Berlin' or 'Wrong - the capital of Germany is not G, it is Berlin'

        let compareIdenticalStrings = Levenshtein.get(userAnswer.toLowerCase(), correctAnswer.toLowerCase());
        switch (true){
            case compareIdenticalStrings == 0: resultTextElement.innerHTML = "Good job &#128518;! You're correct!"; //I added smiley faces for fun! :)
                break;
            case compareIdenticalStrings > 0 && compareIdenticalStrings <= 3: resultTextElement.innerHTML = "Almost &#129320;! You are close!";
                break;
            case compareIdenticalStrings >  3: resultTextElement.innerHTML = `Wrong answer &#128532;! \nThe capital of ${randomElement.name} is ${correctAnswer}`;
                break;
        }
//I used the if statement to compare user answer to correct answer initially
//then I comment it out used the Levenshtein code instead, but decided to leave it in my code nevertheless
//Personally, I prefer this method.

        // if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        //     resultTextElement.innerHTML = "Good job &#128518;! You're correct!";
        // } else {
        //     resultTextElement.innerHTML = `Wrong answer &#128532;! \nThe capital of ${randomElement.name} is ${correctAnswer}`;
        // }
    }
    catch (e) {
        alert("Country not found now. Please try again later!");
    }
});

// TODO finally, connect the play again button. Clear the user's answer, select a new random country,
// display the country's name, handle the user's guess. If you didn't use functions in the code you've
// already written, you should refactor your code to use functions to avoid writing very similar code twice.
    playAgain.addEventListener('click', function () {
        location.reload();
});