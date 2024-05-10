import { Fragment, useContext } from "react";
import Container from "../components/container";
import { Flex } from "antd";
import Cart from "../components/Cart";
import Product from "../images/product2.png"
import Breadcrumb from "../components/Breadcrumb";
import { SavedContext } from "../context/saved";

const Saved = () => {
    const { SavedLocal } = useContext(SavedContext);

    const savedLocal = JSON.parse(SavedLocal)

    const productItem = savedLocal?.map((item, index) => {
        return <Fragment key={index}>
            <Cart
                image={item.image}
                type={"product"}
                href={`/catalog/product/${item.id}`}
                vertical
                title={item.title}
                saved={item.saved} stars={item.stars} price={item.price}
            />
        </Fragment>
    })
    return (
        <Fragment>
            <Breadcrumb current={"Like more"} />
            <section className="Saved">
                <Container>
                    <Flex gap={25}>
                        {productItem.length ? productItem : "Saved is empty"}
                    </Flex>
                </Container>
            </section>
        </Fragment>
    )
}

export default Saved;