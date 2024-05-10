import { Fragment, useState, useContext, useEffect } from "react";
import Container from "../container";
import "./also-buy.scss"
import Cart from "../Cart";
import Product from "../../images/product3-0.png"
import { Flex } from "antd";
import Img from "../image";
import ArrowLeft from "../../images/arrow-left.svg"
import ArrowRight from "../../images/arrow-right.svg"
import Title from "../Title";
import { Context } from "./../../context"

const AlsoBuy = ({ className }) => {
    className = `Also-buy ${className}`;

    const { ProductsData } = useContext(Context);
    const [Products, setProducts] = useState([])

    useEffect(() => {
        const products = [];

        for (let index = 0; index < ProductsData.length; index++) {
            const randomIndex = Math.floor(
                Math.random() * (ProductsData.length - 1)
            )
            products.push(ProductsData[randomIndex]);
        }

        setProducts(() => products.length ? [...products] : []) 
    }, [ProductsData?.length])

    const productItem = Products.slice(0, 4).map((item, index) => {
        return <Fragment key={index}>
            <Cart
                image={item.image}
                title={item.title}
                type={"product"}
                vertical
                colors={item.colors}
                href={`/catalog/product/${item.id}`}
                price={item.price}
            />
        </Fragment>
    })

    return (
        <Fragment>
            <section className={className}>
                <Container className={`Also-buy__container`}>
                    <Title level={"h2"}>Also You May Like</Title>
                    <Flex gap={24} align={"center"} >
                        {productItem}
                    </Flex>

                    <Flex className="Also-buy__arrows" justify={"space-between"}>
                        <Img src={ArrowLeft} alt={`Arrow`} />
                        <Img src={ArrowRight} alt={`Arrow`} />
                    </Flex>
                </Container>
            </section>
        </Fragment>
    )
}

export default AlsoBuy;