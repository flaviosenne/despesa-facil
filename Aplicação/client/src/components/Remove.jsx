import React, { useState, useEffect} from 'react'
import '../CSS/Modal.css'
import { remove } from '../services/Methods'

export default Remove => {
    const  [modal, setModal] = useState('modal-remove') 
    
    useEffect(() =>{
        setModal('modal-remove')
    }, [Remove.cont])
    async function deleteFlow(e){
       await remove(e, Remove.id)
       setModal('modal-remove-none')
       window.location.reload()
    }
    return (
        <div className={modal} tabindex="-1">
            <div className='content'>
                <div className="content-header">
                    <h3>Exclusão de lançamento</h3>
                    <button onClick={() => setModal('modal-remove-none')}>X</button>
                </div>
                <hr />
                <div className="content-body">

                <h1>Deseja realmente deletar esse item?</h1>
                <div className="content-body-button">

                <button onClick={() => setModal('modal-remove-none')}> Cancelar</button>
                <button onClick={(e) => deleteFlow(e)}> Excluir</button>
                </div>
                </div>
            </div>
        </div>
    )
}