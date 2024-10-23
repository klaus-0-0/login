import { useState } from 'react';
import axios from 'axios';


const Signup = () => {
  const [data, setData] = useState({username: '',  email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get('/api/items');
    console.log('Response data:', response.data);
    const postResponse = await axios.post('/api/Signup', data);
    console.log('Data sent successfully:', postResponse.data);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });      // taking copy from onChange(live data) then over writing and adding new data [name]: value -> then setdata updates on to data
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>

        {/* <label>
          username:
          <input type='text' onChange={(e) => {
            setData(e.target.value);
          }} placeholder="John" label={"First Name"} />
        </label>
        <label>
          value:
          <input type='text' onChange={(e) => {
            setData(e.target.value);
          }} placeholder="John" label={"last Name"} />
        </label> */}


        <label>
          username:
          <input id='1' type="text" name="username" value={data.username} onChange={handleChange} />
        </label>
        <label>
          email:
          <input type="text" name="email" value={data.email} onChange={handleChange} />
        </label>
        <label>
          password:
          <input type="text" name="password" value={data.password} onChange={handleChange} />
        </label>
        <button type="submit" >Send</button>
      </form>
    </div>
  );
};

export default Signup;
