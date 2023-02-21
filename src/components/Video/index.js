import { useEffect, useRef } from 'react';
import { VideoContainer } from './styles/styles'
export default function Video({ sessionCall }) {

   const refRemote = useRef();
   const localVideo = useRef();
   const handleRemoteStream = () => {
      const peerconnection = sessionCall.connection;
      // const remoteStream = peerconnection.getRemoteStreams()[0];
      // const localStream = peerconnection.getLocalStreams()[0];

      peerconnection.addEventListener('addstream', (event) => {
         console.log('peerconnection "addstream" event');
         refRemote.current.srcObject = event.stream;
      });
   }
   useEffect(() => {
      if (sessionCall) {
         handleRemoteStream();
      }
   }, [sessionCall])
   return (
      <VideoContainer>
         <video ref={localVideo} id="selfView" autoPlay ></video>
         <video
            ref={refRemote}
            id={'remoteVideo'}
            autoPlay
         />

      </VideoContainer>
   );
}
