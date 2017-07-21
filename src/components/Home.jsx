import React, {Component} from 'react';
import Search from './Search.jsx';
class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Search/>
                </div>
            </div>
        );
    }
}
export default Home;
