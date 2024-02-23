let title = 'Second project'
let screens = 'Простые, Сложные, Интерактивные'
let screenPrice = 5000
let rollback = 30
let fullPrice = 120000
let adaptive = true

console.log(typeof title)
console.log(typeof fullPrice)
console.log(typeof adaptive)
console.log(typeof title, typeof fullPrice, typeof adaptive)

console.log(screens.length);

let screenPriceProposal = 'Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани'

console.log(screenPriceProposal);

let fullPriceProposal = 'Стоимость разработки сайта ' + fullPrice + ' рублей/долларов/гривен/юани'

console.log(fullPriceProposal);

console.log(screens.toLowerCase().split(', '));

console.log(fullPrice * rollback / 100);