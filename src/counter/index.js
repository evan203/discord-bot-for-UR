
let guildsInterval = {};
let fetchedGuild = {};
module.exports = (client) => {
  console.log('Set up counter service');
  return {
    counterInterval: (guildId, channelId, type) => {
      console.log('Creating interval for ', guildId, channelId);
      const guild = client.guilds.get(guildId);
      if (!guild) {
        console.log('Guild not found', guildId);
        return;
      }  
      var memberCountChannel = client.channels.get(channelId);
      if (!memberCountChannel) {
        console.log('Channel not found', channelId);
        return;
      }
      if (guildsInterval[guildId]) {
        clearInterval(guildsInterval[guildId]);
      }
      guildsInterval[guildId] = setInterval(() =>{
        if (!fetchedGuild[guildId]) {
          fetchedGuild[guildId] = {
            lastUpdate: new Date(0),
          };
        }
        var diff = Math.abs(new Date() - fetchedGuild[guildId].lastUpdate);
        var minutes = Math.floor((diff/1000)/60);
        if (minutes > 1) {
          console.log(`Updating guild: ${guild.name} => ${minutes} have passed`)
          guild.fetchMembers().then((updatedGuild) => {
            fetchedGuild[guildId] = updatedGuild;
            fetchedGuild[guildId].lastUpdate = new Date();
            updateChannel(updatedGuild, memberCountChannel, type);
          })
        } else {
          updateChannel(fetchedGuild[guildId], memberCountChannel, type);
        }
      }, 5000);
    }
  };
}

function updateChannel(guild, channel, type) {
  var memberCount = guild.memberCount;
  var botCount = guild.members.filter(member => member.user.bot).size;
  switch(type) {
      case 'members':
        channel.setName(`Members: ${memberCount}`);
        break;
      case 'bots':
        channel.setName(`Bots: ${botCount}`);
        break;
      case 'users':
        channel.setName(`Users: ${memberCount - botCount}`);
        break;
  }
}