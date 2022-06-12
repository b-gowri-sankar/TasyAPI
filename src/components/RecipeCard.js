import React from "react";
import dayjs from "dayjs";

const RecipeCard = ({ recipe }) => {
	return (
		<div key={recipe?.id} className="card">
			<img
				src={recipe?.thumbnail_url}
				// width="100%"
				// height="150px"
				// style={{ objectFit: "cover" }}
				alt={recipe?.thumbnail_alt_text}
			/>
			<div className="card__body">
				<p>{dayjs(new Date(recipe?.created_at)).format("DD/MM/YYYY")}</p>
				<h3>{recipe?.name}</h3>
				{/* <p>{recipe.description}</p> */}
			</div>
		</div>
	);
};

export default RecipeCard;
