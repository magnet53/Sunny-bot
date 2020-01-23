const Discord = require('discord.js');
const FindNiveau = require('./functions/findNiveau.js');

module.exports = {
	name: 'reset',
	description: "reset steps",
	execute(message, pas, niveaux) {
        if(pas.get(message.member.id) == undefined) {
            message.channel.send("Il faut avoir initialiser le compteur de pas avec `%init` pour pouvoir l'effacer !");
            return;
        }
        else {
            message.reply("es-tu sûr(e) de vouloir effacer tous tes pas enregistrés et repartir à zéro ? (oui/non)");
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 7000 });
        
            collector.on('collect', message => {
                if (message.content == "oui" || message.content == "Oui") {
                    var niveau = FindNiveau.execute(message.member.roles.array(), niveaux);
                    const ancienRole = message.guild.roles.find(e => e.name === niveaux[niveau]);
                    //si le joueur n'est pas débutant, on remplace le rôle
                    if(ancienRole.name !== niveaux[0]) {
                        message.member.removeRole(ancienRole).catch(console.error);
                        const roleDebutant = message.guild.roles.find(e => e.name === niveaux[0]);
                        message.member.addRole(roleDebutant).catch(console.error);
                    }
                    pas.set(message.member.id, 0);
                    message.channel.send(`Voilà ${message.author}, tu es de nouveau débutant et ton compteur de pas est à 0.`);
                    return;
                } else if (message.content == "non" || message.content == "Non") {
                    message.reply("d'accord ! On continue sur notre lancée alors.");
                    return;
                }
            })
        }
    
	}
}