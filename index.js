import "dotenv/config.js";
import { Client, Intents } from "discord.js";
import { bold, italic, memberNicknameMention } from "@discordjs/builders";
import { randomCategory, randomCar } from "./randomiser.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}.`);
});

client.on("interactionCreate", async interaction => {

  if (!interaction.isCommand()) 
    return;

	const { commandName } = interaction;

	if (commandName === "sumo") {
    const channel = await interaction.guild.channels.fetch(interaction.member.voice.channelId);

    if (!channel.members) {
      await interaction.reply({content: "No one is ready to sumo :(."});
      return;
    }

    let msg = "Picking your cars from any category...\n\n";

    channel.members.forEach(async member => {
      const category = randomCategory();
      const car = randomCar(category);
      msg += `${memberNicknameMention(member.id)} your car is: ${bold(category)} - ${bold(car)}\n`
    });

    await interaction.reply({content: msg});
	} else if (commandName === "info") {
    await interaction.reply({content: `Hello ${interaction.member}, my name is Yu Phat`, ephemeral: true})
  }
});

client.login(process.env.TOKEN);



// const row = new MessageActionRow()
//   .addComponents(
//     new MessageSelectMenu()
//       .setCustomId('select')
//       .setPlaceholder('Select a class')
//       .addOptions([
//         {
//           label: "Super",
//           description: "They're super",
//           value: "super"
//         },
//         {
//           label: "Off Road",
//           description: "The chonkiest of stonkers",
//           value: "off_road"
//         },
//         {
//           label: "Muscle",
//           description: "It's Alex, but as a car",
//           value: "muscle"
//         }
//       ])
//   )

//   await interaction.reply({ content: 'Pick which class you want to play:', components: [row] });