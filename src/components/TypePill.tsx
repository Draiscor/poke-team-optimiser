import { Chip } from "@mui/material";
import { PokeType } from "../types/Pokemon";

type Props = {
	myType: PokeType;
};

function TypePill(props: Props) {
	const { myType } = props;

	return (
		<Chip
			label={myType.name}
			size="medium"
			sx={{ bgcolor: myType.colours.colour, color: myType.colours.textColour, width: 100 }}
		/>
	);
}

export default TypePill;
