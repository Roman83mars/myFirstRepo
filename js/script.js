'use strict'

const title = document.getElementsByTagName('h1')[0]
const buttonPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

const inputRange = document.querySelector('.rollback input')
const inputRangeValue = document.querySelector('.rollback .range-value')

const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]

const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    count: 0,

    init: function () {
        this.addTitle()
        this.justNumber()

        startBtn.addEventListener('click', this.start.bind(this))
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))
        inputRange.addEventListener('input', this.getRollback.bind(this))
        resetBtn.addEventListener('click', this.reset.bind(this))
    },

    addTitle: function () {
        document.title = title.textContent
    },

    checkFields: function () {
        screens = document.querySelectorAll('.screen')
        let error = false
        screens.forEach((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            if (select.selectedIndex === 0 || input.value === '') {
                error = true
            }
        })
        return !error
    },

    start: function () {
        if (this.checkFields()) {
            this.addScreens()
            this.addServices()
            this.addPrices()
            this.showResult()
            this.blockFields()
            this.buttonСhange()
        }
    },

    reset: function () {
        this.buttonСhange()
        this.removeScreens()
        this.unblockFields()
        this.removeServices()
        this.addPrices()
        this.cleanResult()
        this.getRollback()
    },

    cleanResult: function () {
        total.value = 0
        totalCountOther.value = 0
        fullTotalCount.value = 0
        totalCountRollback.value = 0
        totalCount.value = 0
        inputRange.value = 0
        this.screenPrice = 0
        this.servicePricesPercent = 0
        this.servicePricesNumber = 0
        this.fullPrice = 0
        this.servicePercentPrice = 0
        this.servicesPercent = {}
        this.servicesNumber = {}
    },

    removeServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            check.checked = false
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            check.checked = false
        })
    },

    removeScreens: function () {
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')

            if (index === 0) {
                input.value = ''
                select.options.selectedIndex = 0
            } else {
                screens[index].remove()
            }
        })
        this.screens.length = 0
    },

    blockFields: function () {
        screens = document.querySelectorAll('.screen')
        screens.forEach((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            select.disabled = true
            input.disabled = true
        })
    },

    unblockFields: function () {
        screens = document.querySelectorAll('.screen')
        screens.forEach((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            select.disabled = false
            input.disabled = false
        })
    },

    buttonСhange: function () {
        if (resetBtn.style.display == 'none') {
            startBtn.style.display = 'none'
            resetBtn.removeAttribute('style')
        } else {
            resetBtn.style.display = 'none'
            startBtn.removeAttribute('style')
        }

    },

    showResult: function () {
        total.value = this.screenPrice
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        fullTotalCount.value = this.fullPrice
        totalCountRollback.value = this.servicePercentPrice
        totalCount.value = this.count
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                quantity: +input.value
            })
        })
    },

    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },

    addScreenBlock: function () {
        const clonScreen = screens[0].cloneNode(true)
        buttonPlus.before(clonScreen)
    },

    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * this.servicesPercent[key] / 100
        }

        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent
        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * this.rollback / 100))

        this.count = this.screens.reduce((sum, screen) => {
            return sum + screen.quantity
        }, 0)
    },

    getRollback: function () {
        inputRangeValue.textContent = inputRange.value + '%'
        this.rollback = inputRange.value
    },

    justNumber: function () {
        const input = document.querySelector('.screen input')
        input.value = input.value.replace(/[^\d]/g, '')
        input.addEventListener('keyup', this.justNumber)
    }
}

appData.init()