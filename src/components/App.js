import React, { Component } from 'react';
import SearchBar from './search-bar';
import CharacterList from './character-list';
import Details from './details';
import md5 from 'md5';
import $ from 'jquery';

const API_URL = 'https://gateway.marvel.com:443/v1/public/';
const publicKey = '26cc7ea0a246bb5037ec2f45cfc2244b';
const privateKey = '274e01efae2de401e46c96616caf624630c607c2';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            characters: null,
            selectedCharacter: null,
        };

        this.CharacterSearch = this.CharacterSearch.bind(this);
    }

    // Render metodu çalışmadan önce çalışır.
    componentDidMount = () => {
        this.GetInitialCharacters();
    };
    
    // 5 Adet Karakter Çeker.
    GetInitialCharacters(){
        $.getJSON(`${API_URL}/characters?${auth}`, result => {
            const characters = result.data.results;
            this.setState({ characters });
        });
    };

    handleCharacterSelect = character => {
        console.log(character);
        this.setState({selectedCharacter: character});
    };

    CharacterSearch(term){
        $.getJSON(`${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`, result => {
            const characters = result.data.results;
            this.setState( {characters});
        });
    }

    

    render() {
        if(!this.state.characters) return <h1>Loading...</h1>
        return (
            <div className="container">
                <SearchBar onSearchButtonClick={this.CharacterSearch}/>
                <CharacterList 
                    characters={this.state.characters}
                    onCharacterSelect={this.handleCharacterSelect}
                />
                <Details character={this.state.selectedCharacter || this.state.characters[0]}/>
            </div>
        );
    }
}
export default App;