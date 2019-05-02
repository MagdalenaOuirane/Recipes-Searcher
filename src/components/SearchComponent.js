import React from 'react';
import '../style/Search.css';

export class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    getAllIngredients(recipes) {
        let allIngredients = new Set();

        if (recipes) {
            recipes.forEach(recipe => {
                recipe.ingredients.split(',')
                    .forEach(ingredient => allIngredients.add(ingredient))
            });
        }
        return Array.from(allIngredients);
    }

    handleChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    }

    handleSearchClick() {
        let searchValue = this.state.searchValue;
        console.log("searchValue", searchValue);
        if (searchValue.trim()) {
            const searchList = searchValue.toLowerCase().split(",");
            const recipes = this.props.recipes;
            if (recipes) {
                const regexResult = this.createSearchRegex(searchList);
                const searchResult = recipes.filter(recipe => recipe.ingredients.match(new RegExp(regexResult)));
                this.props.searchResult(searchResult)
            }
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleSearchClick();
        }
    }

    createSearchRegex(searchIngredients) {
        let regex = "";
        searchIngredients.forEach(ingredient => regex = regex.concat("(?=.*", ingredient, ")"));
        return regex;
    }

    addSelectedIngredients(ingredient) {
        let searchValue = this.state.searchValue;
        if (searchValue && !searchValue.trim().endsWith(",")) {
            this.setState({ searchValue: searchValue.concat(",", ingredient, ",") })
        } else {
            this.setState({ searchValue: searchValue.concat(ingredient, ",") })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group" id="adv-search">
                            <input type="text"
                                className="form-control"
                                placeholder="Search for recipes by ingredients"
                                value={this.state.searchValue}
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}
                            />


                            <div className="input-group-btn">
                                <div className="btn-group" role="group">
                                    <div className="btn-group">
                                        <button type="button"
                                            className="btn btn-info dropdown-toggle dropdown-toggle-split"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>

                                        <div className="dropdown-menu scrollable-menu">
                                            {this.getAllIngredients(this.props.recipes).map(ingredient =>
                                                <div className="dropdown-item" key={ingredient}
                                                    onClick={() => this.addSelectedIngredients(ingredient)}>{ingredient}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="button"
                                className="btn btn-info"
                                onClick={this.handleSearchClick}>Search
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchComponent;