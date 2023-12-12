# EmilyRuthImagesBot

## Overview

This Discord chatbot uses the slash command /image-generate to connect with the OpenAI API and generate an image based on the user's prompt. 
![A screenshot of a discord interaction where the user (Emily Turner) uses that image-generate slash command and the bot responds 'Here is your picture of a plate of spaghetti' with a picture of that below](https://github.com/fac29b/EmilyRuthImagesBot/assets/49107443/890202b4-6ce5-4300-9258-e1b283d16811)

## Features:

- a slash command registered with the discord server
- use of the openAI API to create images
- a reply to the users prompt that, in most cases, will be gramatically correct
- a family-friendly feature that will not allow a user to ask for images of a sexual or violent nature
- a gitignore for the APIs and node modules 

## Future goals

- grammar and content checking to be completed by the API, not hard-coded
- chaining mutliple message together so a user can request improvements on or changes to their original picture

## To run this bot yourself...

- download the npm node modules for discord and openai
- enter your own OpenAI API in the .env file
- update your server information in the .env file

