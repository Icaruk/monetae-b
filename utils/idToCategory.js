
const idToCategory = (id, revert = false) => {
	// idToGenre("aut"); 				// "Automóvil"
	// idToGenre("Automóvil", true); 	// "aut"
	
	const traductor = {
		
		"aut": "Automóvil",
		"ali": "Alimentación",
		"bri": "Bricolaje",
		"cul": "Cultura",
		"dep": "Deporte",
		"electrod": "Electrodomésticos",
		"electron": "Electrónica",
		"hog": "Hogar",
		"jug": "Juguetes",
		"vid": "Videojuegos",
		"mod": "Moda",
		"ofi": "Oficina",
		"par": "Parafarmacia",
		"cos": "Cosmética",
		"otr": "Otros"
		
	};
	
	
	
	// category --- id
	if (revert) {
		
		let res = traductor[id];
		
		if (res) {
			return res;
		} else {
			return "";
		};
		
		
	// genre --> id
	} else {
		
		let res = -1;
		
		// Itero todas las keys
		for (let _x in traductor) {
			if (traductor[_x] == id) { // la propiedad de esa key coincide con el value que estoy buscando
				res = _x;
				break;
			};
		};
		
		
		return res;
		
	};
	
};

