import { gql, useQuery } from "@apollo/client";
import { ClearRounded, SearchRounded } from "@mui/icons-material";
import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ratio } from "fuzzball";
import { useEffect, useState } from "react";
import Pokemon, { PokeType, PokeTypeColours } from "../types/Pokemon";
import PokeCard from "./PokeCard";

type PokeTypeResponse = {
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

type PokemonResponseData = {
	pokemon_v2_pokemon: {
		id: number;
		name: string;
		pokemon_v2_pokemonspecy: {
			evolves_from_species_id: number;
			generation_id: number;
			is_legendary: boolean;
			is_mythic: boolean;
		};
		pokemon_v2_pokemontypes: PokeTypeResponse[];
		pokemon_v2_pokemontypepasts: PokeTypeResponse[];
	}[];
};

interface Props {
	generation: number;
	game: string;
}

const GET_GENERATION_POKEMON = gql`
	query PokemonInGeneration($generation: Int!) {
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
			pokemon_v2_pokemonspecy {
				generation_id
				evolves_from_species_id
				is_legendary
				is_mythical
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
			pokemon_v2_pokemontypepasts(
				where: { generation_id: { _gte: $generation } }
				order_by: { generation_id: asc, slot: asc }
			) {
				slot
				pokemon_v2_type {
					generation_id
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
		textColour: "#0F0F0F"
	},
	2: {
		colour: "#C22E28",
		textColour: "#ffffff"
	},
	3: {
		colour: "#A98FF3",
		textColour: "#1E1E1E"
	},
	4: {
		colour: "#A33EA1",
		textColour: "#ffffff"
	},
	5: {
		colour: "#E2BF65",
		textColour: "#693434"
	},
	6: {
		colour: "#B6A136",
		textColour: "#372525"
	},
	7: {
		colour: "#A6B91A",
		textColour: "#372C2C"
	},
	8: {
		colour: "#735797",
		textColour: "#ffffff"
	},
	9: {
		colour: "#B7B7CE",
		textColour: "#373737"
	},
	10: {
		colour: "#EE8130",
		textColour: "#1E1E1E"
	},
	11: {
		colour: "#6390F0",
		textColour: "#1E1818"
	},
	12: {
		colour: "#7AC74C",
		textColour: "#373030"
	},
	13: {
		colour: "#F7D02C",
		textColour: "#504646"
	},
	14: {
		colour: "#F95587",
		textColour: "#1E1818"
	},
	15: {
		colour: "#96D9D6",
		textColour: "#504040"
	},
	16: {
		colour: "#6F35FC",
		textColour: "#ffffff"
	},
	17: {
		colour: "#705746",
		textColour: "#ffffff"
	},
	18: {
		colour: "#D685AD",
		textColour: "#1E1E1E"
	},
	10001: {
		colour: "#ffffff",
		textColour: "#000000"
	},
	10002: {
		colour: "#000000",
		textColour: "#ffffff"
	}
};

function Pokedex(props: Props) {
	const { generation } = props;
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [displayMons, setDisplayMons] = useState<Pokemon[]>([]);
	const [search, setSearch] = useState<string>("");

	const { loading, error } = useQuery<PokemonResponseData>(
		GET_GENERATION_POKEMON,
		{
			variables: { generation },
			fetchPolicy: "cache-and-network",
			nextFetchPolicy: "cache-first",
			onCompleted: data => {
				const allPokemon = data.pokemon_v2_pokemon.map((poke): Pokemon => {
					const pokeTypes: PokeType[] = [];
					if (poke.pokemon_v2_pokemontypes.length) {
						pokeTypes.push(
							...poke.pokemon_v2_pokemontypes.map((pokeType): PokeType => {
								return {
									colours: TYPE_MAP[pokeType.pokemon_v2_type.id],
									id: pokeType.pokemon_v2_type.id,
									name: pokeType.pokemon_v2_type.name,
									superEffective:
										pokeType.pokemon_v2_type.pokemon_v2_typeefficacies.map<{
											id: number;
											name: string;
										}>(superEffect => {
											return {
												id: superEffect.pokemonV2TypeByTargetTypeId.id,
												name: superEffect.pokemonV2TypeByTargetTypeId.name
											};
										})
								};
							})
						);
					} else if (poke.pokemon_v2_pokemontypepasts.length) {
						pokeTypes.push(
							...poke.pokemon_v2_pokemontypepasts.map((pokeType): PokeType => {
								return {
									colours: TYPE_MAP[pokeType.pokemon_v2_type.id],
									id: pokeType.pokemon_v2_type.id,
									name: pokeType.pokemon_v2_type.name,
									superEffective:
										pokeType.pokemon_v2_type.pokemon_v2_typeefficacies.map<{
											id: number;
											name: string;
										}>(superEffect => {
											return {
												id: superEffect.pokemonV2TypeByTargetTypeId.id,
												name: superEffect.pokemonV2TypeByTargetTypeId.name
											};
										})
								};
							})
						);
					}

					return {
						evolvesFrom: poke.pokemon_v2_pokemonspecy.evolves_from_species_id,
						generation: poke.pokemon_v2_pokemonspecy.generation_id,
						id: poke.id,
						legendary: poke.pokemon_v2_pokemonspecy.is_legendary,
						mythic: poke.pokemon_v2_pokemonspecy.is_mythic,
						name: poke.name,
						types: pokeTypes
					};
				});
				setPokemon([...allPokemon]);
				setDisplayMons([...allPokemon]);
			}
		}
	);

	useEffect(() => {
		if (!search) {
			setDisplayMons([...pokemon]);
			return;
		}
		const filteredMons = pokemon.filter(mon => {
			const nameMatch = ratio(search, mon.name) > 60;
			const typeMatch = mon.types.some(
				monType => ratio(search, monType.name) > 60
			);
			const dexMatch = ratio(search, mon.id.toString().padStart(3, "0")) > 60;
			const specialStatusMatch =
				(mon.legendary && ratio(search, "legendary") > 60) ||
				(mon.mythic && ratio(search, "mythic") > 60);

			const finalMatch =
				nameMatch || typeMatch || dexMatch || specialStatusMatch;
			return finalMatch;
		});
		setDisplayMons([...filteredMons]);
	}, [pokemon, search, setDisplayMons]);

	if (loading) return null;
	if (error) return `${error}`;

	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "88vh",
				padding: 1
			}}
		>
			<TextField
				fullWidth
				value={search}
				onChange={event => setSearch(event.target.value as string)}
				sx={{ mb: 2 }}
				label="Search"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							{search ? (
								<IconButton onClick={() => setSearch("")}>
									<ClearRounded />
								</IconButton>
							) : null}
							<SearchRounded />
						</InputAdornment>
					)
				}}
			/>
			<Grid
				container
				spacing={{ xs: 2, md: 2 }}
				columns={{ xs: 2, sm: 8, md: 12 }}
				sx={{ width: "100%", overflowY: "auto" }}
			>
				{displayMons.map(poke => (
					<Grid xs={4} key={poke.id}>
						<PokeCard pokemon={poke} />
					</Grid>
				))}
			</Grid>
		</Paper>
	);
}

export default Pokedex;
