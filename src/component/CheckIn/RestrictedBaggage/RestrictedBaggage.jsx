import { Row, Col, Collapse, Button, Radio } from 'antd';
import { IconPlane, IconUserCheck, IconChecklist, IconLocationCheck } from '@tabler/icons-react';
import imgexplosives from '../../../assets/restrictedBaggage/explosives.png'
import imgdangerous from '../../../assets/restrictedBaggage/dangerous.png'
import imgfarAway from '../../../assets/restrictedBaggage/farAway.png'
import imggas from '../../../assets/restrictedBaggage/gas.png'
import imggun from '../../../assets/restrictedBaggage/gun.png'
import imgquiet from '../../../assets/restrictedBaggage/quiet.png'
import imgvaluables from '../../../assets/restrictedBaggage/valuables.png'
import imgwork from '../../../assets/restrictedBaggage/work.png'
import imgwork1 from '../../../assets/restrictedBaggage/work1.png'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import './RestrictedBaggage.css'



const RestrictedBaggage = () => {
    const [selectedRadio, setSelectedRadio] = useState(null);

    const navigate = useNavigate();
    return (
        <div className="booking-restricted-baggage" >
            <div className="info-booking-detail">
                <Row>
                    <Col span={8} className='code-booking'>
                        <p>Mã đặt chỗ : <span style={{ color: 'red', fontSize: '20px', fontWeight: 700 }}>RQTDND</span></p>
                    </Col>
                    <Col span={16} className='icon-select'>
                        <Row >
                            <IconPlane style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconUserCheck style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconChecklist style={{ color: '#006885', width: 30, height: 30, marginRight: 15 }} />
                            <IconLocationCheck style={{ color: 'grey', width: 30, height: 30, marginRight: 15 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='main-container-restricted-baggage'>
                <p className='title-booking' style={{ paddingBottom: '10px' }}>Vivu Travel khuyến cáo khách hàng</p>
                <div className='restricted-baggage-form'>
                    <p className='restricted-baggage-title'>Cấm Mang Theo Hành Lý Ký Gửi Và Xách Tay</p>
                    <p className='restricted-baggage-item'>Các chất gây nổ</p>
                    <p className='restricted-baggage-text'>Lựu đạn, thuốc súng, pháo sáng, pháo hoa và các vật phẩm có hình dáng tương tự v.v.</p>
                    <img src={imgexplosives} className='restricted-baggage-imgsmall' />
                    <p className='restricted-baggage-item'>Các chất phóng xạ/lây nhiễm/độc hại/ăn mòn</p>
                    <p className='restricted-baggage-text'>Chất clo, tẩy rửa, oxy hóa, thủy ngân, chất truyền nhiễm độc hại, vật liệu chứa chất phóng xạ v.v.</p>
                    <img src={imgfarAway} className='restricted-baggage-imgsmall' />
                    <p className='restricted-baggage-item'>Khí ga, các vật phẩm dễ cháy</p>
                    <p className='restricted-baggage-text'>Diêm, bật lửa, bình xịt khí ga, chất lỏng dễ cháy (ví dụ: xăng dầu, dầu tràm…), đồ uống có nồng độ cồn trên 70% v.v.</p>
                    <img src={imggas} className='restricted-baggage-imgsmall' />
                    <p className='restricted-baggage-item'>Các vật dụng nguy hiểm khác</p>
                    <p className='restricted-baggage-text'>Bình cứu hỏa, đá khô (quá 2,5kg), pin lithium cho thiết bị điện tử ( lớn hơn 160Wh hoặc lớn hơn 8g lithium).</p>
                    <p className='restricted-baggage-text'>Điện thoại Samsung Galaxy Note 7, các thiết bị tự hành có chứa pin lithium như xe điện tự cân bằng, xe điện mini scooter, xe trượt điện 2 bánh, ván trượt điện cân bằng.</p>
                    <img src={imgdangerous} className='restricted-baggage-imgsbig' />
                    <p className='restricted-baggage-title'>Cấm Mang Theo Hành Lý Xách Tay</p>
                    <p className='restricted-baggage-item'>Các vật sắc nhọn, vũ khí hoặc vật phẩm có hình dáng tương tự vũ khí thật</p>
                    <p className='restricted-baggage-text'>Dao, kiếm, dao đa năng, phi tiêu, kéo, rìu, v.v.</p>
                    <img src={imgquiet} className='restricted-baggage-imgsmall' />
                    <p className='restricted-baggage-item'>Súng, đạn hoặc các vật phẩm có hình dáng tương tự</p>
                    <p className='restricted-baggage-text'>Tất cả các loại súng, các bộ phận cấu tạo của súng, đạn, súng điện, súng gây mê, súng đồ chơi hoặc vật dụng/đồ chơi giống vũ khí thật, v.v.</p>
                    <img src={imggun} className='restricted-baggage-imgsmall' />
                    <p className='restricted-baggage-item'>Các công cụ, dụng cụ, đồ vật có thể gây thương tích</p>
                    <p className='restricted-baggage-text'>Xà beng, cuốc, khoan/mũi khoan, đèn khò, các dụng cụ có lưỡi dài hơn 6 cm, các loại búa, cờ lê, kìm có chiều dài trên 10cm, v.v.</p>
                    <img src={imgwork} className='restricted-baggage-imgsmall' />
                    <p className='restricted-baggage-text'>Gậy (bóng chày, bi-a), gậy khúc côn cầu, gậy chơi golf, dụng cụ võ thuật, dùi cui, các loại bình xịt tự vệ (hơi cay), v.v.</p>
                    <img src={imgwork1} className='restricted-baggage-imgsmall' />
                    <p className='restricted-baggage-title'>Không Để Trong Hành lý Ký Gửi</p>
                    <p className='restricted-baggage-text'>Tiền, đồ trang sức, máy quay phim, máy tính cá nhân, điện thoại di động, Pin Lithium cho thiết bị điện tử (VD: Sạc dự trữ v.v.)</p>
                    <img src={imgvaluables} className='restricted-baggage-imgbig' />
                </div>
                <div className='radio-check'>
                    <p><Radio /> Tôi đã đọc, hiểu và đồng ý các quy định, điều kiện và điều lệ vận chuyển</p>
                </div>
                <div className='btn'>
                    <Button className='btn-back' onClick={() => navigate('/my/select-seat')} >Trở lại</Button>
                    <Button className='btn-continue' onClick={() => navigate('/my/success')}>Đi tiếp</Button>
                </div>
            </div>
            <div>

            </div>
        </div >
    )
}
export default RestrictedBaggage;