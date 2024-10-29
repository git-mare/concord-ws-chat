const i18n = require('i18n')
const path = require('path')

i18n.configure({
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    directory: path.join(__dirname, '../locales'),
    cookie: 'lang',
    objectNotation: false,
    register: global
})

module.exports = i18n