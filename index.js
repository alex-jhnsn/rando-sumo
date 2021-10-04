import 'dotenv/config.js';
import { Client, Intents } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}.`);
});

client.on("message", msg => {
  console.log(msg);
  if (msg.content === "ping")
    msg.reply("pong");
});

client.on('interactionCreate', async interaction => {
  console.log("here");
  if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
  }
});

client.login(process.env.TOKEN);