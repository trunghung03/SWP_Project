import React from 'react';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar.js';

const ManagerStatitic = () => {
    return (
        <div className="ManagerStatitic">
            <div>
                <h4>Trang này trang bắt đầu chưa cần chỉnh j nên bấm manage diamond trong sidebar rồi chỉnh ik,
                    đã nối sẵn route trong app.js nên chỉ cần gọi link với chỉnh mấy screen
                    ManagerAddDiamond.js .scss, ManagerUpdateDiamond.js .scss, ManagerManageDiamond.js .scss với ManagerService.js,
                    link qua screen manage diamond là /managerManageDiamond,
                    link qua screen add diamond là /managerAddDiamond,
                    link qua screen update diamond là /managerUpdateDiamond
                </h4>
                <ManagerSidebar currentPage="manager_statitic" />
            </div>
        </div>
    );
};

export default ManagerStatitic;
