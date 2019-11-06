import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import axios from 'axios';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myData: this.props.myData
        }
        console.log(this.state.myData)
    }

    // componentDidMount() {
    //     axios.get(`http://localhost:5000/item1`)
    //         .then(res => {
    //             const person = res.data;
    //             this.setState({ data: person });
    //         })
    // }

    render() {

        // const divStyle = {
        //     color: 'blue',
        //   };

        // return this.props.myData.map((item, index) => (
        //     <span className="indent" key={index}>

        //         {console.log(item.title)}

        //     </span>

        // )
        // );

        const data = [...this.state.myData]
        console.log(data)
        const myFunction = () => {

            for (var i = 0; i < data.length; i++) {
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <label>Title: {data[i].title}</label>
                                <label>description: {data[i].description}</label>
                                <label>languageIDs: {data[i].languageIDs}</label>
                                <label>genres: {data[i].genres}</label>
                                <label>Title: {data[i].description}</label>

                            </div>

                        </div>
                    </div>

                </div>


            }
        }



        return (
            <div>
                {this.myFunction}
            </div>
        )
    }
}



export default Grid