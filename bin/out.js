// title:   tomogachi
// author:  DynomiteWaffle
// desc:   	raise a pet. how long can you tend to it
// site:    dynomitewaffle.itch.io
// license: MIT License
// version: 0.1
// script:  js
// saveid: Pet
// input: gamepad
// menu: RESET EnterDevMenu
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
var inMenu = false;
var menu = { inMenu: false, selected: 0, items: [] };
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
    // specail menu times
    if (pet.age == 5 /* PetAge.cooked */) {
        trace("Cook not Needed");
    }
    else {
        menu.items.push({
            name: "Cook",
            action: function () {
                trace("Used Cook");
                pet.age = 5 /* PetAge.cooked */;
                menu.items.pop();
                menu.selected = 0;
                save();
            }
        });
    }
    // TODO catch up on lost time
}
var button = 0 /* Button.none */;
var lastButton = 0 /* Button.none */;
var currentButton = 0 /* Button.none */;
var tick = 0;
var activeMenu = menu;
function TIC() {
    // get button
    lastButton = currentButton;
    [button, currentButton] = updateButtons(lastButton);
    cls(13);
    // 240x136
    spr(pet.type + pet.age * 2, 240 / 2 - 32, 136 / 2 - 32, 14, 3, 0, 0, 2, 2);
    print(button, 84, 84);
    // ingame menu
    if (inMenu) {
        // draw menu
        const textsixe = 10;
        const yoff = activeMenu.selected * textsixe * -1;
        const xoff = 0;
        // draw all menu items
        for (let i = 0; i < activeMenu.items.length; i++) {
            print(activeMenu.items[i].name, xoff, yoff + (i * textsixe));
        }
        if (button == 1 /* Button.dup */) {
            activeMenu.selected--;
            if (activeMenu.selected < 0) {
                activeMenu.selected = activeMenu.items.length - 1;
            }
        } //scroll up
        if (button == 2 /* Button.ddown */) {
            activeMenu.selected++;
            if (activeMenu.selected > activeMenu.items.length - 1) {
                activeMenu.selected = 0;
            }
        } //scroll down
        if (button == 6 /* Button.down */) {
            activeMenu.items[activeMenu.selected].action();
        } //run action
        if (button == 8 /* Button.right */) {
            inMenu = false;
        } //exit
    }
    if (button == 5 /* Button.up */) {
        inMenu = true;
    } // open menu
    // menu settings that use pmem
    if (resetPetB) {
        resetPet();
        resetPetB = false;
    }
    tick++;
    // save()
}
function MENU(i) {
    trace(i);
    if (i == 0) {
        resetPetB = true;
    } // reset pet
    if (i == 1) {
        activeMenu = devMenu;
    } //enter dev menu
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
// test items
menu.items.push({
    name: "hello",
    action: function () {
        trace("ITEM1 Used");
    }
});
menu.items.push({
    name: "2",
    action: function () {
        trace("ITEM2 Used");
    }
});
// dev menu
var devMenu = { inMenu: false, selected: 0, items: [] };
devMenu.items.push({
    name: "PetState",
    action: function () {
        trace("To Dev Menu States");
        activeMenu = devMenuStates;
    }
});
devMenu.items.push({
    name: "PetType",
    action: function () {
        trace("To Dev Menu Types");
        activeMenu = devMenuTypes;
    }
});
devMenu.items.push({
    name: "Normal Menu",
    action: function () {
        trace("To Normal Menu");
        activeMenu = menu;
    }
});
// pet states sub menu
var devMenuStates = { inMenu: false, selected: 0, items: [] };
devMenuStates.items.push({
    name: "^",
    action: function () {
        trace("To Dev Menu");
        activeMenu = devMenu;
    }
});
devMenuStates.items.push({
    name: "EggState",
    action: function () {
        trace("Set To Egg");
        pet.age = 0 /* PetAge.egg */;
    }
});
devMenuStates.items.push({
    name: "BabyState",
    action: function () {
        trace("Set To Baby");
        pet.age = 1 /* PetAge.baby */;
    }
});
devMenuStates.items.push({
    name: "TeenState",
    action: function () {
        trace("Set To Teen");
        pet.age = 2 /* PetAge.teen */;
    }
});
devMenuStates.items.push({
    name: "AdultState",
    action: function () {
        trace("Set To Adult");
        pet.age = 3 /* PetAge.adult */;
    }
});
devMenuStates.items.push({
    name: "DeadState",
    action: function () {
        trace("Set to Dead");
        pet.age = 4 /* PetAge.dead */;
    }
});
devMenuStates.items.push({
    name: "CookedState",
    action: function () {
        trace("Set to Cooked");
        pet.age = 5 /* PetAge.cooked */;
    }
});
// pet type submenu
var devMenuTypes = { inMenu: false, selected: 0, items: [] };
devMenuTypes.items.push({
    name: "^",
    action: function () {
        trace("To Dev Menu");
        activeMenu = devMenu;
    }
});
devMenuTypes.items.push({
    name: "Potato",
    action: function () {
        trace("Set Pet To Potato");
        pet.type = 256 /* PetType.Potato */;
    }
});
devMenuTypes.items.push({
    name: "Cat",
    action: function () {
        trace("Set Pet To Cat");
        pet.type = 288 /* PetType.Cat */;
    }
});
devMenuTypes.items.push({
    name: "Dog",
    action: function () {
        trace("Set Pet To Dog");
        pet.type = 320 /* PetType.Dog */;
    }
});
devMenuTypes.items.push({
    name: "Fish",
    action: function () {
        trace("Set Pet To Fish");
        pet.type = 352 /* PetType.Fish */;
    }
});
devMenuTypes.items.push({
    name: "Hamster",
    action: function () {
        trace("Set Pet To Hamster");
        pet.type = 384 /* PetType.Hamster */;
    }
});
devMenuTypes.items.push({
    name: "Lizard",
    action: function () {
        trace("Set Pet To Lizard");
        pet.type = 416 /* PetType.Lizard */;
    }
});
devMenuTypes.items.push({
    name: "Bird",
    action: function () {
        trace("Set Pet To Bird");
        pet.type = 448 /* PetType.Bird */;
    }
});
devMenuTypes.items.push({
    name: "Rock",
    action: function () {
        trace("Set Pet To Rock");
        pet.type = 480 /* PetType.Rock */;
    }
});
