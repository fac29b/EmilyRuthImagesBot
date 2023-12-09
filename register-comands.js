
require('dotenv/config');
const {SlashCommandBuilder}= require('discord.js')
const { REST, Routes} = require('discord.js');

const commands = [
    new SlashCommandBuilder()
      .setName('image-generate')
      .setDescription('This generates an image using a prompt provided by you')
      .addStringOption(option => option.setName('prompt').setDescription('Start describing the image you would like to create.')),
    // Add other commands as needed...
  ].map(command => command.toJSON());

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log('Registering Slash Commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        )
        console.log('Slash Commands were registered');
    } 
    catch (error){
        console.log(`There was an error: ${error}`);
    }
})();