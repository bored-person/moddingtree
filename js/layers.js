addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
            if (hasUpgrade('p', 21)) mult = mult.times(upgradeEffect('p', 21))
        if (hasUpgrade('e', 11)) mult = mult.times(2)
        if (hasUpgrade('e', 12)) mult = mult.times(upgradeEffect('e', 12))
        if (hasUpgrade('e', 14)) mult = mult.times(10)
        if (hasUpgrade('f', 11)) mult = mult.pow(1.3)
        return mult
    },
    passiveGeneration(){
        let gen = 0;
        if (hasUpgrade('f', 11)) gen += 1
        return gen;
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "more points",
            description: "5x points",
            cost: new Decimal(1),
        },
        12: {
            title: "prestige points",
            description: "boost points based on prestige",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "points prestige",
            description: "boost prestige based on points",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.20)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "points points",
            description: "boost points based on points",
            cost: new Decimal(20),
            effect() {
                return player.points.add(1).pow(0.22)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "prestigy prestige",
            description: "boost points prestige based on prestige",
            cost: new Decimal(50),
            effect() {
                return player.p.points.add(1).pow(0.20)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "super points points",
            description: "boost points points based on points",
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.20)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },
        23: {
            title: "way more points",
            description: "x20 points",
            cost: new Decimal(500),
        },
    },
})

addLayer("e", {
    name: "electricity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(5000000), // Can be a function that takes requirement increases into account
    resource: "electric currents", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('e', 13)) mult = mult.times(upgradeEffect('e', 13))
        if (hasUpgrade('e', 14)) mult = mult.times(2)
        if (hasUpgrade('f', 11)) mult = mult.pow(1.1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "better rebirth",
            description: "gain 5x more points and 2x more prestige",
            cost: new Decimal(1),
        },
        12: {
            title: "electrical currencies",
            description: "boost prestige and points based on best electronic currents",
            cost: new Decimal(5),
            effect() {
                return player.e.best.add(1).pow(0.40)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },
        13: {
            title: "electric prestige",
            description: "boost electric current gain based on prestige",
            cost: new Decimal(10),
            effect() {
                return player.p.points.add(1).pow(0.03)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },
            14: {
            title: "supercharge",
            description: "50x points, 10x prestige and 2x electric currents",
            cost: new Decimal(50),  
        },
    },
})

addLayer("f", {
    name: "fiber", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(200000000), // Can be a function that takes requirement increases into account
    resource: "fibres", // Name of prestige currency
    baseResource: "electric currents", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "fiberous exponents",
            description: "x15 points, prestige^1.3, electric currents^1.1, passive prestige point gen",
            cost: new Decimal(1),
        },
    
    },
})
