// детальная информация для объекта (аренда)
RentDetailsSchema = new SimpleSchema({
    conditions: {
        type: Array,
        label: 'Conditions',
        allowedValues: ['furniture','kitchen_furniture','phone','tv','wifi','refrigerator','washer','animal','children'],
        optional: true
    },
    'conditions.$': {
        type: String,
        label: 'Conditions.[]',
        optional: true
    },
    // площадь комнат
    roomsSquare: {
        type: Array,
        label: "roomsSquare",
        optional: true
    },
    "roomsSquare.$": {
        type: Number,
        label: "roomsSquare.[]",
        optional: true
    },
    livingSquare: {
        type: Number,
        label: "Living square",
        optional: true
    },
    kitchenSquare: {
        type: Number,
        label: "Living square",
        optional: true
    },
    // Описание
    descr: {
        type: String,
        label: 'descr',
        optional: true
    },
    renovation: {
        type: Number,
        label: "renovation",
        allowedValues: Meteor.dictionary.renovation.map(function (item) {
            return item.id
        }),
        optional: true
    },
    //Балкон
    balcony: {
        type: Number,
        label: "balcony",
        allowedValues: Meteor.dictionary.balcony.map(function (item) {
            return item.id
        }),
        optional: true
    },
    // Лоджия
    loggia: {
        type: Number,
        label: "loggia",
        allowedValues: Meteor.dictionary.balcony.map(function (item) {
            return item.id
        }),
        optional: true
    },
    //Саунзел
    bathroom: {
        type: Number,
        label: "bathroom",
        allowedValues: Meteor.dictionary.bathroom.map(function (item) {
            return item.id
        }),
        optional: true
    },
    //Лифт
    elevator: {
        type: Number,
        label: "elevator",
        allowedValues: Meteor.dictionary.elevator.map(function (item) {
            return item.id
        }),
        optional: true
    },
    // Грузовой лифт
    elevatorBig: {
        type: Number,
        label: 'Elevator big',
        allowedValues: Meteor.dictionary.elevator.map(function (item) {
            return item.id
        }),
        optional: true
    },
    //Тип жилья в фильтре
    isNewBuilding: {
        type: Number,
        label: "isNewBuilding",
        allowedValues: Meteor.dictionary.isNewBuilding.map(function (item) {
            return item.id
        }),
        optional: true
    },
    //Тип строения в фильтре
    materials: {
        type: Number,
        label: "materials",
        allowedValues: Meteor.dictionary.materials.map(function (item) {
            return item.id
        }),
        optional: true
    },
    //Вид из окна в фильтре
    windowView: {
        type: Number,
        label: "windowView",
        allowedValues: Meteor.dictionary.windowView.map(function (item) {
            return item.id
        }),
        optional: true
    },
    // изображения залитые риэлтором
    images: {
        type: [Object],
        label: "images",
        optional: true
    },
    "images.$.url": {
        type: String
    },
    "images.$.relative_url": {
        type: String
    }
});