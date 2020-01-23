const Discord = require('discord.js');
const FindNiveau = require('./functions/findNiveau.js');

function trouvePasRestant (message, pas, niveaux, objectifs) {
    var niveau = FindNiveau.execute(message.member.roles.array(), niveaux);
    if(niveau == niveaux.length-1) {
        return "Tu es au niveau le plus haut !"
    }
    return (objectifs[niveau] - pas.get(message.member.id));
}
module.exports = {
	name: 'me',
	description: "return embed of the user",
	execute(message, pas, niveaux, objectifs) {

        var pasRestant = trouvePasRestant(message, pas, niveaux, objectifs);
        var niveau = FindNiveau.execute(message.member.roles.array(), niveaux);

        //s'il y a eu changement dans les rôles et problème
        if(pasRestant < 0) {
            message.channel.send("Problème avec les rôles. S'il vous plaît, ne changez pas les rôles manuellement.");
            //on met le nombre de pas au pallier du niveau
            pas.set(message.member.id, objectifs[niveau-1]);
            message.reply(`Réinitialisation du nombre de pas à ${pas.get(message.member.id)}.`);
            //réinitialisation aussi du nombre de pas restant
            pasRestant = trouvePasRestant(message, pas, niveaux, objectifs);
        }
        
        var nbPas = pas.get(message.member.id);
        var role = message.guild.roles.find(e => e.name === niveaux[niveau]);
        var messageFooter = 'Tes efforts commencent à payer. Continue comme ça !';

        //si le joueur n'a pas fait l'initialisation
        if(nbPas == undefined) {
            nbPas = "Aucun";
            role = "Aucun";
            messageFooter = "Utilise `%init` pour commencer ton challenge !"
            pasRestant = "Il faut commencer pour pouvoir avancer."
        }

		const embed = new Discord.RichEmbed()
	        .setColor('#0099ff')
	        .setTitle(`Profil de ${message.author.username}`)
            .setThumbnail(message.author.avatarURL)
            .addField('Nombre de pas', nbPas)
            .addField('Rôle', role)
            .addField("Nombre de pas restants avant nouveau grade", pasRestant)
            .setFooter(messageFooter);

        message.channel.send(embed);
	}
}