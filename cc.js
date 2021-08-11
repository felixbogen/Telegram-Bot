var lookup = require('binlookup')();
const { Telegraf } = require('telegraf')
require('dotenv').config({ path: '/Users/felix/Developer/Telegram Bot/env' })

const token = process.env.API_KEY
const bot = new Telegraf(token)
bot.start((ctx) => ctx.reply('Welcome, type CC (uppercase) than the card number (no spaces)'))
bot.help((ctx) => ctx.reply('CC xxxxxxxxxxxxxxx'))
bot.hears('Error', (ctx) => ctx.reply('/help'))
bot.hears(/CC (.+)/, async (ctx) => {
  const cardnumber = ctx.match[1];

  lookup(cardnumber, function( err, data ){
    if (err)
      ctx.reply('Error')

      ctx.reply(`
    ***********${data.type} Card**********
Sheme: ${data.scheme}
Brand: ${data.brand}
Emoji: ${data.country.emoji}
Country: ${data.country.name}
Currency: ${data.country.currency}
Bank: ${data.bank.name}
BankUrl: ${data.bank.url}
Phone: ${data.bank.phone}
lat: ${data.country.latitude}
long: ${data.country.longitude}`)
  })
})
bot.launch()

