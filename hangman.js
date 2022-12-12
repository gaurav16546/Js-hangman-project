const hangmanApp = () => {


    //words to play hangman with different catagories
    const hangmanLibraries = {
        cities: ['KATHMANDU', 'POKHARA', 'DHARAN', 'NIJGADH', 'BIRJUNG'],
        animals: ['DOG', 'CAT', 'BUFFALO', 'COW', 'FROG'],
        countries: ['INDIA', 'NEPAL', 'ARGENTINA', 'ZAMBIA', 'QATAR'],
        capitals: ['DELHI', 'KINSHASA', 'LISBON', 'MONTEVIDEO', 'DHAKA'],
        furniture: ['BED', 'CHAIR', 'TABLE', 'SOFA', 'STOOL'],
        vegetables: ['POTATO', 'MUSHROOM', 'PUMPKIN', 'EGGPLANT', 'CARROT'],
        fruits: ['CHERRY', 'KIWI', 'GOOSEBERRY', 'GUAVA', 'COCONUT'],
    };

    const alphabetsSection = document.getElementById("alphabets");
    alphabetsSection.style.display = 'none';
    const singleAlphabetsSection = document.createElement("span");
    singleAlphabetsSection.classList.add("letter");
    const letterList = document.getElementsByClassName('letter'); //this returns htmlcollection need to convert to array
    const categoriesSection = document.getElementById('categories');
    const categories = document.getElementsByClassName('categories-button');


    //print letter A to Z inside alphabets div
    function toDisplayAlphabets() {
        for (let i = 65; i <= 90; i++) {
            singleAlphabetsSection.textContent = String.fromCharCode(i);
            alphabetsSection.appendChild(singleAlphabetsSection.cloneNode(true));
        }
        eventlistenerToAlphabets();
    }


    //adds eventlistener to all the letter
    function eventlistenerToAlphabets() {
        Array.from(letterList).forEach(singleLetter =>
            singleLetter.addEventListener('click', () => {
                // alert(singleLetter.textContent);

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
        let randomNumber = Math.floor((Math.random()) * 5);
        let randomizedHangmanWord = hangmanLibraries[selectedCategory][randomNumber];
        console.log(randomizedHangmanWord);

    }
}

hangmanApp();