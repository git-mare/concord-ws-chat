const i18n = require('./i18nConfig')

const setLanguage = (req, res, next) => {
    const lang = req.cookies.lang || 'en'
    i18n.setLocale(req, lang)
    res.locals.currentLanguage = lang
    next()
}

module.exports = { setLanguage, initI18n: i18n.init }