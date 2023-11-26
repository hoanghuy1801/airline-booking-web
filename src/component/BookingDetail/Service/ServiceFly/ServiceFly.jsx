/* eslint-disable react/prop-types */
import { Row, Col, Typography, Button, Drawer, Divider, Card, Radio, InputNumber, Select } from 'antd'
import './ServiceFly.css'
import { IconArrowBadgeRightFilled } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import imgFavorite from '../../../../assets/service/select-service_favorite.svg'
import imgFood from '../../../../assets/service/select-service_foods.svg'
import imgluggage from '../../../../assets/service/select-service_luggage.svg'

import imgMiy from '../../../../assets/service/mi-y.jpg'
import { useState } from 'react'
import SeatSelector from '../../../SelectService/SeatSelector/SeatSelector'
import { useLanguage } from '../../../../LanguageProvider/LanguageProvider'
import { formatCurrency } from '../../../../utils/format'
import { getServiceAirline } from '../../../../services/apiBooking'
import { setDataPassengersService, setDataPassengersServiceReturn } from '../../../../redux/reducers/myFlight'
import { showWaringModal } from '../../../../utils/modalError'
const { Option } = Select
const { Text } = Typography
const ServiceFly = (props) => {
    const {
        // eslint-disable-next-line react/prop-types
        baggageOptions,
        mealOptions,
        defaultBaggageOptions,
        defaultMealOptions,
        seatOptions,
        totalBaggage,
        totalMeal,
        totalSeat,
        setTotalBaggage,
        setTotalMeal,
        setTotalSeat,
        totalBaggageReturn,
        totalMealReturn,
        totalSeatReturn,
        setTotalBaggageReturn,
        setTotalMealReturn,
        setTotalSeatReturn,
        setSeatOptions
    } = props
    const dispath = useDispatch()
    const [selectTripPassengers, setSelectTripPassengers] = useState('false')
    const [selectTripPassengersBaggage, setSelectTripPassengersBaggage] = useState('false')
    const [selectTripPassengersMeal, setSelectTripPassengersMeal] = useState('false')
    const [openFavorite, setOpenFavorite] = useState(false)
    const [openLuggage, setOpenLuggage] = useState(false)
    const [openFood, setOpenFood] = useState(false)
    const [selectedSeat, setSelectedSeat] = useState(null)

    const [priceSeat, setPriceSeat] = useState(0)
    const [priceBaggage, setPriceBaggage] = useState(0)
    const flightSelectReturn = useSelector((state) => state.myFlight?.selectChangeFly?.flightReturnDetail)
    const bookingDetail = useSelector((state) => state.myFlight?.bookingDetails?.bookingDetail)
    const flightSelect = useSelector((state) => state.myFlight?.selectChangeFly?.flightAwayDetail)
    const { getText } = useLanguage()

    const [valueRadio, setValueRadio] = useState('')
    const dataPassengers = useSelector((state) => state.myFlight?.dataPassengersService)
    const dataPassengersReturn = useSelector((state) => state.myFlight?.dataPassengersServiceReturn)

    const [selectPassengers, setSelectPassengers] = useState(dataPassengers[0]?.id)
    const [selectPassengersBaggage, setSelectPassengersBaggage] = useState(dataPassengers[0]?.id)
    const [selectPassengersMeal, setSelectPassengersMeal] = useState(dataPassengers[0]?.id)

    let defaultBaggageOptionsCARRY_ON = {
        id: '',
        createdAt: '',
        updatedAt: '',
        optionCode: '',
        optionName: null,
        optionDescription: null,
        optionImage: null,
        value: 0,
        optionType: '',
        status: '',
        seatClass: '',
        luggageType: '',
        optionPrice: null
    }

    const newdefaultBaggageOptionsCARRY_ON = defaultBaggageOptions.find((item) => item.luggageType === 'CARRY_ON')

    if (newdefaultBaggageOptionsCARRY_ON) {
        defaultBaggageOptionsCARRY_ON = { ...newdefaultBaggageOptionsCARRY_ON }
    }
    let defaultBaggageOptionsCHECKED = {
        id: '',
        createdAt: '',
        updatedAt: '',
        optionCode: '',
        optionName: null,
        optionDescription: null,
        optionImage: null,
        value: 0,
        optionType: '',
        status: '',
        seatClass: '',
        luggageType: '',
        optionPrice: null
    }

    const newdefaultBaggageOptionsCHECKED = defaultBaggageOptions.find((item) => item.luggageType === 'CHECKED')

    if (newdefaultBaggageOptionsCHECKED) {
        defaultBaggageOptionsCHECKED = { ...newdefaultBaggageOptionsCHECKED }
    }

    const handleCardClick = (item) => {
        setValueRadio(item) // Cập nhật trạng thái nút radio tương ứng với thẻ card
        setPriceBaggage(item.optionPrice)
    }
    const showDrawerFavorite = () => {
        setOpenFavorite(true)
    }
    const showDrawerLuggage = () => {
        setOpenLuggage(true)
    }
    const showDrawerFood = () => {
        setOpenFood(true)
    }

    const onChangePassengers = (value) => {
        setSelectPassengers(value)
    }
    const onChangePassengersRoundTrip = async (value) => {
        if (value === 'true') {
            let res = await getServiceAirline(
                flightSelectReturn?.id,
                '826b4d34-fe05-48b7-b78b-9a83083a38af',
                flightSelectReturn?.passengerReturnsDetail[0]?.seat?.id
            )
            setSeatOptions(res.data.seatOptions)
        }
        if (value === 'false') {
            let res = await getServiceAirline(
                flightSelect?.id,
                '826b4d34-fe05-48b7-b78b-9a83083a38af',
                flightSelect?.passengerAwaysDetail[0]?.seat?.id
            )
            setSeatOptions(res.data.seatOptions)
        }
        setSelectTripPassengers(value)
    }
    const onChangePassengersRoundTripBaggage = (value) => {
        setSelectTripPassengersBaggage(value)
    }
    const onChangePassengersRoundTripMeal = (value) => {
        setSelectTripPassengersMeal(value)
    }
    const onChangePassengersBaggage = (value) => {
        setSelectPassengersBaggage(value)
    }
    const onChangePassengersMeal = (value) => {
        setSelectPassengersMeal(value)
    }

    const [selectedSeats, setSelectedSeats] = useState([])
    const hanldeConfirm = () => {
        if (selectTripPassengers === 'false') {
            const newSeat = {
                seatId: flightSelect?.passengerAwaysDetail[0]?.seat?.id,
                flightId: flightSelect?.id,
                seatCode: selectedSeat,
                seatClass: flightSelect?.passengerAwaysDetail[0]?.seat?.seatClass,
                seatPrice: priceSeat
            }
            const updatedPassengers = dataPassengers.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengers) {
                    if (selectedSeat === null) {
                        showWaringModal(`${getText('HeyFriend')}`, `${getText('YouNotSeat')}`, `${getText('Close')}`)
                        return dataPassengers
                    }
                    if (dataPassengers?.seat?.seatCode) {
                        showWaringModal(`${getText('HeyFriend')}`, `${getText('YouHaveSeat')}`, `${getText('Close')}`)
                        return dataPassengers
                    }
                    if (dataPassengers?.seatAdd?.seatCode) {
                        showWaringModal(`${getText('HeyFriend')}`, `${getText('YouHaveSeat')}`, `${getText('Close')}`)
                        return dataPassengers
                    }

                    if (selectedSeats.includes(selectedSeat)) {
                        return dataPassengers
                    }
                    setSelectedSeats([...selectedSeats, selectedSeat])
                    return { ...dataPassengers, seatAdd: newSeat }
                }
                return dataPassengers
            })
            dispath(setDataPassengersService(updatedPassengers))
            handleTotal(updatedPassengers)
        } else {
            const newSeat = {
                seatId: flightSelect?.passengerAwaysDetail[0]?.seat?.id,
                flightId: flightSelectReturn.id,
                seatCode: selectedSeat,
                seatClass: flightSelect?.passengerAwaysDetail[0]?.seat?.seatClass,
                seatPrice: priceSeat
            }
            const updatedPassengers = dataPassengersReturn.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengers) {
                    if (dataPassengers?.seat?.seatCode) {
                        showWaringModal(`${getText('HeyFriend')}`, `${getText('YouHaveSeat')}`, `${getText('Close')}`)
                        return dataPassengers
                    }
                    if (selectedSeat === null) {
                        showWaringModal(`${getText('HeyFriend')}`, `${getText('YouNotSeat')}`, `${getText('Close')}`)
                        return dataPassengers
                    }
                    if (selectedSeats.includes(selectedSeat)) {
                        return dataPassengers
                    }
                    setSelectedSeats([...selectedSeats, selectedSeat])
                    return { ...dataPassengers, seatsReturnAdd: newSeat }
                }
                return dataPassengers
            })
            dispath(setDataPassengersServiceReturn(updatedPassengers))
            handleTotalReturn(updatedPassengers)
        }
    }

    const hanldeCancel = () => {
        const newSeat = {
            seatId: '',
            flightId: '',
            seatCode: null,
            seatClass: '',
            seatPrice: ''
        }
        if (selectTripPassengers === 'false') {
            console.log
            const updatedPassengers = dataPassengers.map((dataPassengers) => {
                if (dataPassengers?.seatAdd?.seatCode) {
                    setSelectedSeats(selectedSeats.filter((item) => item !== dataPassengers?.seatAdd?.seatCode))
                    return { ...dataPassengers, seatAdd: newSeat }
                }
                return dataPassengers
            })
            dispath(setDataPassengersService(updatedPassengers))
            handleTotal(updatedPassengers)
        } else {
            const updatedPassengers = dataPassengersReturn.map((dataPassengers) => {
                if (dataPassengers?.seatsReturnAdd?.seatCode) {
                    setSelectedSeats(selectedSeats.filter((item) => item !== dataPassengers?.seatsReturnAdd?.seatCode))
                    return { ...dataPassengers, seatsReturnAdd: newSeat }
                }
                return dataPassengers
            })
            dispath(setDataPassengersServiceReturn(updatedPassengers))
            handleTotalReturn(updatedPassengers)
        }
    }
    const hanldeConfirmBaggage = () => {
        if (selectTripPassengersBaggage === 'false') {
            const newBaggage = {
                serviceOptId: valueRadio?.id,
                flightId: flightSelect?.id,
                servicePrice: priceBaggage
            }
            const updatedPassengers = dataPassengers.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengersBaggage) {
                    return { ...dataPassengers, baggage: newBaggage }
                }
                return dataPassengers
            })
            dispath(setDataPassengersService(updatedPassengers))
            handleTotal(updatedPassengers)
        } else {
            const newBaggage = {
                serviceOptId: valueRadio?.id,
                flightId: flightSelectReturn?.id,
                servicePrice: priceBaggage
            }
            const updatedPassengers = dataPassengersReturn.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengersBaggage) {
                    return { ...dataPassengers, baggageReturn: newBaggage }
                }
                return dataPassengers
            })
            dispath(setDataPassengersServiceReturn(updatedPassengers))
            handleTotalReturn(updatedPassengers)
        }
    }
    const hanldeCancelBaggage = () => {
        const newBaggage = {
            baggageId: '',
            flightId: '',
            servicePrice: 0
        }
        setPriceBaggage(0)
        if (selectTripPassengersBaggage === 'false') {
            const updatedPassengers = dataPassengers.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengersBaggage) {
                    return { ...dataPassengers, baggage: newBaggage }
                }
                return dataPassengers
            })
            setValueRadio('')
            dispath(setDataPassengersService(updatedPassengers))
            handleTotal(updatedPassengers)
        } else {
            const updatedPassengers = dataPassengers.map((dataPassengers) => {
                if (dataPassengers.id === selectPassengersBaggage) {
                    return { ...dataPassengers, baggageReturn: newBaggage }
                }
                return dataPassengers
            })
            setValueRadio('')
            dispath(setDataPassengersServiceReturn(updatedPassengers))
            handleTotalReturn(updatedPassengers)
        }
    }
    const [selectedMeals, setSelectedMeals] = useState({})
    const [totalPriceMeal, setTotalPriceMeal] = useState(0)
    const hanldeConfirmMeal = () => {
        if (selectTripPassengersMeal === 'false') {
            // Lấy thông tin món ăn và số lượng đã chọn
            const selectedMealsArray = Object.keys(selectedMeals).map((optionName) => ({
                serviceOptId: mealOptions.find((meal) => meal?.optionName === optionName)?.id,
                flightId: flightSelect?.id,
                quantity: selectedMeals[optionName],
                servicePrice:
                    mealOptions.find((meal) => meal?.optionName === optionName)?.optionPrice * selectedMeals[optionName]
            }))
            const newTotalPrice = selectedMealsArray.reduce((total, selectedMeal) => {
                const meal = mealOptions.find((meal) => meal?.id === selectedMeal?.serviceOptId)
                return total + meal?.optionPrice * selectedMeal?.quantity
            }, 0)
            setTotalPriceMeal(newTotalPrice)
            const updatedPassengers = dataPassengers.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengersMeal) {
                    return { ...dataPassengers, meal: selectedMealsArray }
                }
                return dataPassengers
            })
            dispath(setDataPassengersService(updatedPassengers))
            handleTotal(updatedPassengers)
        } else {
            // Lấy thông tin món ăn và số lượng đã chọn
            const selectedMealsArray = Object.keys(selectedMeals).map((optionName) => ({
                serviceOptId: mealOptions.find((meal) => meal?.optionName === optionName)?.id,
                flightId: flightSelectReturn?.id,
                quantity: selectedMeals[optionName],
                servicePrice:
                    mealOptions.find((meal) => meal?.optionName === optionName)?.optionPrice * selectedMeals[optionName]
            }))
            const newTotalPrice = selectedMealsArray.reduce((total, selectedMeal) => {
                const meal = mealOptions.find((meal) => meal?.id === selectedMeal?.serviceOptId)
                return total + meal?.optionPrice * selectedMeal?.quantity
            }, 0)
            setTotalPriceMeal(newTotalPrice)
            const updatedPassengers = dataPassengersReturn.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengersMeal) {
                    return { ...dataPassengers, mealReturn: selectedMealsArray }
                }
                return dataPassengers
            })
            dispath(setDataPassengersServiceReturn(updatedPassengers))
            handleTotalReturn(updatedPassengers)
        }
    }
    const hanldeCancelMeal = () => {
        // eslint-disable-next-line no-unused-vars
        const selectedMealsArray = Object.keys(selectedMeals).map((optionName) => ({
            serviceOptId: '',
            flightId: '',
            quantity: '',
            servicePrice: ''
        }))
        setTotalPriceMeal(0)
        if (selectTripPassengersMeal === 'false') {
            const updatedPassengers = dataPassengers.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengersMeal) {
                    return { ...dataPassengers, meal: selectedMealsArray }
                }
                return dataPassengers
            })
            dispath(setDataPassengersService(updatedPassengers))
            handleTotal(updatedPassengers)
        } else {
            const updatedPassengers = dataPassengersReturn.map((dataPassengers) => {
                if (dataPassengers?.id === selectPassengersMeal) {
                    return { ...dataPassengers, mealReturn: selectedMealsArray }
                }
                return dataPassengers
            })
            dispath(setDataPassengersServiceReturn(updatedPassengers))
            handleTotalReturn(updatedPassengers)
        }
    }

    const handleQuantityChange = (item, quantity) => {
        setSelectedMeals((prevSelectedMeals) => {
            const updatedSelectedMeals = { ...prevSelectedMeals }
            if (quantity === 0) {
                delete updatedSelectedMeals[item?.optionName]
            } else {
                updatedSelectedMeals[item?.optionName] = quantity
            }
            return updatedSelectedMeals
        })
    }
    const handleTotal = (updatedPassengers) => {
        console.log('updatedPassengers', updatedPassengers)
        let newTotal = 0
        let newTotalBaggage = 0
        let newTotalMeal = 0
        for (let i = 0; i < updatedPassengers.length; i++) {
            if (updatedPassengers[i]?.seatAdd?.seatPrice) {
                newTotal += Number(updatedPassengers[i]?.seatAdd?.seatPrice)
            }
        }

        setTotalSeat(newTotal)
        for (let i = 0; i < updatedPassengers.length; i++) {
            if (updatedPassengers[i]?.baggage?.servicePrice) {
                newTotalBaggage += Number(updatedPassengers[i]?.baggage?.servicePrice)
            }
        }
        setTotalBaggage(newTotalBaggage)
        for (let i = 0; i < updatedPassengers.length; i++) {
            const meal = updatedPassengers[i]?.meal
            for (let j = 0; j < meal?.length; j++) {
                if (updatedPassengers[i]?.meal[j]?.servicePrice) {
                    newTotalMeal += Number(updatedPassengers[i]?.meal[j]?.servicePrice)
                }
            }
        }
        setTotalMeal(Number(newTotalMeal))
    }
    const handleTotalReturn = (updatedPassengers) => {
        let newTotal = 0
        let newTotalBaggage = 0
        let newTotalMeal = 0
        for (let i = 0; i < updatedPassengers.length; i++) {
            if (updatedPassengers[i]?.seatsReturnAdd?.seatPrice) {
                newTotal += Number(updatedPassengers[i]?.seatsReturnAdd?.seatPrice)
            }
        }
        setTotalSeatReturn(newTotal)
        for (let i = 0; i < updatedPassengers.length; i++) {
            if (updatedPassengers[i]?.baggageReturn?.servicePrice) {
                newTotalBaggage += Number(updatedPassengers[i]?.baggageReturn?.servicePrice)
            }
        }
        setTotalBaggageReturn(newTotalBaggage)
        for (let i = 0; i < updatedPassengers.length; i++) {
            const meal = updatedPassengers[i]?.mealReturn
            for (let j = 0; j < meal?.length; j++) {
                if (updatedPassengers[i]?.mealReturn[j]?.servicePrice) {
                    newTotalMeal += Number(updatedPassengers[i]?.mealReturn[j]?.servicePrice)
                }
            }
        }
        setTotalMealReturn(Number(newTotalMeal))
    }
    const defaultValue = dataPassengers.length > 0 ? dataPassengers[0]?.id : undefined
    return (
        <>
            <p className='title'>{getText('TitleSelectService')}</p>
            <Row className='selectService' onClick={() => showDrawerFavorite()}>
                <Col span={4} className='img-service'>
                    <img src={imgFavorite} style={{ width: '70px', height: '70px' }} />
                </Col>
                <Col span={12} className='title-service'>
                    <i>{getText('SelectSeat')}</i>
                </Col>
                <Col span={6} className='price-service'>
                    <i>{formatCurrency(totalSeat + totalSeatReturn)}</i>
                </Col>
                <Col span={2} className='title-service'>
                    <IconArrowBadgeRightFilled style={{ color: 'grey' }} />
                </Col>
            </Row>
            <Row className='selectService' onClick={() => showDrawerLuggage()}>
                <Col span={4} className='img-service'>
                    <img src={imgluggage} style={{ width: '70px', height: '70px' }} />
                </Col>
                <Col span={12} className='title-service'>
                    <i>{getText('SelectBaggage')}</i>
                </Col>
                <Col span={6} className='price-service'>
                    <i>{formatCurrency(totalBaggage + totalBaggageReturn)}</i>
                </Col>
                <Col span={2} className='title-service'>
                    <IconArrowBadgeRightFilled style={{ color: 'grey' }} />
                </Col>
            </Row>
            <Row className='selectService' onClick={() => showDrawerFood()}>
                <Col span={4} className='img-service'>
                    <img src={imgFood} style={{ width: '70px', height: '70px' }} />
                </Col>
                <Col span={12} className='title-service'>
                    <i>{getText('SelectMeal')}</i>
                </Col>
                <Col span={6} className='price-service'>
                    <i>{formatCurrency(totalMeal + totalMealReturn)}</i>
                </Col>
                <Col span={2} className='title-service'>
                    <IconArrowBadgeRightFilled style={{ color: 'grey' }} />
                </Col>
            </Row>
            <Drawer
                className='service-favorite'
                title={getText('SelectSeat')}
                placement='right'
                open={openFavorite}
                onClose={() => {
                    setOpenFavorite(false)
                }}
                width={700}
            >
                <div className='form-favorite'>
                    <Row className='roundTrip'>
                        {bookingDetail.journeyType === 'RETURN' ? (
                            <Select
                                style={{
                                    width: 120
                                }}
                                defaultValue='false'
                                onChange={onChangePassengersRoundTrip}
                                options={[
                                    {
                                        value: 'false',
                                        label: <>{getText('Trip')}</>
                                    },
                                    {
                                        value: 'true',
                                        label: <>{getText('TripReturn')}</>
                                    }
                                ]}
                            />
                        ) : (
                            <span>{getText('Trip')}</span>
                        )}
                    </Row>
                    <Divider style={{ borderColor: 'black' }}></Divider>
                    <div className='info-user-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>{getText('passenger')}</span>
                        </Row>
                        <Row className='user-service'>
                            <Select
                                showSearch
                                style={{ width: '30%' }}
                                onChange={onChangePassengers}
                                defaultValue={defaultValue}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {dataPassengers.map((item) => (
                                    <Option
                                        key={item?.id}
                                        value={item?.id}
                                        label={`${item?.firstName} ${item?.lastName}`}
                                    >
                                        <Row>
                                            {item?.lastName} {item?.firstName}
                                        </Row>
                                    </Option>
                                ))}
                            </Select>
                        </Row>
                    </div>
                    <div className='info-booking-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'black' }}>
                                {flightSelect?.sourceAirport?.airportCode} -
                                {flightSelect?.destinationAirport?.airportCode}
                            </span>
                        </Row>
                    </div>
                    <div className='form-seat'>
                        <div className='information-seat'>
                            <Row>
                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div style={{ backgroundColor: 'red' }} className='information-seat-color'></div>
                                    <span>{getText('BUSINESS')}</span>
                                </Col>
                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div
                                        style={{ backgroundColor: '#25A006' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('PREMIUM_ECONOMY')}</span>
                                </Col>

                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div
                                        style={{ backgroundColor: ' #208AEC' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('ECONOMY')}</span>
                                </Col>
                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div
                                        style={{ backgroundColor: '#FBB612 ' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('SEAT_IS_SELECTED')}</span>
                                </Col>

                                <Col xs={12} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', paddingTop: 10 }}>
                                    <div
                                        style={{ backgroundColor: ' #D1D3D4' }}
                                        className='information-seat-color'
                                    ></div>
                                    <span>{getText('SEAT_SELECTED')}</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='seat-ariline'>
                            <SeatSelector
                                seatOptions={seatOptions}
                                setSelectedSeat={setSelectedSeat}
                                selectedSeat={selectedSeat}
                                setPriceSeat={setPriceSeat}
                                selectedSeats={selectedSeats}
                            />
                        </div>
                    </div>
                    <div className='footer-divider'>
                        <Row>
                            <Col span={3} className='display-img'>
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgFavorite} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={7} className='display-img'>
                                <Row>
                                    <i className='seat-price'>
                                        {getText('seat')}: {selectedSeat}
                                    </i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>{formatCurrency(priceSeat)}</i>
                                </Row>
                            </Col>
                            <Col xl={14}>
                                <Row>
                                    <Button className='footer-continue-service' onClick={() => hanldeCancel()}>
                                        {getText('No_Thank')}
                                    </Button>
                                    <Button className='footer-continue-service' onClick={() => hanldeConfirm()}>
                                        {getText('Confirm')}
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer>
            <Drawer
                className='service-luggage'
                title={getText('SelectBaggage')}
                placement='right'
                open={openLuggage}
                onClose={() => {
                    setOpenLuggage(false)
                }}
                width={700}
            >
                <div className='form-favorite'>
                    <Row className='roundTrip'>
                        {bookingDetail.journeyType === 'RETURN' ? (
                            <Select
                                style={{
                                    width: 120
                                }}
                                defaultValue='false'
                                onChange={onChangePassengersRoundTripBaggage}
                                options={[
                                    {
                                        value: 'false',
                                        label: <> {getText('Trip')}</>
                                    },
                                    {
                                        value: 'true',
                                        label: <> {getText('TripReturn')}</>
                                    }
                                ]}
                            />
                        ) : (
                            <span>{getText('Trip')}</span>
                        )}
                    </Row>
                    <Divider style={{ borderColor: 'black' }}></Divider>
                    <div className='info-user-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>{getText('passenger')}</span>
                        </Row>
                        <Row className='user-service'>
                            <Select
                                showSearch
                                style={{ width: '30%' }}
                                onChange={onChangePassengersBaggage}
                                defaultValue={defaultValue}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {dataPassengers.map((item) => (
                                    <Option
                                        key={item?.id}
                                        value={item?.id}
                                        label={`${item?.firstName} ${item?.lastName}`}
                                    >
                                        <Row>
                                            {item?.lastName} {item?.firstName}
                                        </Row>
                                    </Option>
                                ))}
                            </Select>
                        </Row>
                    </div>
                    <div className='info-booking-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'black' }}>
                                {flightSelect?.sourceAirport?.airportCode} -
                                {flightSelect?.destinationAirport?.airportCode}
                            </span>
                        </Row>
                    </div>
                    <div>
                        <Text className='written-notices'>
                            {getText('Ticket_Class_Is_Included')} {defaultBaggageOptionsCARRY_ON.value}kg{' '}
                            {getText('Luggage')}
                            {newdefaultBaggageOptionsCHECKED == null ? (
                                ''
                            ) : (
                                <>
                                    , {defaultBaggageOptionsCHECKED.value}kg {getText('signed_luggage')}
                                </>
                            )}
                            .
                        </Text>
                    </div>
                    <div className='title-luggage'>
                        <span>{getText('ChooseLuggage')}</span>
                    </div>
                    <div>
                        <Row>
                            {baggageOptions.map((item) => {
                                const priceFomat = item.optionPrice.toLocaleString('it-IT')

                                return (
                                    <Card key={item.id} className='card-luggage' onClick={() => handleCardClick(item)}>
                                        <Row>
                                            <img src={imgluggage} style={{ width: '60px', height: '60px' }} />
                                        </Row>
                                        <p
                                            style={{
                                                paddingTop: '10px',
                                                fontSize: 16,
                                                fontWeight: 500,
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {getText('package')} {item.value}kg
                                        </p>
                                        <p
                                            style={{
                                                paddingTop: '3px',
                                                fontSize: 17,
                                                fontWeight: 500,
                                                color: 'red'
                                            }}
                                        >
                                            {priceFomat}
                                        </p>
                                        <Radio
                                            key={item.id}
                                            name='radioGroup'
                                            item={item}
                                            value={item.value}
                                            label={item.label}
                                            checked={valueRadio?.value === item.value}
                                            style={{ paddingLeft: '20px' }}
                                        />
                                    </Card>
                                )
                            })}
                        </Row>
                    </div>
                    <div className='footer-divider'>
                        <Row>
                            <Col span={3} className='display-img'>
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgluggage} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={6} className='display-img'>
                                <Row>
                                    <i className='seat-price'>
                                        {getText('package')} {valueRadio.value}kg
                                    </i>
                                </Row>
                                <Row>
                                    <i className='seat-price'> {formatCurrency(priceBaggage)}</i>
                                </Row>
                            </Col>
                            <Col span={15}>
                                <Row>
                                    <Button className='footer-continue-service' onClick={() => hanldeCancelBaggage()}>
                                        {getText('No_Thank')}
                                    </Button>
                                    <Button className='footer-continue-service' onClick={() => hanldeConfirmBaggage()}>
                                        {getText('Confirm')}
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer>
            <Drawer
                className='service-food'
                title={getText('SelectMeal')}
                placement='right'
                open={openFood}
                onClose={() => {
                    setOpenFood(false)
                }}
                width={700}
            >
                <div className='form-favorite'>
                    <Row className='roundTrip'>
                        {bookingDetail.journeyType === 'RETURN' ? (
                            <Select
                                style={{
                                    width: 120
                                }}
                                defaultValue='false'
                                onChange={onChangePassengersRoundTripMeal}
                                options={[
                                    {
                                        value: 'false',
                                        label: <>{getText('Trip')}</>
                                    },
                                    {
                                        value: 'true',
                                        label: <> {getText('TripReturn')}</>
                                    }
                                ]}
                            />
                        ) : (
                            <span>{getText('Trip')}</span>
                        )}
                    </Row>
                    <Divider style={{ borderColor: 'black' }}></Divider>
                    <div className='info-user-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'white' }}>{getText('passenger')}</span>
                        </Row>
                        <Row className='user-service'>
                            <Select
                                showSearch
                                style={{ width: '30%' }}
                                onChange={onChangePassengersMeal}
                                defaultValue={defaultValue}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {dataPassengers.map((item) => (
                                    <Option
                                        key={item?.id}
                                        value={item?.id}
                                        label={`${item?.firstName} ${item?.lastName}`}
                                    >
                                        <Row>
                                            {item?.lastName} {item?.firstName}
                                        </Row>
                                    </Option>
                                ))}
                            </Select>
                        </Row>
                    </div>
                    <div className='info-booking-service'>
                        <Row className='user-service'>
                            <span style={{ color: 'black' }}>
                                {flightSelect?.sourceAirport?.airportCode} -
                                {flightSelect?.destinationAirport?.airportCode}
                            </span>
                        </Row>
                    </div>
                    <div>
                        {defaultMealOptions == '' ? (
                            ''
                        ) : (
                            <>
                                <Text className='written-notices'>{getText('FreeMeal')}</Text>
                            </>
                        )}
                    </div>
                    <div className='title-luggage'>
                        <span>{getText('ChooseMeal')}</span>
                    </div>
                    <div>
                        {mealOptions.map((item) => {
                            const priceFomat = item.optionPrice.toLocaleString('it-IT')
                            return (
                                <Card key={item.id} className='food-service-card'>
                                    <Row>
                                        <Col span={10}>
                                            <img src={imgMiy} className='img-foods' />
                                        </Col>
                                        <Col span={14}>
                                            <Row>
                                                <span
                                                    style={{
                                                        fontSize: '18px',
                                                        fontWeight: 500,
                                                        paddingTop: '10px'
                                                    }}
                                                >
                                                    {item.optionName}
                                                </span>
                                            </Row>
                                            <Row>
                                                <i
                                                    style={{
                                                        fontSize: '18px',
                                                        fontWeight: 500,
                                                        paddingTop: '5px',
                                                        paddingLeft: '5px',
                                                        color: 'red'
                                                    }}
                                                >
                                                    {priceFomat} VND
                                                </i>
                                            </Row>
                                            <Row span={3}>
                                                <div style={{ marginLeft: '220px', marginTop: '10px' }}>
                                                    <label> {getText('quantity')}:</label>
                                                    <InputNumber
                                                        min={0}
                                                        max={10}
                                                        defaultValue={0}
                                                        onChange={(value) => handleQuantityChange(item, value)}
                                                        style={{
                                                            width: '60px',
                                                            marginLeft: '10px'
                                                        }}
                                                    />
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        })}
                    </div>
                    <div className='footer-divider'>
                        <Row>
                            <Col span={3} className='display-img'>
                                <div style={{ backgroundColor: 'white' }} className='information-seat-icon-color'>
                                    <img src={imgFood} style={{ width: '40px', height: '40px' }} />
                                </div>
                            </Col>
                            <Col span={6} className='display-img'>
                                <Row>
                                    <i className='seat-price'>{getText('Hot_Meal')}</i>
                                </Row>
                                <Row>
                                    <i className='seat-price'>{formatCurrency(totalPriceMeal)}</i>
                                </Row>
                            </Col>
                            <Col span={15}>
                                <Button className='footer-continue-service' onClick={() => hanldeCancelMeal()}>
                                    {getText('No_Thank')}
                                </Button>
                                <Button className='footer-continue-service' onClick={() => hanldeConfirmMeal()}>
                                    {getText('Confirm')}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default ServiceFly
