import { Frame } from './styles/styles';
import moment from 'moment'
import { IoCall, IoAlertCircleSharp, IoTimeOutline } from 'react-icons/io5';

const convert = (time) => {
   let sec_num = parseInt(time, 10); // don't forget the second param
   let hours = Math.floor(sec_num / 3600);
   let minutes = Math.floor((sec_num - hours * 3600) / 60);
   let seconds = sec_num - hours * 3600 - minutes * 60;

   if (hours < 10) {
      hours = '0' + hours;
   }
   if (minutes < 10) {
      minutes = '0' + minutes;
   }
   if (seconds < 10) {
      seconds = '0' + seconds;
   }
   return hours + ':' + minutes + ':' + seconds;
};
export default function History({ data }) {
   return (
      <Frame>
         <h1 className="title">Gần đây</h1>
         <div className='scroll-height' style={{ height: 450 }}>
            {data &&
               data.map((logCall, index) => (
                  <div key={index} className="log">
                     <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'
                     }}>
                        <div style={{
                           flex: 1,
                        }}>
                           <div style={{
                              display: 'flex',
                              alignItems: 'center'
                           }}>
                              {logCall.timeCall > 0 ?

                                 <IoCall />
                                 :
                                 <IoAlertCircleSharp></IoAlertCircleSharp>

                              }
                              <div style={{

                              }} className='phonenumber'>
                                 <span style={{
                                    color: logCall.timeCall <= 0 ? 'red' : ''
                                 }}>
                                    {' '} {logCall.phoneNumber}
                                 </span>
                                 {logCall.timeCall > 0 &&
                                    <div style={{ color: '#03a9f4' }}>{convert(logCall.timeCall)}</div>
                                 }
                              </div>
                           </div>
                        </div>
                        <div style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}>

                           {moment(logCall.createdAt).format('DD/MM/Y HH:mm')}
                           {' '}
                           <IoTimeOutline></IoTimeOutline>
                        </div>
                     </div>

                  </div>
               ))}
         </div>
      </Frame>
   );
}
