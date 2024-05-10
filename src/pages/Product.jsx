import { Fragment, useState, useEffect, useContext, useReducer } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/container";
import { Col, Flex, Image, Row, Select, Typography } from "antd";
import Img from "../components/image";
import Product3_1 from "../images/product3-0.png";
import Product3_2 from "../images/product3-1.png";
import Product3_3 from "../images/product3-2.png";
import Title from "../components/Title";
import { FaLocationDot } from "react-icons/fa6";
import AlsoBuy from "../components/Also-buy";
import { default as Btn } from "../components/Button";
import axios from "axios";
import { Context } from "../context/index"
import { useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import {Helmet} from "react-helmet"

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCT":
            return { ...state, data: action.payload }
        case "IS_PARAMS":
            const params = !!action.id
            return { ...state, isParams: params }
        case "SIZE":
            const value = action.size
            const disabled = value === "" ? true : false

            return { ...state, size: value, disabled }
        case "DISABLED": {
            const value = state.size

            value === "" ? (
                alert("You didn't Select Product Size")
            ) : (
                alert(`You added ${state?.data.title} & ${state.size}`)
            )

            return state;
        }

        default:
            throw new Error(`Error unknown type ${action.type}`);

    }
}

const Product = () => {
    const { APIUrl } = useContext(Context);
    const { id } = useParams()
    const { addItem } = useCart()

    const [state, dispatch] = useReducer(reducer, {
        data: {},
        isParams: false,
        size: "",
        disabled: true
    })

    // const [Product, setProduct] = useState({}) //
    // const [Have, setHave] = useState(false)
    // const [ProductSize, setProductSize] = useState("")
    // const [Disabled, setDisabled] = useState(true);

    const handleProductSize = (value) => {
        dispatch({ type: "SIZE", size: value })
    }

    const handleDisabled = () => {
        dispatch({ type: "DISABLED" })

        // console.log(state?.data);

        addItem(state?.data);
    }

    useEffect(() => {
        try {
            axios.get(`${APIUrl}/products/${id}`).then(response => {
                const data = response.data;
                // setHave(true);
                // setProduct(data);
                dispatch({ type: "GET_PRODUCT", payload: data })
                dispatch({ type: "IS_PARAMS", id })
            })
        } catch (error) {
            console.error(error);
            // setHave(false);
            // setProduct({})

            dispatch({ type: "GET_PRODUCT", payload: {} })
            dispatch({ type: "IS_PARAMS", id })
        }
    }, [])

    if (state.isParams)
        return (
            <Fragment>
                <Helmet>
                    <title>Moody - {state?.data.title}</title>
                </Helmet>
                <Breadcrumb current={state?.data.title} />

                <section className="Product">
                    <Container>
                        <Row className={`Product__row`}>
                            <Col span={16} className="Product__data">
                                <Row justify={"space-between"} className={`Product__data-images`}>
                                    <Col span={11}>
                                        <Img className={`Product__imageholder`} src={state?.data.image} alt={state?.data.title} />
                                    </Col>

                                    <Col span={11}>
                                        <Img className={`Product__imageholder`} src={state?.data.image} alt={state?.data.title} />
                                    </Col>

                                    <Col span={24}>
                                        <Img className={`Product__imageholder`} src={state?.data.image} alt={state?.data.title} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24} className={`Product__data-desc`}>
                                        <Title bodyText={"p"} className={`Product__data-desc__title`}>
                                            {state?.data.title}
                                        </Title>

                                        <Title level={"h3"} className={`Product__data-desc__text`}>
                                            {state?.data.description}
                                        </Title>

                                        <ul className={'list-none Product__data-desc__list '}>
                                            <li className={`Product__data-desc__item`}>
                                                <Flex>
                                                    Composition — <Title level={"h3"}> Cotton 50%, Lyocell 50%</Title>
                                                </Flex>
                                            </li>

                                            <li className={`Product__data-desc__item`}>
                                                <Flex>
                                                    Art. No. — <Title level={"h3"}> 0643448004</Title>
                                                </Flex>
                                            </li>
                                        </ul>

                                    </Col>
                                </Row>
                            </Col>

                            <Col span={7} className="Product__content">
                                <Title level={"h2"}> {state?.data.title} </Title>

                                <Typography.Title level={3}>{state?.data.price} $</Typography.Title>

                                <Typography.Title level={3} className={`Product__content-desc`}>
                                    {state?.data.description}
                                </Typography.Title>

                                <Image src={state?.data.image} height={72} alt={`Checked Duvet Cover Set`} className={`Product__content-image`} />

                                <Title level={"h3"} className={`Product__content-location`}> <FaLocationDot /> Not available in stores</Title>

                                <Select
                                    options={state?.data.sizes}
                                    placeholder={`select size`}
                                    className={`Product__content-select`}
                                    defaultValue={state.size}
                                    onChange={handleProductSize}
                                />

                                <div className="Product__content-buttons">
                                    <Btn primary disabled={state?.disabled} onClick={handleDisabled}>
                                        Add to shopping bag
                                    </Btn>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </section>

                <AlsoBuy />
            </Fragment>
        )

    return <Title level={"h3"}> Empty or Not Found </Title>
}

export default Product;