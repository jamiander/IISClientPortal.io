import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import Content from "../Layout/Content";
import { modalStyle } from "../Pages/AdminPage";
import { UpdateCompanyInfo } from "../Services/CompanyService";
import { Company } from "../Store/CompanySlice";
import { User } from "../Store/UserSlice";

interface EditUserProps {
    EditUserIsOpen: boolean,
    setEditUserIsOpen: (value: boolean) => void,
    user: User,
    company: Company,
    SubmitUpdateUser: (companyName: string, email: string, password: string) => void,
    ValidateEdit: (companyName: string, companyId: number, userEmail: string, userPassword: string, userId: number) => boolean
}

export default function EditUserModal(props: EditUserProps) {
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState(props.company.name);
    const [email, setEmail] = useState(props.user.email);
    const [password, setPassword] = useState(props.user.password);

    useEffect(() => {
        setCompanyName(props.company.name);
        setEmail(props.user.email);
        setPassword(props.user.password);
    }, [props.company,props.user])

    return (
        <div>
            {/* <button className="m-1 bg-[#21345b] text-white w-[90%] h-[90%] rounded-md"
                onClick={() => props.setEditUserIsOpen(true)}
            >  
                Edit User
            </button> */}
            <Modal
                isOpen={props.EditUserIsOpen}
                onRequestClose={() => props.setEditUserIsOpen(false)}
                style={{'content': {...modalStyle.content, 'width' : '25%'}}}
                appElement={document.getElementById('root') as HTMLElement}
            >
                <h4 className="mb-3">Edit User</h4>

                <div className="w-full">
                    <p className='my-1'>Company Name:</p>
                    <input defaultValue={props.company.name} onChange={(e) => setCompanyName(e.target.value)} id="modalCompany"  className="outline rounded outline-1 p-2 w-full"/>

                    <p className='my-1'>Email:</p>            
                    <input defaultValue={props.user.email} onChange={(e) => setEmail(e.target.value)}  id="modalEmail"  className="outline rounded outline-1 p-2 w-full"/>

                    <p className='my-1'>Password:</p>
                    <input defaultValue={props.user.password} onChange={(e) => setPassword(e.target.value)}  id="modalPassword" className="outline rounded outline-1 p-2 w-full"/>
                </div>

                <div className='mt-2'>
                    <button disabled={!props.ValidateEdit(companyName,props.company.id,email,password,props.user.id)} className="m-2 mr-1 rounded-md h-[40px] w-[80px] bg-lime-600" onClick={() => {props.SubmitUpdateUser(companyName, email, password)}}>Submit</button>
                    <button className="m-2 ml-1 rounded-md h-[40px] w-[80px] bg-red-600" onClick={() => props.setEditUserIsOpen(false)}>Close</button> 
                </div>

            </Modal>
        </div>
    )
}