import React, {Component} from 'react';
import Translate from "react-translate-component";

class PendingTimer extends Component {
    state ={
        seconds: 0,
        tik: false
    };

    componentDidMount(){ this.tikTok() }

    componentWillReceiveProps(props){
        if(!this.state.tik && props.time) this.tikTok()
    }

    tikTok = () => {
        clearTimeout(this.state.tik);
        const timeLocal = new Date().getTimezoneOffset()*60;
        const timeTrx = new Date(this.props.time).getTime();
        const seconds = Math.round(180 - ((Date.now() - timeTrx)/1000 + timeLocal));
        const tik = seconds > 0 ? setTimeout(() => this.tikTok(), 1000) : false;

        this.setState({ seconds, tik });
    };

    componentWillMount(){
        clearTimeout(this.state.tik);
    }

    render(){
        const {seconds} = this.state;

        let status = 'irreversible',
            timer = '';

        if(seconds >= 0){
            status = 'pending';
            timer = `(${seconds}s)`
        }

        return <Translate content={`trxPage.status.${status}`} className={`trx__status ${status}`} with={{timer}}/>;
    }
}

export default PendingTimer
