import React from 'react';
import '../style/RecipeCards.css';

export class RecipeCardsComponent extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <ul className="list-inline">
                    {this.props.searchResult.map(result =>
                        (<li className="list-inline-item" key={result.title}>
                            <div className="card" >
                                <img src={result.thumbnail} className="card-img-top" alt={result.title}/>
                                <div className="card-body">
                                    <h4 className="card-title"><a href={result.href}><b>{result.title}</b></a></h4>
                                    <p className="card-text"><b>Ingredients : </b> {result.ingredients}</p>
                                </div>
                            </div>
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
}

export default RecipeCardsComponent;