import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CgRemove } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
// import { MdOutlineRemoveCircle } from 'react-icons/md';

const ProductCard = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState(props.data);
  const [count, setCount] = useState(props.count);
  // const data = props.data;
  const type = props.type;
  const user = JSON.parse(sessionStorage.getItem('userDetails')).email;
  const url = 'http://127.0.0.1:2000/api-rentit/v1/items';
  const handleClick = (id) => {
    navigate('/itemDetails', { state: { id: id } });
  };
  const removeProduct = async (id, type) => {
    if (window.confirm('Do you want do delete this post?')) {
      await axios.delete(`${url}/${id}/${user}/${type}`);
      setData(null);
      setCount(count - 1);
    }
  };
  if (!data) {
    if (!count && type === 'posts') return <>No produts posted</>;
    else if (!count && type === 'saves') return <>No products saved</>;
    else return <></>;
  }
  return (
    <>
      <div className='cellBox'>
        <div className='productBox' onClick={() => handleClick(data._id)}>
          <div id='img'>
            <img className='img' src={data.image} alt='' />
          </div>
          <div className='line ver'></div>
          <div className='detailsBox'>
            <div className='name BX or'>{data.product}</div>
            <div className='price BX or'>
              {' '}
              ₹{data.price} per {data.unit}
            </div>
            <div className='description BX'>{data.description}</div>
            {/* <div className='line divide'></div> */}
          </div>
        </div>
        <div
          id='remove'
          className='gentle-hover-shake'
          onClick={() => removeProduct(data._id, type)}
        >
          {type === 'posts' ? (
            <RiDeleteBinLine in className='remove ' size={22} />
          ) : (
            <CgRemove in className='remove ' size={22} />
          )}
        </div>
      </div>
    </>
  );
};
export default ProductCard;
