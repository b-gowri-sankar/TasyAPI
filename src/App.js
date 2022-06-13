import axios from "axios";
import React from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";

function App() {
	const [recipes, setRecipes] = React.useState(undefined);
	const [searchText, setSearchText] = React.useState("");
	const [busy, setBusy] = React.useState(false);
	const [pageNumber, setPageNumber] = React.useState(1);

	React.useEffect(() => {
		// eslint-disable-next-line
		fetchData();
	}, [pageNumber]);

	const fetchData = async () => {
		const options = {
			method: "GET",
			url: `${process.env.REACT_APP_ENDPOINT}recipes/list`,
			params: { from: (pageNumber - 1) * 20, size: "20", q: searchText },
			headers: {
				"X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
				"X-RapidAPI-Host": "tasty.p.rapidapi.com",
			},
		};
		try {
			setBusy(true);
			const response = await axios.request(options);
			setRecipes(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="container">
			<div>
				<form
					className="search"
					onSubmit={(e) => {
						e.preventDefault();
						setPageNumber(1);
					}}
				>
					<input
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						onFocus={(e) => e.target.select()}
					/>
					<button type="submit">Search</button>
				</form>
			</div>
			{busy && <h1>Loading</h1>}

			{!busy && (
				<div className="display-data">
					{recipes?.results?.map((recipe) => (
						<RecipeCard recipe={recipe} key={recipe?.id} />
					))}
				</div>
			)}

			<div className="pagination__container">
				<div>
					{pageNumber !== 1 && (
						<button
							onClick={() => {
								setPageNumber(1);
							}}
						>
							First Page
						</button>
					)}
				</div>
				<div className="pagination">
					{pageNumber !== 1 && (
						<button
							onClick={() => {
								setPageNumber((pageNumber) => pageNumber - 1);
							}}
						>
							Previous
						</button>
					)}
					<button>{pageNumber}</button>
					{Math.ceil(recipes?.count / 20) !== pageNumber && (
						<button
							onClick={() => {
								setPageNumber((pageNumber) => pageNumber + 1);
							}}
						>
							Next
						</button>
					)}
				</div>
				<div>
					{Math.ceil(recipes?.count / 20) !== pageNumber && recipes?.count && (
						<button
							onClick={() => {
								setPageNumber(Math.ceil(recipes?.count / 20));
							}}
						>
							Last Page
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
