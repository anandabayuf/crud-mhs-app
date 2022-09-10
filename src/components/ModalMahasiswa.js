import { textPrimary, backgroundColor } from "../utils/ColorPallete"
import FormMahasiswa from './FormMahasiswa';

function ModalMahasiswa(props){
    const modalStyle = {
        backgroundColor: backgroundColor
    }

    return (
        <div className="modal fade" id={props.idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={modalStyle}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{color: textPrimary}}>{props.titleModal}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <FormMahasiswa mhs={props.mahasiswa} handleChange={props.handleChange}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalMahasiswa;