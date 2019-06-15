// Require Packages
const Discord = require('discord.js');
const { prefix, prefix2, token } = require('./config.json');
const client = new Discord.Client(); 

// Constant Variables
const ownerID = process.env.OWNER; 

// Listener Events
client.on('message', message => {

    // Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Now, we have two variables.  cmd contains the command following the prefix
    // args contains everything following that and splits it into an array by slices

    // Return Statements
    if (message.author.bot) return; 
    if (message.content.startsWith(`${prefix2}${cmd}`)) {
        try {

            // Bonus: Auto-Reload (You should move this into it's own command)
            delete require.cache[require.resolve(`./commands/${cmd}2.js`)]; 
    
            // Options
            let ops = {
                ownerID: 317026950939934721
            }
    
            let commandFile = require(`./commands/${cmd}2.js`); 
            commandFile.run(client, message, args, ops); 
    
        } catch (e) { 
            //console.log(e.stack);
        }
    
    } else { if (!message.content.startsWith(prefix)) return; 

    // Command Handler
    try {

        // Bonus: Auto-Reload (You should move this into it's own command)
        delete require.cache[require.resolve(`./commands/${cmd}.js`)]; 

        // Options
        let ops = {
            ownerID: 317026950939934721
        }

        let commandFile = require(`./commands/${cmd}.js`); 
        commandFile.run(client, message, args, ops); 

    } catch (e) { 
        //console.log(e.stack);
    }}
});

// Ready Event - Bot Online / Bot started
client.on('ready', () => console.log('Bot is ready!'));

// Discord Login 
client.login(token); 
