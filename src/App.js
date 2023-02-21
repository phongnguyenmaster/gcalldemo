import { useState, useEffect } from 'react';
import { CallMode, Phone, Video } from './components';
import { History } from './components';
import { Container, Inner } from './components/Phone/styles/styles'
import { Option } from './components';
import JsSIP from 'jssip';
import { useSelector, useDispatch } from 'react-redux';
import { saveLog, getLog } from './features/logCall/logCallSlice';
import swal from 'sweetalert';
import audioPlayer from './audioPlayer';



const socket = new JsSIP.WebSocketInterface('wss://sbc03.tel4vn.com:7444');
socket.via_transport = 'auto';

const user = '101';
const pass = 'test1101';
const userAgent = JsSIP.version;
const configuration = {
   uri: `sip:${user}@2-test1.gcalls.vn:50061`,
   password: pass,
   sockets: [socket],
   register_expires: 180,
   session_timers: false,
   user_agent: 'JsSip-' + userAgent,
};
const peer = new RTCPeerConnection({
   iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
});
//JsSIP.debug.enable('JsSIP: *'); // log error jssip
JsSIP.debug.disable('JsSIP:*');
const phoneUA = new JsSIP.UA(configuration); //init class phone



function App() {
   const [valueInput, setValueInput] = useState('');
   const [callMode, setCallMode] = useState(false);
   const [option, setOption] = useState('call');
   const [status, setStatus] = useState('');
   const dispatch = useDispatch();

   const dataLogs = useSelector(state => state.logCall.data);
   // 0 Cancel
   // 1 Sucess
   const [statusCall, setStatusCall] = useState(0);
   const [timesCall, setTimesCall] = useState(0);
   const [sessionCall, setSessionCall] = useState(null);

   const [calling, setCalling] = useState(false);

   const eventHandlers = {
      connecting: function (e) {
         setStatus('Connecting');
      },
      progress: function () {
         setStatus('Ringing');
      },
      failed: function (e) {
         console.log(e)
         if (e.cause === "User Denied Media Access") {
            swal("Oops!", "Bạn chưa bật Microphone! Vui lòng thử lại", "error");
            handleEndSession();
         } else {
            audioPlayer.play('rejected');
         }
         setStatus('Failed');

      },
      confirmed: function () {
         //  alert('confirmed');
         setStatus('Confirmed');
      },
      accepted: function () {
         audioPlayer.play('answered');
         setStatus('Accepted');
      },
      ended: function () {
         setStatus('Ended');
      },
      getusermediafailed: function () {
      }

   };

   const callOptions = {
      eventHandlers: eventHandlers,
      pcConfig:
      {
         rtcpMuxPolicy: 'negotiate',
         iceServers:
            [
               { urls: ['stun:stun.l.google.com:19302'] }
            ]
      },
      mediaConstraints:
      {
         audio: true,
         video: false
      },
      rtcOfferConstraints:
      {
         offerToReceiveAudio: 1,
         offerToReceiveVideo: 1
      }
   };
   const isValidPhone = phone => phone.match(/\d/g) && phone.length >= 8 && phone.length <= 11


   const startPhoneCall = () => {
      if (callMode || calling || sessionCall != null) return;
      if (!isValidPhone(valueInput)) {
         swal("Oops!", "Số điện thoại không hợp lệ! Vui lòng thử lại", "error");
         return;
      }

      setCalling(true);
      setStatus('Connecting');

      phoneUA.start();
      const session = phoneUA.call(valueInput.toString(), callOptions);
      session.on('connecting', () => {
         setSessionCall(session);
      });

      setTimeout(() => {
         setCallMode(true);
      }, 1000);
   }

   const handleSaveLog = (_timeCall, _statusCall) => {

      dispatch(saveLog(
         {
            phoneNumber: valueInput.toString(),
            timeCall: _timeCall,
            statusCall: _statusCall,
         }
      ))
   }

   const handleEndSession = () => {
      // call api
      phoneUA.stop();
      if (calling) {
         handleSaveLog(timesCall, statusCall);
      }
      setCalling(false);
      setStatusCall(0);
      setSessionCall(null);
      setTimeout(() => {
         setCallMode(false);

      }, 1000);
   }

   const clickEnd = () => {
      phoneUA.stop();
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         setTimesCall((prevState) => {
            return prevState + 1;
         });
      }, 1000);
      if (status !== 'Confirmed') {
         clearTimeout(timer);
         setTimesCall(0);
      }

   }, [status, timesCall]);

   useEffect(() => {
      if (status === 'Confirmed') {
         setStatusCall(1);
      }
      if (status === 'Ended' || status === 'Failed') {
         handleEndSession();
      }
   }, [status]);

   const getData = async () => {
      dispatch(getLog());
   };

   useEffect(() => {
      console.log('getData')
      getData();

      // TODO: incoming call
      phoneUA.on('newRTCSession', (data) => {
         console.log('newRTCSession', data.session.connection.getRemoteStreams())
      })
      window.addEventListener("beforeunload", (ev) => {
         handleEndSession();
         return true;
      });

   }, []);


   return (
      <div>
         <Video sessionCall={sessionCall} />
         {!callMode ? (
            <Container>
               <Inner>
                  {option === 'call' ? (
                     <Phone
                        calling={calling}
                        clickCall={startPhoneCall}
                        setValueInput={setValueInput}
                        valueInput={valueInput}
                     />
                  ) : (
                     <History data={dataLogs} />
                  )}
                  <Option setOption={setOption} />
               </Inner>
            </Container>
         ) : (
            <CallMode
               valueInput={valueInput}
               status={status}
               times={timesCall}
               clickEnd={clickEnd}
            />
         )}
      </div>
   );
}

export default App;
