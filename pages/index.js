import Head from 'next/head'
import Image from 'next/image'
import { Inter } from "next/font/google"
import styles from '@/styles/Home.module.css'
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
  signInWithEmailAndPassword
} from 'firebase/auth';
// import { useGridApiContext } from '@mui/x-data-grid';

const inter = Inter({ subsets: ['latin'] })


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
  const [uid, setUid] = useState('userID');

//////   SETS THE USER ID STATE (setUID)   //////
useEffect(() => {
  const setUID = async () => {
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

const [ numberOfMembersOnLoad, setNumberOfMembersOnLoad] = useState(4); 
const [ bandNameOnLoad, setBandNameOnLoad ] = useState('BAND');
const [ updateTrig, setUpdateTrig] = useState(false);

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

const [currentLogName, setCurrentLogName] = useState('MJK');

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

const daysArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28, 29, 30, 31];

//////   TOGGLES IF BAND INFO SECTION IS SHOWN   //////
const NavToggleButton = () => {
  const changeToggleState = () => {
    setBandInfoToggle(prev=>!prev)
  }
  // console.log('bandinfo', bandInfoToggle)
  return (
    <button onClick={changeToggleState}> Toggle Band Info </button>
  )
};


//////   CAUSES UPDATE TRIGGER TO FIRE WHICH UPDATES FIRESTORE BAND INFO LOAD ON START USEEFFECT   //////
function UpdateButton() {
  const handleClick = () => {
    setUpdateTrig(prev=>!prev);
  };

  return (
    <button onClick={handleClick}> Update Band Information </button>
  )
};

//////   FIRESTORE DOCREF   //////

const docRef = doc ( db, uid.toString(), activeYear.toString(), 'Availability', activeMonth.toString() );
const setDocRef = doc ( db, uid.toString(), activeYear.toString(), 'Availability', activeMonth.toString() );

//////   FIRESTORE BAND INFO LOAD ON START   //////
const docRefBandInfo = doc ( db, uid.toString(), 'info' );
const colRefBandInfo = collection ( db, uid.toString() );


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
const emailRef = useRef();
const passwordRef = useRef();
const currentUser = useAuth();
const [passwordVisible, setPasswordVisible] = useState(false);


function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user =>  setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signupFillCloud = () => {
  console.log('signup 1 2 3', bandNameOnLoad, numberOfMembersOnLoad, userNamesOnLoad);
  console.log('bandNameonLoad in fill', bandNameOnLoad);
  setDoc(docRefBandInfo, { numberOfMembers: numberOfMembersOnLoad, bandName: bandNameOnLoad,  userNames: userNamesOnLoad});
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
    ],          
  }); 
  console.log('signupFillCloud ran');
};

async function handleSignup() {
  setLoading(true);
  try {
    await signup([emailRef.current.value] + '@gmail.com', passwordRef.current.value);
    console.log('handle signUp try ran');
    signupFillCloud();
  } catch {
    console.log*'handleSignup catch ran'
    // alert('That user already exists, or your PW was less than 6 characters')
  };
  setLoading(false);
};



function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function handleLogin() {
  setLoading(true);
  try {
    await login([emailRef.current.value] + '@gmail.com', passwordRef.current.value);
    setCurrentLogName(emailRef.current.value);
    console.log('here emailRef.current.value', emailRef.current.value);
  } catch {
    alert('The email and/or password was incorrect.')
  }
  setLoading(false);
}

function logout() {
  return signOut(auth);
}

async function handleLogout() {
  setLoading(true);
  try {
  await logout();
} catch {
  alert('error');
}
  setLoading(false);
}

function togglePasswordVisible() {
  setPasswordVisible(!passwordVisible);
}







//////   SHOW OR HIDE MAIN TABLE   //////

function MainTableToggleButton() {
  const run = () => {
    setLoadTrig(prev => !prev);
    setShowMain(prev => !prev);
    console.log('run ran');
  }
  return (
    <button onClick={run}> Show Availabilities Table </button>
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


//////   LOADDOC 
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
      if ( cloudState.exists() ) {
        console.log('docSnap exists is true in load band info on start');
        console.log(bandNameOnLoad, 'bandNameOnLoad')
        setNumberOfMembersOnLoad(cloudState.numberOfMembers);
        setBandNameOnLoad(cloudState.bandName);
        setUserNamesOnLoad([cloudState.userNames]);
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
        console.log('if ran')
        return [ tableDayNameLong(day-1) , ' ', tableDayNameArray[day-1], ' ', monthToNameLong(), br ]
      } else {
        console.log('else ran in MapAllFree function')

      } 
    })
  )
};

//////   FUNCTIONS FOR RETURN ELEMENTS   //////

function TaglineDiv() {
  return (
    <div className='infoDiv'>
<article className = 'tagLineArticle'>
  <h1 className = 'h1TagLine'> Powered by Useful Idiot Events... </h1>
</article>
</div>
  )
}

console.log('emailRef', emailRef);
console.log('currentUser?.email', currentUser?.email);
console.log('currentLogName', currentLogName);

function LoginInfoNav() {
  return (
    <nav className='infoDiv'>
      <div> Currently Logged In As: { bandNameOnLoad } </div>
      <div> Current UserID: {uid} </div>
      {/* <div> Currently Logged In As:  {emailRef?.current.value}  </div> */}
      { currentUser ? null :
        <div id='fields'>
          <input ref={emailRef} placeholder='User Name'/>
          <input ref={passwordRef} type={passwordVisible ? '' : 'password'} placeholder='Password'/>
          <button onClick={ togglePasswordVisible }> Show or Hide PW </button>

        </div>
      }
      <button disabled={loading || currentUser != null } onClick={handleSignup} > Sign Up </button>
      <button disabled={loading || currentUser != null } onClick={handleLogin} > Log In </button>
      <button disabled={loading || !currentUser } onClick={handleLogout}> Log Out </button>
      <br></br>
    </nav>
  )
};

console.log('userNamesOnLoad before BandInfoInoputNav', userNamesOnLoad);


//////   UPDATES FIRESTORE WITH NUMBER OF BAND MEMBERS AND BAND NAME AND NAMES OF BAND MEMBERS  //////
function BandInfoInputNav() {
  const [bandName, setBandName] = useState(bandNameOnLoad);
  const [numberOfMembers, setNumberOfMembers] = useState(numberOfMembersOnLoad); 
  const [userNames, setUserNames] = useState(userNamesOnLoad);

  console.log('userNames in BandInfoInoputNav', userNames);
  const bandNameSubmit = async () => {
    setBandInfoTrig(prev => !prev);

    try {
      const docSnap = await getDoc(docRefBandInfo);
      console.log('bandname docSnap ran');
      
      if (docSnap.exists()) {
        console.log('updateDoc bandInfo ran pre');
        updateDoc(docRefBandInfo, { bandName: bandName});
        console.log('updateDoc bandInfo if ran post');
      } else {
        setDoc(docRefBandInfo, { bandName: bandName});
        console.log('else name ran');
      }

    } catch {
      console.log('update band info error catch ran');
    }
    
  };

  const bandNumberSubmit = async () => {
    setBandInfoTrig(prev => !prev);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        console.log('bandnumb docSnap ran');
        
        if (docSnap.exists()) {
          console.log('updateDoc bandInfo number ran pre');
          updateDoc(docRefBandInfo, { numberOfMembers: numberOfMembers});
          console.log('updateDoc bandInfo nymber if ran post');
        } else {
          setDoc(docRefBandInfo, { numberOfMembers: numberOfMembers});
          console.log('else numberran');

        }
      } catch {

        console.log('update band info num error catch ran');
      };
  };

  const bandMemberNamesSubmit = async () => {
    setBandInfoTrig(prev => !prev);
      try {
        const docSnap = await getDoc(docRefBandInfo);
        console.log('band member names docSnap ran');
        
        if (docSnap.exists()) {
          console.log('updateDoc bandInfo names of members ran pre');
          updateDoc(docRefBandInfo, { userNames: userNames});
          console.log('updateDoc bandInfo names of members ran post');
        } else {
          setDoc(docRefBandInfo, { userNames: userNames});
          console.log('else names of members ran');

        }
      } catch {

        console.log('update band info num error catch ran');
      };
  };

  return (
    <>
      Current Band Name: {bandNameOnLoad} 
      <br/>

      Number of Members: {numberOfMembersOnLoad}
      <br/>
      <br/>

      Band Member Names: <br/>
      { numberOfMembersArray().map((user) => {
        // console.log('userNames[`nameUser${user}`]', userNames[`nameUser${user}`]);
        console.log('1 user', user);
        console.log('2 userNames', userNames);
        console.log('3 userNames.nameUser1', userNames.nameUser1)
        return (
          <div key={user}>
            Member Name {user}: {userNames[`nameUser${user}`]} <br/>
          </div>
        )
      })}

      <br/>
      <br/>
      



      <label>
        Update Band Name: 
        <input onChange={e => setBandName(e.target.value)}/>
      </label>

      <br/>

      <button onClick={bandNameSubmit}> Submit </button>

      <br/>
      <br/>

      <label>
        Select Number of Band Members: 
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
      </label>

   <button onClick={bandNumberSubmit}> Submit </button>

    <br/>
    <br/>

    <label>
        Update Band Members Names: 
        <br/>
        { numberOfMembersArray().map((user) => {
          return (
            <div key={user}>
            Name {user}:
            <br/>
            <input 
              onChange={e => setUserNames (
                prev=>{return{
                  ...userNames, [`nameUser${user}`]: e.target.value
                }}
                
              )}/>
              <button onClick={bandMemberNamesSubmit}> Submit </button>
              <br/>
            </div>
          )
        })
        }

    </label>
    <br/>
    <br/>



    <UpdateButton/>

    </>
  )
};

function AllNavs() {
  return (
    <div className= {bandInfoToggle ? 'mainDiv' : 'mainDivCollapse'}>
  <LoginInfoNav/>
  <br/>
  <BandInfoInputNav/>
  <br/>
</div>
  )
}

function ShowAllAvailDates () {
  return (
    <>
    <article className = 'availSumTitleArticle'>
  <h2 className = 'h2AvailSum'>
    For the month of <span className = 'h2AvailSumMonth'> {monthToNameLong()} {activeYear}</span>, everyone is free to jam on:
  </h2>
</article>

    <article className = 'availSumDatesArticle'>
  <h2 className = 'h2AllAvailDates'>
  
    <br></br>
    {/* {allFree1()} 
    {allFree2()} 
    {allFree3()} 
    {allFree4()} 
    {allFree5()} 
    {allFree6()} 
    {allFree7()} 
    {allFree8()} 
    {allFree9()} 
    {allFree10()} 
    {allFree11()} 
    {allFree12()} 
    {allFree13()} 
    {allFree14()} 
    {allFree15()} 
    {allFree16()} 
    {allFree17()} 
    {allFree18()} 
    {allFree19()} 
    {allFree20()} 
    {allFree21()} 
    {allFree22()} 
    {allFree23()} 
    {allFree24()} 
    {allFree25()} 
    {allFree26()} 
    {allFree27()} 
    {allFree28()} 
    {allFree29()} 
    {allFree30()} 
    {allFree31()}  */}
    <MapAllFree/>
    &nbsp;
  </h2>
</article>
</>
  )
}

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
  <h2>Select Month</h2>
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
  <h2> You are currently looking at: </h2>
  <h1> { monthToNameLong() } { activeYear } </h1>
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
      <tr>
        <th className="thHeadDate"> Day <br/> Date </th>
          {
            numberOfMembersArray().map((user) => {
              return (
                <th key={user} className="thHeadUser"> { userNamesOnLoad[`nameUser${user}`] } </th>
              )
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
        <tr key={day}>
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
    If you experience any problems using this website, please put them in your bum.   
    <br></br>
  </h3>
</article>
  )
}

function MainTable() {
  return (
    <div className= {currentUser && showMain ? 'mainDiv' : 'mainDivCollapse' }>
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

      <br></br>

      <DisclaimerArticle/>
    </div>
  )
}


//////   RETURN ELEMENTS   //////
return (
<div className = 'myDiv'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <TaglineDiv/>

  <NavToggleButton/>

  <AllNavs/>

  <br/>

  <MainTableToggleButton/>

  <MainTable/>  
</div> 
);
}
