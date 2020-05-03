import './App.css';
import '../node_modules/uikit/dist/css/uikit.min.css';
import  React from 'react';
import {findSubscribes} from './functions/follower'
import {getUsers} from './functions/userFunctions'
import Cages from './components/cages/cages';
import Farms from './components/farms/farms'
import OriginalMenu from './components/original_menu/original_menu';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import strings from './res/localisation'
import AboutUs from './components/aboutUs/aboutUs'
import jwt from 'jwt-decode';

import Velocity from 'velocity-animate'
import "bootswatch/dist/cyborg/bootstrap.min.css"
import Loader from './components/loader/loader'
import Profile from './components/profile/profile'
import {getMedia} from "./functions/moveMedia";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: localStorage['language'] || 'en',
            profile: localStorage['userToken']? jwt(localStorage['userToken']): null,
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
        // this.addUser = this.addUser.bind(this);
        // this.getMedia = getMedia.bind(this)
        // this.setSubscribes = this.setSubscribes.bind(this);
        // this.setUser = this.setUser.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        // this.setFilterMedia = this.setFilterMedia.bind(this);
        // this.setFilterGroup = this.setFilterGroup.bind(this);
        // this.setFilterUser = this.setFilterUser.bind(this)
        // this.setUsers = this.setUsers.bind(this);
    }

    addUser(val) {
        let obj = {};
        obj[val] = true;
        let newVal = Object.assign(this.state.users, obj);
        this.setState({users: newVal});
    }

    // setFilterUser(val) {
    //     this.setState({filterUsers: val});
    // }

    // setFilterGroup(val) {
    //     this.setState({filterGroups: val})
    // }

    // setFilterMedia(val) {
    //     this.setState({filterMedias: val});
    // }
    
    // setSubscribes(val) {
    //     this.setState({subscribes: val});
    // }
    
    // setUsers(val) {
    //     this.setState({users: val});
    // }

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
    //     let fetch = 0;
    //
    //     if (!this.state.mediaArr) {
    //         ++fetch;
    //         getMedia().then(resp => {
    //             if (!resp.data) {
    //                 this.setState({mediaArr: {data: null}, fetch: this.state.fetch - 1});
    //             } else {
    //                 this.setState({mediaArr: resp, fetch: this.state.fetch - 1});
    //             }
    //         })
    //     }
    //     if (!this.state.users) {
    //         ++fetch;
    //         getUsers().then(resp => {
    //             if (resp.errors) {
    //                 return;
    //             }
    //             if (resp.data) {
    //                 let obj = {};
    //                 for (let key in resp.data) {
    //                     let col = resp.data[key];
    //                     obj[col._id] = col;
    //                 }
    //                 this.setState({users:obj, fetch: this.state.fetch - 1});
    //             }
    //         })
    //     }
    //     if (!this.state.subscribes && this.state.profile) {
    //         ++fetch;
    //         findSubscribes(this.state.profile._id).then(resp => {
    //             if (resp.errors) {
    //                 return;
    //             }
    //             if (resp.data) {
    //                 let obj = {};
    //                 for (let key in resp.data) {
    //                     let col = resp.data[key];
    //                     obj[col.user] = true;
    //                 }
    //                 this.setState({subscribes:obj, fetch: this.state.fetch - 1});
    //             } else
    //                 this.setState({subscribes:{}, fetch: this.state.fetch - 1});
    //         })
    //     }
    //     this.setState({fetch: fetch})
    //
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
                          collectionName={'/farm'}
                            {...props}/>
        };

        return (
           <>
            <div className="App" onClick={anim}>
               <Router>
                   {nam}
                   <OriginalMenu strings={strings}
                                 user={true}
                                 changeLanguage={this.changeLanguage}
                                 lan={lan}/>

                   <Switch>
                       <Route exact path="/" component={WrappedAboutUs}/>*/}
                       <Route exact path="/farm" component={WrappedFarms}/>
                       <Route path="/cages" component={(props) =>{return <Cages strings={strings} {...props}/>}}/>
                       <Route path="/user" component={(props) =>{return <Profile strings={strings} setUser={this.setUser} {...props}/>}} />
                   </Switch>
               </Router>
           </div>}</>
       );
   }
}

export default App;
