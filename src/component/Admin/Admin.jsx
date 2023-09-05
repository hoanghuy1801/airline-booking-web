import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ContainerOutlined,
    UserOutlined,
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
    RollbackOutlined

} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Avatar, Col } from 'antd';
import '../Admin/Admin.css'
import { Outlet, useNavigate } from 'react-router-dom';
import ManagerAdmin from './ManagerAdmin/ManagerAdmin';

const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Admin', 'admin', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),
    getItem('Trở về', 'backgoHomePage', <RollbackOutlined />),
];

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();


    const handleMenu = (info) => {
        if (info.key === 'backgoHomePage') {
            navigate('/');
        }
        if (info.key === 'admin') {
            navigate('/admins/manager-admin');
        }
    }
    return (
        <Layout className='menu-dashboard'>
            <Sider trigger={null} collapsible collapsed={collapsed} className='sider-menu'>
                <div className="demo-logo-vertical" />
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="drak"
                    items={items}
                    onClick={(info) => {
                        handleMenu(info);
                    }}

                />

            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Row>
                        <Col md={18}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined size='default' /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '15px',

                                }}
                            />

                        </Col>
                        <Col md={6}>
                            <div> <Avatar size='default' icon={<UserOutlined />} />  Hoang Huy</div>
                        </Col>
                    </Row>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />

                </Content>
            </Layout>
        </Layout>
    );
};
export default Admin;