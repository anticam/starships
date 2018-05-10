var starships = [
    { name: "CR90 Corvette", value: 2 },
    { name: "V-wing", value: 75 },
    { name: "Belbullab", value:22 },
    { name: "Starfighter", value: 74} ,
    { name: "Jedi Interceptor", value: 65 },
    { name: "Star Destroyer", value:3 },
    { name: "Trade Federation Cruiser", value: 59 },
    { name: "Solar Sailer", value: 58 },
    { name: "Repucic Attack Cruiser", value: 63 },
    { name: "A-wing", value: 28 },
    { name: "B-wing", value: 29 },
    { name: "Naboo Fighter", value: 39 },
    { name: "Millenium Falcon", value: 10}

];

function populateList(id){
    starships.forEach(function(ship, index){
        var opt = document.createElement('option')            ;
        opt.innerHTML = ship.name;
        opt.value = ship.value;
        id.add(opt);
        
    });
}

populateList(document.getElementById('starship1'));
populateList(document.getElementById('starship2'));



document.getElementById("button").addEventListener('click',function(){
    run(gen).catch(function(err){
        alert(err.message);
    });
})

function run(genFunc){
    const genObject=genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a police
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filed
        .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
        .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try{
        return iterate(genObject.next()); //starts a recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}

function compareShips(ship1Tag, ship1Value, ship2Tag, ship2Value){
    
    if (Number(ship1Value) > Number(ship2Value)) {
        document.getElementById(ship1Tag).style.backgroundColor = "red";    
        document.getElementById(ship2Tag).style.backgroundColor = "transparent";    
    }
    else if(Number(ship1Value) < Number(ship2Value)) {
        document.getElementById(ship1Tag).style.backgroundColor = "transparent";    
        document.getElementById(ship2Tag).style.backgroundColor = "red";    
    }
    else {
        document.getElementById(ship1Tag).style.backgroundColor = "transparent";    
        document.getElementById(ship2Tag).style.backgroundColor = "transparent";            
    }
}

function *gen(){
    //check if input is valid
    
    //fetch starships
    // https://swapi.co/api/starships/2/?format=json
    starshipsURL = "https://swapi.co/api/starships/";
    var ship1Response = yield fetch( starshipsURL + document.getElementById('starship1').value + "/?format=json");
    var ship2Response = yield fetch( starshipsURL + document.getElementById('starship2').value + "/?format=json");
    console.log(ship1Response);
    console.log(ship2Response);

    var ship1 = yield ship1Response.json();
    var ship2 = yield ship2Response.json();

    console.log(ship1);
    console.log(ship2);
    
    // Name: name
    document.getElementById('ship1Name').innerHTML = ship1.name;
    document.getElementById('ship2Name').innerHTML = ship2.name;

    // Cost: cost_in_credits
    document.getElementById('ship1Cost').innerHTML = ship1.cost_in_credits;
    document.getElementById('ship2Cost').innerHTML = ship2.cost_in_credits;
    compareShips('ship1Cost', ship1.cost_in_credits, 'ship2Cost', ship2.cost_in_credits);

    // Speed: max_atmosphering_speed
    document.getElementById('ship1Speed').innerHTML = ship1.max_atmosphering_speed;
    document.getElementById('ship2Speed').innerHTML = ship2.max_atmosphering_speed;
    compareShips('ship1Speed', ship1.max_atmosphering_speed, 'ship2Speed', ship2.max_atmosphering_speed);
    
    // Cargo size: cargo_capacity
    document.getElementById('ship1Cargo').innerHTML = ship1.cargo_capacity;
    document.getElementById('ship2Cargo').innerHTML = ship2.cargo_capacity;
    compareShips('ship1Cargo', ship1.cargo_capacity, 'ship2Cargo' ,ship2.cargo_capacity);
    
    // Passengers: passengers
    document.getElementById('ship1Passengers').innerHTML = ship1.passengers;
    document.getElementById('ship2Passengers').innerHTML = ship2.passengers;
    compareShips('ship1Passengers', ship1.passengers, 'ship2Passengers' ,ship2.passengers);
  
    //cell.style.backgroundColor = "red";
    
}