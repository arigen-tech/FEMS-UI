import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar';
import Layout from '../Components/Layout';
import CaseRegister from '../Data/CaseRegister';

function CaseRegisterLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <Layout>
            <CaseRegister />
        </Layout>
    )
}

export default CaseRegisterLayout;