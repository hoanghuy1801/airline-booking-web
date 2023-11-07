import { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    PieChartOutlined,
    RollbackOutlined
} from '@ant-design/icons'
import { IconUserCog, IconUser, IconPlaneTilt } from '@tabler/icons-react'
import { Layout, Menu, Button, theme, Row, Avatar, Col } from 'antd'
import '../Admin/Admin.css'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    }
}
const items = [
    getItem('Tài khoản', 'customer-info', <IconUser />),
    getItem('Quản lý nhân viên', 'employee', <IconUserCog />),
    getItem('Chuyến bay', 'sub1', <IconPlaneTilt />, [
        getItem('Danh sách', 'listflight'),
        getItem('Hủy/ Hoàn Tiền', 'flyCancel')
    ]),
    getItem('Trở về', 'backgoHomePage', <RollbackOutlined />)
]

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    const navigate = useNavigate()

    const handleMenu = (info) => {
        if (info.key === 'backgoHomePage') {
            navigate('/')
        } else if (info.key === 'employee') {
            navigate('/admins/employee')
        } else if (info.key === 'flyCancel') {
            navigate('/admins/flyCancel')
        } else if (info.key === 'listflight') {
            navigate('/admins/flight/listflight')
        } else if (info.key === 'customer-info') {
            navigate('/admins/customer-info')
        }
    }
    return (
        <Layout className='menu-dashboard'>
            <Sider trigger={null} collapsible collapsed={collapsed} className='sider-menu'>
                <div className='demo-logo-vertical' />
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='drak'
                    items={items}
                    onClick={(info) => {
                        handleMenu(info)
                    }}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer
                    }}
                >
                    <Row>
                        <Col md={18}>
                            <Button
                                type='text'
                                icon={collapsed ? <MenuUnfoldOutlined size='default' /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '15px'
                                }}
                            />
                        </Col>
                        <Col md={6}>
                            <div>
                                {' '}
                                <Avatar size='default' icon={<UserOutlined />} /> Hoang Huy
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer
                    }}
                    className='main-admins'
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default Admin
