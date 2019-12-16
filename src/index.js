document.addEventListener('DOMContentLoaded', function(){
    let dogsURL = 'http://localhost:3000/pups';

    function getDogs(){
        fetch(dogsURL)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(dog => {
                buildDogDiv(dog);
            })
        })
    }

    function buildDogDiv(dog){
        let dogBarDiv = document.getElementById('dog-bar')
        let dogName = document.createElement('span')
        dogName.textContent = dog.name;
        dogBarDiv.appendChild(dogName);

        dogName.addEventListener('click', event => showDogInfo(event, dog))
    }

    function showDogInfo(event, dog) {
        let dogContainer = document.getElementById('dog-info')
        dogContainer.innerHTML = "";

        let dogName = document.createElement('name')
        let dogPhoto = document.createElement('img')
        let dogStatus = document.createElement('button')

        dogName.textContent = dog.name;
        dogPhoto.src = dog.image;

        if (dog.isGoodDog === true){
            dogStatus.textContent = "Good Dog!";
        }
        else {
            dogStatus.textContent = "Bad Dog!";
        }

        dogContainer.appendChild(dogName);
        dogContainer.appendChild(dogPhoto);
        dogContainer.appendChild(dogStatus);

        dogStatus.addEventListener('click', event => changeDogStatus(event, dog))

    }

    function changeDogStatus(event, dog){
        let dogStatus = document.getElementById('dog-info').querySelector('button')

        if (dog.isGoodDog === true){
            dog.isGoodDog = false;
            dogStatus.textContent = "Bad Dog!";
        }
        else if (dog.isGoodDog === false){
            dog.isGoodDog = true;
            dogStatus.textContent = "Good Dog!";
        }
        updatePupStatus(dog);
    }

    function updatePupStatus(dog){
        fetch(`${dogsURL}/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(dog)
        })
    }

    document.getElementById('good-dog-filter').addEventListener('click', applyFilter);

    function applyFilter(){
        let filterButton = document.getElementById('good-dog-filter')

        if (filterButton.innerHTML === "Filter good dogs: OFF"){
            filterButton.innerHTML = "Filter good dogs: ON";
            document.getElementById('dog-bar').innerHTML = ""
            getGoodDogs();
        }
        else if (filterButton.innerHTML === "Filter good dogs: ON"){
            filterButton.innerHTML = "Filter good dogs: OFF";
            getDogs();
        }
    }

    function getGoodDogs(){
        fetch(dogsURL)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(dog => {
                if (dog.isGoodDog === true){
                    buildDogDiv(dog);
                }
            })
        })
    }

})