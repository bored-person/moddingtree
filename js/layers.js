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
        if (hasUpgrade('e', 14)) mult = mult.times(5)
        if (hasUpgrade('f', 11)) mult = mult.times(10)
        if (hasUpgrade('p', 24)) mult = mult.times(5)
        if (hasUpgrade('f', 11)) mult = mult.times(3)
        if (hasUpgrade('f', 14)) mult = mult.times(upgradeEffect('f',14))
        if (hasUpgrade('f', 32)) mult = mult.pow(upgradeEffect('f',32))
        if (hasUpgrade('l',11)) mult = mult.times(2)
        if (hasUpgrade('l',13)) mult = mult.times(upgradeEffect('l',13))
        return mult
    },
    passiveGeneration(){
        let gen = 0;
        if (hasUpgrade('f', 11)) gen += 1
        return gen;

    },

   autoUpgrade(){
    if (hasUpgrade('f', 12))
        return true
    else
        return false
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
            unlocked() { return hasUpgrade('p', 11) },
            effect() {
                return player[this.layer].points.add(15).pow(0.27)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "points prestige",
            description: "boost prestige based on points",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('p', 12) },
            effect() {
                return player.points.add(1).pow(0.20)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "points points",
            description: "boost points based on points",
            unlocked() { return hasUpgrade('p', 13) },
            cost: new Decimal(20),
            effect() {
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "prestigy prestige",
            description: "boost points prestige based on prestige",
            unlocked() { return hasUpgrade('p', 14) },
            cost: new Decimal(50),
            effect() {
                return player.p.points.add(1).pow(0.20)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "super points points",
            description: "boost points points based on points",
            unlocked() { return hasUpgrade('p', 21) },
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },
        23: {
            title: "way more points",
            description: "x20 points",
            unlocked() { return hasUpgrade('p', 22) },
            cost: new Decimal(500),
        },
        24: {
            title: "more prestige",
            description: "x5 prestige",
            unlocked() { return hasUpgrade('p', 23) },
            cost: new Decimal(10000),  
        },
    },
})

addLayer("e", {
    name: "electricity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(5000000), // Can be a function that takes requirement increases into account
    resource: "electric currents", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('e', 13)) mult = mult.div(upgradeEffect('e', 13))
        if (hasUpgrade('e', 14)) mult = mult.div(3)
        if (hasUpgrade('f', 11)) mult = mult.div(2)
        if (hasUpgrade('f', 12)) mult = mult.div(2)
        if (hasUpgrade('f',13)) mult = mult.div(5)
        if (hasUpgrade('f', 14)) mult = mult.div(upgradeEffect('f',14))
        if (hasUpgrade('f', 21)) mult = mult.div(upgradeEffect('f',21))
        if (hasUpgrade('l',11)) mult = mult.div(2)
        return mult
    },
    canBuyMax(){
        return true
    },
    autoUpgrade(){
        return (hasUpgrade('f', 13))
    },
    unlocked(){
        return (hasMilestone('e',0))
    },
    autoPrestige(){
        return (hasMilestone('f',1))
    },
    milestonePopups(){
        return (hasMilestone('f',1) == false)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let gainEx = new Decimal(1)
        if (hasUpgrade('f', 14)) gainEx = gainEx.times(2)
        if (hasUpgrade('f', 21)) gainEx = gainEx.times(5)
        if (hasUpgrade('f',22)) gainEx = gainEx.times(upgradeEffect('f',22))
        if (hasUpgrade('f',23)) gainEx = gainEx.times(upgradeEffect('f',23))
        if (hasUpgrade('f',24)) gainEx = gainEx.times(upgradeEffect('f',24))
        if (hasUpgrade('l',11)) gainEx = gainEx.times(2)
        if (hasUpgrade('l',13)) gainEx = gainEx.times(upgradeEffect('l',13))
        return gainEx
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetsNothing(){
        return hasMilestone('f',1)
    },
    upgrades: {
        11: {
            title: "better rebirth",
            description: "gain 5x more points and 2x more prestige",
            cost: new Decimal(1),
        },
        12: {
            title: "electrical currencies",
            description: "boost prestige and points based on best electronic currents",
            unlocked() { return hasUpgrade('e', 11) },
            cost: new Decimal(3),
            effect() {
                return player.e.best.add(1).pow(0.40)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },
        13: {
            title: "electric prestige",
            description: "boost electric current gain based on prestige",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('e', 12) },
            effect() {
                return player.p.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },
            14: {
            title: "supercharge",
            description: "10x points, 5x prestige and 3x electric currents",
            unlocked() { return hasUpgrade('e', 13) },
            cost: new Decimal(6),
            },
        },
    milestones:{
        0: {
			requirementDescription: '1 electric current',
			effectDescription: 'keep electric currents unlocked on reset',
			done() { return player.e.points.gte(1) },
        },  
    },
})

addLayer("f", {
    name: "fiber", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    softcap: new Decimal(25000000),
    softcapPower(){0.05
        if (hasMilestone('l',1))
            return 0.13
        else if (hasUpgrade('l',11))
            return 0.1
        else
            return 0.05
    },
    color: "#4BDC13",
    requires: new Decimal(9), // Can be a function that takes requirement increases into account
    resource: "fibers", // Name of prestige currency
    baseResource: "electric currents", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('f', 11)) mult = mult.times(2)
        if (hasUpgrade('f', 12)) mult = mult.times(2)
        if (hasUpgrade('f', 13)) mult = mult.times(2)
        if (hasUpgrade('f',13)) mult = mult.times(upgradeEffect('f',13))
        if (hasMilestone('f',1)) mult = mult.times(2)
        if (hasUpgrade('f',31)) mult = mult.times(upgradeEffect('f',31))
        if (hasUpgrade('f',31)) mult = mult.times(2)
        if (hasUpgrade('l',11)) mult = mult.times(2)
        if (hasUpgrade('l',13)) mult = mult.times(upgradeEffect('l',13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    unlocked() {
        return (hasMilestone('f',0))
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "fiberous currencies",
            description: "x15 points, x10 prestige, x2 electric currents, x2 fibers, passive prestige point gen",
            cost: new Decimal(1),
        },
        12: {
            title: "fiber everywhere",
            description: "x5 points, x3 prestige, x2 electric currents, x2 fibers, autobuy prestige upgrades",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('f', 11) },
        },
        13: {
            title: "super fiber",
            description: "multiply fiber based on electric currents, x5 electric currents, x2 fibers, autobuy electric upgrades",
            cost: new Decimal(6),
            unlocked() { return hasUpgrade('f', 12) },
            effect() {
                return player.e.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        
        },
        14: {
            title: "reoccuring currencies",
            description: "boost points, prestige and electric currents based on points times prestige and 2x electric currents",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade('f', 13) },
            effect() {
                return (player.points.add(1).pow(0.05)).times(player.p.points.add(1).pow(0.05))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        21: {
            title: "electric wiring",
            description: "x5 electric current gain and reduce electric current requirement based on points",
            cost: new Decimal(250),
            unlocked() { return hasUpgrade('f', 14) },
            effect() {
                return player.points.add(1).pow(0.125)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        22: {
            title: "electric currents galore",
            description: "boost electric currents based on electric currents",
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade('f', 21) },
            effect() {
                return player.e.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        23: {
            title: "pointy currents",
            description: "boost electric currents gain based on points",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade('f', 22) },
            effect() {
                return player.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        24: {
            title: "prestige currents",
            description: "boost electric current gain based on prestige",
            cost: new Decimal(15000),
            unlocked() { return hasUpgrade('f', 23) },
            effect() {
                return player.points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        31: {
            title: "fiberous intake",
            description: "boost fiber based on points, 2x fiber",
            cost: new Decimal(50000),
            unlocked() { return hasUpgrade('f', 24) },
            effect() {
                return player.points.add(1).pow(0.015)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        32: {
            title: "fiber in the first two currencies",
            description: "exponiate points and prestige gainbased on fiber",
            cost: new Decimal(250000),
            unlocked() { return hasUpgrade('f', 31) },
            effect() {
                return player.f.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    },
    milestones:{
        0:{
            requirementDescription: '1 fiber',
            effectDescription: 'keep fibers unblocked on reset',
            done() { return player.f.points.gte(1) },
        },
        1: {
			requirementDescription: '500 fibers',
			effectDescription: 'electric current resets nothing and auto resets, x2 fiber gain',
			done() { return player.f.points.gte(500) },
		},
    }
})

addLayer("l", {
    name: "Light", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(25000000), // Can be a function that takes requirement increases into account
    resource: "light", // Name of prestige currency
    baseResource: "fibers", // Name of resource prestige is based on
    baseAmount() {return player.f.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasMilestone('l',1)) mult = mult.div(8)
        return mult
    },
    canBuyMax(){
        return true
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let gainEx = new Decimal(1)
        if (hasUpgrade('l',12)) gainEx = gainEx.times(3).times(upgradeEffect('l',12))
        if (hasMilestone('l',0)) gainEx = gainEx.times(2)
        return gainEx
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "better currencies",
            description: "decrease fiber softcap effect, x2 fiber, x2 electric currents, x2 prestige, x2 points",
            cost: new Decimal(2),
        },
        12: {
            title: "brighter",
            description: "x3 light, boost light gain based on best light",
            cost: new Decimal(4),
            unlocked(){
                return hasUpgrade('l',11)
            },
            effect() {
                return player.l.best.add(5).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        13: {
            title: "bright currencies",
            description: "multiply every currency below light based on best light",
            cost: new Decimal(5),
            unlocked(){
                return hasUpgrade('l',12)
            },
            effect() {
                return player.l.best.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    },
    milestones:{
        0:{
            requirementDescription: '5 light',
            effectDescription: 'autobuy fiber upgrades, x2 light',
            done() { return player.l.points.gte(5) },
        },
        1:{
            requirementDescription: '7 light',
            effectDescription: 'reduce fiber softcap effect, reduce light requirement',
            done() { return player.l.points.gte(7) },
        },
    }
})