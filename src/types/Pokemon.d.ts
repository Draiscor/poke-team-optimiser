type Pokemon = {
	evolvesFrom: number;
	gendersVary?: boolean;
	generation: number;
	id: number;
	legendary: boolean;
	mythic: boolean;
	name: string;
	spawnLocations?: string[];
	sprites?: PokeSprites;
	types: PokeType[];
};

type PokeType = {
	colours: PokeTypeColours;
	id: number;
	name: string;
	superEffective: {
		id: number;
		name: string;
	}[];
};

type PokeSprites = {
	frontDefault: string;
	frontFemale: string;
	frontShiny: string;
	frontShinyFemale: string;
};

type PokeTypeColours = {
	colour: string;
	textColour: string;
};

export default Pokemon;
export { PokeSprites, PokeType, PokeTypeColours };
