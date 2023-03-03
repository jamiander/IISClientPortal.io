import InitiativesTable from "../Components/Initiative/InitiativesTable";
import ValidateNewInitiative from "../Services/Validation";
import { selectAllCompanies } from "../Store/CompanySlice";
import { useAppSelector } from "../Store/Hooks"
import { selectCurrentUser } from "../Store/UserSlice";

export default function DashboardPage(){
  const user = useAppSelector(selectCurrentUser);
  const companyList = useAppSelector(selectAllCompanies);
  const company = companyList.find(e=>e.id === user?.companyId);
  const comp = useAppSelector(selectAllCompanies).filter((company) => company.id === user?.companyId);

  function Dashboard(){
    if(company?.initiatives === undefined || company.initiatives.length === 0){
      
      return(
        <p className="text-4xl">No Current Initiatives</p>
      )
    }else{
      return(
        <InitiativesTable companyList={comp} radioStatus={'active'} ValidateInitiative={ValidateNewInitiative}/>
      )
    }
  }

  return(
    <div className="my-[1%] mx-[2%] grid grid-cols-4">
      <div className="col-span-4 mb-4">
        <p className="text-5xl  bg-[#2ed7c3] rounded-md py-6 px-5">Dashboard</p>
      </div>
      <div className="col-span-4 bg-[#445362] rounded-md p-2 pl-5">
        <p className="text-3xl text-white h-[90%]">{company?.name} Initiatives</p>
      </div>
      <div className="col-span-4 h-[60vh] py-3">
        <Dashboard/>
      </div>
    </div>
  )
}