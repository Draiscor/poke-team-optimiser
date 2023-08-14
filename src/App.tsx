import { gql, useQuery } from "@apollo/client";
import { CssBaseline, FormControl, InputLabel, MenuItem, Select, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Pokedex from "./components/Pokedex";

const darkTheme = createTheme({
	palette: {
		mode: "dark"
	}
});

const lightTheme = createTheme({
	palette: {
		mode: "light"
	}
});

type GameVersion = {
	generation: number;
	id: number;
	name: string;
	order: number;
};

type VersionResponseData = {
	name: string;
	id: number;
	pokemon_v2_versiongroup: {
		generation_id: number;
		order: number;
	};
};

const GET_GAME_VERSIONS = gql`
	query GameVersions {
		pokemon_v2_version(order_by: { pokemon_v2_versiongroup: { order: asc } }) {
			id
			name
			pokemon_v2_versiongroup {
				generation_id
				order
			}
		}
	}
`;

function App() {
	const [versions, setVersions] = useState<GameVersion[]>([]);
	const [game, setGame] = useState<GameVersion | undefined>(undefined);
	const [dark, setDark] = useState<boolean>(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		query.addEventListener("change", (event) => setDark(event.matches));
		setDark(query.matches);
	}, [setDark])

	const { loading, error } = useQuery<{
		pokemon_v2_version: VersionResponseData[];
	}>(GET_GAME_VERSIONS, {
		fetchPolicy: "cache-and-network",
		nextFetchPolicy: "cache-first",
		onCompleted: (data) => {
			const allVersions = [
				...data.pokemon_v2_version.map((version) => {
					return {
						generation: version.pokemon_v2_versiongroup.generation_id,
						id: version.id,
						name: version.name,
						order: version.pokemon_v2_versiongroup.order,
					};
				}),
			];
			setVersions(allVersions);
			setGame(allVersions[0]);
		},
	});

	if (loading) return null;
	if (error) return `Error! ${error}`;

	return (
		<ThemeProvider theme={dark ? darkTheme : lightTheme}>
			<CssBaseline />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "93vh",
					minWidth: "65vw"
				}}
			>
				{!versions.length ? null : (
					<FormControl fullWidth sx={{ mb: "2%" }}>
						<InputLabel id="lbl-version">Game Version</InputLabel>
						<Select
							fullWidth
							color="primary"
							labelId="lbl-version"
							id="sel-version"
							value={game?.id}
							label="Game Version"
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 48 * 4.5 + 8,
										width: 250,
									},
								},
							}}
							onChange={(event) =>
								setGame(
									versions.find((version) => version.id === event.target.value)
								)
							}
						>
							{versions.map((version) => (
								<MenuItem key={version.id} value={version.id}>
									{`${version.name[0].toUpperCase()}${version.name.slice(1)}`}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
				{!game ? null : (
					<Pokedex generation={game.generation} game={game.name} />
				)}
			</div>
		</ThemeProvider>
	);
}

export default App;
