import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { Inter } from "next/font/google";
import styles from '@/styles/Home.module.css';
import {useState, useEffect, useRef} from 'react';
import personAvailable from '../public/person-available.svg';
import personUnavailable from '../public/person-unavailable.svg';
import personAvailableSolid from '../public/person-available-solid.svg';
import personUnavailableSolid from '../public/person-unavailable-solid.svg';
import lockIcon from '../public/lock.svg';
import unlockIcon from '../public/unlock.svg';
import Select from "react-select";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  docRef,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  setDoc,
  child,
  query,
  fieldPath,
  where,
  documentId,
  querySnapshot,

} from 'firebase/firestore';
 
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  login,
  signup,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail
} from 'firebase/auth';
// import { useGridApiContext } from '@mui/x-data-grid';
import logoCol from '../public/UIELogoWPowName.png';
import eye from '../public/eye.svg';
import eyeSlash from '../public/eye-slash.svg';
import lockIcon2 from '../public/lock-fill.svg';
import unlockIcon2 from '../public/unlock-fill.svg';

import FAQs from '../pages/faq.js'





// const inter = Inter({ subsets: ['latin'] })


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2x7x6Ls9R1GeugNiNMuvWQbHdbmdljZI",
  authDomain: "whoisfree-b2f86.firebaseapp.com",
  projectId: "whoisfree-b2f86",
  storageBucket: "whoisfree-b2f86.appspot.com",
  messagingSenderId: "817666656873",
  appId: "1:817666656873:web:68283d624c2ad6f763f0f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


export default function Home(day, user) {



  /// USER ID ///
  const [uid, setUid] = useState('uid');

  console.log('uid', uid);
//////   SETS THE USER ID STATE (setUID)   //////
useEffect(() => {
  const setUID = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
         setUid(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };
  setUID();
}, []);


  ///// BAND INFORMATION /////
const [bandInfoToggle, setBandInfoToggle] = useState(false);
const [bandInfoTrig, setBandInfoTrig] = useState(false);
const [saveBandInfoChangesTrigState, setSaveBandInfoChangesTrigState] = useState(false);

const [ numberOfMembersOnLoad, setNumberOfMembersOnLoad] = useState(4); 
const [ bandNameOnLoad, setBandNameOnLoad ] = useState('bandnameonload');
const [ updateTrig, setUpdateTrig] = useState(false);
const [ userEmailOnLoad, setUserEmailOnLoad ] = useState('userEmailOnLoad')

const [ userNamesOnLoad, setUserNamesOnLoad ] = useState ({
  nameUser1: '1',
  nameUser2: '2',
  nameUser3: '3',
  nameUser4: '4',
  nameUser5: '5',
  nameUser6: '6',
  nameUser7: '7',
  nameUser8: '8',
  nameUser9: '9',
  nameUser10: '10'
});

const [ userNameOnLoad1, setUserNameOnLoad1 ] = useState('1');
const [ userNameOnLoad2, setUserNameOnLoad2 ] = useState('2');
const [ userNameOnLoad3, setUserNameOnLoad3 ] = useState('3');
const [ userNameOnLoad4, setUserNameOnLoad4 ] = useState('4');
const [ userNameOnLoad5, setUserNameOnLoad5 ] = useState('5');
const [ userNameOnLoad6, setUserNameOnLoad6 ] = useState('6');
const [ userNameOnLoad7, setUserNameOnLoad7 ] = useState('7');
const [ userNameOnLoad8, setUserNameOnLoad8 ] = useState('8');
const [ userNameOnLoad9, setUserNameOnLoad9 ] = useState('9');
const [ userNameOnLoad10, setUserNameOnLoad10 ] = useState('10');


const [unlocked1, setUnlocked1] = useState(true);
const [unlocked2, setUnlocked2] = useState(true);
const [unlocked3, setUnlocked3] = useState(true);
const [unlocked4, setUnlocked4] = useState(true);
const [unlocked5, setUnlocked5] = useState(true);
const [unlocked6, setUnlocked6] = useState(true);
const [unlocked7, setUnlocked7] = useState(true);
const [unlocked8, setUnlocked8] = useState(true);
const [unlocked9, setUnlocked9] = useState(true);
const [unlocked10, setUnlocked10] = useState(true);



const numberOfMembersArray = () => {
  if (numberOfMembersOnLoad == 1) {
    return ( [1] )
  }
  if (numberOfMembersOnLoad == 2) {
    return ( [1,2] )
  } 
  if (numberOfMembersOnLoad == 3) {
    return ( [1,2,3] )
  } 
  if (numberOfMembersOnLoad == 4) {
    return ( [1,2,3,4] )
  } 
  if (numberOfMembersOnLoad == 5) {
    return ( [1,2,3,4,5] )
  } 
  if (numberOfMembersOnLoad == 6) {
    return ( [1,2,3,4,5,6] )
  } 
  if (numberOfMembersOnLoad == 7) {
    return ( [1,2,3,4,5,6,7] )
  } 
  if (numberOfMembersOnLoad == 8) {
    return ( [1,2,3,4,5,6,7,8] )
  } 
  if (numberOfMembersOnLoad == 9) {
    return ( [1,2,3,4,5,6,7,8,9] )
  }
  if (numberOfMembersOnLoad == 10) {
    return ( [1,2,3,4,5,6,7,8,9,10] )
  } 
  else {
    return ( [1,2,3,4] )
  }
};

const [ currentLogName, setCurrentLogName ] = useState('MJK');

const [ toggleWelcomeScreen, setToggleWelcomeScreen ] = useState(true);
const [ showLoginInfoNav, setShowLoginInfoNav ] = useState(false);

//////   CURRENT DATE   //////
let currentDate = new Date();

//////   TOP SOUND MOBILE NUMBER   //////
const svenMobile = '0414911859';

//////   INITIAL SET STATES   //////
const [ activeMonth, setActiveMonth ] = useState( currentDate.getMonth() );
const [ activeYear, setActiveYear ] = useState( currentDate.getFullYear() );
const [ activeDay, setActiveDay ] = useState( currentDate.getDate() );
const [ unlock, setUnlock ] = useState({ user1: true, user2: true, user3:true, user4:true, user5:true, user6:true, user7:true, user8:true, user9:true, user10:true });
const [ trig, setTrig ] = useState( false );
const [ hide29, setHide29 ] = useState( false );
const [ hide30, setHide30 ] = useState( false );
const [ hide31, setHide31 ] = useState( false );
const [ activeYearPlusOne, setActiveYearPlusOne ] = useState ( currentDate.getFullYear() + 1);
const [ activeYearPlusTwo, setActiveYearPlusTwo ] = useState ( currentDate.getFullYear() + 2)
const [ activeYearPlusThree, setActiveYearPlusThree ] = useState ( currentDate.getFullYear() + 3)
const [ activeYearPlusFour, setActiveYearPlusFour ] = useState ( currentDate.getFullYear() + 4)
const [ activeYearPlusFive, setActiveYearPlusFive ] = useState ( currentDate.getFullYear() + 5)
const [ loadTrig, setLoadTrig ] = useState ( false );
const [ showMain, setShowMain ] = useState ( false );
const [ openSignupDivState, setOpenSignupDivState ] = useState( false );
const daysArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28, 29, 30, 31];
const [showHowToUseDiv, setShowHowToUseDiv] = useState (false);
const [showUpdateEmailDiv, setShowUpdateEmailDiv] = useState(false);

//////   TOGGLES IF BAND INFO SECTION IS SHOWN   //////
function BandInfoToggleButton() {
  const changeToggleState = () => {
    setBandInfoToggle(prev=>!prev)
  }
  return (
    <div className='toggleBandInfoButtonDiv'>
      <button 
      className='purpleButton'
      onClick={changeToggleState}> {bandInfoToggle ? 'Hide Band Info' : 'Show Band Info'} </button>
    </div>
  )
};

const [toggleUpdateBandInfoDiv, setToggleUpdateBandInfoDiv] = useState(false);

function ToggleUpdateBandInfoDivFunc() {
  const changeToggleState = () => {
    setToggleUpdateBandInfoDiv(prev=>!prev);
  };

  return (
    <div className='editBandInfoButtonDiv'>
      <button
        onClick={changeToggleState}
        className='purpleButton'
      > {toggleUpdateBandInfoDiv ? 'Hide Edit Band Information' : 'Edit Band Information'} </button>
    </div>
  )
}

console.log('saveBandInfoChangesTrigState', saveBandInfoChangesTrigState);
//////   CAUSES UPDATE TRIGGER TO FIRE WHICH UPDATES FIRESTORE BAND INFO LOAD ON START USEEFFECT   //////
function SaveBandInfoButton() {
  const handleClick = () => {
    setUpdateTrig(prev=>!prev);
    setSaveBandInfoChangesTrigState(false);
    setUnlocked1(true);
    setUnlocked2(true);
    setUnlocked3(true);
    setUnlocked4(true);
    setUnlocked5(true);
    setUnlocked6(true);
    setUnlocked7(true);
    setUnlocked8(true);
    setUnlocked9(true);
    setUnlocked10(true);
  };

  return (
    saveBandInfoChangesTrigState ? 
    <div className='blurBG'>
      <div className='saveChangesButtonDiv'>
        <div>         
          Changes Saved
        </div>
        <br/>
      <button 
        onClick={handleClick}
        className='saveChangesButton'
      > OK </button>
      </div>
    </div>
  :
  ''
  )
};

//////   FIRESTORE DOCREF   //////

const docRef = doc( db, uid.toString(), activeYear.toString(), 'Availability', activeMonth.toString() );
const setDocRef = doc( db, uid.toString(), activeYear.toString(), 'Availability', activeMonth.toString() );

//////   FIRESTORE BAND INFO LOAD ON START   //////
const docRefBandInfo = doc( db, uid.toString(), 'info' );
const addDocRefBandInfo = doc( db, uid.toString(), 'info' );
const colRefBandInfo = collection( db, uid.toString() );


//////   INITIAL SET USERS DAY AVAILS TO NULL   //////
const [users, setUsers] = useState({
  user1: {
      day1: null,
      day2: null,
      day3: null,
      day4: null,
      day5: null,
      day6: null,
      day7: null,
      day8: null,
      day9: null,
      day10: null,
      day11: null,
      day12: null,
      day13: null,
      day14: null,
      day15: null,
      day16: null,
      day17: null,
      day18: null,
      day19: null,
      day20: null,
      day21: null,
      day22: null,
      day23: null,
      day24: null,
      day25: null,
      day26: null,
      day27: null,
      day28: null,
      day29: null,
      day30: null,
      day31: null
    },

  user2: {
      day1: null,
      day2: null,
      day3: null,
      day4: null,
      day5: null,
      day6: null,
      day7: null,
      day8: null,
      day9: null,
      day10: null,
      day11: null,
      day12: null,
      day13: null,
      day14: null,
      day15: null,
      day16: null,
      day17: null,
      day18: null,
      day19: null,
      day20: null,
      day21: null,
      day22: null,
      day23: null,
      day24: null,
      day25: null,
      day26: null,
      day27: null,
      day28: null,
      day29: null,
      day30: null,
      day31: null
    },

  user3: {
      day1: null,
      day2: null,
      day3: null,
      day4: null,
      day5: null,
      day6: null,
      day7: null,
      day8: null,
      day9: null,
      day10: null,
      day11: null,
      day12: null,
      day13: null,
      day14: null,
      day15: null,
      day16: null,
      day17: null,
      day18: null,
      day19: null,
      day20: null,
      day21: null,
      day22: null,
      day23: null,
      day24: null,
      day25: null,
      day26: null,
      day27: null,
      day28: null,
      day29: null,
      day30: null,
      day31: null
    },

  user4: {
      day1: null,
      day2: null,
      day3: null,
      day4: null,
      day5: null,
      day6: null,
      day7: null,
      day8: null,
      day9: null,
      day10: null,
      day11: null,
      day12: null,
      day13: null,
      day14: null,
      day15: null,
      day16: null,
      day17: null,
      day18: null,
      day19: null,
      day20: null,
      day21: null,
      day22: null,
      day23: null,
      day24: null,
      day25: null,
      day26: null,
      day27: null,
      day28: null,
      day29: null,
      day30: null,
      day31: null 
    },
    
  user5: {
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
    day8: null,
    day9: null,
    day10: null,
    day11: null,
    day12: null,
    day13: null,
    day14: null,
    day15: null,
    day16: null,
    day17: null,
    day18: null,
    day19: null,
    day20: null,
    day21: null,
    day22: null,
    day23: null,
    day24: null,
    day25: null,
    day26: null,
    day27: null,
    day28: null,
    day29: null,
    day30: null,
    day31: null 
  },
  
  user6: {
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
    day8: null,
    day9: null,
    day10: null,
    day11: null,
    day12: null,
    day13: null,
    day14: null,
    day15: null,
    day16: null,
    day17: null,
    day18: null,
    day19: null,
    day20: null,
    day21: null,
    day22: null,
    day23: null,
    day24: null,
    day25: null,
    day26: null,
    day27: null,
    day28: null,
    day29: null,
    day30: null,
    day31: null 
  },
  
  user7: {
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
    day8: null,
    day9: null,
    day10: null,
    day11: null,
    day12: null,
    day13: null,
    day14: null,
    day15: null,
    day16: null,
    day17: null,
    day18: null,
    day19: null,
    day20: null,
    day21: null,
    day22: null,
    day23: null,
    day24: null,
    day25: null,
    day26: null,
    day27: null,
    day28: null,
    day29: null,
    day30: null,
    day31: null 
  },
  
  user8: {
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
    day8: null,
    day9: null,
    day10: null,
    day11: null,
    day12: null,
    day13: null,
    day14: null,
    day15: null,
    day16: null,
    day17: null,
    day18: null,
    day19: null,
    day20: null,
    day21: null,
    day22: null,
    day23: null,
    day24: null,
    day25: null,
    day26: null,
    day27: null,
    day28: null,
    day29: null,
    day30: null,
    day31: null 
  },
  
  user9: {
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
    day8: null,
    day9: null,
    day10: null,
    day11: null,
    day12: null,
    day13: null,
    day14: null,
    day15: null,
    day16: null,
    day17: null,
    day18: null,
    day19: null,
    day20: null,
    day21: null,
    day22: null,
    day23: null,
    day24: null,
    day25: null,
    day26: null,
    day27: null,
    day28: null,
    day29: null,
    day30: null,
    day31: null 
  },
  
  user10: {
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
    day8: null,
    day9: null,
    day10: null,
    day11: null,
    day12: null,
    day13: null,
    day14: null,
    day15: null,
    day16: null,
    day17: null,
    day18: null,
    day19: null,
    day20: null,
    day21: null,
    day22: null,
    day23: null,
    day24: null,
    day25: null,
    day26: null,
    day27: null,
    day28: null,
    day29: null,
    day30: null,
    day31: null 
  }

})


//////   LOGIN AND AUTH   //////
const [loading, setLoading] = useState(false);
const userNameRef = useRef();
const passwordRef = useRef();
const signupUserNameRef = useRef();
const signupEmailRef = useRef();
const signupPasswordRef = useRef();
const signupPasswordRefConfirm = useRef();
const currentUser = useAuth();
const [passwordVisible, setPasswordVisible] = useState(false);
const emailRef = useRef();
const emailRefConfirm = useRef();
const emailRefUpdate = useRef();
const emailRefConfirmUpdate = useRef();


function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user =>  setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
};

function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
};

//////   FILLS CLOUD WITH DATA   //////
async function signupFillCloud () {
  // console.log('signup 1 2 3', bandNameOnLoad, numberOfMembersOnLoad, userNamesOnLoad);
  // console.log('bandNameonLoad in fill', bandNameOnLoad);
  // await setDoc(docRefBandInfo, {1:1});
  await setDoc(docRefBandInfo, { numberOfMembers: numberOfMembersOnLoad}, {bandName: bandNameOnLoad},  {userNames: userNamesOnLoad}, {userEmail: userEmailOnLoad});
  // await setDoc(setDocRef, {
  //   user1:[ 
  //     {day1: users.user1.day1},
  //     {day2: users.user1.day2}, 
  //     {day3: users.user1.day3},
  //     {day4: users.user1.day4},
  //     {day5: users.user1.day5},
  //     {day6: users.user1.day6},
  //     {day7: users.user1.day7},
  //     {day8: users.user1.day8},
  //     {day9: users.user1.day9},
  //     {day10: users.user1.day10},
  //     {day11: users.user1.day11},
  //     {day12: users.user1.day12}, 
  //     {day13: users.user1.day13},
  //     {day14: users.user1.day14},
  //     {day15: users.user1.day15},
  //     {day16: users.user1.day16},
  //     {day17: users.user1.day17},
  //     {day18: users.user1.day18},
  //     {day19: users.user1.day19},
  //     {day20: users.user1.day20},
  //     {day21: users.user1.day21},
  //     {day22: users.user1.day22}, 
  //     {day23: users.user1.day23},
  //     {day24: users.user1.day24},
  //     {day25: users.user1.day25},
  //     {day26: users.user1.day26},
  //     {day27: users.user1.day27},
  //     {day28: users.user1.day28},
  //     {day29: users.user1.day29},
  //     {day30: users.user1.day30},
  //     {day31: users.user1.day31}, 
  //   ],  
  //   user2:[ 
  //     {day1: users.user2.day1},
  //     {day2: users.user2.day2}, 
  //     {day3: users.user2.day3},
  //     {day4: users.user2.day4},
  //     {day5: users.user2.day5},
  //     {day6: users.user2.day6},
  //     {day7: users.user2.day7},
  //     {day8: users.user2.day8},
  //     {day9: users.user2.day9},
  //     {day10: users.user2.day10},
  //     {day11: users.user2.day11},
  //     {day12: users.user2.day12}, 
  //     {day13: users.user2.day13},
  //     {day14: users.user2.day14},
  //     {day15: users.user2.day15},
  //     {day16: users.user2.day16},
  //     {day17: users.user2.day17},
  //     {day18: users.user2.day18},
  //     {day19: users.user2.day19},
  //     {day20: users.user2.day20},
  //     {day21: users.user2.day21},
  //     {day22: users.user2.day22}, 
  //     {day23: users.user2.day23},
  //     {day24: users.user2.day24},
  //     {day25: users.user2.day25},
  //     {day26: users.user2.day26},
  //     {day27: users.user2.day27},
  //     {day28: users.user2.day28},
  //     {day29: users.user2.day29},
  //     {day30: users.user2.day30},
  //     {day31: users.user2.day31}, 
  //   ],
  //   user3:[ 
  //     {day1: users.user3.day1},
  //     {day2: users.user3.day2}, 
  //     {day3: users.user3.day3},
  //     {day4: users.user3.day4},
  //     {day5: users.user3.day5},
  //     {day6: users.user3.day6},
  //     {day7: users.user3.day7},
  //     {day8: users.user3.day8},
  //     {day9: users.user3.day9},
  //     {day10: users.user3.day10},
  //     {day11: users.user3.day11},
  //     {day12: users.user3.day12}, 
  //     {day13: users.user3.day13},
  //     {day14: users.user3.day14},
  //     {day15: users.user3.day15},
  //     {day16: users.user3.day16},
  //     {day17: users.user3.day17},
  //     {day18: users.user3.day18},
  //     {day19: users.user3.day19},
  //     {day20: users.user3.day20},
  //     {day21: users.user3.day21},
  //     {day22: users.user3.day22}, 
  //     {day23: users.user3.day23},
  //     {day24: users.user3.day24},
  //     {day25: users.user3.day25},
  //     {day26: users.user3.day26},
  //     {day27: users.user3.day27},
  //     {day28: users.user3.day28},
  //     {day29: users.user3.day29},
  //     {day30: users.user3.day30},
  //     {day31: users.user3.day31}, 
  //   ],
  //   user4:[ 
  //     {day1: users.user4.day1},
  //     {day2: users.user4.day2}, 
  //     {day3: users.user4.day3},
  //     {day4: users.user4.day4},
  //     {day5: users.user4.day5},
  //     {day6: users.user4.day6},
  //     {day7: users.user4.day7},
  //     {day8: users.user4.day8},
  //     {day9: users.user4.day9},
  //     {day10: users.user4.day10},
  //     {day11: users.user4.day11},
  //     {day12: users.user4.day12}, 
  //     {day13: users.user4.day13},
  //     {day14: users.user4.day14},
  //     {day15: users.user4.day15},
  //     {day16: users.user4.day16},
  //     {day17: users.user4.day17},
  //     {day18: users.user4.day18},
  //     {day19: users.user4.day19},
  //     {day20: users.user4.day20},
  //     {day21: users.user4.day21},
  //     {day22: users.user4.day22}, 
  //     {day23: users.user4.day23},
  //     {day24: users.user4.day24},
  //     {day25: users.user4.day25},
  //     {day26: users.user4.day26},
  //     {day27: users.user4.day27},
  //     {day28: users.user4.day28},
  //     {day29: users.user4.day29},
  //     {day30: users.user4.day30},
  //     {day31: users.user4.day31}, 
  //   ],
  //   user5:[ 
  //     {day1: users.user5.day1},
  //     {day2: users.user5.day2}, 
  //     {day3: users.user5.day3},
  //     {day4: users.user5.day4},
  //     {day5: users.user5.day5},
  //     {day6: users.user5.day6},
  //     {day7: users.user5.day7},
  //     {day8: users.user5.day8},
  //     {day9: users.user5.day9},
  //     {day10: users.user5.day10},
  //     {day11: users.user5.day11},
  //     {day12: users.user5.day12}, 
  //     {day13: users.user5.day13},
  //     {day14: users.user5.day14},
  //     {day15: users.user5.day15},
  //     {day16: users.user5.day16},
  //     {day17: users.user5.day17},
  //     {day18: users.user5.day18},
  //     {day19: users.user5.day19},
  //     {day20: users.user5.day20},
  //     {day21: users.user5.day21},
  //     {day22: users.user5.day22}, 
  //     {day23: users.user5.day23},
  //     {day24: users.user5.day24},
  //     {day25: users.user5.day25},
  //     {day26: users.user5.day26},
  //     {day27: users.user5.day27},
  //     {day28: users.user5.day28},
  //     {day29: users.user5.day29},
  //     {day30: users.user5.day30},
  //     {day31: users.user5.day31}, 
  //   ],  
  //   user6:[ 
  //     {day1: users.user6.day1},
  //     {day2: users.user6.day2}, 
  //     {day3: users.user6.day3},
  //     {day4: users.user6.day4},
  //     {day5: users.user6.day5},
  //     {day6: users.user6.day6},
  //     {day7: users.user6.day7},
  //     {day8: users.user6.day8},
  //     {day9: users.user6.day9},
  //     {day10: users.user6.day10},
  //     {day11: users.user6.day11},
  //     {day12: users.user6.day12}, 
  //     {day13: users.user6.day13},
  //     {day14: users.user6.day14},
  //     {day15: users.user6.day15},
  //     {day16: users.user6.day16},
  //     {day17: users.user6.day17},
  //     {day18: users.user6.day18},
  //     {day19: users.user6.day19},
  //     {day20: users.user6.day20},
  //     {day21: users.user6.day21},
  //     {day22: users.user6.day22}, 
  //     {day23: users.user6.day23},
  //     {day24: users.user6.day24},
  //     {day25: users.user6.day25},
  //     {day26: users.user6.day26},
  //     {day27: users.user6.day27},
  //     {day28: users.user6.day28},
  //     {day29: users.user6.day29},
  //     {day30: users.user6.day30},
  //     {day31: users.user6.day31}, 
  //   ],   
  //   user7:[ 
  //     {day1: users.user7.day1},
  //     {day2: users.user7.day2}, 
  //     {day3: users.user7.day3},
  //     {day4: users.user7.day4},
  //     {day5: users.user7.day5},
  //     {day6: users.user7.day6},
  //     {day7: users.user7.day7},
  //     {day8: users.user7.day8},
  //     {day9: users.user7.day9},
  //     {day10: users.user7.day10},
  //     {day11: users.user7.day11},
  //     {day12: users.user7.day12}, 
  //     {day13: users.user7.day13},
  //     {day14: users.user7.day14},
  //     {day15: users.user7.day15},
  //     {day16: users.user7.day16},
  //     {day17: users.user7.day17},
  //     {day18: users.user7.day18},
  //     {day19: users.user7.day19},
  //     {day20: users.user7.day20},
  //     {day21: users.user7.day21},
  //     {day22: users.user7.day22}, 
  //     {day23: users.user7.day23},
  //     {day24: users.user7.day24},
  //     {day25: users.user7.day25},
  //     {day26: users.user7.day26},
  //     {day27: users.user7.day27},
  //     {day28: users.user7.day28},
  //     {day29: users.user7.day29},
  //     {day30: users.user7.day30},
  //     {day31: users.user7.day31}, 
  //   ],
  //   user8:[ 
  //     {day1: users.user8.day1},
  //     {day2: users.user8.day2}, 
  //     {day3: users.user8.day3},
  //     {day4: users.user8.day4},
  //     {day5: users.user8.day5},
  //     {day6: users.user8.day6},
  //     {day7: users.user8.day7},
  //     {day8: users.user8.day8},
  //     {day9: users.user8.day9},
  //     {day10: users.user8.day10},
  //     {day11: users.user8.day11},
  //     {day12: users.user8.day12}, 
  //     {day13: users.user8.day13},
  //     {day14: users.user8.day14},
  //     {day15: users.user8.day15},
  //     {day16: users.user8.day16},
  //     {day17: users.user8.day17},
  //     {day18: users.user8.day18},
  //     {day19: users.user8.day19},
  //     {day20: users.user8.day20},
  //     {day21: users.user8.day21},
  //     {day22: users.user8.day22}, 
  //     {day23: users.user8.day23},
  //     {day24: users.user8.day24},
  //     {day25: users.user8.day25},
  //     {day26: users.user8.day26},
  //     {day27: users.user8.day27},
  //     {day28: users.user8.day28},
  //     {day29: users.user8.day29},
  //     {day30: users.user8.day30},
  //     {day31: users.user8.day31}, 
  //   ],  
  //   user9:[ 
  //     {day1: users.user9.day1},
  //     {day2: users.user9.day2}, 
  //     {day3: users.user9.day3},
  //     {day4: users.user9.day4},
  //     {day5: users.user9.day5},
  //     {day6: users.user9.day6},
  //     {day7: users.user9.day7},
  //     {day8: users.user9.day8},
  //     {day9: users.user9.day9},
  //     {day10: users.user9.day10},
  //     {day11: users.user9.day11},
  //     {day12: users.user9.day12}, 
  //     {day13: users.user9.day13},
  //     {day14: users.user9.day14},
  //     {day15: users.user9.day15},
  //     {day16: users.user9.day16},
  //     {day17: users.user9.day17},
  //     {day18: users.user9.day18},
  //     {day19: users.user9.day19},
  //     {day20: users.user9.day20},
  //     {day21: users.user9.day21},
  //     {day22: users.user9.day22}, 
  //     {day23: users.user9.day23},
  //     {day24: users.user9.day24},
  //     {day25: users.user9.day25},
  //     {day26: users.user9.day26},
  //     {day27: users.user9.day27},
  //     {day28: users.user9.day28},
  //     {day29: users.user9.day29},
  //     {day30: users.user9.day30},
  //     {day31: users.user9.day31}, 
  //   ], 
  //   user10:[ 
  //     {day1: users.user10.day1},
  //     {day2: users.user10.day2}, 
  //     {day3: users.user10.day3},
  //     {day4: users.user10.day4},
  //     {day5: users.user10.day5},
  //     {day6: users.user10.day6},
  //     {day7: users.user10.day7},
  //     {day8: users.user10.day8},
  //     {day9: users.user10.day9},
  //     {day10: users.user10.day10},
  //     {day11: users.user10.day11},
  //     {day12: users.user10.day12}, 
  //     {day13: users.user10.day13},
  //     {day14: users.user10.day14},
  //     {day15: users.user10.day15},
  //     {day16: users.user10.day16},
  //     {day17: users.user10.day17},
  //     {day18: users.user10.day18},
  //     {day19: users.user10.day19},
  //     {day20: users.user10.day20},
  //     {day21: users.user10.day21},
  //     {day22: users.user10.day22}, 
  //     {day23: users.user10.day23},
  //     {day24: users.user10.day24},
  //     {day25: users.user10.day25},
  //     {day26: users.user10.day26},
  //     {day27: users.user10.day27},
  //     {day28: users.user10.day28},
  //     {day29: users.user10.day29},
  //     {day30: users.user10.day30},
  //     {day31: users.user10.day31}, 
  //   ],          
  // }); 
  console.log('signupFillCloud ran');
};

function openSignupDivFunc() {
  setOpenSignupDivState(true);
};

function closeSignupDivFunc() {
  setOpenSignupDivState(false);
};

function OpenSignupDivWindow() {
  return(
    openSignupDivState ? 
      <div className='signupDivBG'>
        <div className='signupDiv'>
          <div className='signupDivText'>
            Enter Email and Create Password <br/> <br/>
            Note: Email and Password must be shared with all band members.
          </div>

          <div 
            className='signupFieldDiv'
            id='fields'>
              <input ref={signupEmailRef} type='email' placeholder='Enter Email'/>
              <input ref={signupPasswordRef} type={passwordVisible ? '' : 'password'} placeholder='Create Password'/>
              <input ref={signupPasswordRefConfirm} type={passwordVisible ? '' : 'password'} placeholder='Confirm Password'/>
              {/* <input ref={emailRef} placeholder='Enter Email Address' /> */}
              {/* <input ref={emailRefConfirm} placeholder='Confirm Email Address' /> */}

              {/* <button 
                className='PWButton'
                onClick={ togglePasswordVisible }> {passwordVisible ? <Image src={eyeSlash}/> : <Image src={eye}/>} 
              </button> */}

          </div>
            <button className='signupButton' onClick={handleSignup}> Create Account </button>
        </div>
        <div className='closeButtonDiv'> <button className='closeButton' onClick={closeSignupDivFunc}> Close </button> </div>

      </div>

    :
    ''
  )
};

async function handleSignup() {
  setLoading(true);
if (signupPasswordRef.current.value == signupPasswordRefConfirm.current.value ) {
  console.log('userEmailOnLoad', userEmailOnLoad);

  try {
    // await signup([signupUserNameRef.current.value] + '@gmail.com', signupPasswordRef.current.value);
    await signup(signupEmailRef.current.value, signupPasswordRef.current.value);
    signupFillCloud();
    setOpenSignupDivState(false);
    console.log('signupEmailRef.current.value', signupEmailRef.current.value);
    console.log('handle signUp try ran');
  } catch {
    console.log('handleSignup catch ran')
    // alert('That user already exists, or your PW was less than 6 characters')
  };
} else {
  console.log('PWs', signupPasswordRef.current.value, signupPasswordRefConfirm.current.value);
  alert('Passwords do not match')
};
  // signupFillCloud();
  setLoading(false);
};



function login(email, password) {
  setUpdateTrig(prev=>!prev);
  setShowLoginInfoNav(false);
  return signInWithEmailAndPassword(auth, email, password);
};

async function handleLogin() {
  setLoading(true);
  setUpdateTrig(prev=>!prev);
  setShowLoginInfoNav(false);
  try {
    // await login([userNameRef.current.value] + '@gmail.com', passwordRef.current.value);
    await login(emailRef.current.value, passwordRef.current.value);

    // setCurrentLogName(userNameRef.current.value);
    console.log('handleLogin try ran');
  } catch {
    alert('Login Failed - Please Try Again');
    console.log('handleLogin catch ran');


  }
  setLoading(false);
};

function logout() {
  return signOut(auth);
};

async function handleLogout() {
  setLoading(true);
  try {
    console.log('logout try ran');
  await logout();
  console.log('logout try ran after logout');


} catch {
  alert('error');
  console.log('logout error');
}
  setLoading(false);
};

function togglePasswordVisible() {
  setPasswordVisible(prev => !prev);
};

function handleResetPW() {
  sendPasswordResetEmail(auth, currentUser.email)
    .then(() => {
      //PW email sent
      console.log('PW email sent')
    })
    .catch ((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error in handleresetpw', errorMessage)
    });

};

function openUpdateEmailDiv() {
  setShowUpdateEmailDiv(true);
  console.log('showUpdateEmailDiv in open', showUpdateEmailDiv);

};

function closeUpdateEmailDiv() {
  setShowUpdateEmailDiv(false);
  console.log('showUpdateEmailDiv in close', showUpdateEmailDiv);
};







//////   SHOW OR HIDE MAIN TABLE   //////

function MainTableToggleButton() {
  const run = () => {
    setLoadTrig(prev => !prev);
    setShowMain(prev => !prev);
    setBandInfoToggle(false);
  }
  return (
    currentUser ?     
      <div className='showAvailabilitiesTableButtonDiv'>
    <button 
      onClick={run}
      className='purpleButton'
      > 
      {showMain ? 'Hide Availabilities Table' : 'Show Availabilities Table'} 
      </button>
    </div>
  :
  <div className='noUserLoggedInDiv'> No User Logged In </div>
  )
};



 
//////   CHANGE MONTH NUMBERS TO NAMES   //////
const monthToName = () => {
  if (activeMonth == 0) { return 'Jan' }
  if (activeMonth == 1) { return 'Feb' }
  if (activeMonth == 2) { return 'Mar' }
  if (activeMonth == 3) { return 'Apr' }
  if (activeMonth == 4) { return 'May' }
  if (activeMonth == 5) { return 'Jun' }
  if (activeMonth == 6) { return 'Jul' }
  if (activeMonth == 7) { return 'Aug' }
  if (activeMonth == 8) { return 'Sep' }
  if (activeMonth == 9) { return 'Oct' }
  if (activeMonth == 10) { return 'Nov' }
  if (activeMonth == 11) { return 'Dec' }
  if (activeMonth == undefined) { return currentDate.getMonth }  
}

//////   CHANGE MONTH NUMBERS TO NAMES - FULL NAME   //////
const monthToNameLong = () => {
  if (activeMonth == 0) { return 'January' }
  if (activeMonth == 1) { return 'February' }
  if (activeMonth == 2) { return 'March' }
  if (activeMonth == 3) { return 'April' }
  if (activeMonth == 4) { return 'May' }
  if (activeMonth == 5) { return 'June' }
  if (activeMonth == 6) { return 'July' }
  if (activeMonth == 7) { return 'August' }
  if (activeMonth == 8) { return 'September' }
  if (activeMonth == 9) { return 'October' }
  if (activeMonth == 10) { return 'November' }
  if (activeMonth == 11) { return 'December' }
  if (activeMonth == undefined) { return currentDate.getMonth }  
}

//////   CHANGE WEEK DAY NUMBERS TO NAMES   //////
const tableDayNameArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ];

function tableDayName (i) {
  let activeDate = new Date(activeYear, activeMonth, tableDayNameArray[i]);
      activeDate.getDay();
      if (activeDate.getDay() == 0) { return 'Sun' }
      if (activeDate.getDay() == 1) { return 'Mon' }
      if (activeDate.getDay() == 2) { return 'Tue' }
      if (activeDate.getDay() == 3) { return 'Wed' }
      if (activeDate.getDay() == 4) { return 'Thu' }
      if (activeDate.getDay() == 5) { return 'Fri' }
      if (activeDate.getDay() == 6) { return 'Sat' }
}

function tableDayNameLong (i) {
  let activeDate = new Date(activeYear, activeMonth, tableDayNameArray[i]);
      activeDate.getDay();
      if (activeDate.getDay() == 0) { return 'Sunday' }
      if (activeDate.getDay() == 1) { return 'Monday' }
      if (activeDate.getDay() == 2) { return 'Tuesday' }
      if (activeDate.getDay() == 3) { return 'Wednesday' }
      if (activeDate.getDay() == 4) { return 'Thursday' }
      if (activeDate.getDay() == 5) { return 'Friday' }
      if (activeDate.getDay() == 6) { return 'Saturday' }
}


//////   LOADDOC TO SET BAND INFO BASED ON CLOUDSTATE   //////
useEffect(()=> {
  const loadDoc = async () => {
    let initList = []
    console.log('loadDoc for loading band info ran');
    try {
      const docSnap = await getDoc(docRefBandInfo);
      const cloudState = docSnap.data();
      cloudState.id = docSnap.id;
      initList.push(cloudState);
      console.log('docSnap', docSnap);
      console.log('cloudState', cloudState);
      // BELOW IS ISSUE - IF LOOP SHOULDN'T RUN IF FIRESTORE DATABASE IS EMPTY OF RELEVANT DATA -
      // IT CAUSES BAND INFO TO BE UPDATED WITH  UNDEFINED DUE TO MISSING DATA FROM FIRESTORE
      if ( docSnap.exists() ) {
        console.log('docSnap exists is true in load band info on start');
        setNumberOfMembersOnLoad(cloudState.numberOfMembers);
        setBandNameOnLoad(cloudState.bandName);
        setUserNameOnLoad1(cloudState.userName1);
        setUserNameOnLoad2(cloudState.userName2);
        setUserNameOnLoad3(cloudState.userName3);
        setUserNameOnLoad4(cloudState.userName4);
        setUserNameOnLoad5(cloudState.userName5);
        setUserNameOnLoad6(cloudState.userName6);
        setUserNameOnLoad7(cloudState.userName7);
        setUserNameOnLoad8(cloudState.userName8);
        setUserNameOnLoad9(cloudState.userName9);
        setUserNameOnLoad10(cloudState.userName10);
        setUserEmailOnLoad(cloudState.userEmail);

      } else {
        console.log('docSnap does not exist, band info not updated');
        console.log(bandNameOnLoad, 'bandNameOnLoad in else')

        //setdoc
        setDoc(docRefBandInfo);
        console.log('setDoc(docRefBandInfo) ran')
      }
      console.log('cloudState.numberOfMembers', cloudState.numberOfMembers);
      console.log('cloudState.bandName', cloudState.bandName);
    } catch {

      console.log('catch ran in load band info on start meaning error in try')
      console.log(bandNameOnLoad, 'bandNameOnLoad in catch')

    }
  };
  loadDoc();
}, [ bandInfoToggle, updateTrig, showMain]);



//////   SET INIT AVAIL DATA FROM FIRESTORE ON LOAD   //////
useEffect(()=> {
    const loadDoc = async () => {
      let initList = []
      try {
        const docSnap = await getDoc(docRef);
        console.log('load doc set initial avails from firestore ran');

        if (docSnap.exists) {
        const cloudState = docSnap.data();
        cloudState.id = docSnap.id;
        initList.push(cloudState);
          setUsers({
            user1: {
                day1: cloudState.user1[0].day1,
                day2: cloudState.user1[1].day2,
                day3: cloudState.user1[2].day3,
                day4: cloudState.user1[3].day4,
                day5: cloudState.user1[4].day5,
                day6: cloudState.user1[5].day6,
                day7: cloudState.user1[6].day7,
                day8: cloudState.user1[7].day8,
                day9: cloudState.user1[8].day9,
                day10: cloudState.user1[9].day10,
                day11: cloudState.user1[10].day11,
                day12: cloudState.user1[11].day12,
                day13: cloudState.user1[12].day13,
                day14: cloudState.user1[13].day14,
                day15: cloudState.user1[14].day15,
                day16: cloudState.user1[15].day16,
                day17: cloudState.user1[16].day17,
                day18: cloudState.user1[17].day18,
                day19: cloudState.user1[18].day19,
                day20: cloudState.user1[19].day20,
                day21: cloudState.user1[20].day21,
                day22: cloudState.user1[21].day22,
                day23: cloudState.user1[22].day23,
                day24: cloudState.user1[23].day24,
                day25: cloudState.user1[24].day25,
                day26: cloudState.user1[25].day26,
                day27: cloudState.user1[26].day27,
                day28: cloudState.user1[27].day28,
                day29: cloudState.user1[28].day29,
                day30: cloudState.user1[29].day30,
                day31: cloudState.user1[30].day31,               
            },
        
            user2: {
                day1: cloudState.user2[0].day1,
                day2: cloudState.user2[1].day2,
                day3: cloudState.user2[2].day3,
                day4: cloudState.user2[3].day4,
                day5: cloudState.user2[4].day5,
                day6: cloudState.user2[5].day6,
                day7: cloudState.user2[6].day7,
                day8: cloudState.user2[7].day8,
                day9: cloudState.user2[8].day9,
                day10: cloudState.user2[9].day10, 
                day11: cloudState.user2[10].day11,
                day12: cloudState.user2[11].day12,
                day13: cloudState.user2[12].day13,
                day14: cloudState.user2[13].day14,
                day15: cloudState.user2[14].day15,
                day16: cloudState.user2[15].day16,
                day17: cloudState.user2[16].day17,
                day18: cloudState.user2[17].day18,
                day19: cloudState.user2[18].day19,
                day20: cloudState.user2[19].day20,
                day21: cloudState.user2[20].day21,
                day22: cloudState.user2[21].day22,
                day23: cloudState.user2[22].day23,
                day24: cloudState.user2[23].day24,
                day25: cloudState.user2[24].day25,
                day26: cloudState.user2[25].day26,
                day27: cloudState.user2[26].day27,
                day28: cloudState.user2[27].day28,
                day29: cloudState.user2[28].day29,
                day30: cloudState.user2[29].day30,
                day31: cloudState.user2[30].day31,                             
            },
        
            user3: {
                day1: cloudState.user3[0].day1,
                day2: cloudState.user3[1].day2,
                day3: cloudState.user3[2].day3,
                day4: cloudState.user3[3].day4,
                day5: cloudState.user3[4].day5,
                day6: cloudState.user3[5].day6,
                day7: cloudState.user3[6].day7,
                day8: cloudState.user3[7].day8,
                day9: cloudState.user3[8].day9,
                day10: cloudState.user3[9].day10, 
                day11: cloudState.user3[10].day11,
                day12: cloudState.user3[11].day12,
                day13: cloudState.user3[12].day13,
                day14: cloudState.user3[13].day14,
                day15: cloudState.user3[14].day15,
                day16: cloudState.user3[15].day16,
                day17: cloudState.user3[16].day17,
                day18: cloudState.user3[17].day18,
                day19: cloudState.user3[18].day19,
                day20: cloudState.user3[19].day20,
                day21: cloudState.user3[20].day21,
                day22: cloudState.user3[21].day22,
                day23: cloudState.user3[22].day23,
                day24: cloudState.user3[23].day24,
                day25: cloudState.user3[24].day25,
                day26: cloudState.user3[25].day26,
                day27: cloudState.user3[26].day27,
                day28: cloudState.user3[27].day28,
                day29: cloudState.user3[28].day29,
                day30: cloudState.user3[29].day30,
                day31: cloudState.user3[30].day31,              
            },
        
            user4: {
                day1: cloudState.user4[0].day1,
                day2: cloudState.user4[1].day2,
                day3: cloudState.user4[2].day3,
                day4: cloudState.user4[3].day4,
                day5: cloudState.user4[4].day5,
                day6: cloudState.user4[5].day6,
                day7: cloudState.user4[6].day7,
                day8: cloudState.user4[7].day8,
                day9: cloudState.user4[8].day9,
                day10: cloudState.user4[9].day10, 
                day11: cloudState.user4[10].day11,
                day12: cloudState.user4[11].day12,
                day13: cloudState.user4[12].day13,
                day14: cloudState.user4[13].day14,
                day15: cloudState.user4[14].day15,
                day16: cloudState.user4[15].day16,
                day17: cloudState.user4[16].day17,
                day18: cloudState.user4[17].day18,
                day19: cloudState.user4[18].day19,
                day20: cloudState.user4[19].day20,
                day21: cloudState.user4[20].day21,
                day22: cloudState.user4[21].day22,
                day23: cloudState.user4[22].day23,
                day24: cloudState.user4[23].day24,
                day25: cloudState.user4[24].day25,
                day26: cloudState.user4[25].day26,
                day27: cloudState.user4[26].day27,
                day28: cloudState.user4[27].day28,
                day29: cloudState.user4[28].day29,
                day30: cloudState.user4[29].day30,
                day31: cloudState.user4[30].day31,              
            },            
            
            user5: {
              day1: cloudState.user5[0].day1,
              day2: cloudState.user5[1].day2,
              day3: cloudState.user5[2].day3,
              day4: cloudState.user5[3].day4,
              day5: cloudState.user5[4].day5,
              day6: cloudState.user5[5].day6,
              day7: cloudState.user5[6].day7,
              day8: cloudState.user5[7].day8,
              day9: cloudState.user5[8].day9,
              day10: cloudState.user5[9].day10, 
              day11: cloudState.user5[10].day11,
              day12: cloudState.user5[11].day12,
              day13: cloudState.user5[12].day13,
              day14: cloudState.user5[13].day14,
              day15: cloudState.user5[14].day15,
              day16: cloudState.user5[15].day16,
              day17: cloudState.user5[16].day17,
              day18: cloudState.user5[17].day18,
              day19: cloudState.user5[18].day19,
              day20: cloudState.user5[19].day20,
              day21: cloudState.user5[20].day21,
              day22: cloudState.user5[21].day22,
              day23: cloudState.user5[22].day23,
              day24: cloudState.user5[23].day24,
              day25: cloudState.user5[24].day25,
              day26: cloudState.user5[25].day26,
              day27: cloudState.user5[26].day27,
              day28: cloudState.user5[27].day28,
              day29: cloudState.user5[28].day29,
              day30: cloudState.user5[29].day30,
              day31: cloudState.user5[30].day31,              
          },
            
          user6: {
            day1: cloudState.user6[0].day1,
            day2: cloudState.user6[1].day2,
            day3: cloudState.user6[2].day3,
            day4: cloudState.user6[3].day4,
            day5: cloudState.user6[4].day5,
            day6: cloudState.user6[5].day6,
            day7: cloudState.user6[6].day7,
            day8: cloudState.user6[7].day8,
            day9: cloudState.user6[8].day9,
            day10: cloudState.user6[9].day10, 
            day11: cloudState.user6[10].day11,
            day12: cloudState.user6[11].day12,
            day13: cloudState.user6[12].day13,
            day14: cloudState.user6[13].day14,
            day15: cloudState.user6[14].day15,
            day16: cloudState.user6[15].day16,
            day17: cloudState.user6[16].day17,
            day18: cloudState.user6[17].day18,
            day19: cloudState.user6[18].day19,
            day20: cloudState.user6[19].day20,
            day21: cloudState.user6[20].day21,
            day22: cloudState.user6[21].day22,
            day23: cloudState.user6[22].day23,
            day24: cloudState.user6[23].day24,
            day25: cloudState.user6[24].day25,
            day26: cloudState.user6[25].day26,
            day27: cloudState.user6[26].day27,
            day28: cloudState.user6[27].day28,
            day29: cloudState.user6[28].day29,
            day30: cloudState.user6[29].day30,
            day31: cloudState.user6[30].day31,              
        },
                    
        user7: {
          day1: cloudState.user7[0].day1,
          day2: cloudState.user7[1].day2,
          day3: cloudState.user7[2].day3,
          day4: cloudState.user7[3].day4,
          day5: cloudState.user7[4].day5,
          day6: cloudState.user7[5].day6,
          day7: cloudState.user7[6].day7,
          day8: cloudState.user7[7].day8,
          day9: cloudState.user7[8].day9,
          day10: cloudState.user7[9].day10, 
          day11: cloudState.user7[10].day11,
          day12: cloudState.user7[11].day12,
          day13: cloudState.user7[12].day13,
          day14: cloudState.user7[13].day14,
          day15: cloudState.user7[14].day15,
          day16: cloudState.user7[15].day16,
          day17: cloudState.user7[16].day17,
          day18: cloudState.user7[17].day18,
          day19: cloudState.user7[18].day19,
          day20: cloudState.user7[19].day20,
          day21: cloudState.user7[20].day21,
          day22: cloudState.user7[21].day22,
          day23: cloudState.user7[22].day23,
          day24: cloudState.user7[23].day24,
          day25: cloudState.user7[24].day25,
          day26: cloudState.user7[25].day26,
          day27: cloudState.user7[26].day27,
          day28: cloudState.user7[27].day28,
          day29: cloudState.user7[28].day29,
          day30: cloudState.user7[29].day30,
          day31: cloudState.user7[30].day31,              
      },
                  
      user8: {
        day1: cloudState.user8[0].day1,
        day2: cloudState.user8[1].day2,
        day3: cloudState.user8[2].day3,
        day4: cloudState.user8[3].day4,
        day5: cloudState.user8[4].day5,
        day6: cloudState.user8[5].day6,
        day7: cloudState.user8[6].day7,
        day8: cloudState.user8[7].day8,
        day9: cloudState.user8[8].day9,
        day10: cloudState.user8[9].day10, 
        day11: cloudState.user8[10].day11,
        day12: cloudState.user8[11].day12,
        day13: cloudState.user8[12].day13,
        day14: cloudState.user8[13].day14,
        day15: cloudState.user8[14].day15,
        day16: cloudState.user8[15].day16,
        day17: cloudState.user8[16].day17,
        day18: cloudState.user8[17].day18,
        day19: cloudState.user8[18].day19,
        day20: cloudState.user8[19].day20,
        day21: cloudState.user8[20].day21,
        day22: cloudState.user8[21].day22,
        day23: cloudState.user8[22].day23,
        day24: cloudState.user8[23].day24,
        day25: cloudState.user8[24].day25,
        day26: cloudState.user8[25].day26,
        day27: cloudState.user8[26].day27,
        day28: cloudState.user8[27].day28,
        day29: cloudState.user8[28].day29,
        day30: cloudState.user8[29].day30,
        day31: cloudState.user8[30].day31,              
    },
                
    user9: {
      day1: cloudState.user9[0].day1,
      day2: cloudState.user9[1].day2,
      day3: cloudState.user9[2].day3,
      day4: cloudState.user9[3].day4,
      day5: cloudState.user9[4].day5,
      day6: cloudState.user9[5].day6,
      day7: cloudState.user9[6].day7,
      day8: cloudState.user9[7].day8,
      day9: cloudState.user9[8].day9,
      day10: cloudState.user9[9].day10, 
      day11: cloudState.user9[10].day11,
      day12: cloudState.user9[11].day12,
      day13: cloudState.user9[12].day13,
      day14: cloudState.user9[13].day14,
      day15: cloudState.user9[14].day15,
      day16: cloudState.user9[15].day16,
      day17: cloudState.user9[16].day17,
      day18: cloudState.user9[17].day18,
      day19: cloudState.user9[18].day19,
      day20: cloudState.user9[19].day20,
      day21: cloudState.user9[20].day21,
      day22: cloudState.user9[21].day22,
      day23: cloudState.user9[22].day23,
      day24: cloudState.user9[23].day24,
      day25: cloudState.user9[24].day25,
      day26: cloudState.user9[25].day26,
      day27: cloudState.user9[26].day27,
      day28: cloudState.user9[27].day28,
      day29: cloudState.user9[28].day29,
      day30: cloudState.user9[29].day30,
      day31: cloudState.user9[30].day31,              
  },
              
  user10: {
    day1: cloudState.user10[0].day1,
    day2: cloudState.user10[1].day2,
    day3: cloudState.user10[2].day3,
    day4: cloudState.user10[3].day4,
    day5: cloudState.user10[4].day5,
    day6: cloudState.user10[5].day6,
    day7: cloudState.user10[6].day7,
    day8: cloudState.user10[7].day8,
    day9: cloudState.user10[8].day9,
    day10: cloudState.user10[9].day10, 
    day11: cloudState.user10[10].day11,
    day12: cloudState.user10[11].day12,
    day13: cloudState.user10[12].day13,
    day14: cloudState.user10[13].day14,
    day15: cloudState.user10[14].day15,
    day16: cloudState.user10[15].day16,
    day17: cloudState.user10[16].day17,
    day18: cloudState.user10[17].day18,
    day19: cloudState.user10[18].day19,
    day20: cloudState.user10[19].day20,
    day21: cloudState.user10[20].day21,
    day22: cloudState.user10[21].day22,
    day23: cloudState.user10[22].day23,
    day24: cloudState.user10[23].day24,
    day25: cloudState.user10[24].day25,
    day26: cloudState.user10[25].day26,
    day27: cloudState.user10[26].day27,
    day28: cloudState.user10[27].day28,
    day29: cloudState.user10[28].day29,
    day30: cloudState.user10[29].day30,
    day31: cloudState.user10[30].day31,              
}

        })  }       
                     
      } catch(error) {
        console.log('catch in loadDoc ran');
          setDoc(setDocRef, {
            user1:[ 
              {day1: users.user1.day1},
              {day2: users.user1.day2}, 
              {day3: users.user1.day3},
              {day4: users.user1.day4},
              {day5: users.user1.day5},
              {day6: users.user1.day6},
              {day7: users.user1.day7},
              {day8: users.user1.day8},
              {day9: users.user1.day9},
              {day10: users.user1.day10}, 
              {day11: users.user1.day11},
              {day12: users.user1.day12}, 
              {day13: users.user1.day13},
              {day14: users.user1.day14},
              {day15: users.user1.day15},
              {day16: users.user1.day16},
              {day17: users.user1.day17},
              {day18: users.user1.day18},
              {day19: users.user1.day19},
              {day20: users.user1.day20},
              {day21: users.user1.day21},
              {day22: users.user1.day22}, 
              {day23: users.user1.day23},
              {day24: users.user1.day24},
              {day25: users.user1.day25},
              {day26: users.user1.day26},
              {day27: users.user1.day27},
              {day28: users.user1.day28},
              {day29: users.user1.day29},
              {day30: users.user1.day30},
              {day31: users.user1.day31},    
            ],   
            user2:[ 
              {day1: users.user2.day1},
              {day2: users.user2.day2}, 
              {day3: users.user2.day3},
              {day4: users.user2.day4},
              {day5: users.user2.day5},
              {day6: users.user2.day6},
              {day7: users.user2.day7},
              {day8: users.user2.day8},
              {day9: users.user2.day9},
              {day10: users.user2.day10}, 
              {day11: users.user2.day11},
              {day12: users.user2.day12}, 
              {day13: users.user2.day13},
              {day14: users.user2.day14},
              {day15: users.user2.day15},
              {day16: users.user2.day16},
              {day17: users.user2.day17},
              {day18: users.user2.day18},
              {day19: users.user2.day19},
              {day20: users.user2.day20},
              {day21: users.user2.day21},
              {day22: users.user2.day22}, 
              {day23: users.user2.day23},
              {day24: users.user2.day24},
              {day25: users.user2.day25},
              {day26: users.user2.day26},
              {day27: users.user2.day27},
              {day28: users.user2.day28},
              {day29: users.user2.day29},
              {day30: users.user2.day30},
              {day31: users.user2.day31}, 
            ], 
            user3:[ 
              {day1: users.user3.day1},
              {day2: users.user3.day2}, 
              {day3: users.user3.day3}, 
              {day4: users.user3.day4},
              {day5: users.user3.day5},
              {day6: users.user3.day6},
              {day7: users.user3.day7},
              {day8: users.user3.day8},
              {day9: users.user3.day9},
              {day10: users.user3.day10}, 
              {day11: users.user3.day11},
              {day12: users.user3.day12}, 
              {day13: users.user3.day13},
              {day14: users.user3.day14},
              {day15: users.user3.day15},
              {day16: users.user3.day16},
              {day17: users.user3.day17},
              {day18: users.user3.day18},
              {day19: users.user3.day19},
              {day20: users.user3.day20},
              {day21: users.user3.day21},
              {day22: users.user3.day22}, 
              {day23: users.user3.day23},
              {day24: users.user3.day24},
              {day25: users.user3.day25},
              {day26: users.user3.day26},
              {day27: users.user3.day27},
              {day28: users.user3.day28},
              {day29: users.user3.day29},
              {day30: users.user3.day30},
              {day31: users.user3.day31},        
            ], 
              user4:[ 
                {day1: users.user4.day1},
                {day2: users.user4.day2}, 
                {day3: users.user4.day3}, 
                {day4: users.user4.day4},
                {day5: users.user4.day5},
                {day6: users.user4.day6},
                {day7: users.user4.day7},
                {day8: users.user4.day8},
                {day9: users.user4.day9},
                {day10: users.user4.day10}, 
                {day11: users.user4.day11},
                {day12: users.user4.day12}, 
                {day13: users.user4.day13},
                {day14: users.user4.day14},
                {day15: users.user4.day15},
                {day16: users.user4.day16},
                {day17: users.user4.day17},
                {day18: users.user4.day18},
                {day19: users.user4.day19},
                {day20: users.user4.day20},
                {day21: users.user4.day21},
                {day22: users.user4.day22}, 
                {day23: users.user4.day23},
                {day24: users.user4.day24},
                {day25: users.user4.day25},
                {day26: users.user4.day26},
                {day27: users.user4.day27},
                {day28: users.user4.day28},
                {day29: users.user4.day29},
                {day30: users.user4.day30},
                {day31: users.user4.day31},        
              ], 
              user5:[ 
                {day1: users.user5.day1},
                {day2: users.user5.day2}, 
                {day3: users.user5.day3}, 
                {day4: users.user5.day4},
                {day5: users.user5.day5},
                {day6: users.user5.day6},
                {day7: users.user5.day7},
                {day8: users.user5.day8},
                {day9: users.user5.day9},
                {day10: users.user5.day10}, 
                {day11: users.user5.day11},
                {day12: users.user5.day12}, 
                {day13: users.user5.day13},
                {day14: users.user5.day14},
                {day15: users.user5.day15},
                {day16: users.user5.day16},
                {day17: users.user5.day17},
                {day18: users.user5.day18},
                {day19: users.user5.day19},
                {day20: users.user5.day20},
                {day21: users.user5.day21},
                {day22: users.user5.day22}, 
                {day23: users.user5.day23},
                {day24: users.user5.day24},
                {day25: users.user5.day25},
                {day26: users.user5.day26},
                {day27: users.user5.day27},
                {day28: users.user5.day28},
                {day29: users.user5.day29},
                {day30: users.user5.day30},
                {day31: users.user5.day31},        
              ],
              user6:[ 
                {day1: users.user6.day1},
                {day2: users.user6.day2}, 
                {day3: users.user6.day3}, 
                {day4: users.user6.day4},
                {day5: users.user6.day5},
                {day6: users.user6.day6},
                {day7: users.user6.day7},
                {day8: users.user6.day8},
                {day9: users.user6.day9},
                {day10: users.user6.day10}, 
                {day11: users.user6.day11},
                {day12: users.user6.day12}, 
                {day13: users.user6.day13},
                {day14: users.user6.day14},
                {day15: users.user6.day15},
                {day16: users.user6.day16},
                {day17: users.user6.day17},
                {day18: users.user6.day18},
                {day19: users.user6.day19},
                {day20: users.user6.day20},
                {day21: users.user6.day21},
                {day22: users.user6.day22}, 
                {day23: users.user6.day23},
                {day24: users.user6.day24},
                {day25: users.user6.day25},
                {day26: users.user6.day26},
                {day27: users.user6.day27},
                {day28: users.user6.day28},
                {day29: users.user6.day29},
                {day30: users.user6.day30},
                {day31: users.user6.day31},        
              ],  
              user7:[ 
                {day1: users.user7.day1},
                {day2: users.user7.day2}, 
                {day3: users.user7.day3}, 
                {day4: users.user7.day4},
                {day5: users.user7.day5},
                {day6: users.user7.day6},
                {day7: users.user7.day7},
                {day8: users.user7.day8},
                {day9: users.user7.day9},
                {day10: users.user7.day10}, 
                {day11: users.user7.day11},
                {day12: users.user7.day12}, 
                {day13: users.user7.day13},
                {day14: users.user7.day14},
                {day15: users.user7.day15},
                {day16: users.user7.day16},
                {day17: users.user7.day17},
                {day18: users.user7.day18},
                {day19: users.user7.day19},
                {day20: users.user7.day20},
                {day21: users.user7.day21},
                {day22: users.user7.day22}, 
                {day23: users.user7.day23},
                {day24: users.user7.day24},
                {day25: users.user7.day25},
                {day26: users.user7.day26},
                {day27: users.user7.day27},
                {day28: users.user7.day28},
                {day29: users.user7.day29},
                {day30: users.user7.day30},
                {day31: users.user7.day31},        
              ],  
              user8:[ 
                {day1: users.user8.day1},
                {day2: users.user8.day2}, 
                {day3: users.user8.day3}, 
                {day4: users.user8.day4},
                {day5: users.user8.day5},
                {day6: users.user8.day6},
                {day7: users.user8.day7},
                {day8: users.user8.day8},
                {day9: users.user8.day9},
                {day10: users.user8.day10}, 
                {day11: users.user8.day11},
                {day12: users.user8.day12}, 
                {day13: users.user8.day13},
                {day14: users.user8.day14},
                {day15: users.user8.day15},
                {day16: users.user8.day16},
                {day17: users.user8.day17},
                {day18: users.user8.day18},
                {day19: users.user8.day19},
                {day20: users.user8.day20},
                {day21: users.user8.day21},
                {day22: users.user8.day22}, 
                {day23: users.user8.day23},
                {day24: users.user8.day24},
                {day25: users.user8.day25},
                {day26: users.user8.day26},
                {day27: users.user8.day27},
                {day28: users.user8.day28},
                {day29: users.user8.day29},
                {day30: users.user8.day30},
                {day31: users.user8.day31},        
              ], 
              user9:[ 
                {day1: users.user9.day1},
                {day2: users.user9.day2}, 
                {day3: users.user9.day3}, 
                {day4: users.user9.day4},
                {day5: users.user9.day5},
                {day6: users.user9.day6},
                {day7: users.user9.day7},
                {day8: users.user9.day8},
                {day9: users.user9.day9},
                {day10: users.user9.day10}, 
                {day11: users.user9.day11},
                {day12: users.user9.day12}, 
                {day13: users.user9.day13},
                {day14: users.user9.day14},
                {day15: users.user9.day15},
                {day16: users.user9.day16},
                {day17: users.user9.day17},
                {day18: users.user9.day18},
                {day19: users.user9.day19},
                {day20: users.user9.day20},
                {day21: users.user9.day21},
                {day22: users.user9.day22}, 
                {day23: users.user9.day23},
                {day24: users.user9.day24},
                {day25: users.user9.day25},
                {day26: users.user9.day26},
                {day27: users.user9.day27},
                {day28: users.user9.day28},
                {day29: users.user9.day29},
                {day30: users.user9.day30},
                {day31: users.user9.day31},        
              ], 
              user10:[ 
                {day1: users.user10.day1},
                {day2: users.user10.day2}, 
                {day3: users.user10.day3}, 
                {day4: users.user10.day4},
                {day5: users.user10.day5},
                {day6: users.user10.day6},
                {day7: users.user10.day7},
                {day8: users.user10.day8},
                {day9: users.user10.day9},
                {day10: users.user10.day10}, 
                {day11: users.user10.day11},
                {day12: users.user10.day12}, 
                {day13: users.user10.day13},
                {day14: users.user10.day14},
                {day15: users.user10.day15},
                {day16: users.user10.day16},
                {day17: users.user10.day17},
                {day18: users.user10.day18},
                {day19: users.user10.day19},
                {day20: users.user10.day20},
                {day21: users.user10.day21},
                {day22: users.user10.day22}, 
                {day23: users.user10.day23},
                {day24: users.user10.day24},
                {day25: users.user10.day25},
                {day26: users.user10.day26},
                {day27: users.user10.day27},
                {day28: users.user10.day28},
                {day29: users.user10.day29},
                {day30: users.user10.day30},
                {day31: users.user10.day31},        
              ] 
          });

        console.log(error)
      }
    };
    loadDoc();
}, [activeYear, activeMonth, loadTrig]);


//////   UPDATING AVAIL DAYS INFO IN FIRESTORE ON CLICK   //////
useEffect(() => {
  const updateFire = async () => {
  let x = activeDay.toString();
  if (users.user1[`day${x}`] === true) {
    try {
      console.log('update doc updating firestore based on user states on click try ran');
    updateDoc(docRef, {
      user1:[ 
        {day1: users.user1.day1},
        {day2: users.user1.day2}, 
        {day3: users.user1.day3},
        {day4: users.user1.day4},
        {day5: users.user1.day5},
        {day6: users.user1.day6},
        {day7: users.user1.day7},
        {day8: users.user1.day8},
        {day9: users.user1.day9},
        {day10: users.user1.day10},
        {day11: users.user1.day11},
        {day12: users.user1.day12}, 
        {day13: users.user1.day13},
        {day14: users.user1.day14},
        {day15: users.user1.day15},
        {day16: users.user1.day16},
        {day17: users.user1.day17},
        {day18: users.user1.day18},
        {day19: users.user1.day19},
        {day20: users.user1.day20},
        {day21: users.user1.day21},
        {day22: users.user1.day22}, 
        {day23: users.user1.day23},
        {day24: users.user1.day24},
        {day25: users.user1.day25},
        {day26: users.user1.day26},
        {day27: users.user1.day27},
        {day28: users.user1.day28},
        {day29: users.user1.day29},
        {day30: users.user1.day30},
        {day31: users.user1.day31}, 
      ],
    });
console.log('update doc u1 true run');

    } catch {
      console.log('updateDoc firestore on click catch ran');
      setDoc(setDocRef, {
        user1:[ 
          {day1: users.user1.day1},
          {day2: users.user1.day2}, 
          {day3: users.user1.day3},
          {day4: users.user1.day4},
          {day5: users.user1.day5},
          {day6: users.user1.day6},
          {day7: users.user1.day7},
          {day8: users.user1.day8},
          {day9: users.user1.day9},
          {day10: users.user1.day10},
          {day11: users.user1.day11},
          {day12: users.user1.day12}, 
          {day13: users.user1.day13},
          {day14: users.user1.day14},
          {day15: users.user1.day15},
          {day16: users.user1.day16},
          {day17: users.user1.day17},
          {day18: users.user1.day18},
          {day19: users.user1.day19},
          {day20: users.user1.day20},
          {day21: users.user1.day21},
          {day22: users.user1.day22}, 
          {day23: users.user1.day23},
          {day24: users.user1.day24},
          {day25: users.user1.day25},
          {day26: users.user1.day26},
          {day27: users.user1.day27},
          {day28: users.user1.day28},
          {day29: users.user1.day29},
          {day30: users.user1.day30},
          {day31: users.user1.day31}, 
        ],  
      });    
      console.log('no user1 update firestore on click true');
      console.log('setDoc run for u1 true')

    }};
  
  if (users.user1[`day${x}`] === false) {
    try {
      console.log('update doc on click for u1 when false ran, the try ran')
    updateDoc(docRef, {
      user1:[ 
        {day1: users.user1.day1},
        {day2: users.user1.day2}, 
        {day3: users.user1.day3},
        {day4: users.user1.day4},
        {day5: users.user1.day5},
        {day6: users.user1.day6},
        {day7: users.user1.day7},
        {day8: users.user1.day8},
        {day9: users.user1.day9},
        {day10: users.user1.day10}, 
        {day11: users.user1.day11},
        {day12: users.user1.day12}, 
        {day13: users.user1.day13},
        {day14: users.user1.day14},
        {day15: users.user1.day15},
        {day16: users.user1.day16},
        {day17: users.user1.day17},
        {day18: users.user1.day18},
        {day19: users.user1.day19},
        {day20: users.user1.day20},
        {day21: users.user1.day21},
        {day22: users.user1.day22}, 
        {day23: users.user1.day23},
        {day24: users.user1.day24},
        {day25: users.user1.day25},
        {day26: users.user1.day26},
        {day27: users.user1.day27},
        {day28: users.user1.day28},
        {day29: users.user1.day29},
        {day30: users.user1.day30},
        {day31: users.user1.day31},    
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user1:[ 
          {day1: users.user1.day1},
          {day2: users.user1.day2}, 
          {day3: users.user1.day3},
          {day4: users.user1.day4},
          {day5: users.user1.day5},
          {day6: users.user1.day6},
          {day7: users.user1.day7},
          {day8: users.user1.day8},
          {day9: users.user1.day9},
          {day10: users.user1.day10}, 
          {day11: users.user1.day11},
          {day12: users.user1.day12}, 
          {day13: users.user1.day13},
          {day14: users.user1.day14},
          {day15: users.user1.day15},
          {day16: users.user1.day16},
          {day17: users.user1.day17},
          {day18: users.user1.day18},
          {day19: users.user1.day19},
          {day20: users.user1.day20},
          {day21: users.user1.day21},
          {day22: users.user1.day22}, 
          {day23: users.user1.day23},
          {day24: users.user1.day24},
          {day25: users.user1.day25},
          {day26: users.user1.day26},
          {day27: users.user1.day27},
          {day28: users.user1.day28},
          {day29: users.user1.day29},
          {day30: users.user1.day30},
          {day31: users.user1.day31},    
        ],   
      });
      console.log('no user1 update firestore on click false')

    }
  };

  if (users.user2[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user2:[ 
        {day1: users.user2.day1},
        {day2: users.user2.day2}, 
        {day3: users.user2.day3},
        {day4: users.user2.day4},
        {day5: users.user2.day5},
        {day6: users.user2.day6},
        {day7: users.user2.day7},
        {day8: users.user2.day8},
        {day9: users.user2.day9},
        {day10: users.user2.day10}, 
        {day11: users.user2.day11},
        {day12: users.user2.day12}, 
        {day13: users.user2.day13},
        {day14: users.user2.day14},
        {day15: users.user2.day15},
        {day16: users.user2.day16},
        {day17: users.user2.day17},
        {day18: users.user2.day18},
        {day19: users.user2.day19},
        {day20: users.user2.day20},
        {day21: users.user2.day21},
        {day22: users.user2.day22}, 
        {day23: users.user2.day23},
        {day24: users.user2.day24},
        {day25: users.user2.day25},
        {day26: users.user2.day26},
        {day27: users.user2.day27},
        {day28: users.user2.day28},
        {day29: users.user2.day29},
        {day30: users.user2.day30},
        {day31: users.user2.day31}, 
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user2:[ 
          {day1: users.user2.day1},
          {day2: users.user2.day2}, 
          {day3: users.user2.day3},
          {day4: users.user2.day4},
          {day5: users.user2.day5},
          {day6: users.user2.day6},
          {day7: users.user2.day7},
          {day8: users.user2.day8},
          {day9: users.user2.day9},
          {day10: users.user2.day10}, 
          {day11: users.user2.day11},
          {day12: users.user2.day12}, 
          {day13: users.user2.day13},
          {day14: users.user2.day14},
          {day15: users.user2.day15},
          {day16: users.user2.day16},
          {day17: users.user2.day17},
          {day18: users.user2.day18},
          {day19: users.user2.day19},
          {day20: users.user2.day20},
          {day21: users.user2.day21},
          {day22: users.user2.day22}, 
          {day23: users.user2.day23},
          {day24: users.user2.day24},
          {day25: users.user2.day25},
          {day26: users.user2.day26},
          {day27: users.user2.day27},
          {day28: users.user2.day28},
          {day29: users.user2.day29},
          {day30: users.user2.day30},
          {day31: users.user2.day31}, 
        ],   
      });
      console.log('no user2 update firestore on click true')

    }
  };
  if (users.user2[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user2:[ 
        {day1: users.user2.day1},
        {day2: users.user2.day2}, 
        {day3: users.user2.day3},
        {day4: users.user2.day4},
        {day5: users.user2.day5},
        {day6: users.user2.day6},
        {day7: users.user2.day7},
        {day8: users.user2.day8},
        {day9: users.user2.day9},
        {day10: users.user2.day10}, 
        {day11: users.user2.day11},
        {day12: users.user2.day12}, 
        {day13: users.user2.day13},
        {day14: users.user2.day14},
        {day15: users.user2.day15},
        {day16: users.user2.day16},
        {day17: users.user2.day17},
        {day18: users.user2.day18},
        {day19: users.user2.day19},
        {day20: users.user2.day20},
        {day21: users.user2.day21},
        {day22: users.user2.day22}, 
        {day23: users.user2.day23},
        {day24: users.user2.day24},
        {day25: users.user2.day25},
        {day26: users.user2.day26},
        {day27: users.user2.day27},
        {day28: users.user2.day28},
        {day29: users.user2.day29},
        {day30: users.user2.day30},
        {day31: users.user2.day31},  
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user2:[ 
          {day1: users.user2.day1},
          {day2: users.user2.day2}, 
          {day3: users.user2.day3},
          {day4: users.user2.day4},
          {day5: users.user2.day5},
          {day6: users.user2.day6},
          {day7: users.user2.day7},
          {day8: users.user2.day8},
          {day9: users.user2.day9},
          {day10: users.user2.day10}, 
          {day11: users.user2.day11},
          {day12: users.user2.day12}, 
          {day13: users.user2.day13},
          {day14: users.user2.day14},
          {day15: users.user2.day15},
          {day16: users.user2.day16},
          {day17: users.user2.day17},
          {day18: users.user2.day18},
          {day19: users.user2.day19},
          {day20: users.user2.day20},
          {day21: users.user2.day21},
          {day22: users.user2.day22}, 
          {day23: users.user2.day23},
          {day24: users.user2.day24},
          {day25: users.user2.day25},
          {day26: users.user2.day26},
          {day27: users.user2.day27},
          {day28: users.user2.day28},
          {day29: users.user2.day29},
          {day30: users.user2.day30},
          {day31: users.user2.day31},  
        ],   
      })
      console.log('no user2 update firestore on click false')

    }
  };

  if (users.user3[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user3:[ 
        {day1: users.user3.day1},
        {day2: users.user3.day2}, 
        {day3: users.user3.day3}, 
        {day4: users.user3.day4},
        {day5: users.user3.day5},
        {day6: users.user3.day6},
        {day7: users.user3.day7},
        {day8: users.user3.day8},
        {day9: users.user3.day9},
        {day10: users.user3.day10}, 
        {day11: users.user3.day11},
        {day12: users.user3.day12}, 
        {day13: users.user3.day13},
        {day14: users.user3.day14},
        {day15: users.user3.day15},
        {day16: users.user3.day16},
        {day17: users.user3.day17},
        {day18: users.user3.day18},
        {day19: users.user3.day19},
        {day20: users.user3.day20},
        {day21: users.user3.day21},
        {day22: users.user3.day22}, 
        {day23: users.user3.day23},
        {day24: users.user3.day24},
        {day25: users.user3.day25},
        {day26: users.user3.day26},
        {day27: users.user3.day27},
        {day28: users.user3.day28},
        {day29: users.user3.day29},
        {day30: users.user3.day30},
        {day31: users.user3.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user3:[ 
          {day1: users.user3.day1},
          {day2: users.user3.day2}, 
          {day3: users.user3.day3}, 
          {day4: users.user3.day4},
          {day5: users.user3.day5},
          {day6: users.user3.day6},
          {day7: users.user3.day7},
          {day8: users.user3.day8},
          {day9: users.user3.day9},
          {day10: users.user3.day10}, 
          {day11: users.user3.day11},
          {day12: users.user3.day12}, 
          {day13: users.user3.day13},
          {day14: users.user3.day14},
          {day15: users.user3.day15},
          {day16: users.user3.day16},
          {day17: users.user3.day17},
          {day18: users.user3.day18},
          {day19: users.user3.day19},
          {day20: users.user3.day20},
          {day21: users.user3.day21},
          {day22: users.user3.day22}, 
          {day23: users.user3.day23},
          {day24: users.user3.day24},
          {day25: users.user3.day25},
          {day26: users.user3.day26},
          {day27: users.user3.day27},
          {day28: users.user3.day28},
          {day29: users.user3.day29},
          {day30: users.user3.day30},
          {day31: users.user3.day31},        
        ],   
      })
      console.log('no user3 update firestore on click true')

    }
  };
  if (users.user3[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user3:[ 
        {day1: users.user3.day1},
        {day2: users.user3.day2}, 
        {day3: users.user3.day3},
        {day4: users.user3.day4},
        {day5: users.user3.day5},
        {day6: users.user3.day6},
        {day7: users.user3.day7},
        {day8: users.user3.day8},
        {day9: users.user3.day9},
        {day10: users.user3.day10}, 
        {day11: users.user3.day11},
        {day12: users.user3.day12}, 
        {day13: users.user3.day13},
        {day14: users.user3.day14},
        {day15: users.user3.day15},
        {day16: users.user3.day16},
        {day17: users.user3.day17},
        {day18: users.user3.day18},
        {day19: users.user3.day19},
        {day20: users.user3.day20},
        {day21: users.user3.day21},
        {day22: users.user3.day22}, 
        {day23: users.user3.day23},
        {day24: users.user3.day24},
        {day25: users.user3.day25},
        {day26: users.user3.day26},
        {day27: users.user3.day27},
        {day28: users.user3.day28},
        {day29: users.user3.day29},
        {day30: users.user3.day30},
        {day31: users.user3.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user3:[ 
          {day1: users.user3.day1},
          {day2: users.user3.day2}, 
          {day3: users.user3.day3},
          {day4: users.user3.day4},
          {day5: users.user3.day5},
          {day6: users.user3.day6},
          {day7: users.user3.day7},
          {day8: users.user3.day8},
          {day9: users.user3.day9},
          {day10: users.user3.day10}, 
          {day11: users.user3.day11},
          {day12: users.user3.day12}, 
          {day13: users.user3.day13},
          {day14: users.user3.day14},
          {day15: users.user3.day15},
          {day16: users.user3.day16},
          {day17: users.user3.day17},
          {day18: users.user3.day18},
          {day19: users.user3.day19},
          {day20: users.user3.day20},
          {day21: users.user3.day21},
          {day22: users.user3.day22}, 
          {day23: users.user3.day23},
          {day24: users.user3.day24},
          {day25: users.user3.day25},
          {day26: users.user3.day26},
          {day27: users.user3.day27},
          {day28: users.user3.day28},
          {day29: users.user3.day29},
          {day30: users.user3.day30},
          {day31: users.user3.day31},         
        ],   
      });
      console.log('no user3 update firestore on click false')

    }
  };

  if (users.user4[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user4:[ 
        {day1: users.user4.day1},
        {day2: users.user4.day2}, 
        {day3: users.user4.day3}, 
        {day4: users.user4.day4},
        {day5: users.user4.day5},
        {day6: users.user4.day6},
        {day7: users.user4.day7},
        {day8: users.user4.day8},
        {day9: users.user4.day9},
        {day10: users.user4.day10}, 
        {day11: users.user4.day11},
        {day12: users.user4.day12}, 
        {day13: users.user4.day13},
        {day14: users.user4.day14},
        {day15: users.user4.day15},
        {day16: users.user4.day16},
        {day17: users.user4.day17},
        {day18: users.user4.day18},
        {day19: users.user4.day19},
        {day20: users.user4.day20},
        {day21: users.user4.day21},
        {day22: users.user4.day22}, 
        {day23: users.user4.day23},
        {day24: users.user4.day24},
        {day25: users.user4.day25},
        {day26: users.user4.day26},
        {day27: users.user4.day27},
        {day28: users.user4.day28},
        {day29: users.user4.day29},
        {day30: users.user4.day30},
        {day31: users.user4.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user4:[ 
          {day1: users.user4.day1},
          {day2: users.user4.day2}, 
          {day3: users.user4.day3}, 
          {day4: users.user4.day4},
          {day5: users.user4.day5},
          {day6: users.user4.day6},
          {day7: users.user4.day7},
          {day8: users.user4.day8},
          {day9: users.user4.day9},
          {day10: users.user4.day10}, 
          {day11: users.user4.day11},
          {day12: users.user4.day12}, 
          {day13: users.user4.day13},
          {day14: users.user4.day14},
          {day15: users.user4.day15},
          {day16: users.user4.day16},
          {day17: users.user4.day17},
          {day18: users.user4.day18},
          {day19: users.user4.day19},
          {day20: users.user4.day20},
          {day21: users.user4.day21},
          {day22: users.user4.day22}, 
          {day23: users.user4.day23},
          {day24: users.user4.day24},
          {day25: users.user4.day25},
          {day26: users.user4.day26},
          {day27: users.user4.day27},
          {day28: users.user4.day28},
          {day29: users.user4.day29},
          {day30: users.user4.day30},
          {day31: users.user4.day31},        
        ],   
      })
      console.log('no user4 update firestore on click true')

    }
  };
  if (users.user4[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user4:[ 
        {day1: users.user4.day1},
        {day2: users.user4.day2}, 
        {day3: users.user4.day3},
        {day4: users.user4.day4},
        {day5: users.user4.day5},
        {day6: users.user4.day6},
        {day7: users.user4.day7},
        {day8: users.user4.day8},
        {day9: users.user4.day9},
        {day10: users.user4.day10}, 
        {day11: users.user4.day11},
        {day12: users.user4.day12}, 
        {day13: users.user4.day13},
        {day14: users.user4.day14},
        {day15: users.user4.day15},
        {day16: users.user4.day16},
        {day17: users.user4.day17},
        {day18: users.user4.day18},
        {day19: users.user4.day19},
        {day20: users.user4.day20},
        {day21: users.user4.day21},
        {day22: users.user4.day22}, 
        {day23: users.user4.day23},
        {day24: users.user4.day24},
        {day25: users.user4.day25},
        {day26: users.user4.day26},
        {day27: users.user4.day27},
        {day28: users.user4.day28},
        {day29: users.user4.day29},
        {day30: users.user4.day30},
        {day31: users.user4.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user4:[ 
          {day1: users.user4.day1},
          {day2: users.user4.day2}, 
          {day3: users.user4.day3},
          {day4: users.user4.day4},
          {day5: users.user4.day5},
          {day6: users.user4.day6},
          {day7: users.user4.day7},
          {day8: users.user4.day8},
          {day9: users.user4.day9},
          {day10: users.user4.day10}, 
          {day11: users.user4.day11},
          {day12: users.user4.day12}, 
          {day13: users.user4.day13},
          {day14: users.user4.day14},
          {day15: users.user4.day15},
          {day16: users.user4.day16},
          {day17: users.user4.day17},
          {day18: users.user4.day18},
          {day19: users.user4.day19},
          {day20: users.user4.day20},
          {day21: users.user4.day21},
          {day22: users.user4.day22}, 
          {day23: users.user4.day23},
          {day24: users.user4.day24},
          {day25: users.user4.day25},
          {day26: users.user4.day26},
          {day27: users.user4.day27},
          {day28: users.user4.day28},
          {day29: users.user4.day29},
          {day30: users.user4.day30},
          {day31: users.user4.day31},         
        ],   
      });
      console.log('no user4 update firestore on click false')

    }
  };

  if (users.user5[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user5:[ 
        {day1: users.user5.day1},
        {day2: users.user5.day2}, 
        {day3: users.user5.day3}, 
        {day4: users.user5.day4},
        {day5: users.user5.day5},
        {day6: users.user5.day6},
        {day7: users.user5.day7},
        {day8: users.user5.day8},
        {day9: users.user5.day9},
        {day10: users.user5.day10}, 
        {day11: users.user5.day11},
        {day12: users.user5.day12}, 
        {day13: users.user5.day13},
        {day14: users.user5.day14},
        {day15: users.user5.day15},
        {day16: users.user5.day16},
        {day17: users.user5.day17},
        {day18: users.user5.day18},
        {day19: users.user5.day19},
        {day20: users.user5.day20},
        {day21: users.user5.day21},
        {day22: users.user5.day22}, 
        {day23: users.user5.day23},
        {day24: users.user5.day24},
        {day25: users.user5.day25},
        {day26: users.user5.day26},
        {day27: users.user5.day27},
        {day28: users.user5.day28},
        {day29: users.user5.day29},
        {day30: users.user5.day30},
        {day31: users.user5.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user5:[ 
          {day1: users.user5.day1},
          {day2: users.user5.day2}, 
          {day3: users.user5.day3}, 
          {day4: users.user5.day4},
          {day5: users.user5.day5},
          {day6: users.user5.day6},
          {day7: users.user5.day7},
          {day8: users.user5.day8},
          {day9: users.user5.day9},
          {day10: users.user5.day10}, 
          {day11: users.user5.day11},
          {day12: users.user5.day12}, 
          {day13: users.user5.day13},
          {day14: users.user5.day14},
          {day15: users.user5.day15},
          {day16: users.user5.day16},
          {day17: users.user5.day17},
          {day18: users.user5.day18},
          {day19: users.user5.day19},
          {day20: users.user5.day20},
          {day21: users.user5.day21},
          {day22: users.user5.day22}, 
          {day23: users.user5.day23},
          {day24: users.user5.day24},
          {day25: users.user5.day25},
          {day26: users.user5.day26},
          {day27: users.user5.day27},
          {day28: users.user5.day28},
          {day29: users.user5.day29},
          {day30: users.user5.day30},
          {day31: users.user5.day31},        
        ],   
      });
      console.log('no user5 update firestore on click true')

    }
  };
  if (users.user5[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user5:[ 
        {day1: users.user5.day1},
        {day2: users.user5.day2}, 
        {day3: users.user5.day3},
        {day4: users.user5.day4},
        {day5: users.user5.day5},
        {day6: users.user5.day6},
        {day7: users.user5.day7},
        {day8: users.user5.day8},
        {day9: users.user5.day9},
        {day10: users.user5.day10}, 
        {day11: users.user5.day11},
        {day12: users.user5.day12}, 
        {day13: users.user5.day13},
        {day14: users.user5.day14},
        {day15: users.user5.day15},
        {day16: users.user5.day16},
        {day17: users.user5.day17},
        {day18: users.user5.day18},
        {day19: users.user5.day19},
        {day20: users.user5.day20},
        {day21: users.user5.day21},
        {day22: users.user5.day22}, 
        {day23: users.user5.day23},
        {day24: users.user5.day24},
        {day25: users.user5.day25},
        {day26: users.user5.day26},
        {day27: users.user5.day27},
        {day28: users.user5.day28},
        {day29: users.user5.day29},
        {day30: users.user5.day30},
        {day31: users.user5.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user5:[ 
          {day1: users.user5.day1},
          {day2: users.user5.day2}, 
          {day3: users.user5.day3},
          {day4: users.user5.day4},
          {day5: users.user5.day5},
          {day6: users.user5.day6},
          {day7: users.user5.day7},
          {day8: users.user5.day8},
          {day9: users.user5.day9},
          {day10: users.user5.day10}, 
          {day11: users.user5.day11},
          {day12: users.user5.day12}, 
          {day13: users.user5.day13},
          {day14: users.user5.day14},
          {day15: users.user5.day15},
          {day16: users.user5.day16},
          {day17: users.user5.day17},
          {day18: users.user5.day18},
          {day19: users.user5.day19},
          {day20: users.user5.day20},
          {day21: users.user5.day21},
          {day22: users.user5.day22}, 
          {day23: users.user5.day23},
          {day24: users.user5.day24},
          {day25: users.user5.day25},
          {day26: users.user5.day26},
          {day27: users.user5.day27},
          {day28: users.user5.day28},
          {day29: users.user5.day29},
          {day30: users.user5.day30},
          {day31: users.user5.day31},         
        ],   
      });
      console.log('no user5 update firestore on click false')

    }
  };

  if (users.user6[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user6:[ 
        {day1: users.user6.day1},
        {day2: users.user6.day2}, 
        {day3: users.user6.day3}, 
        {day4: users.user6.day4},
        {day5: users.user6.day5},
        {day6: users.user6.day6},
        {day7: users.user6.day7},
        {day8: users.user6.day8},
        {day9: users.user6.day9},
        {day10: users.user6.day10}, 
        {day11: users.user6.day11},
        {day12: users.user6.day12}, 
        {day13: users.user6.day13},
        {day14: users.user6.day14},
        {day15: users.user6.day15},
        {day16: users.user6.day16},
        {day17: users.user6.day17},
        {day18: users.user6.day18},
        {day19: users.user6.day19},
        {day20: users.user6.day20},
        {day21: users.user6.day21},
        {day22: users.user6.day22}, 
        {day23: users.user6.day23},
        {day24: users.user6.day24},
        {day25: users.user6.day25},
        {day26: users.user6.day26},
        {day27: users.user6.day27},
        {day28: users.user6.day28},
        {day29: users.user6.day29},
        {day30: users.user6.day30},
        {day31: users.user6.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user6:[ 
          {day1: users.user6.day1},
          {day2: users.user6.day2}, 
          {day3: users.user6.day3}, 
          {day4: users.user6.day4},
          {day5: users.user6.day5},
          {day6: users.user6.day6},
          {day7: users.user6.day7},
          {day8: users.user6.day8},
          {day9: users.user6.day9},
          {day10: users.user6.day10}, 
          {day11: users.user6.day11},
          {day12: users.user6.day12}, 
          {day13: users.user6.day13},
          {day14: users.user6.day14},
          {day15: users.user6.day15},
          {day16: users.user6.day16},
          {day17: users.user6.day17},
          {day18: users.user6.day18},
          {day19: users.user6.day19},
          {day20: users.user6.day20},
          {day21: users.user6.day21},
          {day22: users.user6.day22}, 
          {day23: users.user6.day23},
          {day24: users.user6.day24},
          {day25: users.user6.day25},
          {day26: users.user6.day26},
          {day27: users.user6.day27},
          {day28: users.user6.day28},
          {day29: users.user6.day29},
          {day30: users.user6.day30},
          {day31: users.user6.day31},        
        ],   
      });
      console.log('no user6 update firestore on click true')

    }
  };
  if (users.user6[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user6:[ 
        {day1: users.user6.day1},
        {day2: users.user6.day2}, 
        {day3: users.user6.day3},
        {day4: users.user6.day4},
        {day5: users.user6.day5},
        {day6: users.user6.day6},
        {day7: users.user6.day7},
        {day8: users.user6.day8},
        {day9: users.user6.day9},
        {day10: users.user6.day10}, 
        {day11: users.user6.day11},
        {day12: users.user6.day12}, 
        {day13: users.user6.day13},
        {day14: users.user6.day14},
        {day15: users.user6.day15},
        {day16: users.user6.day16},
        {day17: users.user6.day17},
        {day18: users.user6.day18},
        {day19: users.user6.day19},
        {day20: users.user6.day20},
        {day21: users.user6.day21},
        {day22: users.user6.day22}, 
        {day23: users.user6.day23},
        {day24: users.user6.day24},
        {day25: users.user6.day25},
        {day26: users.user6.day26},
        {day27: users.user6.day27},
        {day28: users.user6.day28},
        {day29: users.user6.day29},
        {day30: users.user6.day30},
        {day31: users.user6.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user6:[ 
          {day1: users.user6.day1},
          {day2: users.user6.day2}, 
          {day3: users.user6.day3},
          {day4: users.user6.day4},
          {day5: users.user6.day5},
          {day6: users.user6.day6},
          {day7: users.user6.day7},
          {day8: users.user6.day8},
          {day9: users.user6.day9},
          {day10: users.user6.day10}, 
          {day11: users.user6.day11},
          {day12: users.user6.day12}, 
          {day13: users.user6.day13},
          {day14: users.user6.day14},
          {day15: users.user6.day15},
          {day16: users.user6.day16},
          {day17: users.user6.day17},
          {day18: users.user6.day18},
          {day19: users.user6.day19},
          {day20: users.user6.day20},
          {day21: users.user6.day21},
          {day22: users.user6.day22}, 
          {day23: users.user6.day23},
          {day24: users.user6.day24},
          {day25: users.user6.day25},
          {day26: users.user6.day26},
          {day27: users.user6.day27},
          {day28: users.user6.day28},
          {day29: users.user6.day29},
          {day30: users.user6.day30},
          {day31: users.user6.day31},         
        ],   
      });
      console.log('no user6 update firestore on click false')

    }
  };

  if (users.user7[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user7:[ 
        {day1: users.user7.day1},
        {day2: users.user7.day2}, 
        {day3: users.user7.day3}, 
        {day4: users.user7.day4},
        {day5: users.user7.day5},
        {day6: users.user7.day6},
        {day7: users.user7.day7},
        {day8: users.user7.day8},
        {day9: users.user7.day9},
        {day10: users.user7.day10}, 
        {day11: users.user7.day11},
        {day12: users.user7.day12}, 
        {day13: users.user7.day13},
        {day14: users.user7.day14},
        {day15: users.user7.day15},
        {day16: users.user7.day16},
        {day17: users.user7.day17},
        {day18: users.user7.day18},
        {day19: users.user7.day19},
        {day20: users.user7.day20},
        {day21: users.user7.day21},
        {day22: users.user7.day22}, 
        {day23: users.user7.day23},
        {day24: users.user7.day24},
        {day25: users.user7.day25},
        {day26: users.user7.day26},
        {day27: users.user7.day27},
        {day28: users.user7.day28},
        {day29: users.user7.day29},
        {day30: users.user7.day30},
        {day31: users.user7.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user7:[ 
          {day1: users.user7.day1},
          {day2: users.user7.day2}, 
          {day3: users.user7.day3}, 
          {day4: users.user7.day4},
          {day5: users.user7.day5},
          {day6: users.user7.day6},
          {day7: users.user7.day7},
          {day8: users.user7.day8},
          {day9: users.user7.day9},
          {day10: users.user7.day10}, 
          {day11: users.user7.day11},
          {day12: users.user7.day12}, 
          {day13: users.user7.day13},
          {day14: users.user7.day14},
          {day15: users.user7.day15},
          {day16: users.user7.day16},
          {day17: users.user7.day17},
          {day18: users.user7.day18},
          {day19: users.user7.day19},
          {day20: users.user7.day20},
          {day21: users.user7.day21},
          {day22: users.user7.day22}, 
          {day23: users.user7.day23},
          {day24: users.user7.day24},
          {day25: users.user7.day25},
          {day26: users.user7.day26},
          {day27: users.user7.day27},
          {day28: users.user7.day28},
          {day29: users.user7.day29},
          {day30: users.user7.day30},
          {day31: users.user7.day31},        
        ],   
      });
      console.log('no user7 update firestore on click true')

    }
  };
  if (users.user7[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user7:[ 
        {day1: users.user7.day1},
        {day2: users.user7.day2}, 
        {day3: users.user7.day3},
        {day4: users.user7.day4},
        {day5: users.user7.day5},
        {day6: users.user7.day6},
        {day7: users.user7.day7},
        {day8: users.user7.day8},
        {day9: users.user7.day9},
        {day10: users.user7.day10}, 
        {day11: users.user7.day11},
        {day12: users.user7.day12}, 
        {day13: users.user7.day13},
        {day14: users.user7.day14},
        {day15: users.user7.day15},
        {day16: users.user7.day16},
        {day17: users.user7.day17},
        {day18: users.user7.day18},
        {day19: users.user7.day19},
        {day20: users.user7.day20},
        {day21: users.user7.day21},
        {day22: users.user7.day22}, 
        {day23: users.user7.day23},
        {day24: users.user7.day24},
        {day25: users.user7.day25},
        {day26: users.user7.day26},
        {day27: users.user7.day27},
        {day28: users.user7.day28},
        {day29: users.user7.day29},
        {day30: users.user7.day30},
        {day31: users.user7.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user7:[ 
          {day1: users.user7.day1},
          {day2: users.user7.day2}, 
          {day3: users.user7.day3},
          {day4: users.user7.day4},
          {day5: users.user7.day5},
          {day6: users.user7.day6},
          {day7: users.user7.day7},
          {day8: users.user7.day8},
          {day9: users.user7.day9},
          {day10: users.user7.day10}, 
          {day11: users.user7.day11},
          {day12: users.user7.day12}, 
          {day13: users.user7.day13},
          {day14: users.user7.day14},
          {day15: users.user7.day15},
          {day16: users.user7.day16},
          {day17: users.user7.day17},
          {day18: users.user7.day18},
          {day19: users.user7.day19},
          {day20: users.user7.day20},
          {day21: users.user7.day21},
          {day22: users.user7.day22}, 
          {day23: users.user7.day23},
          {day24: users.user7.day24},
          {day25: users.user7.day25},
          {day26: users.user7.day26},
          {day27: users.user7.day27},
          {day28: users.user7.day28},
          {day29: users.user7.day29},
          {day30: users.user7.day30},
          {day31: users.user7.day31},         
        ],   
      });
      console.log('no user7 update firestore on click false')

    }
  };

  if (users.user8[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user8:[ 
        {day1: users.user8.day1},
        {day2: users.user8.day2}, 
        {day3: users.user8.day3}, 
        {day4: users.user8.day4},
        {day5: users.user8.day5},
        {day6: users.user8.day6},
        {day7: users.user8.day7},
        {day8: users.user8.day8},
        {day9: users.user8.day9},
        {day10: users.user8.day10}, 
        {day11: users.user8.day11},
        {day12: users.user8.day12}, 
        {day13: users.user8.day13},
        {day14: users.user8.day14},
        {day15: users.user8.day15},
        {day16: users.user8.day16},
        {day17: users.user8.day17},
        {day18: users.user8.day18},
        {day19: users.user8.day19},
        {day20: users.user8.day20},
        {day21: users.user8.day21},
        {day22: users.user8.day22}, 
        {day23: users.user8.day23},
        {day24: users.user8.day24},
        {day25: users.user8.day25},
        {day26: users.user8.day26},
        {day27: users.user8.day27},
        {day28: users.user8.day28},
        {day29: users.user8.day29},
        {day30: users.user8.day30},
        {day31: users.user8.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user8:[ 
          {day1: users.user8.day1},
          {day2: users.user8.day2}, 
          {day3: users.user8.day3}, 
          {day4: users.user8.day4},
          {day5: users.user8.day5},
          {day6: users.user8.day6},
          {day7: users.user8.day7},
          {day8: users.user8.day8},
          {day9: users.user8.day9},
          {day10: users.user8.day10}, 
          {day11: users.user8.day11},
          {day12: users.user8.day12}, 
          {day13: users.user8.day13},
          {day14: users.user8.day14},
          {day15: users.user8.day15},
          {day16: users.user8.day16},
          {day17: users.user8.day17},
          {day18: users.user8.day18},
          {day19: users.user8.day19},
          {day20: users.user8.day20},
          {day21: users.user8.day21},
          {day22: users.user8.day22}, 
          {day23: users.user8.day23},
          {day24: users.user8.day24},
          {day25: users.user8.day25},
          {day26: users.user8.day26},
          {day27: users.user8.day27},
          {day28: users.user8.day28},
          {day29: users.user8.day29},
          {day30: users.user8.day30},
          {day31: users.user8.day31},        
        ],   
      });
      console.log('no user8 update firestore on click true')

    }
  };
  if (users.user8[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user8:[ 
        {day1: users.user8.day1},
        {day2: users.user8.day2}, 
        {day3: users.user8.day3},
        {day4: users.user8.day4},
        {day5: users.user8.day5},
        {day6: users.user8.day6},
        {day7: users.user8.day7},
        {day8: users.user8.day8},
        {day9: users.user8.day9},
        {day10: users.user8.day10}, 
        {day11: users.user8.day11},
        {day12: users.user8.day12}, 
        {day13: users.user8.day13},
        {day14: users.user8.day14},
        {day15: users.user8.day15},
        {day16: users.user8.day16},
        {day17: users.user8.day17},
        {day18: users.user8.day18},
        {day19: users.user8.day19},
        {day20: users.user8.day20},
        {day21: users.user8.day21},
        {day22: users.user8.day22}, 
        {day23: users.user8.day23},
        {day24: users.user8.day24},
        {day25: users.user8.day25},
        {day26: users.user8.day26},
        {day27: users.user8.day27},
        {day28: users.user8.day28},
        {day29: users.user8.day29},
        {day30: users.user8.day30},
        {day31: users.user8.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user8:[ 
          {day1: users.user8.day1},
          {day2: users.user8.day2}, 
          {day3: users.user8.day3},
          {day4: users.user8.day4},
          {day5: users.user8.day5},
          {day6: users.user8.day6},
          {day7: users.user8.day7},
          {day8: users.user8.day8},
          {day9: users.user8.day9},
          {day10: users.user8.day10}, 
          {day11: users.user8.day11},
          {day12: users.user8.day12}, 
          {day13: users.user8.day13},
          {day14: users.user8.day14},
          {day15: users.user8.day15},
          {day16: users.user8.day16},
          {day17: users.user8.day17},
          {day18: users.user8.day18},
          {day19: users.user8.day19},
          {day20: users.user8.day20},
          {day21: users.user8.day21},
          {day22: users.user8.day22}, 
          {day23: users.user8.day23},
          {day24: users.user8.day24},
          {day25: users.user8.day25},
          {day26: users.user8.day26},
          {day27: users.user8.day27},
          {day28: users.user8.day28},
          {day29: users.user8.day29},
          {day30: users.user8.day30},
          {day31: users.user8.day31},         
        ],   
      });
      console.log('no user8 update firestore on click false')

    }
  };

  if (users.user9[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user9:[ 
        {day1: users.user9.day1},
        {day2: users.user9.day2}, 
        {day3: users.user9.day3}, 
        {day4: users.user9.day4},
        {day5: users.user9.day5},
        {day6: users.user9.day6},
        {day7: users.user9.day7},
        {day8: users.user9.day8},
        {day9: users.user9.day9},
        {day10: users.user9.day10}, 
        {day11: users.user9.day11},
        {day12: users.user9.day12}, 
        {day13: users.user9.day13},
        {day14: users.user9.day14},
        {day15: users.user9.day15},
        {day16: users.user9.day16},
        {day17: users.user9.day17},
        {day18: users.user9.day18},
        {day19: users.user9.day19},
        {day20: users.user9.day20},
        {day21: users.user9.day21},
        {day22: users.user9.day22}, 
        {day23: users.user9.day23},
        {day24: users.user9.day24},
        {day25: users.user9.day25},
        {day26: users.user9.day26},
        {day27: users.user9.day27},
        {day28: users.user9.day28},
        {day29: users.user9.day29},
        {day30: users.user9.day30},
        {day31: users.user9.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user9:[ 
          {day1: users.user9.day1},
          {day2: users.user9.day2}, 
          {day3: users.user9.day3}, 
          {day4: users.user9.day4},
          {day5: users.user9.day5},
          {day6: users.user9.day6},
          {day7: users.user9.day7},
          {day8: users.user9.day8},
          {day9: users.user9.day9},
          {day10: users.user9.day10}, 
          {day11: users.user9.day11},
          {day12: users.user9.day12}, 
          {day13: users.user9.day13},
          {day14: users.user9.day14},
          {day15: users.user9.day15},
          {day16: users.user9.day16},
          {day17: users.user9.day17},
          {day18: users.user9.day18},
          {day19: users.user9.day19},
          {day20: users.user9.day20},
          {day21: users.user9.day21},
          {day22: users.user9.day22}, 
          {day23: users.user9.day23},
          {day24: users.user9.day24},
          {day25: users.user9.day25},
          {day26: users.user9.day26},
          {day27: users.user9.day27},
          {day28: users.user9.day28},
          {day29: users.user9.day29},
          {day30: users.user9.day30},
          {day31: users.user9.day31},        
        ],   
      });
      console.log('no user9 update firestore on click true')

    }
  };
  if (users.user9[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user9:[ 
        {day1: users.user9.day1},
        {day2: users.user9.day2}, 
        {day3: users.user9.day3},
        {day4: users.user9.day4},
        {day5: users.user9.day5},
        {day6: users.user9.day6},
        {day7: users.user9.day7},
        {day8: users.user9.day8},
        {day9: users.user9.day9},
        {day10: users.user9.day10}, 
        {day11: users.user9.day11},
        {day12: users.user9.day12}, 
        {day13: users.user9.day13},
        {day14: users.user9.day14},
        {day15: users.user9.day15},
        {day16: users.user9.day16},
        {day17: users.user9.day17},
        {day18: users.user9.day18},
        {day19: users.user9.day19},
        {day20: users.user9.day20},
        {day21: users.user9.day21},
        {day22: users.user9.day22}, 
        {day23: users.user9.day23},
        {day24: users.user9.day24},
        {day25: users.user9.day25},
        {day26: users.user9.day26},
        {day27: users.user9.day27},
        {day28: users.user9.day28},
        {day29: users.user9.day29},
        {day30: users.user9.day30},
        {day31: users.user9.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user9:[ 
          {day1: users.user9.day1},
          {day2: users.user9.day2}, 
          {day3: users.user9.day3},
          {day4: users.user9.day4},
          {day5: users.user9.day5},
          {day6: users.user9.day6},
          {day7: users.user9.day7},
          {day8: users.user9.day8},
          {day9: users.user9.day9},
          {day10: users.user9.day10}, 
          {day11: users.user9.day11},
          {day12: users.user9.day12}, 
          {day13: users.user9.day13},
          {day14: users.user9.day14},
          {day15: users.user9.day15},
          {day16: users.user9.day16},
          {day17: users.user9.day17},
          {day18: users.user9.day18},
          {day19: users.user9.day19},
          {day20: users.user9.day20},
          {day21: users.user9.day21},
          {day22: users.user9.day22}, 
          {day23: users.user9.day23},
          {day24: users.user9.day24},
          {day25: users.user9.day25},
          {day26: users.user9.day26},
          {day27: users.user9.day27},
          {day28: users.user9.day28},
          {day29: users.user9.day29},
          {day30: users.user9.day30},
          {day31: users.user9.day31},         
        ],   
      });
      console.log('no user9 update firestore on click false')

    }
  };

  if (users.user10[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user10:[ 
        {day1: users.user10.day1},
        {day2: users.user10.day2}, 
        {day3: users.user10.day3}, 
        {day4: users.user10.day4},
        {day5: users.user10.day5},
        {day6: users.user10.day6},
        {day7: users.user10.day7},
        {day8: users.user10.day8},
        {day9: users.user10.day9},
        {day10: users.user10.day10}, 
        {day11: users.user10.day11},
        {day12: users.user10.day12}, 
        {day13: users.user10.day13},
        {day14: users.user10.day14},
        {day15: users.user10.day15},
        {day16: users.user10.day16},
        {day17: users.user10.day17},
        {day18: users.user10.day18},
        {day19: users.user10.day19},
        {day20: users.user10.day20},
        {day21: users.user10.day21},
        {day22: users.user10.day22}, 
        {day23: users.user10.day23},
        {day24: users.user10.day24},
        {day25: users.user10.day25},
        {day26: users.user10.day26},
        {day27: users.user10.day27},
        {day28: users.user10.day28},
        {day29: users.user10.day29},
        {day30: users.user10.day30},
        {day31: users.user10.day31},        
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user10:[ 
          {day1: users.user10.day1},
          {day2: users.user10.day2}, 
          {day3: users.user10.day3}, 
          {day4: users.user10.day4},
          {day5: users.user10.day5},
          {day6: users.user10.day6},
          {day7: users.user10.day7},
          {day8: users.user10.day8},
          {day9: users.user10.day9},
          {day10: users.user10.day10}, 
          {day11: users.user10.day11},
          {day12: users.user10.day12}, 
          {day13: users.user10.day13},
          {day14: users.user10.day14},
          {day15: users.user10.day15},
          {day16: users.user10.day16},
          {day17: users.user10.day17},
          {day18: users.user10.day18},
          {day19: users.user10.day19},
          {day20: users.user10.day20},
          {day21: users.user10.day21},
          {day22: users.user10.day22}, 
          {day23: users.user10.day23},
          {day24: users.user10.day24},
          {day25: users.user10.day25},
          {day26: users.user10.day26},
          {day27: users.user10.day27},
          {day28: users.user10.day28},
          {day29: users.user10.day29},
          {day30: users.user10.day30},
          {day31: users.user10.day31},        
        ],   
      });
      console.log('no user10 update firestore on click true')

    }
  };
  if (users.user10[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user10:[ 
        {day1: users.user10.day1},
        {day2: users.user10.day2}, 
        {day3: users.user10.day3},
        {day4: users.user10.day4},
        {day5: users.user10.day5},
        {day6: users.user10.day6},
        {day7: users.user10.day7},
        {day8: users.user10.day8},
        {day9: users.user10.day9},
        {day10: users.user10.day10}, 
        {day11: users.user10.day11},
        {day12: users.user10.day12}, 
        {day13: users.user10.day13},
        {day14: users.user10.day14},
        {day15: users.user10.day15},
        {day16: users.user10.day16},
        {day17: users.user10.day17},
        {day18: users.user10.day18},
        {day19: users.user10.day19},
        {day20: users.user10.day20},
        {day21: users.user10.day21},
        {day22: users.user10.day22}, 
        {day23: users.user10.day23},
        {day24: users.user10.day24},
        {day25: users.user10.day25},
        {day26: users.user10.day26},
        {day27: users.user10.day27},
        {day28: users.user10.day28},
        {day29: users.user10.day29},
        {day30: users.user10.day30},
        {day31: users.user10.day31},         
      ],   
    });
    } catch {
      setDoc(setDocRef, {
        user10:[ 
          {day1: users.user10.day1},
          {day2: users.user10.day2}, 
          {day3: users.user10.day3},
          {day4: users.user10.day4},
          {day5: users.user10.day5},
          {day6: users.user10.day6},
          {day7: users.user10.day7},
          {day8: users.user10.day8},
          {day9: users.user10.day9},
          {day10: users.user10.day10}, 
          {day11: users.user10.day11},
          {day12: users.user10.day12}, 
          {day13: users.user10.day13},
          {day14: users.user10.day14},
          {day15: users.user10.day15},
          {day16: users.user10.day16},
          {day17: users.user10.day17},
          {day18: users.user10.day18},
          {day19: users.user10.day19},
          {day20: users.user10.day20},
          {day21: users.user10.day21},
          {day22: users.user10.day22}, 
          {day23: users.user10.day23},
          {day24: users.user10.day24},
          {day25: users.user10.day25},
          {day26: users.user10.day26},
          {day27: users.user10.day27},
          {day28: users.user10.day28},
          {day29: users.user10.day29},
          {day30: users.user10.day30},
          {day31: users.user10.day31},         
        ],   
      });
      console.log('no user10 update firestore on click false')

    }
  }
};
updateFire();
}, [ trig ]);


//////   HANDLE CLICKS TO UPDATE USERS' STATE   //////
const handleClick1 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user1: {
        ...users.user1, [`day${i}`]: !users.user1[`day${i}`]
      
    }
  }})
};
const handleClick2 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user2: {
        ...users.user2, [`day${i}`]: !users.user2[`day${i}`]
      
    }
  }})
};
const handleClick3 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user3: {
        ...users.user3, [`day${i}`]: !users.user3[`day${i}`]
      
    }
  }})
};
const handleClick4 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user4: {
        ...users.user4, [`day${i}`]: !users.user4[`day${i}`]
      
    }
  }})
};
const handleClick5 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user5: {
        ...users.user5, [`day${i}`]: !users.user5[`day${i}`]
      
    }
  }})
};
const handleClick6 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user6: {
        ...users.user6, [`day${i}`]: !users.user6[`day${i}`]
      
    }
  }})
};
const handleClick7 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user7: {
        ...users.user7, [`day${i}`]: !users.user7[`day${i}`]
      
    }
  }})
};
const handleClick8 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user8: {
        ...users.user8, [`day${i}`]: !users.user8[`day${i}`]
      
    }
  }})
};
const handleClick9 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user9: {
        ...users.user9, [`day${i}`]: !users.user9[`day${i}`]
      
    }
  }})
};
const handleClick10 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user10: {
        ...users.user10, [`day${i}`]: !users.user10[`day${i}`]
      
    }
  }})
};


//////   SET ALL AVAIL   //////
const setAllAvailUser1 =()=>{
  
    setUsers(prev=> { return {
    ...users,
      user1: {
          day1: true, 
          day2: true, 
          day3: true, 
          day4: true, 
          day5: true, 
          day6: true, 
          day7: true, 
          day8: true, 
          day9: true, 
          day10: true,   
          day11: true, 
          day12: true, 
          day13: true, 
          day14: true, 
          day15: true, 
          day16: true, 
          day17: true, 
          day18: true, 
          day19: true, 
          day20: true, 
          day21: true, 
          day22: true, 
          day23: true, 
          day24: true, 
          day25: true, 
          day26: true, 
          day27: true, 
          day28: true, 
          day29: true, 
          day30: true, 
          day31: true                
      }}   
  });
  setTrig(prev=>!prev);
  
}
const setAllAvailUser2 =()=>{
    setUsers(prev=> { return {
      ...users,
        user2: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser3 =()=>{
    setUsers(prev=> { return {
      ...users,
        user3: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser4 =()=>{
    setUsers(prev=> { return {
      ...users,
        user4: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser5 =()=>{
    setUsers(prev=> { return {
      ...users,
        user5: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser6 =()=>{
    setUsers(prev=> { return {
      ...users,
        user6: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser7 =()=>{
    setUsers(prev=> { return {
      ...users,
        user7: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser8 =()=>{
    setUsers(prev=> { return {
      ...users,
        user8: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser9 =()=>{
    setUsers(prev=> { return {
      ...users,
        user9: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}
const setAllAvailUser10 =()=>{
    setUsers(prev=> { return {
      ...users,
        user10: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);

}

//////   SET ALL UNAVAIL   //////
const setAllUnAvailUser1 =()=>{
    setUsers(prev=> { return {
      ...users,
        user1: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);    

}
const setAllUnAvailUser2 =()=>{
    setUsers(prev=> { return {
      ...users,
        user2: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser3 =()=>{
    setUsers(prev=> { return {
      ...users,
        user3: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser4 =()=>{
    setUsers(prev=> { return {
      ...users,
        user4: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser5 =()=>{
    setUsers(prev=> { return {
      ...users,
        user5: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser6 =()=>{
    setUsers(prev=> { return {
      ...users,
        user6: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser7 =()=>{
    setUsers(prev=> { return {
      ...users,
        user7: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser8 =()=>{
    setUsers(prev=> { return {
      ...users,
        user8: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser9 =()=>{
    setUsers(prev=> { return {
      ...users,
        user9: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}
const setAllUnAvailUser10 =()=>{
    setUsers(prev=> { return {
      ...users,
        user10: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     

}

//////   HIDE EXTRA DAYS OF MONTHS AND LEAP YEARS  //////

useEffect(() => {

  if ((0 == activeYear % 4) && (0 != activeYear % 100) || (0 == activeYear % 400)) {
    if ( activeMonth == 0 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 1 ) {
      setHide29( false );
      setHide30( true );
      setHide31( true );
    }

    if ( activeMonth == 2 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 3 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 4 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 5 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 6 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 7 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 8 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 9 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 10 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 11 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }
  } else {
    if ( activeMonth == 0 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 1 ) {
      setHide29( true );
      setHide30( true );
      setHide31( true );
    }

    if ( activeMonth == 2 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 3 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 4 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 5 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 6 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 7 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 8 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 9 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }

    if ( activeMonth == 10 ) {
      setHide29( false );
      setHide30( false );
      setHide31( true );
    }

    if ( activeMonth == 11 ) {
      setHide29( false );
      setHide30( false );
      setHide31( false );
    }
  }

      
      
},[ trig, activeMonth, activeYear ]);

//////   DATES WHERE ALL ARE FREE   //////
const br = <br></br>;



//////   FUNCTIONS FOR RETURN ELEMENTS   //////
function HowToUse() {
  function CloseButton() {
    const handleClickCloseButton = () => {
      setShowHowToUseDiv(false);
    };
    return (
      <>
        <button className='closeButton'
        onClick={handleClickCloseButton}> Close </button>
      </>
    )
  }
  return (
    <div className='howToUseDivBG'>
      <div className='howToUseDiv'>
        <FAQs/>
      </div>
      <div className='closeButtonDiv'> <CloseButton/> </div>

    </div>
  )
};

function WelcomeScreen() {
  const handleToggleClick = () => {
    setToggleWelcomeScreen(false);
    setUpdateTrig(prev=>!prev);
    setLoadTrig(prev=>!prev);
  };

  const handleHowToUseClick = () => {
    setShowHowToUseDiv(true);
    setUpdateTrig(prev=>!prev);
    setLoadTrig(prev=>!prev);
  };

  return (
    <div className={toggleWelcomeScreen ? 'welcomeDiv' : 'welcomeDivHidden'}>
      <div className='welcomeDivText'>  Welcome <br/> to <br/> BandJam  </div> 
      <div className='welcomeDivButton'> <button className='welcomeButton' onClick={handleToggleClick}> Let Us Jam </button> </div>
      <div className='howToUseButtonDiv'> <button className='howToUseButton' onClick={handleHowToUseClick}> FAQs </button> </div>
      {showHowToUseDiv ? <HowToUse/> : ''}
      {<div className='divSignupButton'> <button className='howToUseButton' onClick={openSignupDivFunc} > Create Account </button> </div>}

      <div className='welcomeDivLogo'> 

      {/* <a className='aTagLogo' href="https://instagram.com/usefulidiotevents" target="_blank" rel="noreferrer"> */}

      <Image  src={logoCol} alt="Logo" style={{
        height: 'auto',
        width: '50%',
        opacity: '0.85'
        }} />
        
      {/* </a> */}
      </div>

    </div>
  )
};



function TaglineDiv() {
  return (
    <div className='loginInfoDiv'>
<article className = 'tagLineArticle'>
  <h1 className = 'h1TagLine'> Powered by Useful Idiot Events... </h1>
</article>
</div>
  )
}

function UpdateEmailDiv () {
  function handleUpdateEmail() {
    if ( emailRefUpdate.current.value == emailRefConfirmUpdate.current.value ) {
      updateEmail(auth, 'tester@gmail.com').then(() => {
        // Email updated!
        // ...
        console.log('asdfd', auth )

        alert('email updated')
      }).catch((error) => {
        // An error occurred
        // ...
        console.log('asd', emailRefUpdate.current.value )
        alert('error occurred')
      });
    } else {
      alert('emails do not match;')
    }
  };
  return (
    showUpdateEmailDiv ? 
    <div className='updateEmailDivBG' >
      <div className='updateEmailDiv' >
        Update Email Div

        <div 
            className='signupFieldDiv'
            id='fields'>
              <input className='inputField' ref={emailRefUpdate} placeholder='Enter New Email Address' />
              <input ref={emailRefConfirmUpdate} placeholder='Confirm New Email Address' />
              <button onClick={handleUpdateEmail} > Update Email Address </button>
          </div>

        <button onClick={closeUpdateEmailDiv} >Close</button>
      </div>
    </div>
    :
    ''
  )
};

function showWelcomeDiv () {
  setToggleWelcomeScreen(true);
};

function LoginInfoNav() {
  const handleToggle = () => {
    setShowLoginInfoNav(prev=>!prev)
  };
  return (
     showLoginInfoNav ? 
      <nav className= 'loginInfoDiv' >

        <div className='hideLoginButtonDiv'> 

          <button
            className='purpleButton'
            onClick={handleToggle}> Hide Login </button>


        </div>
        <div className='currentUIDDiv'> Current UserID: { currentUser ? uid.slice(0,7) : ''} </div>
        <div className='currentLogDiv'> Logged In As: { currentUser ? currentLogName : '' } </div>
        { currentUser ? '' :
          <div 
            className='divFields'
          id='fields'>
            <input ref={emailRef} type='email' placeholder='Email'/>
            <input ref={passwordRef} type={passwordVisible ? 'text' : 'password'} placeholder='Password'/>
            {/* <button 
              className='PWButton'
              onClick={ togglePasswordVisible }> {passwordVisible ? <Image src={eyeSlash}/> : <Image src={eye}/>} 
            </button> */}
            {/* <input
              id='check'
              type='checkbox'
              value={passwordVisible}
              onChange={() => setPasswordVisible((prev) => !prev)}
              >
            </input> */}

          </div>
        }
        
        <div className='divLoginButton'> <button disabled={loading || currentUser != null } onClick={handleLogin} > Log In </button> </div>
        <div className='divLogoutButton'> <button disabled={loading || !currentUser } onClick={handleLogout}> Log Out </button> </div>
        
        <br></br>
        {/* <div className='divUpdateEmailButton' > <button onClick={openUpdateEmailDiv} > Update Email </button> </div> */}
        <div className='divResetPW' > <button disabled={loading || !currentUser } onClick={handleResetPW}> Send Email To Reset Password </button> </div>
        <br/>
      </nav> 
    :
    <div className='showLoginNavDiv'> 
      {/* <div className='currentUIDDiv'> Current UserID: { currentUser ? uid.slice(0,7) : ''} </div> */}


      <button 
      className='purpleButton'
      onClick={handleToggle}

      > {showLoginInfoNav ? 'Hide Login Details' : 'Show Login'} </button>
    </div>
    
  )
};

function HomeButtonDiv() {
  return (
    <div className='homeButtonDiv'>
      <button className='homeButton' onClick={showWelcomeDiv} > HOME </button>
    </div>
  )
};

//////   SHOW CURRENT LOG IN DETAILS   //////
useEffect(() => {

  function name() {
    const remove = currentUser.email.replace('@gmail.com', '');
    return (remove)
  };

  if (currentUser) {
    setCurrentLogName(currentUser.email);
  } else {
    setCurrentLogName('')
  }
}, [useAuth, login, handleLogin, signup, handleSignup]);



//////   UPDATES FIRESTORE WITH NUMBER OF BAND MEMBERS AND BAND NAME AND NAMES OF BAND MEMBERS  //////
function BandInfoInputNav() {
  const [bandName, setBandName] = useState(bandNameOnLoad);
  const [numberOfMembers, setNumberOfMembers] = useState(numberOfMembersOnLoad); 
  const [userNames, setUserNames] = useState(userNamesOnLoad);
  const [userName1, setUserName1] = useState(userNameOnLoad1);
  const [userName2, setUserName2] = useState(userNameOnLoad2);
  const [userName3, setUserName3] = useState(userNameOnLoad3);
  const [userName4, setUserName4] = useState(userNameOnLoad4);
  const [userName5, setUserName5] = useState(userNameOnLoad5);
  const [userName6, setUserName6] = useState(userNameOnLoad6);
  const [userName7, setUserName7] = useState(userNameOnLoad7);
  const [userName8, setUserName8] = useState(userNameOnLoad8);
  const [userName9, setUserName9] = useState(userNameOnLoad9);
  const [userName10, setUserName10] = useState(userNameOnLoad10);
  const [userEmail, setUserEmail] = useState(userEmailOnLoad)


  const bandNameSubmit = async () => {
    setSaveBandInfoChangesTrigState(true);
    setBandInfoTrig(prev => !prev);
    try {
      const docSnap = await getDoc(docRefBandInfo);
      if (docSnap.exists()) {
        updateDoc(docRefBandInfo, { bandName: bandName});
      } else {
        setDoc(docRefBandInfo, { bandName: bandName});
      }
    } catch {
    }
  };

  const userEmailSubmit = async () => {
    setSaveBandInfoChangesTrigState(true);
    setBandInfoTrig(prev => !prev);
    try {
      const docSnap = await getDoc(docRefBandInfo);
      if (docSnap.exists()) {
        updateDoc(docRefBandInfo, { userEmail: userEmail});
      } else {
        setDoc(docRefBandInfo, { userEmail: userEmail});
      }
    } catch {
    }
  };

  const bandNumberSubmit = async () => {
    setSaveBandInfoChangesTrigState(true);
    setBandInfoTrig(prev => !prev);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { numberOfMembers: numberOfMembers});
        } else {
          setDoc(docRefBandInfo, { numberOfMembers: numberOfMembers});
        }
      } catch {
      };
  };

  const bandMemberNamesSubmit1 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName1: userName1});
        } else {
          setDoc(docRefBandInfo, { userName1: userName1});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit2 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName2: userName2});
        } else {
          setDoc(docRefBandInfo, { userName2: userName2});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit3 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName3: userName3});
        } else {
          setDoc(docRefBandInfo, { userName3: userName3});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit4 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName4: userName4});
        } else {
          setDoc(docRefBandInfo, { userName4: userName4});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit5 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName5: userName5});
        } else {
          setDoc(docRefBandInfo, { userName5: userName5});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit6 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName6: userName6});
        } else {
          setDoc(docRefBandInfo, { userName6: userName6});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit7 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName7: userName7});
        } else {
          setDoc(docRefBandInfo, { userName7: userName7});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit8 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName8: userName8});
        } else {
          setDoc(docRefBandInfo, { userName8: userName8});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit9 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName9: userName9});
        } else {
          setDoc(docRefBandInfo, { userName9: userName9});
        }
      } catch {
      };
  };
  const bandMemberNamesSubmit10 = async () => {
    setBandInfoTrig(prev => !prev);
    setSaveBandInfoChangesTrigState(true);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        if (docSnap.exists()) {
          updateDoc(docRefBandInfo, { userName10: userName10});
        } else {
          setDoc(docRefBandInfo, { userName10: userName10});
        }
      } catch {
      };
  };

  // const bandMemberNamesSubmitAll = () => {
  //   bandMemberNamesSubmit1();
  //   bandMemberNamesSubmit2();
  //   bandMemberNamesSubmit3();
  //   bandMemberNamesSubmit4();
  //   bandMemberNamesSubmit5();
  //   bandMemberNamesSubmit6();
  //   bandMemberNamesSubmit7();
  //   bandMemberNamesSubmit8();
  //   bandMemberNamesSubmit9();
  //   bandMemberNamesSubmit10();
  // };

  // const [nameToUpdate, setNameToUpdate] = useState(1);

  // function ReturnNameToUpdate () {
  //   return (
  //     <div>
  //       <label>
  //         Select Member to Update:
  //         <br/>
  //           <select
  //             onChange={e => setNameToUpdate(e.target.value)}
  //             defaultValue={'placeholder'}
  //             >
  //             <option disabled value={'placeholder'}>#</option>
  //             { numberOfMembersArray().map((user) => {
  //               return (
  //                 <option value={user}>{user}</option>
  //               )
  //             })}
  //           </select>
  //       </label>
  //     </div>  
      
  //   )
  // };

  // function UpdateBandMemberName () {
  //   const [editName1, setEditName1] = useState(true);
  //   const [editName2, setEditName2] = useState(true);
  //   const [editName3, setEditName3] = useState(true);
  //   const [editName4, setEditName4] = useState(true);
  //   const [editName5, setEditName5] = useState(true);
  //   const [editName6, setEditName6] = useState(true);
  //   const [editName7, setEditName7] = useState(true);
  //   const [editName8, setEditName8] = useState(true);
  //   const [editName9, setEditName9] = useState(true);
  //   const [editName10, setEditName10] = useState(true);

  //   console.log('editName1', editName1);

  //   return (
  //     <div>
  //       { numberOfMembersArray().map((user) => {

  //         const editNameOnClick = () => {
  //           if (user == 1) {
  //             setEditName1(true);
  //           };
  //           if (user == 2) {
  //             setEditName2(true);
  //           };
  //           if (user == 3) {
  //             setEditName3(true);
  //           };
  //           if (user == 4) {
  //             setEditName4(true);
  //           };
  //           if (user == 5) {
  //             setEditName5(true);
  //           };
  //           if (user == 6) {
  //             setEditName6(true);
  //           };
  //           if (user == 7) {
  //             setEditName7(true);
  //           };
  //           if (user == 8) {
  //             setEditName8(true);
  //           };
  //           if (user == 9) {
  //             setEditName9(true);
  //           };
  //           if (user == 10) {
  //             setEditName10(true);
  //           }
  //         };

  //         const returnUserName = () => {
  //           if (user == 1) {
  //             return (userNameOnLoad1)
  //           };
  //           if (user == 2) {
  //             return (userNameOnLoad2)
  //           };
  //           if (user == 3) {
  //             return (userNameOnLoad3)
  //           };
  //           if (user == 4) {
  //             return (userNameOnLoad4)
  //           };
  //           if (user == 5) {
  //             return (userNameOnLoad5)
  //           };
  //           if (user == 6) {
  //             return (userNameOnLoad6)
  //           };
  //           if (user == 7) {
  //             return (userNameOnLoad7)
  //           };
  //           if (user == 8) {
  //             return (userNameOnLoad8)
  //           };
  //           if (user == 9) {
  //             return (userNameOnLoad9)
  //           };
  //           if (user == 10) {
  //             return (userNameOnLoad10)
  //           };
  //         };

  //         const returnEditName = () => {
  //           if (user == 1) {
  //             return (editName1)
  //           };
  //           if (user == 2) {
  //             return (editName2)
  //           };
  //           if (user == 3) {
  //             return (editName3)
  //           };
  //           if (user == 4) {
  //             return (editName4)
  //           };
  //           if (user == 5) {
  //             return (editName5)
  //           };
  //           if (user == 6) {
  //             return (editName6)
  //           };
  //           if (user == 7) {
  //             return (editName7)
  //           };
  //           if (user == 8) {
  //             return (editName8)
  //           };
  //           if (user == 9) {
  //             return (editName9)
  //           };
  //           if (user == 10) {
  //             return (editName10)
  //           };
  //         };

  //         const onClickRun = () => {
  //           // bandMemberNamesSubmitAll();
  //           if (user == 1) {
  //             return (bandMemberNamesSubmit1)
  //           };
  //           if (user == 2) {
  //             return (bandMemberNamesSubmit2)
  //           };
  //           if (user == 3) {
  //             return (bandMemberNamesSubmit3)
  //           };
  //           if (user == 4) {
  //             return (bandMemberNamesSubmit4)
  //           };
  //           if (user == 5) {
  //             return (bandMemberNamesSubmit5)
  //           };
  //           if (user == 6) {
  //             return (bandMemberNamesSubmit6)
  //           };
  //           if (user == 7) {
  //             return (bandMemberNamesSubmit7)
  //           };
  //           if (user == 8) {
  //             return (bandMemberNamesSubmit8)
  //           };
  //           if (user == 9) {
  //             return (bandMemberNamesSubmit9)
  //           };
  //           if (user == 10) {
  //             return (bandMemberNamesSubmit10)
  //           };
  //         };

  //         const onChangeRun = (e) => {
  //           if (user == 1) {
  //             return (setUserName1( e.target.value ))
  //           };
  //           if (user == 2) {
  //             return (setUserName2( e.target.value ))
  //           };
  //           if (user == 3) {
  //             return (setUserName3( e.target.value ))
  //           };
  //           if (user == 4) {
  //             return (setUserName4( e.target.value ))
  //           };
  //           if (user == 5) {
  //             return (setUserName5( e.target.value ))
  //           };
  //           if (user == 6) {
  //             return (setUserName6( e.target.value ))
  //           };
  //           if (user == 7) {
  //             return (setUserName7( e.target.value ))
  //           };
  //           if (user == 8) {
  //             return (setUserName8( e.target.value ))
  //           };
  //           if (user == 9) {
  //             return (setUserName9( e.target.value ))
  //           };
  //           if (user == 10) {
  //             return (setUserName10( e.target.value ))
  //           };
  //         };


  //           return (
  //             <div 
  //               key={user}
  //               className='bandMemberNameDiv'
  //             >
  //               {user}: {returnUserName()} <button 
  //                 className='purpleButton'
  //                 onClick={editNameOnClick}
                  
  //                 >Update</button> 
  //                 {
  //                   returnEditName() ? 
  //                   <div key={user}>
  //                   Name {user}:
  //                   <br/>
  //                   <input 
  //                     onChange={e => onChangeRun(e) }
  //                     // disabled={true}
  //                     />
  //                     <button 
  //                       // disabled={true}
  //                       onClick={ onClickRun() }
  //                       className='purpleButton'
  //                       > Submit </button>
  //                     <br/>
                      
  //                   </div> : ''
  //                 }
  //                 <br/>
  //             </div>
  //           )
  //         })}
  //     </div>
  //   )
  // };

  const onClickreShowBandInfoDiv = () => {
    setBandInfoToggle(true);
  };

  return (
    bandInfoToggle ? 
      <div className='bandInfoDiv'>
        {currentUser ? 
          <div className='showBandInfoDiv'>
            <BandInfoToggleButton/>
              {/* <p className='bandInfoHeading'> User Email:</p>
              <div className='currentBandNameDiv'> {userEmailOnLoad} </div> */}
              <br/>
              <p className='bandInfoHeading'> Band Name: </p> 
                <div className='currentBandNameDiv'> {bandNameOnLoad} </div> 
                  <br/>
                    <p className='bandInfoHeading'> Number of Members: </p> 
                      <div className='currentNumberOfMembersDiv'> {numberOfMembersOnLoad} </div>
                        <br/>
                          <p className='bandInfoHeading'> Band Member Names: </p> 
                            
                              { numberOfMembersArray().map((user) => {
                                const run = () => {
                                  if (user == 1) {
                                    return (userNameOnLoad1)
                                  };
                                  if (user == 2) {
                                    return (userNameOnLoad2)
                                  };
                                  if (user == 3) {
                                    return (userNameOnLoad3)
                                  };
                                  if (user == 4) {
                                    return (userNameOnLoad4)
                                  };
                                  if (user == 5) {
                                    return (userNameOnLoad5)
                                  };
                                  if (user == 6) {
                                    return (userNameOnLoad6)
                                  };
                                  if (user == 7) {
                                    return (userNameOnLoad7)
                                  };
                                  if (user == 8) {
                                    return (userNameOnLoad8)
                                  };
                                  if (user == 9) {
                                    return (userNameOnLoad9)
                                  };
                                  if (user == 10) {
                                    return (userNameOnLoad10)
                                  };
                                }
                                return (
                                  <div 
                                    key={user}
                                    className='bandMemberNameDiv'
                                  >
                                    {user}: {run()} <br/>
                                  </div>
                                )
                              })}
                                <br/>
                                <ToggleUpdateBandInfoDivFunc/>
          </div>
            :
            // <div className='noUserLoggedInDiv'> No User Logged In </div>
          <div> 
            {/* in ShowBandInfoDiv currentUser = false */}
          </div>
        }

        {
          toggleUpdateBandInfoDiv ? 
            <div className={'updateBandInfoDiv'}>
            
            <label>
                Update Band Email: 
                <br/>
                <input onChange={e => setUserEmail(e.target.value)}/>
                <button 
                  onClick={userEmailSubmit}
                  className='purpleButton'
                  > Submit </button>

              </label>

                <br/>
                <br/>


              <label>
                Update Band Name: 
                <br/>
                <input onChange={e => setBandName(e.target.value)}/>
                <button 
                  onClick={bandNameSubmit}
                  className='purpleButton'
                  > Submit </button>

              </label>

                <br/>
                <br/>

              <label>
                Select Number of Band Members: 
                <br/>
                <select
                  onChange={e => setNumberOfMembers(e.target.value)}
                  defaultValue={'placeholder'}
                >
                  <option disabled value={'placeholder'}>#</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button 
                  onClick={bandNumberSubmit}
                  className='purpleButton'
                > Submit </button>

              </label>


              <br/>
              <br/>

              {/* <UpdateBandMemberName/> */}

              <label>
                Update Band Members Names: 
                <br/>
                { numberOfMembersArray().map((user) => {
                  const onClickRun = () => {
                    // bandMemberNamesSubmitAll();
                    if (user == 1) {

                      return (bandMemberNamesSubmit1)
                    };
                    if (user == 2) {
                      return (bandMemberNamesSubmit2)
                    };
                    if (user == 3) {
                      return (bandMemberNamesSubmit3)
                    };
                    if (user == 4) {
                      return (bandMemberNamesSubmit4)
                    };
                    if (user == 5) {
                      return (bandMemberNamesSubmit5)
                    };
                    if (user == 6) {
                      return (bandMemberNamesSubmit6)
                    };
                    if (user == 7) {
                      return (bandMemberNamesSubmit7)
                    };
                    if (user == 8) {
                      return (bandMemberNamesSubmit8)
                    };
                    if (user == 9) {
                      return (bandMemberNamesSubmit9)
                    };
                    if (user == 10) {
                      return (bandMemberNamesSubmit10)
                    };
                  };

                  const onChangeRun = (e) => {
                    if (user == 1) {
                      return (setUserName1( e.target.value ))
                    };
                    if (user == 2) {
                      return (setUserName2( e.target.value ))
                    };
                    if (user == 3) {
                      return (setUserName3( e.target.value ))
                    };
                    if (user == 4) {
                      return (setUserName4( e.target.value ))
                    };
                    if (user == 5) {
                      return (setUserName5( e.target.value ))
                    };
                    if (user == 6) {
                      return (setUserName6( e.target.value ))
                    };
                    if (user == 7) {
                      return (setUserName7( e.target.value ))
                    };
                    if (user == 8) {
                      return (setUserName8( e.target.value ))
                    };
                    if (user == 9) {
                      return (setUserName9( e.target.value ))
                    };
                    if (user == 10) {
                      return (setUserName10( e.target.value ))
                    };
                  };


                  const handleEditUserNameClick = () => {
                    if (user == 1) {
                      setUnlocked1(prev=>!prev);

                      // setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);

                    };
                    if (user == 2) {
                      setUnlocked2(prev=>!prev)
                                      
                      setUnlocked1(true);
                      // setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 3) {
                      setUnlocked3(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      // setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 4) {
                      setUnlocked4(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      // setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 5) {
                      setUnlocked5(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      // setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 6) {
                      setUnlocked6(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      // setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 7) {
                      setUnlocked7(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      // setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 8) {
                      setUnlocked8(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      // setUnlocked8(true);
                      setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 9) {
                      setUnlocked9(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      // setUnlocked9(true);
                      setUnlocked10(true);
                    };
                    if (user == 10) {
                      setUnlocked10(prev=>!prev)
                                      
                      setUnlocked1(true);
                      setUnlocked2(true);
                      setUnlocked3(true);
                      setUnlocked4(true);
                      setUnlocked5(true);
                      setUnlocked6(true);
                      setUnlocked7(true);
                      setUnlocked8(true);
                      setUnlocked9(true);
                      // setUnlocked10(true);
                    };

                  };

                  const unLockedRun = () => {
                    if (user == 1) {
                      return (unlocked1)
                    };
                    if (user == 2) {
                      return (unlocked2)
                    };
                    if (user == 3) {
                      return (unlocked3)
                    };
                    if (user == 4) {
                      return (unlocked4)
                    };
                    if (user == 5) {
                      return (unlocked5)
                    };
                    if (user == 6) {
                      return (unlocked6)
                    };
                    if (user == 7) {
                      return (unlocked7)
                    };
                    if (user == 8) {
                      return (unlocked8)
                    };
                    if (user == 9) {
                      return (unlocked9)
                    };
                    if (user == 10) {
                      return (unlocked10)
                    };

                  };




                  return (
                    <div key={user}>
                      Name {user}:
                      <br/>
                      <button
                        onClick={handleEditUserNameClick}
                      > 
                        {unLockedRun() ? <Image src={lockIcon2} alt="Lock"/> : <Image src={unlockIcon2} alt="unlock" />}
                      </button>

                    <input 
                      onChange={e => onChangeRun(e) }
                      disabled={unLockedRun()}
                      />
                      <button 
                        disabled={unLockedRun()}
                        onClick={ onClickRun() }
                        className='purpleButton'
                        > Submit </button>
                      <br/>
                      <br/>
                    </div>
                    )
                  })
                  }
              </label>

              <br/>
              <br/>
                <SaveBandInfoButton/>
                <br/>
            </div>
          :
              // <> {currentUser ? 'Band Info Hidden' : 
              // <div className='noUserLoggedInDiv'> No User Logged In </div>
              // } </>
          // <div> toggleUpdateBandInfoDiv is false </div>
          ''
        }

      </div>
    : 
    // <div className='hideBandInfoDiv'>
    //   {currentUser ? <BandInfoToggleButton/> : 
    //   <div className='noUserLoggedInDiv'> No User Logged In </div>}
    // </div>
      <div
        className='reShowBandInfoButtonDiv'
      > 
        <button
          className='purpleButton'
          onClick={onClickreShowBandInfoDiv}
        >
          Show Band Info </button>
      </div>
  )
};

// function AllNavs() {
//   return (
//     <div className= 'mainDiv'>

//     </div>
//   )
// };

function ShowAllAvailDates () {
  function MapAllFree() {
    return (
      daysArray.map((day) => {
        const numberOfMembersForAllFree = () => {
          if (numberOfMembersOnLoad == 1) {
            return ( users.user1[`day${day}`] )
          };
          if (numberOfMembersOnLoad == 2) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] )
          }; 
          if (numberOfMembersOnLoad == 3) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`]  )
          }; 
          if (numberOfMembersOnLoad == 4) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`] && users.user4[`day${day}`] )
          } 
          if (numberOfMembersOnLoad == 5) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`] && users.user4[`day${day}`] && users.user5[`day${day}`] )
          } 
          if (numberOfMembersOnLoad == 6) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`] && users.user4[`day${day}`] && users.user5[`day${day}`] && users.user6[`day${day}`] )
          } 
          if (numberOfMembersOnLoad == 7) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`] && users.user4[`day${day}`] && users.user5[`day${day}`] && users.user6[`day${day}`] && users.user7[`day${day}`] )
          } 
          if (numberOfMembersOnLoad == 8) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`] && users.user4[`day${day}`] && users.user5[`day${day}`] && users.user6[`day${day}`] && users.user7[`day${day}`] && users.user8[`day${day}`] )
          } 
          if (numberOfMembersOnLoad == 9) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`] && users.user4[`day${day}`] && users.user5[`day${day}`] && users.user6[`day${day}`] && users.user7[`day${day}`] && users.user8[`day${day}`] && users.user9[`day${day}`] )
          }
          if (numberOfMembersOnLoad == 10) {
            return ( users.user1[`day${day}`] && users.user2[`day${day}`] && users.user3[`day${day}`] && users.user4[`day${day}`] && users.user5[`day${day}`] && users.user6[`day${day}`] && users.user7[`day${day}`] && users.user8[`day${day}`] && users.user9[`day${day}`] && users.user10[`day${day}`]  )
          } 
          else {
            return ( true )
          }
        };
          if ( numberOfMembersForAllFree() == true ) {
            console.log('if ran');
            return ( 

              // tableDayName(day-1) , ', ', monthToNameLong(), ' ', tableDayNameArray[day-1],  <br/> 
              <div key={day}>
                {tableDayName(day-1)}  {monthToName()} {tableDayNameArray[day-1]}
              </div>
              )
          } else {
            console.log('else ran in MapAllFree function')
          } 
      })
    )
  };

  return (
    <div className='showAllAvailDatesDiv'>
      <article className = 'availSumTitleArticle'>
        <h2 className = 'h2AvailSum'>
          For the month of <span className = 'h2AvailSumMonth'> {monthToNameLong()} {activeYear}</span>, LET US JAM on:
        </h2>
      </article>

    
      <article className = 'availSumDatesArticle'>
        <h2 className = 'h2AllAvailDates'>
          <MapAllFree/>
        </h2>
      </article>
    </div>
  )
};

function SelectYearArticle() {
  return (
    <article className = 'yearArticle' >
  <h2 className = 'h2Year'>Select Year</h2>
    {/* <button className = 'buttonYear' onClick={()=> setActiveYear(2022)}> 2022 </button> */}
    <button className = 'buttonYear' onClick={()=> setActiveYear(currentDate.getFullYear())}> {currentDate.getFullYear().toString()} </button>
    <button className = 'buttonYear' onClick={()=> setActiveYear(activeYearPlusOne)}> {activeYearPlusOne.toString()} </button>
    <button className = 'buttonYear' onClick={()=> setActiveYear(activeYearPlusTwo)}> {activeYearPlusTwo.toString()} </button>
    <button className = 'buttonYear' onClick={()=> setActiveYear(activeYearPlusThree)}> {activeYearPlusThree.toString()} </button>
    <button className = 'buttonYear' onClick={()=> setActiveYear(activeYearPlusFour)}> {activeYearPlusFour.toString()} </button>
    <button className = 'buttonYear' onClick={()=> setActiveYear(activeYearPlusFive)}> {activeYearPlusFive.toString()} </button>


</article>
  )
};

function SelectMonthArticle() {
  return (
    <article className = 'monthArticle' >
  <h2 className='h2Month'>Select Month</h2>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(0)}> Jan </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(1)}> Feb </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(2)}> Mar </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(3)}> Apr </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(4)}> May </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(5)}> Jun </button>
    <br></br>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(6)}> Jul </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(7)}> Aug </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(8)}> Sep </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(9)}> Oct </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(10)}> Nov </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(11)}> Dec </button>
</article>
  )
}

function ActiveDateArticle() {
  return (
    <article className = 'activeDateArticle'>
  <h2 className='h2Month'> Availabilities for </h2>
  <h1 className='h1Table'> { monthToNameLong() } { activeYear } </h1>
</article>
  )
}

//////   FUNCTION FOR NUDE TABLES FOR UNLOCK AND SET ALLS   //////
function MapNudeTableUnlock() {
  return (
    <>
    <tr>
      <th className='thDateNude'></th>

      {
        numberOfMembersArray().map((user) => {
          return (
            <td key={user} className='tdUserNude'>
            <button onClick={()=>
              setUnlock(prev=>{return {...prev, [`user${user}`]: !unlock[`user${user}`]};})} 
              className={ unlock[`user${user}`] ? 'myButtonLocked' : 'myButtonUnlocked' }
              > { unlock[`user${user}`] ? <Image src={lockIcon} alt="lock" style={{height: '95%', width: '95%'}} /> : <Image src={unlockIcon} alt="unlock" style={{height: '95%', width: '95%'}} />} 
            </button>
          </td>
          )
        })
      }

    </tr> 
    </>
  )
};

function MapNudeTableSetAllAvailable() {
  return (
    <>
    <tr>
    <th className='thDateNude'> Set All Avail</th>

      {
        numberOfMembersArray().map((user)=> {
          const setAll = () => {
            if (user == 1) {
              return (
                setAllAvailUser1
              )
            };
            if (user == 2) {
              return (
                setAllAvailUser2
              )
            }; 
            if (user == 3) {
              return (
                setAllAvailUser3
              )
            }; 
            if (user == 4) {
              return (
                setAllAvailUser4
              )
            }; 
            if (user == 5) {
              return (
                setAllAvailUser5
              )
            }; 
            if (user == 6) {
              return (
                setAllAvailUser6
              )
            }; 
            if (user == 7) {
              return (
                setAllAvailUser7
              )
            }; 
            if (user == 8) {
              return (
                setAllAvailUser8
              )
            }; 
            if (user == 9) {
              return (
                setAllAvailUser9
              )
            }; 
            if (user == 10) {
              return (
                setAllAvailUser10
              )
            }         
            else {
              console.log('map if else error- else ran')
            }
          }
          return (
            <td key={user} className='tdUserNude'>
              <button disabled={ unlock[`user${user}`] } 
                className='myButtonSetAllAvail' 
                onClick={ setAll() }>
                <Image src={personAvailableSolid} alt="available" /> <br></br> 
              </button>
            </td>
          )
        })
      }
         
    </tr>
    </>
  )
};

function MapNudeTableSetAllUnavailable() {
  return (
    <>
    <tr>
    <th className='thDateNude'> Set All N/A </th>

      {
        numberOfMembersArray().map((user)=> {
          const setAll = () => {
            if (user == 1) {
              return (
                setAllUnAvailUser1
              )
            };
            if (user == 2) {
              return (
                setAllUnAvailUser2
              )
            }; 
            if (user == 3) {
              return (
                setAllUnAvailUser3
              )
            }; 
            if (user == 4) {
              return (
                setAllUnAvailUser4
              )
            }; 
            if (user == 5) {
              return (
                setAllUnAvailUser5
              )
            }; 
            if (user == 6) {
              return (
                setAllUnAvailUser6
              )
            }; 
            if (user == 7) {
              return (
                setAllUnAvailUser7
              )
            }; 
            if (user == 8) {
              return (
                setAllUnAvailUser8
              )
            }; 
            if (user == 9) {
              return (
                setAllUnAvailUser9
              )
            }; 
            if (user == 10) {
              return (
                setAllUnAvailUser10
              )
            }         
            else {
              console.log('map if else error- else ran')
            }
          }
          return (
            <td key={user} className='tdUserNude'>
              <button disabled={ unlock[`user${user}`] } 
                className='myButtonSetAllUnavail' 
                onClick={ setAll() }>
                <Image src={personUnavailableSolid} alt="Unavailable" /> <br></br> 
              </button>
            </td>
          )
        })
      }
         
    </tr>
    </>
  )
};

function AllNudeTables() {
  return (
    <article>
    <table className='tableNude'>
    <tbody>
    <MapNudeTableUnlock/>
    <MapNudeTableSetAllAvailable/>
    <MapNudeTableSetAllUnavailable/>
    </tbody>
    </table>
    </article>
  )
}

//////   FUNCTION FOR MAKING HEADING ROW OF AVAIL TABLE   //////

function MapAvailTableHeaders () {
  
  return (
    <>
      <tr className='trAvailTable'>
        <th className="thHeadDate"> Day <br/> Date </th>
          {
            numberOfMembersArray().map((user) => {
              if (user == 1) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad1 } </th>
                )
              }
              if (user == 2) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad2 } </th>
                )
              }
              if (user == 3) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad3 } </th>
                )
              }
              if (user == 4) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad4 } </th>
                )
              }
              if (user == 5) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad5 } </th>
                )
              }
              if (user == 6) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad6 } </th>
                )
              }
              if (user == 7) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad7 } </th>
                )
              }
              if (user == 8) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad8 } </th>
                )
              }
              if (user == 9) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad9 } </th>
                )
              }
              if (user == 10) {
                return (
                  <th key={user} className="thHeadUser"> { userNameOnLoad10 } </th>
                )
              }
            })
          }
      </tr>
    </>
  )
};


//////   FUNCTION FOR AVAIL TABLE    //////
function MapEachDayAndUserAvailTable({day, user}) {
  
  const table = daysArray.map((day) => {
    if (hide29 == true && day == 29) {
      return (<></>)
    };
    if (hide30 == true && day == 30 ) {
      return (<></>)

    };
    if (hide31 == true && day == 31)
    {
      return (<></>)

    } else {
      return (
        <tr key={day} className='trAvailTable'>
        <th className="thDate"> { tableDayName(day - 1) } <br/> { monthToName() } { tableDayNameArray[day - 1] } <br/>  </th>
        {  numberOfMembersArray().map((user) => {
          const handle = () => {
            if (user == 1) {
              return (
                handleClick1(day)
              )
            };
            if (user == 2) {
              return (
                handleClick2(day)
              )
            }; 
            if (user == 3) {
              return (
                handleClick3(day)
              )
            }; 
            if (user == 4) {
              return (
                handleClick4(day)
              )
            }; 
            if (user == 5) {
              return (
                handleClick5(day)
              )
            }; 
            if (user == 6) {
              return (
                handleClick6(day)
              )
            }; 
            if (user == 7) {
              return (
                handleClick7(day)
              )
            }; 
            if (user == 8) {
              return (
                handleClick8(day)
              )
            }; 
            if (user == 9) {
              return (
                handleClick9(day)
              )
            }; 
            if (user == 10) {
              return (
                handleClick10(day)
              )
            }         
            else {
              console.log('map if else error- else ran')
            }
  
          }
  
          return (
            <td className = "tdUser" key={user}>       
            <button 
            disabled={ unlock[`user${user}`] }
            onClick={ () => {
              handle()    
            }} className={ users[`user${user}`][`day${day}`]? 'buttonAvail' : 'buttonUnavail' } 
            > { users[`user${user}`][`day${day}`]  ? < Image src={personAvailable} alt="Available"/> : < Image src={personUnavailable} alt="Unavailable"/> }
            </button>     
          </td>
          )})}
        </tr>
      )
    }
  })

  return (
    <>
    {table}
    </>
  )
};

function AllAvailTables () {
  return (
    <article>
  <table className='tableAvails'>
    <tbody>

    <MapAvailTableHeaders/>
    <MapEachDayAndUserAvailTable/>

    </tbody>
  </table>
</article>
  )
}

function DisclaimerArticle() {
  return (
    <article className = 'disclaimerArticle'>
  <h3 className = 'h3Disclaimer'>
    <br></br>
    If you experience any problems using this website, um...   
    <br></br>
  </h3>
</article>
  )
}

function MainTable() {
  return (
currentUser && showMain ? 
<div className= {'mainDiv'}>

      <MainTableToggleButton/>

      <ShowAllAvailDates/>

      <br></br>
      <br></br>

      <SelectYearArticle/>

      <br></br>

      <SelectMonthArticle/>

      <br></br>

      <ActiveDateArticle/>

      <br></br>

      <AllNudeTables/>


      <AllAvailTables/>

      {/* <br></br>

      <DisclaimerArticle/> */}
    </div>
    :
    <div className='mainDiv'>
      <MainTableToggleButton/>
    </div>

  )
}


//////   RETURN ELEMENTS   //////
return (
<div className = 'myDiv'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <WelcomeScreen/>

  <HomeButtonDiv/>

  <LoginInfoNav/>

  <OpenSignupDivWindow/>

  {/* <UpdateEmailDiv/> */}

  <BandInfoInputNav/>

  <MainTable/>  
</div> 
);
}
