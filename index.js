const { Client, MessageEmbed, MessageAttachment } = require('discord.js')
const bot = new Client()

const http = require("http");

const token = "NzQyNDIyNjQyMzU0NjgzOTY3.XzF49w.9umPurT7wi2pDts9l18NhaMv0Ss"

const randomWords = require('random-words');

const PORT = process.env.PORT


server = http.createServer(function( req, res ){

    bot.on('ready', () => {
        console.log("I am online")
    })
    
    bot.on('message', msg => {
    
        if(msg.content.toLowerCase() === "start hangman"){
            if(!hangmanOngoing){
                channel = msg.channel
                startHangman()
            } else {
                msg.channel.send("Hangman already in process")
            }
    
        }
    
        else if(msg.content === "stop hangman"){
            if(hangmanOngoing){
                stopHangman(msg)
            }
        } 
    
        else{
            if(hangmanOngoing){
                hangmanTurn(msg.content)
            }
        }
    })
    
    bot.login(token);

    //----------HANGMAN--------------
    
    var channel 
    
    var wordToGuess = ""
    
    var correctLetters = []
    
    var wrongLetters = []
    
    var hangmanOngoing = false
    
    var minGuesses = 0
    
    var maxGuesses = 6
    
    var hangmanImgPaths = [
        "./img/0.png",
        "./img/1.png",
        "./img/2.png",
        "./img/3.png",
        "./img/4.png",
        "./img/5.png",
        "./img/6.png",
        "./img/7.png"
    ]
    
    var winHangmanImgPath = "./img/win.png"
    
    
    function startHangman(){
    
        wordToGuess = randomWords({ exactly: 1 })[0]
        console.log(wordToGuess)
        hangmanOngoing = true
        console.log(hangmanOngoing)
        minGuesses = getMinimumNumberOfGuesses(wordToGuess)
        hangmanReady(wordToGuess)
    }
    
    function hangmanReady(){
        channel.send("HANGMAN STARTED! start guessing :)")
        sendHangman()
        
    }
    
    function hangmanTurn(guess1){
        var guess = guess1.toLowerCase()
        if(guess.length == 1 && (guess.toUpperCase() != guess.toLowerCase())){
             if (correctLetters.includes(guess) || wrongLetters.includes(guess)){
            alreadyGussed(guess)
            return
        } 
        else if (wordToGuess.includes(guess)) {
            correctLetters.push(guess)
        } else {
            wrongLetters.push(guess)
        }
    
        if(correctLetters.length === minGuesses){
            hangmanOver(true)
        } else if (wrongLetters.length > maxGuesses) {
            hangmanOver(false)
        }
        else {
            sendHangman()
        }
    }
    }
    
    function sendHangman(){
        
        const attachment = new MessageAttachment(hangmanImgPaths[wrongLetters.length], 'amongus.png');
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(getLetters())
        // Set the color of the embed
        .setColor(0xffff00)
        // Set the main content of the embed
        .attachFiles(attachment)
        .setImage('attachment://amongus.png')
        // Send the embed to the same channel as the message
        channel.send(embed)
    
    }
    
    function getLetters(){
    
        let guessesString = ""
        for(let letter of wordToGuess){
            if(correctLetters.includes(letter)){
                guessesString += " " + letter.toUpperCase() + " "
            } else {
                guessesString += " — "
            }
        }
        return guessesString
    }
    
    function hangmanOver(didWin){
        if(didWin){
            sendWinMessage()
        } else {
            sendLoseMessage()
        }
    }
    
    function sendWinMessage(){
    
        const attachment = new MessageAttachment(winHangmanImgPath, 'amongus.png');
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(`${wordToGuess.toUpperCase()}`)
        // Set the color of the embed
        .setColor(0xffff00)
        // Set the main content of the embed
        .attachFiles(attachment)
        .setImage('attachment://amongus.png')
        // Send the embed to the same channel as the message
        .setDescription("HURRAH! you found the impostor! :)")
        channel.send(embed)
        stopHangman()
    }
    
    function sendLoseMessage(){ 
    
        const attachment = new MessageAttachment(hangmanImgPaths[wrongLetters.length], 'amongus.png');
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(`${wordToGuess.toUpperCase()}`)
        // Set the color of the embed
        .setColor(0xffff00)
        // Set the main content of the embed
        .attachFiles(attachment)
        .setImage('attachment://amongus.png')
        // Send the embed to the same channel as the message
        .setDescription("OH NO! mini is now an orphan! :(")
        channel.send(embed)
        stopHangman()
    
    }
    
    function getMinimumNumberOfGuesses(word){
        var letters = []
        for(let letter of word){
            console.log(letter)
            if(letters.includes(letter)){
                continue;
            }
            letters.push(letter)
        }
        return letters.length
    }
    
    function stopHangman(msg){
        hangmanOngoing = false
        wordToGuess = ""
        correctLetters = []
        wrongLetters = []
        channel.send("HANGMAN STOPPED!")
    }
    
    function alreadyGussed(letter){
        channel.send(`you have already guessed ${letter}`)
    }

})

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
 })