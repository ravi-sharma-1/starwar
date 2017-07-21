import React, {Component} from 'react';

class Planet extends Component {
    constructor(){
        super()
    }
    customFont(population){
        population = population?population:0;
        let size;
        this.props.customfont.map(function (value, index) {
           if(value.uniqueNumber==population){
               size = value.fontDetail
           }
        })
        return size;
    }
    render() {
        var customFontStyle = {
            fontSize: this.customFont(Number(this.props.population))
        };
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">{this.props.objData.name}</div>
                    <div className="col-md-2" style={customFontStyle}>{this.props.population}</div>
                </div>
            </div>
        );
    }
}
export default Planet;
