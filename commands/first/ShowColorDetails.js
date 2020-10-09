const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const colorNames = require("../resources/colorNames.json");

module.exports = class ShowColorDetails extends Command {
  constructor(client) {
    super(client, {
      name: "colorcode",
      aliases: ["cc"],
      group: "first",
      memberName: "colorcode",
      description: "Show the details of a color!",
      args: [
        {
          key: "color",
          type: "string",
          prompt: "Color you want the details of.",
        },
      ],
    });
  }

  getFullLengthHex(hex = "#000000") {
    hex = hex.substring(1);

    if (hex.length === 3) {
      return hex.split("").reduce((tHex, value) => {
        return `${tHex}${value}${value}`;
      }, "");
    }
    return hex;
  }

  run(message, { color }) {
    const selectedColor = colorNames[color];
    if (selectedColor) {
      const colorHex = this.getFullLengthHex(selectedColor.hex);
      const exampleEmbed = new MessageEmbed()
        .setColor(colorHex)
        .setTitle(selectedColor.name)
        .addFields(
          { name: "HEX", value: colorHex },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Inline field title",
            value: "Some value here",
            inline: true,
          },
          { name: "Inline field title", value: "Some value here", inline: true }
        )
        .addField("Inline field title", "Some value here", true)
        .setImage("https://i.imgur.com/wSTFkRM.png")
        .setTimestamp()
        .setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");

      return message.embed(exampleEmbed);
    }
    
    return message.say("Color Not Found!");
  }
};