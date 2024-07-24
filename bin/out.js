// title:   tomogachi
// author:  DynomiteWaffle
// desc:   	raise a pet. how long can you tend to it
// site:    dynomitewaffle.itch.io
// license: MIT License
// version: 0.1
// script:  js
// saveid: Pet
// input: gamepad
// menu: RESET
// pmem map
/*
0 - pet birth(timestamp)
1 - last save time / game opened(timestamp)
2 - type
3 - age
4 - state
5 - hunger
6 - thirst
7 - cleanlyness
8 - happyness
*/
var resetPetB = false;
const petType = [
    256 /* PetType.Potato */,
    288 /* PetType.Cat */,
    320 /* PetType.Dog */,
    352 /* PetType.Fish */,
    384 /* PetType.Hamster */,
    416 /* PetType.Lizard */,
    448 /* PetType.Bird */,
    480 /* PetType.Rock */
];
// init pet
const max = 10;
var pet = {};
// init
function BOOT() {
    // check if pet has been generated
    if (pmem(0) == 0) {
        resetPet();
    }
    // get pet
    pet.type = pmem(2);
    pet.age = pmem(3);
    pet.state = pmem(4);
    pet.hunger = pmem(5);
    pet.thirst = pmem(6);
    pet.cleanlyness = pmem(7);
    pet.happyness = pmem(8);
    // TODO catch up on lost time
}
var button = 0 /* Button.none */;
var lastButton = 0 /* Button.none */;
var currentButton = 0 /* Button.none */;
var tick = 0;
function TIC() {
    // get button
    lastButton = currentButton;
    [button, currentButton] = updateButtons(lastButton);
    cls(13);
    // 240x136
    spr(pet.type + pet.age * 2, 240 / 2 - 32, 136 / 2 - 32, 14, 3, 0, 0, 2, 2);
    print(button, 84, 84);
    // menu settings that use pmem
    if (resetPetB) {
        resetPet();
        resetPetB = false;
    }
    tick++;
}
function MENU(i) {
    // trace(i)
    if (i == 0) {
        resetPetB = true;
    }
}
function resetPet() {
    trace("Overiting Pet");
    pmem(0, tstamp());
    pmem(1, tstamp());
    // random pet type
    pet.type = petType[Math.floor(Math.random() * (petType.length))];
    pet.age = 0 /* PetAge.egg */;
    pet.state = 0;
    pet.hunger = max;
    pet.thirst = max;
    pet.cleanlyness = max;
    pet.happyness = max;
    save();
}
function save() {
    trace("Saved");
    // set pet to pmem
    pmem(1, tstamp()); // current time
    pmem(2, pet.type); // type
    pmem(3, pet.age); // age
    pmem(4, pet.state); // state
    pmem(5, pet.hunger); // hunger
    pmem(6, pet.thirst); // thirst
    pmem(7, pet.cleanlyness); // cleanlyness
    pmem(8, pet.happyness); // happyness
}
function updateButtons(last) {
    var c = 0 /* Button.none */;
    var b = 0 /* Button.none */;
    if (btn(0)) {
        c = 1 /* Button.dup */;
    }
    else if (btn(1)) {
        c = 2 /* Button.ddown */;
    }
    else if (btn(2)) {
        c = 3 /* Button.dleft */;
    }
    else if (btn(3)) {
        c = 4 /* Button.dright */;
    }
    else if (btn(4)) {
        c = 6 /* Button.down */;
    }
    else if (btn(5)) {
        c = 8 /* Button.right */;
    }
    else if (btn(6)) {
        c = 7 /* Button.left */;
    }
    else if (btn(7)) {
        c = 5 /* Button.up */;
    }
    if (last != c) {
        b = c;
    }
    return [b, c];
}
