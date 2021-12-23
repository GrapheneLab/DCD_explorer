import React, { Component } from 'react';

class Animation extends Component{

    state = {
        location: this.props.location,
        animationClass: this.props.animation,
        setAnimation: '',
        children: this.props.children
    };

    componentWillReceiveProps(nextProps){
        let disableAnimation = false;
        const prevLocation = this.state.location;
        const newLocation = nextProps.location;
        const pathsToExclude = this.props.excludePath || [];

        if(pathsToExclude){
            const newPathname = newLocation.pathname;
            const needToExclude = pathsToExclude.filter(elem => newPathname.indexOf(elem) > -1);

            disableAnimation =
                needToExclude.length > 0
                && prevLocation.pathname.indexOf(needToExclude[0]) > -1;

        }

        if(disableAnimation){
            this.setState({children: nextProps.children});
        } else if(prevLocation.key !== newLocation.key){
            const animationTimer = setTimeout(() => {

                const animationTimer = setTimeout(() => {
                    this.setState({setAnimation: '', animationTimer: ''})
                }, 50);

                this.setState({
                    location: newLocation,
                    children: nextProps.children,
                    setAnimation: 'in',
                    animationTimer
                });

            }, 251);

            this.setState({setAnimation: 'out', animationTimer});
        }
    }

    componentWillUnmount(){
        const animationTimer = this.state.animationTimer;
        animationTimer ? clearTimeout(animationTimer) : '';
    }

    render(){

        const {children, animationClass, setAnimation} = this.state;

        return(
            <div className={`${animationClass}${setAnimation ? `--${setAnimation}` : ''}`}>
                {children}
            </div>
        );
    }
}

export default Animation;
