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
var resetPetB = false

const enum PetAge{
    egg,
    baby,
    teen,
    adult,
    dead
}
const enum PetState{
    sleeping,
    awake
}
const enum PetType{
    Potato = 256,
    Cat=288,
    Dog=320,
    Fish=352,
    Hamster=384,
    Lizard=416,
    Bird=448,
    Rock=480
}
const petType = [
    PetType.Potato,
    PetType.Cat,
    PetType.Dog,
    PetType.Fish,
    PetType.Hamster,
    PetType.Lizard,
    PetType.Bird,
    PetType.Rock
]

const enum Button{
    none,
    dup,
    ddown,
    dleft,
    dright,
    up,
    down,
    left,
    right

}

interface pet {
    type: PetType
    state: PetState
    age: PetAge
    hunger: number
    thirst: number
    cleanlyness: number
    happyness: number
}
// init pet
const max = 10
var pet = {} as pet

// init
function BOOT() {
    // check if pet has been generated
    if (pmem(0) == 0) {
        resetPet();
    }
    // get pet
    pet.type = pmem(2)
    pet.age = pmem(3)
    pet.state = pmem(4)
    pet.hunger = pmem(5)
    pet.thirst = pmem(6)
    pet.cleanlyness = pmem(7)
    pet.happyness = pmem(8)
    
    // TODO catch up on lost time

}

var button: Button = Button.none
var lastButton: Button = Button.none
var currentButton: Button = Button.none
var tick = 0

function TIC() {
    // get button
    lastButton = currentButton;
    [button,currentButton] = updateButtons(lastButton)
    cls(13)
    // 240x136
    spr(pet.type+pet.age*2, 240/2-32, 136/2-32, 14, 3, 0, 0, 2, 2)
    print(button, 84, 84)

    
    // menu settings that use pmem
    if (resetPetB) { resetPet(); resetPetB = false }
    tick++
}



function MENU(i) {
    // trace(i)
    if(i==0){resetPetB=true}
}



function resetPet() {
    trace("Overiting Pet")
    pmem(0, tstamp())
    pmem(1, tstamp())
    // random pet type
    pet.type = petType[Math.floor(Math.random()*(petType.length))]
    pet.age = PetAge.egg
    pet.state = 0
    pet.hunger = max
    pet.thirst = max
    pet.cleanlyness = max
    pet.happyness = max

    save()
}

function save() {
    trace("Saved")
    // set pet to pmem
    pmem(1, tstamp()) // current time
    pmem(2,pet.type) // type
    pmem(3,pet.age) // age
    pmem(4,pet.state) // state
    pmem(5,pet.hunger) // hunger
    pmem(6,pet.thirst) // thirst
    pmem(7,pet.cleanlyness) // cleanlyness
    pmem(8,pet.happyness) // happyness
}

function updateButtons(last:Button) {
    var c: Button = Button.none
    var b: Button = Button.none
    
    if (btn(0)) { c = Button.dup }
    else if (btn(1)){ c= Button.ddown}
    else if (btn(2)){ c= Button.dleft}
    else if (btn(3)){ c= Button.dright}
    else if (btn(4)) { c = Button.down }
    else if (btn(5)) { c = Button.right}
    else if (btn(6)) { c = Button.left }
    else if (btn(7)) { c = Button.up }

    if (last != c) { b = c }
    

    return [b,c]
}