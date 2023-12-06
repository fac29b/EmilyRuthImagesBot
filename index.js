require('dotenv/config');

const {EmbedBuilder, Client}= require('discord.js')

const {configuration, OpenAI}= require('openai');
//const translate = require('translate-google');
const commands = require("./register-comands");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


//const openai = new openAIAPI(configuration)
//const openai = process.env.OPENAI_API_KEY;

require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
});

   
//create new client

// 

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  

  if (interaction.commandName === 'image-generate') {
    await interaction.deferReply();

    
    
    const prompt = interaction.options.getString('prompt');

   

    console.log('Received prompt:', prompt);

    try {
      const response = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      });

      console.log('OpenAI API Response:', response);

      const imageURL = response.data[0].url;

      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`Here's your image of a \`\`\`${prompt}\`\`\``)
        .setImage(imageURL)
        .setTimestamp()
        .setFooter({ text: 'Image Generator' });

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Bad request error:', error.response.data);
        await interaction.editReply({ content: 'Bad request error. Please provide a valid prompt.' });
      } else {
        console.error('Error generating image:', error);
        await interaction.editReply({ content: 'Error generating image. Please try again later.' });
      }
    }
  }
});
  
  // client.on('message', async (message) => {
  //   if (message.content === '!generate-image') {
  //     try {
  //       const response = await axios.post(
  //         'https://api.openai.com/v1/images/generations',
  //         {
  //           prompt: 'A beautiful sunset over a serene lake',
  //           n: 1, // Define the number of images
  //           size: '512x512', // Define the resolution of the image
  //         },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${API_KEY}`,
  //           },
  //         }
  //       );
  
  //       // Assuming the response contains the image URL
  //       const imageUrl = response.data.images ? response.data.images[0] : null;
  
  //       if (imageUrl) {
  //         message.channel.send('Here is your generated image:', { files: [imageUrl] });
  //       } else {
  //         message.channel.send('Sorry, unable to generate an image at the moment.');
  //       }
  //     } catch (error) {
  //       console.error('Error generating image:', error.response.data);
  //       message.channel.send('Error generating image. Please try again later.');
  //     }
  //   }
  // });



// module.exports = {
//   name: 'translate',
//   run: async (client, message, args) => {
//     try {
//       const translation = await translate(args.join(' '), { to: 'en' });
//       message.channel.send(translation);
//     } catch (err) {
//       message.channel.send('An error has occurred');
//       console.error(err);
//     }
//   }
// };


//make sure this line is the last line
client.login(process.env.TOKEN); //login bot using token