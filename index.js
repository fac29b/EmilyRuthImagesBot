require('dotenv/config');
require('./register-comands.test')

const {EmbedBuilder, Client}= require('discord.js')

const {configuration, OpenAI}= require('openai');
//const translate = require('translate-google');
const commands = require("./register-comands");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

require('dotenv').config(); 
const Discord = require('discord.js'); 

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
    const forbiddenWords = [
      'sexual', 'porn', 'sex', 'kill', 'murder',
      'violence', 'drugs', 'alcohol', 'smoking',
      'weapon', 'gambling', 'abuse', 'suicide', 'death', 'fuck', 'shit', 'gun', 'knife', 'crime', 'dead', 'ass', 'blood'
    ]; 

    const promptLowercase = prompt.toLowerCase();
    const foundForbiddenWord = forbiddenWords.some((word) => promptLowercase.includes(word));
    

    if (foundForbiddenWord) {
      await interaction.editReply(
        "I'm here to provide safe and friendly content. Unfortunately, I can't process requests for that kind of content. Is there anything else I can help you with?"
      );}
    else {
    


    try {
      const response = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      });

      console.log('OpenAI API Response:', response);

      const imageURL = response.data[0].url;

      const embed = new EmbedBuilder();

// Assuming 'prompt' is the user's input
const words = prompt.split(' ');
const firstWord = words[0].toLowerCase();
const firstChar = prompt.trim().toLowerCase()[0];
const lastChar = prompt.trim().toLowerCase().slice(-1);

if (lastChar === 's') {
  embed.setTitle(`Here's your image of \`\`\`${prompt}\`\`\``);
} else if (['the', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'a', 'an'].includes(firstWord) || !isNaN(firstWord)) {
  embed.setTitle(`Here's your image of \`\`\`${prompt}\`\`\``);
} else if (['a', 'e', 'i', 'o', 'u'].includes(firstChar)) {
  embed.setTitle(`Here's your image of an \`\`\`${prompt}\`\`\``);
} else {
  embed.setTitle(`Here's your image of a \`\`\`${prompt}\`\`\``);
}

embed.setColor('Blue')
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