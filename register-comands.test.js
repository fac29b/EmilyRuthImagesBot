const nock = require('nock');
const { REST } = require('discord.js');
const {commands} = require('./register-comands'); // Replace with the actual commands array

describe('Slash Command Registration', () => {
  it('should register slash commands successfully', async () => {
    // Mock the Discord API endpoint
    const apiMock = nock('https://discord.com/api/v10')
      .put(`/applications/${process.env.CLIENT_ID}/guilds/${process.env.GUILD_ID}/commands`)
      .reply(200, { message: 'Slash Commands were registered' }); // Replace with the expected response body

      nock.cleanAll();
    // Call your command registration code
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    const response = await rest.put(
      `/applications/${process.env.CLIENT_ID}/guilds/${process.env.GUILD_ID}/commands`,
      { body: commands }
    );

    // Assert that the Discord API was called as expected
    expect(apiMock.isDone()).toBe(true);

    // Assert the response from your command registration code
    expect(response).toEqual({ success: 'Slash Commands were registered' }); // Replace with the expected response body
  });
});