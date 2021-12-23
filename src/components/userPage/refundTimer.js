import React, {Component} from 'react';
import {awaitForResult} from "../../actions/awaitForResult";
import {digitalWatch} from "../../actions/digitalWatch";

class RefundTimer extends Component {
    state ={
        hours: 0,
        minutes: 0,
        seconds: 0,
        interval: false
    };

    componentDidMount(){
        const {date} = this.props;
        if(date){
            digitalWatch(date)
                .then(e => {
                    const interval = setInterval(() => {
                        digitalWatch(date).then(e => this.setState(e))
                    }, 1000);
                    this.setState({...e, interval});
                })
                .catch(e => console.log(e));
        }
    }

    componentWillMount(){
        clearInterval(this.state.interval);
    }

    render(){
        const {interval, hours, minutes, seconds} = this.state;

        if(!interval || hours <= 0 || minutes <= 0 || seconds <= 0) return <span/>;

        return <span className='text--light lower'>({hours}h {minutes}m{(minutes === 0 && hours === 0) && ` ${seconds}s`})</span>
    }
}

export default RefundTimer
