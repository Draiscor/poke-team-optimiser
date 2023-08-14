import {
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Stack,
} from "@mui/material";
import { useState } from "react";
import { Pokemon } from "../definitions";
import TypePill from "./TypePill";

type Props = {
	pokemon: Pokemon;
};

function PokeCard(props: Props) {
	const { pokemon } = props;
	const [caught, setCaught] = useState<boolean>(false);

	return (
		<Card
			elevation={3}
			sx={{ border: caught ? "5px solid blue" : "", minWidth: 150 }}
		>
			<CardActionArea onClick={() => setCaught((current) => !current)}>
				<CardHeader
					sx={{ textAlign: "left" }}
					title={`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}
					subheader={pokemon.id.toString().padStart(3, "0")}
				/>
				{/* <CardMedia
					component="img"
					height="194"
					src={`https://pokeapi.co${pokemon.sprites.frontDefault}`}
					alt={`${pokemon.name} Sprite`}
				/> */}
				<CardContent>
					<Stack direction="row" spacing={3} justifyContent="center">
						{pokemon.types.map((theType) => (
							<TypePill key={theType.id} myType={theType} />
						))}
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default PokeCard;
