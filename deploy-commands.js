import 'dotenv/config.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

console.log("Deploying commands to server...");

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

console.log(`ClientId: ${clientId}, GuildId: ${guildId}`);

const commands = [
	new SlashCommandBuilder().setName('info').setDescription('Returns info about me, Rando Sumo.'),
	new SlashCommandBuilder().setName('sumo').setDescription('Gives everyone a random car class and type to play sumo with.')
]
	.map(command => command.toJSON());

console.log("Commands built successfully")

const rest = new REST({ version: '9' }).setToken(token);

console.log("REST configured");

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

console.log("Deployed commands to server successsfully");