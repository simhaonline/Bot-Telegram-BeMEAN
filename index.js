'use strict';

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_TOKEN || 'INSERT API_TOKEN';
// Setup polling way
const bot = new TelegramBot(token, { polling: true });

const commands = require('./modules/commands');

// Matches commands
bot.onText(/\/([a-zA-Z]+) ?(.+)?/, (msg, match) => {
    command = match[1];
    args = match[2];
    if (command) {
        if (command in commands) {
            command = commands[command];
            if (match.length > command.numParams) {
                if (args) {
                    args = args.split(' ');
                }
                command.execute(msg, match, bot);
            } else {
                bot.sendMessage(msg.chat.id, "Ops, número incorreto de parâmetros fornecidos (" + match.length + "). Número de parâmetros exigidos: " + command.numParams + " :/");
            }
        } else {
            bot.sendMessage(msg.chat.id, "Eita, esse comando não existe :/");
        }
    }
});