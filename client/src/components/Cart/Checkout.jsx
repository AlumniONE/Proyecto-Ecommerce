import React, { useEffect, useState } from 'react';
import {
  AmericanExpress,
  MasterCard,
  Paypal,
  Visa,
} from '../../assets/seller-icons';
import useStore from '../../utils/store';

const Checkout = () => {
  const { totalPrice, cart, updateStock, clearCart } = useStore();

  const [calculatedTotal, setCalculatedTotal] = useState(0);

  useEffect(() => {
    if (cart.length === 0) {
      setCalculatedTotal(0);
    } else if (totalPrice !== undefined) {
      const discountedPrice = totalPrice - 60;
      const totalWithTax = discountedPrice + 14;
      setCalculatedTotal(totalWithTax);
    }
  }, [totalPrice, cart]);

  function contarRepetidos(arreglo, producto) {
    return arreglo.filter((item) => item.id === producto.id).length;
  }

  const handleStock = () => {
    let elCarrito = cart;
    elCarrito.forEach((product) => {
      const cantidadRepetida = contarRepetidos(elCarrito, product);
      if (cantidadRepetida !== 0) {
        // console.log(
        //   `El producto '${product.model}' se repite ${cantidadRepetida} veces.`
        // );
        updateStock(product.id, cantidadRepetida, product);
      }
      elCarrito = elCarrito.filter((p) => p.id !== product.id);
    });
    clearCart();
  };

  return (
    <div className="w-full md:w-72">
      <div className="bg-white border rounded-md px-4 py-6 mb-5 hidden md:block">
        <p className="mb-3">Have a coupon?</p>
        <div className="flex">
          <input
            type="text"
            placeholder="Add coupon"
            className="p-2 border rounded-l-md outline-none w-full"
            id="addCoupon"
            name="addCoupon"
          />
          <button className="text-[#0D6EFD] border rounded-r-md hover:bg-[#0D6EFD] hover:text-white py-2 px-5">
            Apply
          </button>
        </div>
      </div>
      <div className="bg-white border md:rounded-md px-4 py-6">
        <div className="border-b pb-3 text-[#505050]">
          <div className="flex justify-between">
            Subtotal:
            <span className="text-[#505050]">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            Discount:<span className="text-[#FA3434]">- $60.00</span>
          </div>
          <div className="flex justify-between">
            Tax:<span className="text-[#00B517]">+ $14.00</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex justify-between font-semibold">
            Total:
            <span className="text-xl font-semibold">
              ${calculatedTotal.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleStock}
            className="bg-[#00B517] rounded-lg text-white text-lg py-2 flex justify-center"
          >
            Checkout
          </button>
          <div className="justify-center gap-2 mt-2 hidden md:flex">
            <AmericanExpress />
            <MasterCard />
            <Paypal />
            <Visa />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
