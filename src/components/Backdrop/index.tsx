import React  from 'react';
import {BackdropDiv} from './styles';

interface BackdropProps {
    show: boolean,
    clicked: () => void,
}

const Backdrop: React.FC<BackdropProps> = ({show, clicked, children}) => {
    
    return (
        show ? <BackdropDiv onTouchStart={clicked}>{children}</BackdropDiv> : null
    )
}

export default Backdrop;