const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const { RichEmbed, Attachment } = require('discord.js');

module.exports.run = async(bot, message, args) => {
  console.log(`${message.author.tag} used the yeet parrot command.`)
  randomPuppy('parrots')
            .then(url => {
                const embed = new RichEmbed()
                
                .setTitle(`Parrot`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setImage(url)
                .setColor(000000)
    return message.channel.send({ embed });
            }).catch(
              error => {
                console.log(error)
              }
            )
  }
