import { useState, useEffect } from 'react';
import Subnavbar from '../../components/subnavbar/subnavbar';
import './rent.css';
import { TbCameraPlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import Loading from '../../images/loading.svg';
const Rent = () => {
  const navigate = useNavigate();
  const url = 'http://127.0.0.1:2000/api-rentit/v1/rent';
  const [values, setValues] = useState({
    owner: '',
    product: '',
    price: '',
    unit: 'day',
    contact: '',
    lpuid: '',
    description: '',
    image: '',
  });
  // const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoader(false);
    if (status === 201) {
      alert('Posted sucesfully');
      setStatus(null);
      navigate('/');
    } else if (status === 404) {
      alert('Failed to post, image already exists');
      setStatus(null);
    }
  }, [status]);

  const handlePost = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        setStatus(response.status);
        return response.json();
      })
      // .then((data) => {
      //   console.log(status);
      //   console.log(data);
      //   if (status === 201) {
      //     setMessage('Posted sucesfully');
      //   } else {
      //     setMessage('Failed to Post. Image already used');
      //   }
      //   if (status === 404) alert(message);
      // })
      .catch((err) => {
        console.log('ERROR -', err);
        setLoader(false);
      });
  };

  // const savePost = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       body: JSON.stringify(values),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //     });
  //     setStatus(response.status);
  //     console.log(status);
  //     if (status === 201) {
  //       setMessage('Sucessfully posted');
  //     } else {
  //       setMessage(`Failed to post`);
  //       // alert(`Failed to post : ${message}`);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  if (loader) {
    return (
      <>
        <Subnavbar />
        <div id='loader'>
          <img className='loader' src={Loading} alt='loaing...' />
        </div>
      </>
    );
  }

  return (
    <>
      <Subnavbar />
      <div className='rentHeading or heading'>What do you want to rent ?</div>
      <form onSubmit={handlePost}>
        <div className='rentForm'>
          <div className='detail1'>
            <div className='or titles'>Product detials</div>
            <div className='detailA'>
              Title*
              <div className='rentTitle wrapBox'>
                <input
                  className='rentBox'
                  onChange={handleChange}
                  maxLength={20}
                  minLength={3}
                  name='product'
                  title='Minimum 3 and maximun 20 words'
                  required
                />
              </div>
            </div>
            <div className='detailA'>
              Description*
              <div className='rentDes wrapBox'>
                <textarea
                  maxLength={200}
                  minLength={10}
                  className='rentBox des'
                  onChange={handleChange}
                  name='description'
                  title='Minimum 10 and maximun 100 words'
                  required
                />
              </div>
            </div>
            <div className='detailImg'>
              <label className='detailA upload'>
                <TbCameraPlus in className='camera' size={28} />
                <input id='input' type='file' accept='image/*'></input>
              </label>
              <div className='urlImg wrapBox imgBox '>
                <input
                  name='image'
                  onChange={handleChange}
                  type='url'
                  className='rentBox'
                  placeholder='Paste image url here'
                  required
                />
              </div>
            </div>
          </div>
          <div className='line' id='lineRent'></div>
          <div className='detail2'>
            <div className='or titles'>Add your details</div>
            <div className='detailB'>
              Name*
              <div className='rentName wrapBox'>
                <input
                  type='text'
                  maxLength={25}
                  minLength={3}
                  className='rentBox'
                  onChange={handleChange}
                  required
                  name='owner'
                  title='Minimum 3 and maximun 25 words'
                />
              </div>
            </div>
            <div className='detailB'>
              LPU ID*
              <div className='rentID wrapBox'>
                <input
                  className='rentBox'
                  onChange={handleChange}
                  name='lpuid'
                  pattern='[0-9]{8}'
                  title='Eight digit numeric ID only'
                  required
                />
              </div>
            </div>
            <div className='detailB'>
              Contact*
              <div className='rentMob wrapBox'>
                <input
                  className='rentBox'
                  onChange={handleChange}
                  name='contact'
                  pattern='[0-9]{10}'
                  title='10 digit mobile number'
                  required
                />
              </div>
            </div>
          </div>
          <div className='line' id='lineRent'></div>
          <div className='detail3'>
            <div className=' or titles'>Renting Charges</div>
            <div className='rentCharge  chargeBox wrapBox'>
              <div className='chargeBox'>
                <input
                  placeholder='Rs.'
                  className='rentBox priceBox'
                  onChange={handleChange}
                  name='price'
                  pattern='[0-9]{1,4}'
                  title='Price shoud be between 1-9999'
                  required
                />
              </div>
              <div className='unitBox chargeBox '>
                <select
                  name='unit'
                  id='unit'
                  className='rentBox unitBox'
                  onChange={handleChange}
                >
                  <option value='day'>Per day</option>
                  <option value='hour'>Per hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id='post'>
          <button className='post btn'>Post</button>
        </div>
      </form>
    </>
  );
};
export default Rent;
