import React from 'react';
import SearchComponent from './components/SearchComponent';
import RecipeCardsComponent from './components/RecipeCardsComponent';
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            searchValues: '',
            searchResult: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        const URL = 'http://www.recipepuppy.com/api';
        axios.get(URL)
            .then(res => {
                const recipes = res.data.results;
                console.log("RECIPES====>", recipes)
                this.setState({ recipes });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSearch(searchResult) {
        this.setState({
            searchResult: searchResult,
        })
    }

    render() {
        return (
            <div>
                <SearchComponent recipes={this.state.recipes} searchResult={this.handleSearch} />
                <br />
                {this.state.searchResult.length > 0 ?
                    <RecipeCardsComponent searchResult={this.state.searchResult} /> : null}
            </div>
        )
    }
}

export default App;
