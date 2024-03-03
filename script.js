'use strict'

let title
let screens
let screenPrice
let adaptive
let rollback = 30

let service1
let service2

let fullPrice
let servicePercentPrice
let allServicePrices

let screenPriceProposal
let fullPriceProposal

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function () {
    title = prompt('Как называется ваш проект?', '  Калк ')
    screens = prompt('Какие типы экранов нужно разработать?',
        'Простые, Сложные, Интерактивные')

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    }
    while (!isNumber(screenPrice));

    screenPrice = +screenPrice;

    adaptive = confirm('Нужен ли адаптив на сайте?')
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%'
    } else if (price >= 15000) {
        return 'Даем скидку в 5%'
    } else if (price >= 0) {
        return 'Скидка не предусмотрена'
    } else {
        return 'Что то пошло не так'
    }
}

const getAllServicePrices = function () {
    let sum = 0

    for (let i = 0; i < 2; i++) {
        let price = 0

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?')
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?')
        }

        do {
            price = prompt('Сколько это будет стоить?')
        } while (!isNumber(price))
        sum += +price
    }

    return sum
    // return servicePrice1 + servicePrice2;
}

const getFullPrice = function () {
    return screenPrice + allServicePrices;
}

const getTitle = function () {
    return title.trim().toUpperCase().substring(0, 1) + title.trim().toLowerCase().substring(1);
    // return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase()
}

const getServicePercentPrices = function () {
    return Math.ceil(fullPrice - (fullPrice * rollback / 100))
}

asking()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice()
servicePercentPrice = getServicePercentPrices()
title = getTitle()

screenPriceProposal = 'Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани'
fullPriceProposal = 'Стоимость разработки сайта ' + fullPrice + ' рублей/долларов/гривен/юани'

showTypeOf(title)
showTypeOf(fullPrice)
showTypeOf(adaptive)

console.log('allServicePrices', allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(screens.toLowerCase().split(', '));

console.log(screenPriceProposal);
console.log(fullPriceProposal);

console.log(screenPrice);
console.log(allServicePrices);
console.log(typeof screenPrice);
console.log(typeof allServicePrices);