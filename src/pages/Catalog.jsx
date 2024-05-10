import { Fragment, useState, useContext, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/container";
import { Button, Checkbox, Flex, Typography } from "antd";
import Title from "../components/Title";
import { FiFilter } from "react-icons/fi";
import Cart from "../components/Cart";
import Product1 from "../images/product1.png";
import { default as Btn } from "../components/Button";
import { Context } from "../context/index";
import { Helmet } from "react-helmet";

const Catalog = () => {
    const [IsShow, setIsShow] = useState(false);

    const { ProductsData } = useContext(Context);

    const [Products, setProducts] = useState([]);

    const [IsEmpty, setIsEmpty] = useState(true);

    const handleFilter = () => setIsShow(prev => !prev);

    const handleProducts = () => {
        setProducts(() => ProductsData && ProductsData?.length ?
            ProductsData : []
        )
    }

    const handleShopBy = e => {
        const value = e.target.dataset.shopBy;

        const products = ProductsData?.filter(item => {

            if (item?.category?.shopBy?.includes(
                value
            )) {
                return item;
            }
        })

        setProducts(() => products && products.length ? [...products] : [])
    }

    const handleGender = e => {
        const value = e.target.value;

        const products = ProductsData?.filter(item => {
            if (item?.category?.gender?.includes(
                value
            )) {
                return item;
            }
        })

        setProducts(() => products && products.length ? [...products] : [])
    }

    useEffect(() => {
        setProducts(() => ProductsData && ProductsData?.length ?
            ProductsData : []
        )
    }, [ProductsData?.length])

    const product = Products?.map((product, i) => {
        return <Fragment key={i}>
            <Cart href={`/catalog/product/${product.id}`}
                type={"product"}
                vertical
                image={product.image}
                title={product.title}
                colors={product.category?.colors}
                price={product.price}
            />
        </Fragment>
    })


    return (
        <Fragment>
            <Helmet>
                <title>Moody - Catalog</title>
            </Helmet>
            <Breadcrumb />
            <section className="Sales">
                <Container>
                    <div className="Sales__row">
                        <Typography.Title level={1} className={`Sales__title`}>
                            MEMBER EXCLUSIVE
                        </Typography.Title>
                        <Typography.Title level={1} className={`Sales__text`}>
                            15% OFF EVERYTHING + EXTRA $10 OFF FOR PLUS STATUS
                        </Typography.Title>
                        <Title bodyText={'p'} className={`Sales__recommended`}>
                            NOT A MEMBER? JOIN NOW TO SHOP.
                        </Title>
                    </div>
                </Container>
            </section>

            <section className="Products">
                <Container>
                    <Flex justify={"space-between"} gap={130}>
                        {/*Products__aside show*/}
                        <aside className={`Products__aside ${IsShow && "show"}`}>
                            <div className="Products__aside-item">
                                <Typography.Title level={4} className={`Products__aside-title`}>New
                                    arrivals</Typography.Title>
                                <ul className={`list-none`}>
                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`}>New
                                            arrivals</Title>
                                    </li>
                                </ul>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>Shop by room</Typography.Title>

                                <ul className={`list-none Products__aside-list`}>
                                    <li className={"active"}>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Bedroom"}>Bedroom</Title>
                                    </li>

                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Living room"}>living room</Title>
                                    </li>

                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Child room"}>child room</Title>
                                    </li>

                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Bathroom"}>bathroom</Title>
                                    </li>

                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Outdoor"}>Outdoor</Title>
                                    </li>
                                </ul>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>shop by
                                    concept</Typography.Title>
                                <ul className={`list-none Products__aside-list`}>

                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Conscious"}>Conscious</Title>
                                    </li>

                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Premium Quality"}>premium quality</Title>
                                    </li>

                                    <li>
                                        <Title bodyText={'p'} className={`Products__aside-text`} onClick={handleShopBy} data-shop-by={"Classic Collection"}>classic collection</Title>
                                    </li>
                                </ul>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title"
                                    level={4}>gender</Typography.Title>
                                <Checkbox.Group>
                                    <ul className={`list-none Products__aside-list`}>

                                        <li>
                                            <Checkbox value={"Man"} onChange={handleGender}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>Man</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox value={"Woman"} onChange={handleGender}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>woman</Title>
                                            </Checkbox>
                                        </li>
                                    </ul>
                                </Checkbox.Group>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>Color</Typography.Title>
                                <Checkbox.Group>
                                    <Flex wrap={"wrap"} gap={13} className="Products__aside-checkboxes">

                                        <Checkbox value={"white"} className={`Products__aside-checkbox Products__aside-checkbox--white`} />
                                        <Checkbox value={"black"} className={`Products__aside-checkbox Products__aside-checkbox--black`} />
                                        <Checkbox value={"grey"} className={`Products__aside-checkbox Products__aside-checkbox--grey`} />
                                        <Checkbox value={"yellow"} className={`Products__aside-checkbox Products__aside-checkbox--yellow`} />
                                        <Checkbox value={"orange"} className={`Products__aside-checkbox Products__aside-checkbox--orange`} />
                                        <Checkbox value={"orange-red"} className={`Products__aside-checkbox Products__aside-checkbox--orange-red`} />
                                        <Checkbox value={"pink"} className={`Products__aside-checkbox Products__aside-checkbox--pink`} />
                                        <Checkbox value={"aqua"} className={`Products__aside-checkbox Products__aside-checkbox--aqua`} />
                                        <Checkbox value={"green"} className={`Products__aside-checkbox Products__aside-checkbox--green`} />
                                        <Checkbox value={"green-secondary"} className={`Products__aside-checkbox Products__aside-checkbox--green-secondary`} />
                                        <Checkbox value={"blue"} className={`Products__aside-checkbox Products__aside-checkbox--blue`} />
                                        <Checkbox value={"red"} className={`Products__aside-checkbox Products__aside-checkbox--red`} />
                                        <Checkbox value={"brown"} className={`Products__aside-checkbox Products__aside-checkbox--brown`} />
                                        <Checkbox value={"darkblue"} className={`Products__aside-checkbox Products__aside-checkbox--darkblue`} />
                                        <Checkbox value={"lightbrown"} className={`Products__aside-checkbox Products__aside-checkbox--lightbrown`} />
                                        <Checkbox value={"violet"} className={`Products__aside-checkbox Products__aside-checkbox--violet`} />
                                        <Checkbox value={"darkgreen"} className={`Products__aside-checkbox Products__aside-checkbox--darkgreen`} />
                                        <Checkbox value={"march"} className={`Products__aside-checkbox Products__aside-checkbox--march`} />
                                    </Flex>
                                </Checkbox.Group>
                            </div>

                            <div className="Products__aside-item">
                                <Typography.Title className="Products__aside-title" level={4}>Price</Typography.Title>

                                <Checkbox.Group>
                                    <ul className={`list-none Products__aside-list`}>

                                        <li>
                                            <Checkbox data-price-min={0} data-price-max={40} value={"40"}>
                                                <Title bodyText={'p'}
                                                    className={`Products__aside-text`}>0$-40$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={40} data-price-max={100} value={"100"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>40$ –
                                                    100$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={100} data-price-max={150} name={"150"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>100$ –
                                                    150$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={150} data-price-max={175} value={"175"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>150$ –
                                                    175$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={175} data-price-max={250} name={"250"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>175$ –
                                                    250$</Title>
                                            </Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox data-price-min={250} data-price-max={350} value={"350"}>
                                                <Title bodyText={'p'} className={`Products__aside-text`}>250$ –
                                                    350$</Title>
                                            </Checkbox>
                                        </li>
                                    </ul>
                                </Checkbox.Group>
                            </div>
                        </aside>

                        {/*Products__wrap active*/}
                        <article className={`Products__wrap ${IsShow && "active"}`}>
                            <Title level={"h1"} className={`Products__title`}>BEDROOM</Title>
                            <Title level={"h3"} className={`Products__subtitle`}>ITS EASY TO TRANSFORM YOUR BEDROOM INTERIOR WITH OUR GREAT SELECTION OF ACCESSORIES.</Title>

                            <Flex align={"center"} justify={"space-between"} className="Products__filters">
                                <Button onClick={handleFilter} icon={<FiFilter />}>
                                    filter & sort
                                </Button>

                                <div className="Products__filters-right">
                                    <Btn className={`Products__filters-red`} secondary>
                                        <Title bodyText={"p"}>Models</Title>
                                    </Btn>
                                    <Btn secondary onClick={handleProducts}>
                                        <Title bodyText={"p"}>products</Title>
                                    </Btn>

                                </div>
                            </Flex>

                            {
                                Products.length > 0 ? <Flex gap={24} wrap={"wrap"}>
                                    {product}
                                </Flex> : <Title bodyText={"p"}>Empty</Title>
                            }

                            <div className="Products__buttons">
                                <Btn primary>load more products</Btn>
                            </div>
                        </article>
                    </Flex>
                </Container>
            </section>
        </Fragment>
    )
}

export default Catalog;