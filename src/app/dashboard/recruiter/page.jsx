'use client'
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useSession } from '@/lib/auth-client';
import { FileText, Persons, CircleCheck, Briefcase } from "@gravity-ui/icons";

const RecruiterDashboardHomePage = () => {
    const {data:session, isPending} = useSession()
    if(isPending){
        return <div> Loading...</div>
    }
    const user = session?.user;

    const recruiterStats = [
    { id: "posts", title: "Total Job Posts", value: "48", icon: FileText },
    { id: "apps", title: "Total Applicants", value: "1,284", icon: Persons },
    { id: "active", title: "Active Jobs", value: "18", icon: Briefcase },
    { id: "closed", title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];

    return (
        <div> 
            <p className='text-2xl font-bold'> Welcome back, {user?.name} </p>
            <DashboardStats statsData={recruiterStats}/>
        </div>
    );
};

export default RecruiterDashboardHomePage;