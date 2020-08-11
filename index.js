const { Client, MessageEmbed } = require('discord.js')
const bot = new Client()

const token = "NzQyNDIyNjQyMzU0NjgzOTY3.XzF49w.9umPurT7wi2pDts9l18NhaMv0Ss"

bot.on('ready', () => {
    console.log("I am online")
})

bot.on('message', msg => {

    if(msg.content === "its valorant time"){
        console.log("nice")
        const role = msg.guild.roles.cache.find(role => role.name === "Buddies");
        msg.channel.send(`${role} Beep Boop ${msg.author.username} is asking if anyone is up for some Valorant? Yes? No?`)
        //valorantTime(msg)
    }




})

bot.login(token);


function valorantTime(message){

    
    const embed = new MessageEmbed()
    // Set the title of the field
    .setTitle('It Is Time For Valorant')
    // Set the color of the embed
    .setColor(0xff0000)
    // Set the main content of the embed
    .setDescription('Beep Boop ' + message.author + ' is asking if anyone is up for some Valorant? Yes? No?')
    // Send the embed to the same channel as the message
    message.channel.send(embed)

}