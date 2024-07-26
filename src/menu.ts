interface menuItem{
    name: string
    action:Function
}

interface Imenu{
    inMenu: boolean
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