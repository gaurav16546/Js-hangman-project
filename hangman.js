const hangmanApp = () => {


    //words to play hangman with different catagories
    const hangmanLibraries = {
        cities: ['KATHMANDU', 'POKHARA', 'DHARAN', 'NIJGADH', 'BIRJUNG', 'BIRATNAGAR', 'JANAKPUR', 'BUTWAL', 'NEPALGUNJ', 'BHARATPUR', 'HETAUDA', 'BANEPA', 'BAGLUNG', 'GORKHA', 'DHULIKHEL'],

        animals: ['TIGER', 'TURTLE', 'BUFFALO', 'RABBIT', 'FROG', 'GORILLA', 'GIRAFFE', 'COBRA', 'DEER', 'WHALE', 'HIPPOPOTAMUS', 'CAMEL', 'MONKEY', 'RACOON', 'MOUSE'],

        countries: ['INDIA', 'NEPAL', 'ARGENTINA', 'JAPAN', 'QATAR', 'KOREA', 'CHINA', 'THAILAND', 'MALAYSIA', 'PAKISTAN', 'IRAN', 'TAIWAN', 'MYANMAR', 'FRANCE', 'CROATIA'],

        capitals: ['DELHI', 'TOKYO', 'KABUL', 'BANGKOK', 'DHAKA', 'SINGAPORE', 'MOSCOW', 'PARIS', 'HANOI', 'BAGHDAD', 'KABUL', 'MALE', 'SEOUL', 'CAIRO', 'DOHA'],

        SUPERHEROS: ['IRONMAN', 'SUPERMAN', 'SPIDERMAN', 'BATMAN', 'HULK', 'HAWKEYE', 'AQUAMAN', 'ANTMAN', 'THOR', 'WOLVERINE', 'MYSTIQUE', 'FLASH', 'STARLORD', 'LOKI', 'ROCKET'],

        vegetables: ['POTATO', 'MUSHROOM', 'PUMPKIN', 'BRINGLE', 'CARROT', 'CAULIFLOWER', 'CORN', 'BROCCOLI', 'CUCUMBER', 'MUSHROOMS', 'ONION', 'PEPPER', 'BEETROOT', 'PEAS', 'RADISH'],

        fruits: ['CHERRY', 'KIWI', 'GOOSEBERRY', 'GUAVA', 'COCONUT', 'GRAPE', 'MANGO', 'TOMATO', 'LEMON', 'PINEAPPLE', 'RASPBERRY', 'POMEGRANATE', 'DATES', 'BANANA', 'ORANGE', ''],
    };
    //this will be used later to give winning message
    let wordLength = 0;
    //this will later store secret word
    let randomizedHangmanWord;
    //no of guess given to the user
    let lifeLeft = 10;
    const alphabetsSection = document.getElementById("alphabets");
    alphabetsSection.style.display = 'none';
    const singleAlphabetsSection = document.createElement("span");
    singleAlphabetsSection.classList.add("letter");
    const letterList = document.getElementsByClassName('letter'); //this returns htmlcollection need to convert to array
    const categoriesSection = document.getElementById('categories');
    const categories = document.getElementsByClassName('categories-button');
    const guessSection = document.getElementById('guess-section');
    const lifeLeftSection = document.getElementById("life-left");
    const restartBtn = document.getElementById("restart-game");
    restartBtn.style.display = 'none';

    //print letter A to Z inside alphabets div
    function toDisplayAlphabets() {
        for (let i = 65; i <= 90; i++) {
            //convert into ascii code
            singleAlphabetsSection.textContent = String.fromCharCode(i);
            alphabetsSection.appendChild(singleAlphabetsSection.cloneNode(true));
        }
        eventlistenerToAlphabets();
    }


    //adds eventlistener to all the letter
    function eventlistenerToAlphabets() {
        Array.from(letterList).forEach(singleLetter =>
            singleLetter.addEventListener('click', () => {
                singleGameplay(singleLetter.textContent);
                //remove the button after click to make it unclickable
                singleLetter.style.display = 'none';
            }));
    }


    //used to select category
    Array.from(categories).forEach(singleCategory =>
        singleCategory.addEventListener('click', () => {
            let selectedCategory = singleCategory.textContent;
            document.getElementById('selected-category').textContent = `You have selected ${selectedCategory}.`;
            getHangManWord(selectedCategory);
            toDisplayAlphabets();
            alphabetsSection.style.display = 'flex';
            categoriesSection.style.display = 'none';

        }));

    //function to randomly get the names from the selected categories
    function getHangManWord(selectedCategory) {
        let randomNumber = Math.floor((Math.random()) * 15);
        //extract word from above library
        randomizedHangmanWord = hangmanLibraries[selectedCategory][randomNumber];
        underscorePlotter(randomizedHangmanWord.split(''))

    }
    //function to play single game
    function underscorePlotter(secretWord) {
        const underscore = document.createElement('span');
        underscore.classList.add('gameplay-word');
        underscore.textContent = ' _ ';
        //will give no of word underscore
        for (let i = 0; i < secretWord.length; i++) {
            guessSection.append(underscore.cloneNode(true));
        }
    }

    function singleGameplay(toGuessalphabet) {
        randomizedHangmanWord = [...randomizedHangmanWord];
        const gameplayWord = document.getElementsByClassName('gameplay-word');
        //this flag will be used to tell if you answer is right or wrong
        let flagForLife = true;
        for (let i = 0; i < gameplayWord.length; i++) {
            if (toGuessalphabet === randomizedHangmanWord[i]) {
                gameplayWord[i].textContent = toGuessalphabet;
                flagForLife = false;
                wordLength++;
            }
        }
        if (gameplayWord.length === wordLength) {
            winnerMessage();
        }
        if (flagForLife) {
            noOfPlayLeft(); //call function which is used to display no of life and game over message
        }
    }
    function restartGame() {
        restartBtn.style.display = 'flex';
        restartBtn.addEventListener('click', () => {
            //reloads page
            window.location.reload();
        });
    }

    function winnerMessage() {
        lifeLeftSection.textContent = `Congratulation, You got the word!!`;
        hideSection();
        restartGame();
    }

    function lossMessage() {
        lifeLeftSection.textContent = "Game Over!!! You lose";
        hideSection();
        restartGame();
    }

    function noOfPlayLeft() {
        lifeLeft--;
        lifeLeftSection.textContent = `You have ${lifeLeft} lives life.`;
        if (lifeLeft === 0) {
            lossMessage();
        }
    }

    function hideSection() {
        alphabetsSection.style.display = 'none';
        categoriesSection.style.display = 'none';
    }
}

hangmanApp();