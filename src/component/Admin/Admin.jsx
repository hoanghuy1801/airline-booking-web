import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined, RollbackOutlined } from '@ant-design/icons'
import { IconUserCog, IconUser, IconPlaneTilt, IconCaretLeft } from '@tabler/icons-react'
import { Layout, Menu, Button, theme, Row, Avatar, Col, Dropdown, Space, Typography } from 'antd'
import '../Admin/Admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setInforEmployee } from '../../redux/reducers/Admin'
const { Text } = Typography
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
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <IconUser size={25} style={{ marginTop: 6, color: '#00a1e4' }} />
                </div>
                <div>
                    <Text style={{ color: '#00a1e4', fontSize: 15, fontWeight: 500, paddingLeft: 5 }}>
                        Xem thông tin tài khoản
                    </Text>
                </div>
            </div>
        ),
        key: '0'
    },
    {
        type: 'divider'
    },
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <IconCaretLeft size={25} style={{ marginTop: 6, color: 'red' }} />
                </div>
                <div>
                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 500, paddingLeft: 3 }}> Đăng xuất</Text>
                </div>
            </div>
        ),
        key: '1'
    }
]
const itemss = [
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
    const dispastch = useDispatch()
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
    const handleClickMe = (e) => {
        if (e.key === '0') {
            navigate('/admins/customer-info')
        } else if (e.key === '1') {
            dispastch(setInforEmployee(null))
            navigate('/')
        }
    }
    const InforEmployee = useSelector((state) => state.Admin.InforEmployee)
    return (
        <Layout className='menu-dashboard'>
            <Sider trigger={null} collapsible collapsed={collapsed} className='sider-menu'>
                <div className='demo-logo-vertical' />
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='drak'
                    items={itemss}
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
                                <Avatar size='default' icon={<UserOutlined />} />
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick: handleClickMe
                                    }}
                                    trigger={['click']}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space
                                            style={{
                                                paddingLeft: 10,

                                                fontSize: 15,
                                                fontWeight: 500,
                                                color: '#006885'
                                            }}
                                        >
                                            {InforEmployee?.name}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px  ',
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
