module.exports = {
	name: 'fr',
	description: "language becomes french",
	execute(message, args, eng) {
        if(eng) {
            eng = false;
            message.channel.send('Le bot est maintenant en français !');
            return false;
        }
		else {
            message.channel.send('Le bot est déjà en français.\n'+
                                'Utilise `%eng` pour l\'anglais.');
        }
	}
}