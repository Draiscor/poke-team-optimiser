type TypeResponse = {
	slot: number;
	pokemon_v2_type: {
		id: number;
		name: string;
		pokemon_v2_typeefficacies: {
			damage_factor: number;
			pokemonV2TypeByTargetTypeId: {
				name: string;
				generation_id: number;
				id: number;
			};
		}[];
	};
};

type SpecyResponse = {
	evolves_from_species_id: number;
	generation_id: number;
	is_legendary: boolean;
	is_mythic: boolean;
};

type PokemonResponse = {
	pokemon_v2_pokemon: {
		id: number;
		name: string;
		pokemon_v2_pokemonspecy: SpecyResponse;
		pokemon_v2_pokemontypes: TypeResponse[];
		pokemon_v2_pokemontypepasts: TypeResponse[];
	};
};

export { PokemonResponse, SpecyResponse, TypeResponse };
