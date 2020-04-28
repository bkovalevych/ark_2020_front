import './App.css';
import '../node_modules/uikit/dist/css/uikit.min.css';
import  React from 'react';
import {findSubscribes, findFollowers} from './functions/follower'
import {getUsers} from './functions/userFunctions'
import Menu from './components/menu/menu'
import Home from './components/home/home'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Users from "./components/users/users";
import Groups from "./components/groups/groups";
import LoginForm from './components/loginForm/loginForm'
import strings from './res/localisation'
import Media from './components/move_media/moveMedia';
import Main from './components/main/main'
import jwt from 'jwt-decode';

import Velocity from 'velocity-animate'
import "bootswatch/dist/cyborg/bootstrap.min.css"
import Filter from "./components/filter/filter"
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
        this.addUser = this.addUser.bind(this);
        this.getMedia = getMedia.bind(this)
        this.setSubscribes = this.setSubscribes.bind(this);
        this.setUser = this.setUser.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.setFilterMedia = this.setFilterMedia.bind(this);
        this.setFilterGroup = this.setFilterGroup.bind(this);
        this.setFilterUser = this.setFilterUser.bind(this)
        this.setUsers = this.setUsers.bind(this);
    }

    addUser(val) {
        let obj = {};
        obj[val] = true;
        let newVal = Object.assign(this.state.users, obj);
        this.setState({users: newVal});
    }

    setFilterUser(val) {
        this.setState({filterUsers: val});
    }

    setFilterGroup(val) {
        this.setState({filterGroups: val})
    }

    setFilterMedia(val) {
        this.setState({filterMedias: val});
    }
    
    setSubscribes(val) {
        this.setState({subscribes: val});
    }
    
    setUsers(val) {
        this.setState({users: val});
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
        parent.className += " dark";
        root.appendChild(parent);
        parent.appendChild(container)
        let count = this.rand(50, 120);
        container.innerHTML += `<div class='ball' style='opacity: 0.8; width: 100px; height: 30px; color: red'>MuscleBit</div>`
        for (let i = 1; i < count; ++i) {
            let radius = this.rand(10, 50);
            let opacity = this.rand(1, 100) / 100;
            container.innerHTML += `<div class='ball' style='opacity: ${opacity}; width: ${radius}px; height: ${radius}px'/>`
        }
        let minZ = -50;
        let maxZ = 5;
        let width = window.screen.availWidth;
        let height = window.screen.availHeight;
        Velocity(document.getElementsByClassName('ball'),
            {
                translateX: [
                    () => {return '+=' + this.rand(-width / 4, width / 4)},
                    () => {return  App.rand(0, width - 10)}
                ],
                translateY: [
                    () => {return '+=' + this.rand(-height / 4, height / 4)},
                    () => {return  App.rand(0, height - 10)}
                ],
                translateZ: [
                    () => {return '+=' + this.rand(minZ / 10, maxZ / 10)},
                    () => {return this.rand(minZ, maxZ)}
                ],
                opacity: [
                    () => {return '+=' + this.rand(40, 100) / 100;},
                    () => {return this.rand(1, 100) / 100;}
                ],

            },
            {duration: 10000, loop: 100, delay: 100});

        Velocity(document.getElementsByClassName('dark'), {
                perspective: [500, 5]
            },
            {
                duration: 1000, easing: "easeInSine", delay: 2000
            });
    }
    componentDidMount(): void {
        App.backgroundOn();
        let fetch = 0;

        if (!this.state.mediaArr) {
            ++fetch;
            getMedia().then(resp => {
                if (!resp.data) {
                    this.setState({mediaArr: {data: null}, fetch: this.state.fetch - 1});
                } else {
                    this.setState({mediaArr: resp, fetch: this.state.fetch - 1});
                }
            })

            // getMedia().then(resp => {
            //     if (!resp.data) {
            //         this.setState({mediaArr: [], fetch: this.state.fetch - 1});
            //     } else {
            //         this.setState({mediaArr: resp.data, fetch: this.state.fetch - 1});
            //     }
            // });
        }
        if (!this.state.users) {
            ++fetch;
            getUsers().then(resp => {
                if (resp.errors) {
                    return;
                }
                if (resp.data) {
                    let obj = {};
                    for (let key in resp.data) {
                        let col = resp.data[key];
                        obj[col._id] = col;
                    }
                    this.setState({users:obj, fetch: this.state.fetch - 1});
                }
            })
        }
        if (!this.state.subscribes && this.state.profile) {
            ++fetch;
            findSubscribes(this.state.profile._id).then(resp => {
                if (resp.errors) {
                    return;
                }
                if (resp.data) {
                    let obj = {};
                    for (let key in resp.data) {
                        let col = resp.data[key];
                        obj[col.user] = true;
                    }
                    this.setState({subscribes:obj, fetch: this.state.fetch - 1});
                } else
                    this.setState({subscribes:{}, fetch: this.state.fetch - 1});
            })
        }
        this.setState({fetch: fetch})

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



        strings.setLanguage(this.state.language);
        const filterUser = this.state.filterUsers;
        const filterGroup = this.state.filterGroups;
        const filterMedia = this.state.filterMedias;
        const setFilterUser = this.setFilterUser;
        const setFilterGroup = this.setFilterGroup;
        const setFilterMedia = this.setFilterMedia;

        const addUser = this.addUser;
        const funcSetUser = this.setUser;
        const userData = this.state.profile;
        const users = this.state.users;
        const setSubscribes = this.setSubscribes;
        const setUsers = this.setUsers;
        const subscribes = this.state.subscribes;
        const media = this.state.mediaArr? this.state.mediaArr.data : null;
        const WrappedUsers = (props) => {
            return (<Users {...props}
                           strings={strings}
                           user={userData}
                           users={users}
                           subscribes={subscribes}
                           setSubscribes={setSubscribes}
                           setUsers={setUsers}
                           filterData={filterUser}
                           filterOff={setFilterUser}
            />)
        };
        const WrappedProfile = function(props) {
            return (<Profile {...props} strings={strings} user={userData} setUser={funcSetUser}/>)
        }
       const WrappedLogin = function(props) {
            return (<LoginForm {...props} strings={strings}  setUser={funcSetUser}/>);
       };

        const WrappedMedia = function(props) {
            return (<Media {...props} strings={strings} users={users} user={userData} mediaArr={media} filterData={filterMedia} filterOff={setFilterMedia}/>);
        };

        const WrappedMain = function(props) {
            return (<Main {...props} strings={strings} move={media} users={users}/>)
        };
        
        const WrappedHome = function (props) {
            return (<Home {...props} strings={strings} subscribes={subscribes}
                          setSubscribes={setSubscribes} users={users} user={userData}
            />)
        };

        const WrappedGroups = (props) => {
            return (<Groups {...props} strings={strings} user={this.state.profile} users={users} filterData={filterGroup} filterOff={setFilterGroup}/>)
        };



        return (
           <>
               {this.state.fetch? <Loader off={false}/>:
            <div className="App" onClick={anim}>
               <Router>
                   {nam}
                   <Filter strings={strings} setFilterUser={setFilterUser} setFilterMedia={setFilterMedia} setFilterGroup={setFilterGroup}/>
                   <Menu setLanguage={this.changeLanguage} language ={this.state.language} user={this.state.profile} setUser={this.setUser} addUser={addUser}/>
                   <Switch>
                       <Route exact path="/" component={WrappedMain}/>
                       <Route path="/move" component={WrappedMedia}/>
                       <Route path="/users" component={WrappedUsers} />
                       <Route path="/groups" component={WrappedGroups} />
                       <Route path="/login" component={WrappedLogin}/>
                       <Route path="/home" component={WrappedHome}/>
                       <Route path="/profile" component={WrappedProfile}/>
                   </Switch>
               </Router>
           </div>}</>
       );
   }
}

export default App;
