var descriptions_data = {
    constellations: [
        {
            "name": "Cassiopeia",
            "nickname": null,
            "description": "Visible all year round in the northern hemisphere. Cassiopeia has a distinct 'w' shape, which makes it easy to spot in the sky."
        },{
            "name": "Sagittarius",
            "nickname": "Archer",
            "description": "Best seen in August. Sagittarius is in the direction of the center of the galaxy"
        },{
            "name": "Ursa Major",
            "nickname": "Great Bear",
            "description": "Visible all year round. Ursa Major contains the Big Dipper (or Seven Stars)"
        },{
            "name": "Ursa Minor",
            "nickname": "Little Bear",
            "description": "Best seen in spring. Ursa Minor has Polaris, which is the brightest star in the constellation."
        },{
            "name": "Lyra",
            "nickname": "Harp",
            "description": "Best seen in summer. Vega is the brightest star in Lyra."
        },{
            "name": "Centaurus",
            "nickname": null,
            "description": "Best seen in spring in the southern hemisphere. Centaurus is the home for the Sun's closest neighbor, Alpha Centauri."
        },{
            "name": "Canis Major",
            "nickname": "Great Dog",
            "description": "Best seen in winter. Canis Major has two remarkable stars: Sirius and VY Canis Majoris."
        },{
            "name": "Orion",
            "nickname": null,
            "description": "Best seen in winter. Orion has Betelgeuse, which is one of the brightest stars in the night sky."
        },{
            "name": "Gemini",
            "nickname": "Twins",
            "description": "Best seen in winter. Castor and Pollux are the heads of the twins."
        },{
            "name": "Cygnus",
            "nickname": "Swan, Northern Cross",
            "description": "Visible in spring and summer. The brightest star in Cygnus is Deneb."
        },{
            "name": "Aquila",
            "nickname": "Eagle",
            "description": "Best seen in summer. Altair is the brightest star in Aquila."
        }
    ],
    stars: [
        {
            "hip": "11767",
            "name": "Polaris (North Star)",
            "description": "It’s the brightest star in Ursa Minor. Stars circle around Polaris in the northern hemisphere."
        },{
            "hip": "91262",
            "name": "Vega",
            "description": "Brightest star in Lyra...But, actually it’s less luminous than most stars in Lyra. Vega just looks brighter because it’s closer! It makes the Summer Triangle with Deneb and Altair."
        },{
            "hip": "71683",
            "name": "Alpha Centauri",
            "description": "Closest star to the Sun. It’s the brightest star in Centaurus. Alpha Centauri is not just one star, but three stars."
        },{
            "hip": "32349",
            "name": "Sirius (Dog Star)",
            "description": "It’s the brightest star in the night sky and it will continue to be the brightest for the next 210,000 years. It’s both luminous and close."
        },{
            "hip": "35793",
            "name": "VY Canis Majoris",
            "description": "Largest known star. It’s ~1500 times the size of the Sun and also very luminous. It’s a red hypergiant star and it will explode as a hypernova any day."
        },{
            "hip": "27989",
            "name": "Betelgeuse",
            "description": "One of the brightest stars in the night sky. It has a reddish color and irregular variability. It’s a red supergiant star and it will explode in about 100,000 years."
        },{
            "hip": "36850",
            "name": "Castor",
            "description": "One Head of the Gemini twins. Despite the apparent closeness and friendship between them, the two stars are actually far away and moving in different directions."
        },{
            "hip": "37826",
            "name": "Pollux",
            "description": "One Head of the Gemini twins. Despite the apparent closeness and friendship between them, the two stars are actually far away and moving in different directions."
        },{
            "hip": "98298",
            "name": "Cygnus X-1",
            "description": "A blackhole looming within Cygnus"
        },{
            "hip": "102098",
            "name": "Deneb",
            "description": "Brightest star in cygnus, also one of the most luminous near-by stars. It’s part of the Summer Triangle along with Vega and Altair."
        },{
            "hip": "97649",
            "name": "Altair",
            "description": "Brightest star in Aquila, also one of the closest visible stars. Altair, Vega, and Deneb form the Summer Triangle."
        },{
            "hip": null,
            "name": "Sun",
            "description": "Closest star to the Earth. The Sun is a medium-sized, middle-aged star at 4.6 billion years old. It’s also the only star that does not belong to a constellation. The energy the Earth receives from the Sun is much more than we consume. (But we don’t fully utilize it)"
        },{
			"hip": "21421",
			"name": "Aldebaran",
			"description": "Brightest Star in Taurus. Aldebaran is a giant orange star approximately 44.2 times the diameter of our sun."
		},{
			"hip": "24608",
			"name": "Capella (Little Goat)",
			"description": "6th brightest star in the sky. Capella is actually a closely bound binary star system with two giants."
		}
    ]
};



module.exports = {
	getForConstellation: function(name){
		var descriptions = descriptions_data.constellations.filter(function(des){
			return des.name === name;
		});
		return descriptions ? descriptions[0] : null;
	},
	getForStar: function(hip){
		var descriptions = descriptions_data.stars.filter(function(des){
			return des.hip === hip;
		});
		return descriptions ? descriptions[0] : null;
	}
};