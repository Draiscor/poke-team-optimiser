import {
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import Pokemon from "../types/Pokemon";
import { getPokeImg } from "../utils";
import TypePill from "./TypePill";

type Props = {
	pokemon: Pokemon;
};

function PokeCard(props: Props) {
	const { pokemon } = props;
	const [caught, setCaught] = useState<boolean>(false);

	return (
		<CardActionArea
			sx={{
				minWidth: 150,
				minHeight: 320,
			}}
			onClick={() => setCaught((current) => !current)}
		>
			<Card
				elevation={3}
				sx={{
					border: caught ? "5px solid blue" : "",
					minWidth: "inherit",
					minHeight: "inherit",
				}}
			>
				<CardHeader
					sx={{ textAlign: "left" }}
					title={`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}
					subheader={pokemon.id.toString().padStart(3, "0")}
					avatar={
						pokemon.legendary ? (
							<img height="50" src="/legendary.svg" />
						) : pokemon.mythic ? (
							<img height="50" src="/mythic.svg" />
						) : null
					}
				/>
				<CardContent>
					<img src={getPokeImg(pokemon.id)} height="100" width="auto" />
					<Stack direction="row" spacing={3} justifyContent="center">
						{pokemon.types.map((theType) => (
							<TypePill key={theType.id} myType={theType} />
						))}
					</Stack>
					{!pokemon.evolvesFrom ? null : (
						<Typography variant="body1" sx={{ mt: 1 }}>
							{`Evolves from ${pokemon.evolvesFrom
								.toString()
								.padStart(3, "0")}`}
							<img
								src={getPokeImg(pokemon.evolvesFrom)}
								height="35"
								width="auto"
							/>
						</Typography>
					)}
				</CardContent>
			</Card>
		</CardActionArea>
	);
}

export default PokeCard;
