module.exports = {
	name: 'eng',
	description: "language becomes english",
	execute(message, args, eng) {
        if(!eng) {
            eng = true;
            message.channel.send('The bot is now in English !');
            return true;
        }
		else {
            message.channel.send('The bot is already in English.\n'+
                                'Use `%fr` for French.');
        }
	}
}