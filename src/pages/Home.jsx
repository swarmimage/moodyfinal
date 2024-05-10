import { Fragment, useState, useEffect, useContext } from "react";
import { Button, Carousel, Flex, Typography } from "antd";
import { RiTruckLine } from "react-icons/ri";
import { FiCreditCard } from "react-icons/fi";
import { MdHeadsetMic, MdOutlineEmail } from "react-icons/md";
import Container from "../components/container";
import Img from "../components/image";
import BannerImage from "../images/banner-image.png";
import Title from "../components/Title";
import Cart from "../components/Cart";
import Advertising1 from "../images/advertising-1.png";
import Advertising2 from "../images/advertising-2.png";
import CartImage1 from "../images/card-1.png";
import Product1 from "../images/product1.png";
import CartImage2 from "../images/card-2.png";
import Product2 from "../images/product2.png";
import Input from "../components/Input";
import { default as Btn } from "../components/Button";
import { Context } from "../context"
import { SavedContext } from "../context/saved";
import {Helmet} from "react-helmet"

const Home = () => {
    const { ProductsData } = useContext(Context);
    const { handleSaved } = useContext(SavedContext)
    const [ShortProducts, setShortproducts] = useState([]);
    const [TopProducts, setTopProducts] = useState([]);
    const [SliceTopProducts, setSliceTopProducts] = useState(4)

    useEffect(() => {

        const shortArray = ProductsData?.slice((
            ProductsData?.length - 6
        ))

        setShortproducts(shortArray);

        const topArray = ProductsData?.filter(item => item?.top)

        setTopProducts(topArray);

    }, [ProductsData?.length]);

    const shortItem = ShortProducts.map((item, i) => {
        return (
            <Fragment key={i}>
                <Cart type={"product"}
                    vertical
                    image={item.image}
                    title={item.title}
                    stars={item.stars} price={item.price}
                    href={`/catalog/product/${item.id}`}
                    handleSaved={() => handleSaved(item)}
                />
            </Fragment>
        )
    });

    const handleMore = () => {
        SliceTopProducts > TopProducts.length ? setSliceTopProducts(4)
            : setSliceTopProducts(prev => prev + 4)
    }

    const topItem = TopProducts.slice(0, SliceTopProducts).map(item => {
        return (
            <Fragment key={item.id}>
                <Cart
                    type={"product"}
                    horizontal image={item.image}
                    href={`/catalog/product/${item.id}`}
                    title={item.title}
                    price={item.price} stars={item.stars} />
            </Fragment>
        )
    })

    return (
        <Fragment>
            <Container>
                <Helmet>
                    <title>Moody - Home</title>
                </Helmet>
                <Flex
                    className="header__top-service"
                    justify="space-around"
                    align="center"
                >

                    <Button className="header__top-service__item"
                        icon={<RiTruckLine className="header__top-service-icon" />}
                    >
                        FREE SHIPPING
                    </Button>

                    <Button className="header__top-service__item"
                        icon={<FiCreditCard className="header__top-service-icon" />}
                    >
                        100% MONEY BACK
                    </Button>

                    <Button className="header__top-service__item"
                        icon={<MdHeadsetMic className="header__top-service-icon" />}
                    >
                        SUPPORT 24/7
                    </Button>
                </Flex>
            </Container>

            <section className="banner">
                <Container>
                    <Carousel autoplay>
                        <Flex justify="center" align="center" gap={66} className={`banner__item`}>
                            <Img
                                className={`banner__imageholder`}
                                alt="HOT DEALS THIS WEEK"
                                src={BannerImage}
                            />

                            <div className="banner__content">
                                <Typography.Title level={3} className={"banner__subtitle"}>
                                    HOT DEALS THIS WEEK
                                </Typography.Title>

                                <Title level={"h1"} className={`banner__title`}>
                                    SALE UP 50% <br />
                                    MODERN FURNITURE
                                </Title>

                                <Btn secondary className={`banner__link`}>
                                    VIEW NOW
                                </Btn>
                            </div>
                        </Flex>

                        <Flex justify="center" align="center" gap={66} className={`banner__item`}>
                            <Img
                                className={`banner__imageholder`}
                                alt="HOT DEALS THIS WEEK"
                                src={BannerImage}
                            />

                            <div className="banner__content">
                                <Typography.Title level={3} className={"banner__subtitle"}>
                                    HOT DEALS THIS WEEK
                                </Typography.Title>

                                <Title level={"h1"} className={`banner__title`}>
                                    SALE UP 50% <br />
                                    MODERN FURNITURE
                                </Title>

                                <Btn secondary className={`banner__link`}>
                                    VIEW NOW
                                </Btn>
                            </div>
                        </Flex>
                    </Carousel>
                </Container>
            </section>

            <section className="Cards">
                <Container>
                    <Flex justify={"space-between"}>
                        <Cart href={"#"} type={"advertising"} image={Advertising1}
                            className={`Cart__advertising--lightgrey`} title={`INY VINTAGE CHAIR`} />
                        <Cart href={"#"} type={"advertising"} image={Advertising2}
                            className={`Cart__advertising--lightgreen`} title={`LARGE TERRACOTA VASE`} />
                    </Flex>

                    <Flex justify={"space-between"} gap={23} align={"center"} className={`Cards__row`} wrap={"wrap"}>
                        <Cart type={"common"} href={"#"} title={`DECOR`}
                            body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                            image={CartImage1} />

                        {shortItem}

                        <Cart type={"common"} href={"#"} title={`BOHO CHIC`}
                            body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                            image={CartImage2} />
                    </Flex>
                </Container>
            </section>

            <section className="Sets">
                <Container>
                    <div className="Sets__row">
                        <div className="Sets__content">
                            <Title level={"h2"} className={"Sets__title"}>BEDSHEET SETS</Title>
                            <Flex className="Sets__price" align={"center"} gap={21}>
                                <Title level={"h2"}>$50.00</Title>
                                <Title bodyText={"p"} className={`Sets__price-old`}>$220.00</Title>
                            </Flex>

                            <Title bodyText={"p"} className={`Sets__text`}>Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor.</Title>

                            <Btn href={"#"} secondary className={`Sets__link`}>VIEW DETAILS</Btn>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="Top-rating">
                <Container>
                    <Typography.Title level={2} className={`Top-rating__title`}>TOP RATING</Typography.Title>
                    <Flex gap={25} wrap={"wrap"} align={"center"} className={"Top-rating__row"}>
                        {topItem}
                    </Flex>

                    <div className="Top-rating__buttons">
                        <Btn primary onClick={handleMore}>load more products</Btn>
                    </div>
                </Container>
            </section>

            <section className="Sign">
                <Container>
                    <Flex justify={"space-between"}>
                        <div className="Sign__description">
                            <Title level={"h2"}>SING UP FOR THE NEWSLETTER</Title>
                            <Title level={"h3"} className={`Sign__text`}>Subscribe for the latest stories and
                                promotions</Title>
                        </div>

                        <Flex justify={"end"}>
                            <form className={`Sign__form`}>
                                <Input type={"email"} placeholder={`Enter your e-mail address`}
                                    className={`Sign__form-input`} />
                                <Btn type={"submit"} primary className={`Sign__form-button`}>
                                    {<MdOutlineEmail />}
                                </Btn>
                            </form>
                        </Flex>
                    </Flex>
                </Container>
            </section>
        </Fragment>
    )
}

export default Home;