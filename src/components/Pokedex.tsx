import { gql, useQuery } from "@apollo/client";
import { Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import fuzzysort from "fuzzysort";
import { useEffect, useState } from "react";
import { PokeType, PokeTypeColours, Pokemon } from "../definitions";
import PokeCard from "./PokeCard";

type PokemonResponseData = {
	pokemon_v2_pokemon: {
		id: number;
		name: string;
		pokemon_v2_encounters: {
			pokemon_v2_locationarea: {
				pokemon_v2_location: {
					name: string;
					pokemon_v2_region: {
						name: string;
					};
				};
			};
			pokemon_v2_version: {
				name: string;
			};
		}[];
		pokemon_v2_pokemonspecy: {
			evolves_from_species_id: number;
			generation_id: number;
			has_gender_differences: boolean;
			is_legendary: boolean;
			is_mythic: boolean;
		};
		pokemon_v2_pokemonsprites: {
			sprites: string;
		}[];
		pokemon_v2_pokemontypes: {
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
		}[];
	}[];
};

interface Props {
	generation: number;
	game: string;
}

const GET_GENERATION_POKEMON = gql`
	query PokemonInGeneration($generation: Int!, $version: String!) {
		pokemon_v2_pokemon(
			where: {
				pokemon_v2_pokemonspecy: { generation_id: { _lte: $generation } }
				pokemon_v2_pokemonforms: {
					pokemon_v2_pokemonformgenerations: {
						generation_id: { _lte: $generation }
					}
				}
			}
			order_by: { pokemon_species_id: asc }
			distinct_on: pokemon_species_id
		) {
			id
			name
			pokemon_v2_encounters(
				where: { pokemon_v2_version: { name: { _eq: $version } } }
			) {
				pokemon_v2_locationarea {
					pokemon_v2_location {
						name
						pokemon_v2_region {
							name
						}
					}
				}
				pokemon_v2_version {
					name
				}
			}
			pokemon_v2_pokemonspecy {
				generation_id
				has_gender_differences
				evolves_from_species_id
				is_legendary
				is_mythical
			}
			pokemon_v2_pokemonsprites {
				sprites
			}
			pokemon_v2_pokemontypes(
				where: { pokemon_v2_type: { generation_id: { _lte: $generation } } }
				order_by: { slot: asc }
			) {
				slot
				pokemon_v2_type {
					id
					name
					pokemon_v2_typeefficacies(
						where: {
							damage_factor: { _gt: 100 }
							pokemonV2TypeByTargetTypeId: {
								generation_id: { _lte: $generation }
							}
						}
						order_by: {
							damage_factor: desc
							pokemonV2TypeByTargetTypeId: { name: asc }
						}
					) {
						damage_factor
						pokemonV2TypeByTargetTypeId {
							name
							generation_id
							id
						}
					}
				}
			}
		}
	}
`;

const TYPE_MAP: { [ref: number]: PokeTypeColours } = {
	1: {
		colour: "#A8A77A",
		textColour: "#0F0F0F",
	},
	2: {
		colour: "#C22E28",
		textColour: "#ffffff",
	},
	3: {
		colour: "#A98FF3",
		textColour: "#1E1E1E",
	},
	4: {
		colour: "#A33EA1",
		textColour: "#ffffff",
	},
	5: {
		colour: "#E2BF65",
		textColour: "#693434",
	},
	6: {
		colour: "#B6A136",
		textColour: "#372525",
	},
	7: {
		colour: "#A6B91A",
		textColour: "#372C2C",
	},
	8: {
		colour: "#735797",
		textColour: "#ffffff",
	},
	9: {
		colour: "#B7B7CE",
		textColour: "#373737",
	},
	10: {
		colour: "#EE8130",
		textColour: "#1E1E1E",
	},
	11: {
		colour: "#6390F0",
		textColour: "#1E1818",
	},
	12: {
		colour: "#7AC74C",
		textColour: "#373030",
	},
	13: {
		colour: "#F7D02C",
		textColour: "#504646",
	},
	14: {
		colour: "#F95587",
		textColour: "#1E1818",
	},
	15: {
		colour: "#96D9D6",
		textColour: "#504040",
	},
	16: {
		colour: "#6F35FC",
		textColour: "#ffffff",
	},
	17: {
		colour: "#705746",
		textColour: "#ffffff",
	},
	18: {
		colour: "#D685AD",
		textColour: "#1E1E1E",
	},
	10001: {
		colour: "#ffffff",
		textColour: "#000000",
	},
	10002: {
		colour: "#000000",
		textColour: "#ffffff",
	},
};

function Pokedex(props: Props) {
	const { generation, game: version } = props;
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [displayMons, setDisplayMons] = useState<Pokemon[]>([]);
	const [search, setSearch] = useState<string>("");

	const { loading, error } = useQuery<PokemonResponseData>(
		GET_GENERATION_POKEMON,
		{
			variables: { generation, version },
			fetchPolicy: "cache-and-network",
			nextFetchPolicy: "cache-first",
			onCompleted: (data) => {
				const allPokemon = data.pokemon_v2_pokemon.map((poke): Pokemon => {
					const pokeSprites = JSON.parse(
						poke.pokemon_v2_pokemonsprites[0].sprites
					);
					return {
						evolvesFrom: poke.pokemon_v2_pokemonspecy.evolves_from_species_id,
						gendersVary: poke.pokemon_v2_pokemonspecy.has_gender_differences,
						generation: poke.pokemon_v2_pokemonspecy.generation_id,
						id: poke.id,
						legendary: poke.pokemon_v2_pokemonspecy.is_legendary,
						mythic: poke.pokemon_v2_pokemonspecy.is_mythic,
						name: poke.name,
						spawnLocations: poke.pokemon_v2_encounters.map(
							(location) =>
								`${location.pokemon_v2_locationarea.pokemon_v2_location.pokemon_v2_region.name} - ${location.pokemon_v2_locationarea.pokemon_v2_location.name}`
						),
						sprites: {
							frontDefault: pokeSprites.front_default,
							frontFemale: pokeSprites.front_female,
							frontShiny: pokeSprites.front_shiny,
							frontShinyFemale: pokeSprites.front_shiny_female,
						},
						types: poke.pokemon_v2_pokemontypes.map((pokeType): PokeType => {
							return {
								colours: TYPE_MAP[pokeType.pokemon_v2_type.id],
								id: pokeType.pokemon_v2_type.id,
								name: pokeType.pokemon_v2_type.name,
								superEffective:
									pokeType.pokemon_v2_type.pokemon_v2_typeefficacies.map(
										(superEffect) => {
											return {
												id: superEffect.pokemonV2TypeByTargetTypeId.id,
												name: superEffect.pokemonV2TypeByTargetTypeId.name,
											};
										}
									),
							};
						}),
					};
				});
				setPokemon([...allPokemon]);
				setDisplayMons([...allPokemon]);
			},
		}
	);

	useEffect(() => {
		if (!search) {
			setDisplayMons([...pokemon]);
			return;
		}
		const results = fuzzysort.go(search, pokemon, {
			all: true,
			keys: ["name", "types.name"],
		});
		const filteredMons = results
			.filter((result) => result.score > -10)
			.map((result) => result.obj);
		setDisplayMons([...filteredMons]);
	}, [pokemon, search, setDisplayMons]);

	if (loading) return null;
	if (error) return `Error! ${error}`;

	return (
		<Paper sx={{ display: "flex", flexDirection: "column", height: "88vh", padding: 1 }}>
			<TextField
				fullWidth
				value={search}
				onChange={(event) => setSearch(event.target.value as string)}
				sx={{ mb: 2 }}
			/>
			<Grid
				container
				spacing={{ xs: 2, md: 2 }}
				columns={{ xs: 2, sm: 8, md: 12 }}
				sx={{ width: "100%", overflowY: "auto" }}
			>
				{displayMons.map((poke) => (
					<Grid xs={4} key={poke.id}>
						<PokeCard pokemon={poke} />
					</Grid>
				))}
			</Grid>
		</Paper>
	);
}

export default Pokedex;
