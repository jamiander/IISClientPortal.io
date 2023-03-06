import { Company, Initiative, selectAllCompanies } from "../../Store/CompanySlice"
import { cancelButtonStyle, inputStyle, modalStyle, submitButtonStyle } from "../../Styles"
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { DateInput } from "../DateInput";
import { DateInfo } from "../../Services/CompanyService";
import { useAppSelector } from "../../Store/Hooks";

interface InitiativeModalProps {
	title: string
	initiative?: Initiative
	initiativeIsOpen: boolean
	setInitiativeIsOpen: (value: boolean) => void
	Submit: (initiative: Initiative, companyId: number) => void
	company?: Company
}

export const InitiativeModalIds = {
	modal: "initModal",
	company: "initModalCompany",
	title: "initModalTitle",
	date: {
		month: "initModalMonth",
		day: "initModalDay",
		year: "initModalYear"
	},
	totalItems: "initModalTotalItems",
}

export function UpdateInitiativeListModal(props: InitiativeModalProps){
  const emptyDate: DateInfo = {month: 0, day: 0, year: 0}
  const companyList = useAppSelector(selectAllCompanies);
  const [initiativeCompanyId, setInitiativeCompanyId] = useState(props.company?.id ?? -1);
  const [initiativeTitle, setInitiativeTitle] = useState(props.initiative?.title ?? "");
  const [initiativeTargetDate, setInitiativeTargetDate] = useState<DateInfo>(props.initiative?.targetDate ?? emptyDate);
  const [initiativeTotalItems, setInitiativeTotalItems] = useState(props.initiative?.totalItems ?? 0);

  useEffect(() => {
    setInitiativeTitle(props.initiative?.title ?? "");
    setInitiativeTargetDate(props.initiative?.targetDate ?? emptyDate);
    setInitiativeTotalItems(props.initiative?.totalItems ?? 0);
	  setInitiativeCompanyId(props.company?.id ?? -1);
  }, [props.initiative,props.company])

	return (
		<Modal
			id={InitiativeModalIds.modal}
			isOpen={props.initiativeIsOpen}
			onRequestClose={() => props.setInitiativeIsOpen(false)}
			style={{'content': {...modalStyle.content, 'width' : '25%'}}}
			appElement={document.getElementById('root') as HTMLElement}     
		>

			<p className='text-3xl'>{props.title}</p>

			<div className='w-full'>
				<p className='my-1'>Company</p>
        <p>{props.company ? ": " + props.company.name : 
          <div>
            <select id={InitiativeModalIds.company} onChange={(e) => setInitiativeCompanyId(parseInt(e.target.value))} 
            className='outline outline-1 rounded p-2'
            >
              <option>Select Company</option>
              {
                companyList?.map((company, index) => {
                  return (
                    <option value={company.id} key={index}>{company.name}</option>
                  )
                })
              }
            </select>
          </div>}
				</p>

				<p className='my-1'>Title</p>
				<input defaultValue={props.initiative?.title} id={InitiativeModalIds.title} className={inputStyle + ' w-3/4'} placeholder='Initiative Title'
          onChange={(e) => {setInitiativeTitle(e.target.value)}}/>
				
        <div className='my-2 p-2 outline outline-1 outline-[#879794] rounded'>
          <p className=''>Target Completion</p>
				  <DateInput date={initiativeTargetDate} setDate={setInitiativeTargetDate} inputIds={InitiativeModalIds.date} defaultDate={props.initiative?.targetDate}/>
        </div>
      </div>
      
      <div className='mt-2 justify-between flex'>
          <div className='w-24'>
            <p>Total Items</p>
            <input defaultValue={props.initiative?.totalItems} id={InitiativeModalIds.totalItems} type={'number'} placeholder='###' className={inputStyle} onChange={(e) => {setInitiativeTotalItems(parseInt(e.target.value))}}/>
          </div>
  
          <div className='h-10'>
            <button className={submitButtonStyle + ' mt-6'} 
              onClick={() => {
                let initiative : Initiative = {
                  id: props.initiative?.id ?? -1,
                  title: initiativeTitle,
                  targetDate: initiativeTargetDate,
                  totalItems: initiativeTotalItems,
                  itemsCompletedOnDate: props.initiative?.itemsCompletedOnDate ?? []
                }
                props.Submit(initiative,initiativeCompanyId)
              }}> Submit
            </button>
            <button className={cancelButtonStyle} onClick={() => props.setInitiativeIsOpen(false)}>Close</button> 
          
          </div>
        </div>
		</Modal>

	)
}
