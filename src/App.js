import './App.css';
//import '../node_modules/uikit/dist/css/uikit.min.css';
import  React from 'react';
import Cages from './components/cages/cages';
import Farms from './components/farms/farms'
import OriginalMenu from './components/original_menu/original_menu';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import strings from './res/localisation'
import AboutUs from './components/aboutUs/aboutUs'
import jwt from 'jwt-decode';
import Controllers from './components/controllers/controllers'
import {sign} from './functions/user'
import Chart from './components/chart/chart'
import Velocity from 'velocity-animate'
//import "bootswatch/dist/pulse/bootstrap.min.css"
import {CookiesProvider, withCookies, Cookies} from 'react-cookie'
import Profile from './components/profile/profile'
import {instanceOf} from "prop-types";



class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const {cookies} = this.props;
        this.filterCage = {idCage: []};
        this.state = {
            language: 'en',
            token: cookies.get('token'),
            profile: null,
            users: null,
            moveMedias: null,
            moveBases: null,
            messages: null,
            subscribes: null,
            mediaArr: null,
            fetch: 0,
            indexTiming: null,
            filterUsers: null,
            filterGroups: null,
            filterMedias: null
        };
        this.setCage = this.setCage.bind(this);
        this.setUser = this.setUser.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);

    }

    setCage(val) {
        this.filterCage = val;
    }



    setUser(val) {

        this.setState({profile: val});
    }

    changeLanguage(val) {
        this.setState({language: val})
    }

    
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    static backgroundOn() {
        let root = document.getElementById('root');
        let container = document.createElement('div');
        let parent = document.createElement("div");
        if (root == null) {
            return;
        }
        parent.className += " dark";
        root.appendChild(parent);
        parent.appendChild(container);
        let count = this.rand(50, 120);
        let minZ = -50;
        let maxZ = 5;
        let width = window.screen.availWidth;
        let height = window.screen.availHeight;
        for (let i = 1; i < count; ++i) {
            let radius = this.rand(10, 50);
            let opacity = this.rand(1, 100) / 100;
            container.innerHTML += `<div class='ball' style='opacity: ${opacity}; 
                transform: translateX(${this.rand(0, width - 100)})
                           translateY(${this.rand(0, height - 100)})
                           translateZ(${this.rand(minZ, 0)});
                '/>`
        }
        Velocity(document.getElementsByClassName('ball'),
            {
                translateX: [
                    () => {return '+=' + this.rand(-300, width / 20)},
                    () => {return  App.rand(0, width - 10)},
                ],
                translateY: [
                    () => {return '+=' + this.rand(-height / 20, height / 20)},
                    () => {return  App.rand(0, height - 10)}
                ],
                translateZ: [
                    () => {return  this.rand(minZ / 20, maxZ / 20)},
                    () => {return this.rand(minZ, maxZ)}
                ],
                opacity: [
                    () => {return '+=' + this.rand(40, 100) / 100;},
                    () => {return this.rand(1, 100) / 100;}
                ],

            },
            {duration: 30000, loop: 30});

        Velocity(document.getElementsByClassName('dark'), {
                perspective: [500, 5]
            },
            {
                duration: 1000, easing: "easeInSine", delay: 2000
            });
    }
     componentDidMount(): void {
         App.backgroundOn();
         if (!this.state.profile && this.state.token) {
             sign(this.state.token).then(user => {
                 this.setState({profile: user})
             })
         }
    }
    render() {
        const nam = this.state.profile? <h2 style={{marginTop: '-100px', padding: "50px"}}>{this.state.profile.nickname}</h2> : '';
        const anim = (e) => {
            if (e.target.className !== "App") {
                return;
            }
            Velocity(document.getElementsByClassName('dark'),
                {
                    scaleX: 1.1,
                    scaleY: 1.1,
                    rotateZ: Math.floor(Math.random() * 4) - 2,
                    transformOriginX: e.clientX,
                    transformOriginY: e.clientY
                },
                {duration: 500, easing: "easeOutSine"});
        };

        let lan = this.state.language;

        strings.setLanguage(this.state.language);

        const WrappedAboutUs = (props) => {
          return <AboutUs strings={strings}

                          {...props}/>
        };
        const WrappedFarms = (props) => {
            return <Farms strings={strings}
                          setFilterCage={this.setCage}
                          filterCage={this.filterCage}
                            {...props}/>
        };

        return (
           <>
            <div className="App" onClick={anim}>
               <Router>
                   {nam}
                   <OriginalMenu strings={strings}
                                 user={this.state.profile}
                                 changeLanguage={this.changeLanguage}
                                 lan={lan}/>

                   <Switch>
                       <Route path="/chart" component={(props => {
                           return <Chart filterCage={this.filterCage} {...props}/>
                       })}/>
                       <Route exact path="/" component={WrappedAboutUs}/>*/}
                       <Route exact path="/farms" component={WrappedFarms}/>
                       <Route path="/cages" component={(props) =>{return <Cages strings={strings} {...props}/>}}/>
                       <Route path="/profile" component={(props) =>{return <Profile strings={strings} user ={this.state.profile} setUser={this.setUser} {...props}/>}} />
                       <Route path="/controllers" component={props => <Controllers strings={strings} {...props} user={this.state.profile}/>} />
                   </Switch>
               </Router>
           </div>}</>
       );
   }
}

export default withCookies(App);
