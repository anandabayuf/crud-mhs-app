import { useState } from "react"
import { PlusCircle, Pencil, Trash3 } from "react-bootstrap-icons"
import { backgroundColor, textPrimary, textSecondary } from "../utils/ColorPallete";
import EmptyBoxImg from "../assets/images/empty-box.png"
import ModalDeleteConfirmation from "../components/ModalDeleteConfirmation";
import ModalMahasiswa from "../components/ModalMahasiswa";

function ListMahasiswa(){
    const [listMahasiswa, setListMahasiswa] = useState([]);
    const [mahasiswa, setMahasiswa] = useState({});

    //for edit and delete
    const [index, setIndex] = useState(null)
    const [isEdit, setisEdit] = useState(false)

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setMahasiswa({
            ...mahasiswa,
            [key]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isEdit){
            let listMhs = [...listMahasiswa];
            listMhs.splice(index, 1, mahasiswa);

            setListMahasiswa(listMhs);

            setisEdit(false);
            setIndex(null);
        }
        else {
            setListMahasiswa([...listMahasiswa, mahasiswa]);
        }

        setMahasiswa({});
    }

    const handleOpenModalCreate = () => {
        setMahasiswa({});
        setIndex(null);
        setisEdit(false);
    }

    const handleOpenModalEdit = (mahasiswa, index) => {
        setMahasiswa(mahasiswa);
        setIndex(index);
        setisEdit(true);
    }

    const handleOpenModalDelete = (mahasiswa, index) => {
        setMahasiswa(mahasiswa);
        setIndex(index);
    }

    const handleDelete = (index) => {
        let listMhs = [...listMahasiswa];

        listMhs.splice(index, 1);

        setListMahasiswa(listMhs);        

        setMahasiswa({});
        setIndex(null);
    }

    const stylePage = {
        backgroundColor: backgroundColor,
        padding: "30px"
    }

    const styleButtonCreateMhs = {
        backgroundColor: textSecondary
    }

    return (
        <div className="min-vh-100" style={stylePage}>
            <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                    <h5 style={{color: textPrimary}}>List Mahasiswa</h5>
                </div>
                <div className="col-auto">
                    <button className="btn btn-lg shadow text-light" style={styleButtonCreateMhs} data-bs-toggle="modal" data-bs-target="#createmahasiswamodal" onClick={handleOpenModalCreate}>
                        <span><PlusCircle/> Create Mahasiswa</span>
                    </button>
                </div>
            </div>
            <div className="mt-5">
                {
                    listMahasiswa.length > 0 ?
                    <table className="table">
                        <thead className="text-center">
                            <tr style={{color: textSecondary}}>
                                <td>No</td>
                                <td>NIK</td>
                                <td>Nama</td>
                                <td>Jurusan</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listMahasiswa.map((mahasiswa, index) => {
                                    return (
                                        <tr key={index} style={{color: textPrimary}} className="text-center">
                                            <td>{index + 1}</td>
                                            <td>{mahasiswa.nik}</td>
                                            <td>{mahasiswa.nama}</td>
                                            <td>{mahasiswa.jurusan}</td>
                                            <td>{mahasiswa.status}</td>
                                            <td>
                                                <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#editmahasiswamodal" onClick={() => handleOpenModalEdit(mahasiswa, index)}><span><Pencil/> Edit</span></button>&nbsp;&nbsp;&nbsp;
                                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteconfirmationmodal" onClick={() => handleOpenModalDelete(mahasiswa, index)}><span><Trash3/> Delete</span></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    :
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="mb-3">
                            <img src={EmptyBoxImg} alt="no data" width="128px"/>
                        </div>
                        <div style={{color: textSecondary}}>
                            No Data Available
                        </div>
                    </div>
                }
            </div>
            <ModalDeleteConfirmation mahasiswa={mahasiswa} index={index} handleDelete={handleDelete}/>
            <ModalMahasiswa idModal="createmahasiswamodal" titleModal="Create Mahasiswa" mahasiswa={mahasiswa} handleChange={handleChange} handleSubmit={handleSubmit}/>
            <ModalMahasiswa idModal="editmahasiswamodal" titleModal="Edit Mahasiswa" mahasiswa={mahasiswa} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default ListMahasiswa;