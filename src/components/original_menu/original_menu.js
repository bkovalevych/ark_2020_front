import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import OriginalMenuItem from './original_menu_item'
import './original_menu.css'
import ChangeLanguage from '../changeLanguage/changeLanguage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faWaveSquare,
    faEnvelope,
    faUserFriends,
    faBars,
    faChargingStation,
    faUser,
    faToggleOff,
    faToggleOn
} from '@fortawesome/free-solid-svg-icons'

export default withRouter(function (props) {
    const [selectedItem, setItem] = useState(new Set([0]));
    const [lanShow, lanSet] = useState(false);
    const [animOn, setAnim] = useState(true);
    let openedTable = false;

    const goToLink = (val) => {
        props.history.push(val);
    };
    const _setItem = (val) => {
      switch (val) {
          case 0:
              goToLink('/');
              setItem(val);
              break;
          case 1:
              lanSet(true);
              return;
          case 2:
              animationHandle();
              return;
          case 3:
              goToLink('/user');
              break;
          case 4:
              goToLink('/iot');
              break;
          case 5:
              goToLink('/moveMedia');
              break;
          case 6:
              goToLink('/messages');
              break;
          case 7:
              goToLink('/groups');
              break;
      }
      setItem(new Set([val]));
    };

    const animationHandle = () => {
        if (!animOn) {
            document.getElementsByClassName('dark')[0].children[0].style.display = 'block';
        } else {
            document.getElementsByClassName('dark')[0].children[0].style.display = 'none';
        }
        setAnim(!animOn);
    };
    const menuHandle = () => {
        openedTable = !openedTable;
        let panel = document.getElementsByClassName('outerLeftSide')[0];
        if (!openedTable) {
            panel.className += ' my_hide'
        } else {
            panel.className = panel.className.replace('my_hide', '')
        }
    };
    const textForAll = [
        props.strings.aboutUs,
        props.strings.language,
        [
            animOn?
                <FontAwesomeIcon icon={ faToggleOn} size={'2x'} color={'green'} />:
                <FontAwesomeIcon icon={ faToggleOff} size={'2x'} color={'red'}/>
                ,
            props.strings.animation
        ],
        props.user?
            props.user.name
            :
            [<FontAwesomeIcon icon={faUser} color='#000' size='2x'/>,
                props.strings.menuProfile],


    ];

    const textForUser = props.user? [
        [
            <FontAwesomeIcon icon={faChargingStation} size={'2x'} color='#0b100f'/>,
            props.strings.controllers
        ],
        [
            <FontAwesomeIcon icon={faWaveSquare} size={'2x'} color='#0b100f'/>,
            props.strings.menuMoveMedia
        ],
        [
            <FontAwesomeIcon icon={faEnvelope} size={'2x'} color='#0b100f'/>,
            props.strings.messages
        ],

        [
            <FontAwesomeIcon icon={faUserFriends} size={'2x'} color='#0b100f'/>,
            props.strings.menuGroups,
        ]
    ] : [];
    let index = 0;

    const render = (arrayText, initIndex) => {
        let result = [];
        for (let index = 0; index < arrayText.length; ++index) {
            let text = arrayText[index];
            if (typeof text === typeof []) {
                result.push(<OriginalMenuItem name={text[1]} icon={text[0]} specialLink={initIndex + index} setItem={_setItem} key={initIndex + index} selectedItem={selectedItem} single={true}/>)
            } else
            result.push(<OriginalMenuItem name={text} key={initIndex + index} specialLink={initIndex + index} setItem={_setItem} selectedItem={selectedItem} single={true}/>)
        }
        return result;
    };

    let forAll = render(textForAll, 0);
    let forUser = render(textForUser, forAll.length);


    return (
        <>
            <ChangeLanguage
            lan={props.lan}
            setLanguage={props.changeLanguage}
            setShowLanguage ={lanSet}
            showLanguage={lanShow}
            strings={props.strings}/>
            <FontAwesomeIcon icon={faBars} size={'3x'} className='myToggle'
               onClick={() => {
                  menuHandle()
               }}/>
            <div className="outerLeftSide my_hide">
                <div className="leftSide">
                    {forUser}
                </div>
                <hr/>
            </div>

            <div className='box'>
                {forAll}

            </div>
        </>
    )
})