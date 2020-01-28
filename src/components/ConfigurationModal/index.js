import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ConfigurationModal = props => {
    const [amountHourPerMonth, setAmountHourPerMonth] = useState(props.amountHourPerMonth);
    const [timeLunchBreak, setTimeLunchBreak] = useState(props.timeLunchBreak);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);

    return (
      <Modal isOpen={props.showModal}>
        <ModalHeader>Configuration</ModalHeader>
        <ModalBody>
            <label>Amount hour per month for work?</label>
            <input type="number" value={amountHourPerMonth} onChange={e => setAmountHourPerMonth(e.target.value)} className="form-control m-3" placeholder="160"/>
            <label>Time for lunch break?</label>
            <input type="number" value={timeLunchBreak} onChange={e => setTimeLunchBreak(e.target.value)} className="form-control m-3" placeholder="160"/>
            {/* <label>Change email?</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control m-3" placeholder='employee@company.com'/>
            <label>Change password?</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control m-3"/> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e => props.confirmModal(email, password, amountHourPerMonth, timeLunchBreak)}>Confirm</Button>
          <Button color="secondary" onClick={props.cancelModal}>Cancel</Button>
        </ModalFooter>
      </Modal>  
    );
}

export default ConfigurationModal;