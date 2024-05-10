import { Fragment, useState, useId } from "react"
import Title from "../components/Title"
import Img from "../components/image"
import { Button, Flex, Select } from "antd"
import { IoHeartOutline } from "react-icons/io5"
import { IoMdClose } from "react-icons/io"
import { useCart } from "react-use-cart"

export const ProductItem = ({
    image, title, price, color, totalPrice, productId, size, id,
}) => {
    const [Quantity, setQuantity] = useState(1);
    const { removeItem, updateItemQuantity } = useCart();
    const ProductId = useId();

    const handleSelect = value => {
        setQuantity(value)
        updateItemQuantity(id, value)
    }

    return (
        <Fragment>
            <Flex gap={18} className={`Shopping-bag__item`}>
                <Img src={image} alt={title} className={`Shopping-bag__image`} />

                <div className="Shopping-bag__item-content">
                    <Title bodyText={"p"} className={`Shopping-bag__item-title`}>
                        {title}
                    </Title>

                    <Title level={"h3"} className={`Shopping-bag__item-price`}>
                        {price} $
                    </Title>

                    <ol className={`list-none Shopping-bag__item-list`}>
                        <li className={`Shopping-bag__item-list__item`}>
                            Art. No.: {ProductId}
                        </li>
                        <li className={`Shopping-bag__item-list__item`}>
                            Color: {color}
                        </li>
                        <li className={`Shopping-bag__item-list__item`}>
                            Size: {size}
                        </li>
                        <li className={`Shopping-bag__item-list__item`}>
                            Total: {totalPrice}
                        </li>
                    </ol>

                    <Flex gap={6}>
                        <Button icon={<IoHeartOutline />} />

                        <Select
                            defaultValue={Quantity}
                            options={[
                                { value: 1, label: 1, disabled: true },
                                { value: 2, label: 2 },
                            ]}
                            onChange={handleSelect}
                        />
                    </Flex>

                    <Button onClick={() => removeItem(id)} icon={<IoMdClose />} className={`Shopping-bag__item-close`} />
                </div>
            </Flex>
        </Fragment>
    )
}