'use strict'

let title = prompt('Как называется ваш проект?')
let screens = prompt('Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные')
let screenPrice = + prompt('Сколько будет стоить данная работа?',
    '12000')
let rollback = 30
let adaptive = confirm('Нужен ли адаптив на сайте?')
let service1 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice1 = + prompt('Сколько это будет стоить?')
let service2 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice2 = + prompt('Сколько это будет стоить?')
let fullPrice
let servicePercentPrice

let screenPriceProposal = 'Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани'

let allServicePrices = servicePrice1 + servicePrice2

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

const getAllServicePrices = function (allServicePrices) {
    return allServicePrices;
}

function getFullPrice(screenPrice, allServicePrices) {
    fullPrice = screenPrice + allServicePrices;
}

const getTitle = function (title) {
    title.trim().toUpperCase().substring(0, 1) + title.trim().toLowerCase().substring(1);
}

const getServicePercentPrices = function (servicePercentPrice) {
    console.log(servicePercentPrice = Math.ceil(fullPrice - (fullPrice * rollback / 100))); // +
}

getTitle(title)
getFullPrice(screenPrice, allServicePrices)

let fullPriceProposal = 'Стоимость разработки сайта ' + fullPrice + ' рублей/долларов/гривен/юани'

getServicePercentPrices(servicePercentPrice)
showTypeOf(title) // +
showTypeOf(fullPrice) // +
showTypeOf(adaptive) // +



console.log(getRollbackMessage(fullPrice)); // +

console.log(screens.toLowerCase().split(', ')); // +