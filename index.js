const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
//const ms = require('ms'); //le temps


const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);

	bot.commands.set(command.name, command);
}

//Création d'une collection pour les pas et des autres variables
var pas = new Discord.Collection();
var niveaux = [config.niv0,config.niv1,config.niv2,config.niv3,config.niv4,config.niv5]
var objectifs = [];
for (var i=0; i<niveaux.length-1;i++) {
	if (i==0) {
		objectifs[i] = parseInt(config.pallier);
	}
	else {
		objectifs[i] = objectifs[i-1]*(i+1);
	}
}
//attention objectifs.length = niveaux.length -1


bot.on('ready', () => {
	console.log('This bot is online !');
	bot.user.setActivity('%help').catch(console.error);
})

bot.on('guildCreate', guild => {
	const channelSystem = guild.systemChannel;
	channelSystem.send('Hello ! Je suis Sunny. Je suis là pour vous motiver à marcher un peu plus chaque jour !\n'+
						"Pour savoir comment je fonctionne, utilisez la commande`%help`. J'ai hâte de suivre vos progrès !");

})

bot.on('guildMemberAdd', member => {
	if(!member.user.bot) {
		member.channel.send(`Bienvenue ${member.displayName} ! \n`+
		"Je suis Sunny, mon rôle est de te motiver à marcher un peu plus chaque jour ;)\n"+
		"Pour savoir comment je fonctionne, utilise la commande`%help`. J'ai hâte de suivre tes progrès !");
	}
	
})

bot.on('message', message => {

	//ne repond pas si bot
	if(message.author.bot) return;
	
	//ne repond pas si le message ne commence pas par le prefixe
	if(message.content.indexOf(config.prefix) !== 0) return;

	//on separe la commande des arguments (args dans un tableau)
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

	switch(command) { //premier mot
		case 'ping' :
			bot.commands.get('ping').execute(message);
			break;
		case 'hello' :
			bot.commands.get('hello').execute(message);
			break;
		case 'help' :
			bot.commands.get('help').execute(message);
			break;
		case 'me' :
			bot.commands.get('me').execute(message, pas, niveaux, objectifs);
			break;
		case 'init' :
			bot.commands.get('init').execute(message, message.guild, pas, niveaux);
			break;
		case 'done' :
			bot.commands.get('done').execute(message, args, pas, niveaux, objectifs);
			break;
		case 'reset' :
			bot.commands.get('reset').execute(message, pas, niveaux);

		break; 

	}
})

bot.login(process.env.BOT_TOKEN);