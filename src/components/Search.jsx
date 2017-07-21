import React, {Component} from 'react';
import Planet from './Planet.jsx'
import utility from '../utils/Utils.js'
import _ from 'lodash';
import 'whatwg-fetch';
let _this;
let defaultVal;
class Search extends Component {
    constructor() {
        super()
        this.state = {
            min: 0,
            max: 0,
            planetList: [],
            customFontArr: []
        }
        _this = this;
    }

    generateFont(populationResult) {
        let arr = [], defaultSize = 10;
        populationResult.map(function (val, index) {
            if (!utility.util.checkDuplicateInObject("uniqueNumber", arr, val)) {
                arr.push({
                    uniqueNumber: val,
                    uniqueIndex: index,
                    fontDetail: defaultSize
                })
                defaultSize = defaultSize + 2;
            }
        });
        this.setState({
            customFontArr: arr
        });
    }

    getPlanetList() {
        fetch('http://swapi.co/api/planets')
            .then(function (response) {
                response.json().then(function (resp) {
                    let data = resp;

                    let modifiedData = data && data.results.map(function (item) {
                            item.population = parseInt(item.population, 10) ? parseInt(item.population, 10) : 0;
                            return item;
                        })
                    modifiedData && modifiedData.sort(function (a, b) {
                        if (a.population < b.population)
                            return -1;
                        else if (a.population > b.population)
                            return 1;
                        return 0;
                    })
                    let populationResult = _.map(modifiedData, 'population');
                    _this.generateFont(populationResult);
                    defaultVal = modifiedData;
                    _this.setState({
                        min: populationResult && Math.min.apply(null, populationResult),
                        max: populationResult && Math.max.apply(null, populationResult),
                        planetList: modifiedData
                    })
                })
            });
    }

    componentWillMount() {
        this.getPlanetList();
    }

    filterList(event) {
        var updatedList = Object.assign([], _this.state.planetList);
        updatedList = updatedList.filter(function (item) {
            return (item.name.indexOf(event.target.value) !== -1) || (String(item.population).indexOf(event.target.value) !== -1);
        });
        _this.setState({planetList: event.target.value && updatedList || defaultVal});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2>Search Here</h2>
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                            <input type="text" className="search-query form-control" placeholder="Search"
                                   onChange={this.filterList}/>
                            <span className="input-group-btn">
                                    <button className="btn btn-danger" type="button">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2"><h4>Name</h4></div>
                            <div className="col-md-2"><h4>Population</h4></div>
                        </div>
                    </div>
                    {this.state.planetList && this.state.planetList.map((objData, index)=> {
                        return (<Planet min={this.state.min} max={this.state.max} objData={objData}
                                        population={objData.population} customfont={this.state.customFontArr}
                                        index={index}/>);
                    })
                    }
                </div>
            </div>
        );
    }
}
export default Search;
