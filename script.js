'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 30,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',

    asking: function () {
        appData.title = prompt('Как называется ваш проект?', '  Калк ')
        appData.screens = prompt('Какие типы экранов нужно разработать?',
            'Простые, Сложные, Интерактивные')

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!appData.isNumber(appData.screenPrice));

        appData.screenPrice = +appData.screenPrice;

        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
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

    getAllServicePrices: function () {
        let sum = 0

        for (let i = 0; i < 2; i++) {
            let price = 0

            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
            }

            do {
                price = prompt('Сколько это будет стоить?')
            } while (!appData.isNumber(price))
            sum += +price
        }

        return sum
    },

    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function () {
        return appData.title.trim().toUpperCase().substring(0, 1) + appData.title.trim().toLowerCase().substring(1);
        // return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase()
    },

    getServicePercentPrices: function () {
        return Math.ceil(appData.fullPrice - (appData.fullPrice * appData.rollback / 100))
    },

    start: function () {
        appData.asking()
        appData.allServicePrices = appData.getAllServicePrices()
        appData.fullPrice = appData.getFullPrice()
        appData.servicePercentPrice = appData.getServicePercentPrices()
        appData.title = appData.getTitle()
        appData.logger()
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        for (let key in appData) {
            console.log(key);
        }
    }
}

appData.start()