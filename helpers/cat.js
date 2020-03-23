const fetch = require('node-fetch');

module.exports = {
	fact: async () => {
		let randomfact = await fetch('https://catfact.ninja/fact');
		randomfact = await randomfact.json();
		return randomfact.fact;
	}
};
