'use strict'

const title = document.getElementsByTagName('h1')[0]
const handlerBtn = document.getElementsByClassName('handler_btn')
const screenBtn = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const inputTypeRange = document.querySelector('.rollback input[type=range]')
const rangeSpan = document.querySelector('.rollback span.range-value')
const totalInput1 = document.getElementsByClassName('total-input')[0]
const totalInput2 = document.getElementsByClassName('total-input')[1]
const totalInput3 = document.getElementsByClassName('total-input')[2]
const totalInput4 = document.getElementsByClassName('total-input')[3]
const totalInput5 = document.getElementsByClassName('total-input')[4]
let screenChoice = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 30,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?')
        } while (appData.isNumber(appData.title) || appData.title[0] == ' ' || appData.title == '');

        for (let i = 0; i < 2; i++) {
            let name = 0
            let price = 0

            do {
                name = prompt('Какие типы экранов нужно разработать?')
            } while (appData.isNumber(name) || name[0] == ' ' || name == '');

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price })
        }

        appData.screenPrice = +appData.screenPrice;

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');

        for (let i = 0; i < 2; i++) {
            let name = 0
            let price = 0

            do {
                name = prompt('Какой дополнительный тип услуги нужен?')
            } while (appData.isNumber(name) || name[0] == ' ' || name == '');

            do {
                price = prompt('Сколько это будет стоить?')
            } while (!appData.isNumber(price))

            appData.services[name] = +price
        }
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%'
        } else if (price >= 15000) {
            return 'Даем скидку в 5%'
        } else if (price >= 0) {
            return 'Скидка не предусмотрена'
        } else {
            return 'Что то пошло не так'
        }
    },

    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function () {
        appData.title = appData.title.trim().toUpperCase().substring(0, 1) + appData.title.trim().toLowerCase().substring(1);
        // return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase()
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * appData.rollback / 100))
    },

    start: function () {
        appData.asking()
        appData.addPrices()
        appData.getFullPrice()
        appData.getServicePercentPrices()
        appData.getTitle()
        appData.logger()
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        for (let key in appData) {
            console.log(key);
        }
    }
}

appData.start()