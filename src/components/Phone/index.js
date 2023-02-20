import { NumericKeyboard } from 'react-numeric-keyboard';
import { IoCall } from 'react-icons/io5';
import { Button } from '../../components';


export default function Phone({ clickCall, setValueInput, valueInput, calling }) {
   const onChange = ({ value }) => {
      setValueInput(value);
   };
   return (
      <>
         <div className="form">
            <input
               value={valueInput}
               className="input"
               type="text"
               onChange={(e) => {
                  setValueInput(e.target.value.replace(/\D/g,''));
               }}
            />
         </div>
         <NumericKeyboard
            isOpen={true}
            onChange={onChange}
            hasTransition={false}
            className="keyboard"
         />
         <Button
            disabled={calling}
            Icon={IoCall}
            backGround={'#4BD68A'}
            width={'150px'}
            valueInput={valueInput}
            onClick={clickCall}
         />
      </>
   );
}
