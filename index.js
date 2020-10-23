const { Client, MessageEmbed, MessageAttachment } = require('discord.js')
const bot = new Client()

const token = "NzQyNDIyNjQyMzU0NjgzOTY3.XzF49w.9umPurT7wi2pDts9l18NhaMv0Ss"

const randomWords = require('random-words');

const PORT = process.env.PORT


/*const csgoMsgs = [
    getItsTimeText("cs"), 
    getItsTimeText("csgo"), 
    getItsTimeText("counter strike"), 
    getItsTimeText("counter strike global offensive")]

const rlMsgs = [
    getItsTimeText("rl"),
    getItsTimeText("rocket leauge")
]

const valorantMsgs = [
    getItsTimeText("valorant")
]

const minecraftMsgs = [
    getItsTimeText("minecraft")
]*/

app.listen(PORT, function(){
    
    bot.on('ready', () => {
        console.log("I am online")
    })
    
    bot.on('message', msg => {
    
        /*if(msg.author.id === bot.user.id){
            return
        }
    
    
        if(valorantMsgs.includes(msg.content.toLowerCase())){
            console.log("nice")
            gameTime(msg, "valorant", valorantIcon)
        }
    
        else if(rlMsgs.includes(msg.content.toLowerCase())){
            gameTime(msg, "rocket league", rlIcon)
        }
    
        else if(csgoMsgs.includes(msg.content.toLowerCase())) {
                gameTime(msg, "csgo", csIcon)
        }
    
        
        else if(minecraftMsgs.includes(msg.content.toLowerCase())) {
            gameTime(msg, "minecraft", minecraftIcon)
        }
    
        else if(msg.content === "Is Deku playing today?"){
            msg.channel.send("Nope.")
        }
    
        else if(msg.content === "meme plz"){
            getMeme()
        }*/
    
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
    
    
    //-----------GAMETIME-----------------
    /*
    const valorantIcon = "https://img.icons8.com/plasticine/2x/valorant.png"
    const rlIcon = "https://external-preview.redd.it/SpDNFegxVRzXyUta0BFMdNqyLVmXGVcKHhyVsqYjOfg.png?auto=webp&s=6ccb2078b5f2dbabd454f438ab6eddbc50420916"
    const csIcon = "https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/cs-icon.png"
    const minecraftIcon = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/977e8c4f-1c99-46cd-b070-10cd97086c08/d36qrs5-017c3744-8c94-4d47-9633-d85b991bf2f7.png"
    
    
    function getItsTimeText(game){
        return `its ${game} time`
    }
    
    function gameTime(msg, game, icon){
    
        const role = msg.guild.roles.cache.find(role => role.name === "Buddies");
    
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(`${game.toUpperCase()} TIME`)
        // Set the color of the embed
        .setColor(0xff0000)
        // Set the main content of the embed
        .setDescription(`Beep Boop ${msg.author.username} is asking for his ${role} to play some ${game} with him!`)
    
        .setThumbnail(icon)
        // Send the embed to the same channel as the message
        msg.channel.send(embed)
    
    }
    
    //------------MEME----------------
    
    function sendMeme(msg, title, url){
        
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(`${title}`)
        // Set the color of the embed
        .setColor(0xff0000)
        // Set the main content of the embed
        .setImage(url)
        // Send the embed to the same channel as the message
        msg.channel.send(embed)
    
    }
    
    
    function getMeme(){
        axios.get('https://meme-api.herokuapp.com/gimme/1')
        .then(response => {
            var url = response.data.memes[0].url
            var title = response.data.memes[0].title
            sendMeme(msg, title, url)
        })
        .catch(error => {
            console.log(error);
        })
    }
    */
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
