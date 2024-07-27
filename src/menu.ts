interface menuItem{
    name: string
    action:Function
}

interface Imenu{
    selected: number
    items:Array<menuItem>
}



// test items
menu.items.push({
    name: "hello",
    action: function () {
    trace("ITEM1 Used")
    }
} as menuItem)

menu.items.push({
    name: "2",
    action: function () {
        trace("ITEM2 Used")
    }
} as menuItem)


// dev menu
var devMenu = { inMenu: false, selected: 0, items: [] } as Imenu
devMenu.items.push({
    name: "PetState",
    action: function () {
        trace("To Dev Menu States")
        activeMenu = devMenuStates
    }
} as menuItem)
devMenu.items.push({
    name: "PetType",
    action: function () {
        trace("To Dev Menu Types")
        activeMenu = devMenuTypes
    }
} as menuItem)

devMenu.items.push({
    name: "Normal Menu",
    action: function () {
        trace("To Normal Menu")
        activeMenu = menu
    }
} as menuItem)

// pet states sub menu
var devMenuStates = { inMenu: false, selected: 0, items: [] } as Imenu


devMenuStates.items.push({
    name: "^",
    action: function () {
        trace("To Dev Menu")
        activeMenu = devMenu
    }
} as menuItem)

devMenuStates.items.push({
    name: "EggState",
    action: function () {
        trace("Set To Egg")
        pet.age = PetAge.egg
    }
} as menuItem)

devMenuStates.items.push({
    name: "BabyState",
    action: function () {
        trace("Set To Baby")
        pet.age = PetAge.baby
    }
} as menuItem)

devMenuStates.items.push({
    name: "TeenState",
    action: function () {
        trace("Set To Teen")
        pet.age = PetAge.teen
    }
} as menuItem)

devMenuStates.items.push({
    name: "AdultState",
    action: function () {
        trace("Set To Adult")
        pet.age = PetAge.adult
    }
} as menuItem)

devMenuStates.items.push({
    name: "DeadState",
    action: function () {
        trace("Set to Dead")
        pet.age = PetAge.dead
    }
} as menuItem)
devMenuStates.items.push({
    name: "CookedState",
    action: function () {
        trace("Set to Cooked")
        pet.age = PetAge.cooked
    }
} as menuItem)

// pet type submenu
var devMenuTypes = { inMenu: false, selected: 0, items: [] } as Imenu


devMenuTypes.items.push({
    name: "^",
    action: function () {
        trace("To Dev Menu")
        activeMenu = devMenu
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Potato",
    action: function () {
        trace("Set Pet To Potato")
        pet.type = PetType.Potato
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Cat",
    action: function () {
        trace("Set Pet To Cat")
        pet.type = PetType.Cat
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Dog",
    action: function () {
        trace("Set Pet To Dog")
        pet.type = PetType.Dog
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Fish",
    action: function () {
        trace("Set Pet To Fish")
        pet.type = PetType.Fish
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Hamster",
    action: function () {
        trace("Set Pet To Hamster")
        pet.type = PetType.Hamster
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Lizard",
    action: function () {
        trace("Set Pet To Lizard")
        pet.type = PetType.Lizard
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Bird",
    action: function () {
        trace("Set Pet To Bird")
        pet.type = PetType.Bird
    }
} as menuItem)

devMenuTypes.items.push({
    name: "Rock",
    action: function () {
        trace("Set Pet To Rock")
        pet.type = PetType.Rock
    }
} as menuItem)