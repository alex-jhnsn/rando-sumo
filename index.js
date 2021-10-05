import "dotenv/config.js";
import { Client, Intents } from "discord.js";
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

    await interaction.reply({content: "Picking your cars from any category..."})
    channel.members.forEach(async member => {
      const category = randomCategory();
      const car = randomCar(category);
      await interaction.followUp({content: `${member} your car is: ${category} - ${car}`});
    });
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