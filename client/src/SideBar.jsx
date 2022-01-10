import React, {useRef, useState} from 'react';
import emailjs from 'emailjs-com';
const Sidebar = () => {
    const [done, setDone] = useState(false)
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_5ohhkoa', 'template_hr5y49x', form.current, 'user_BuRfoWLExzUhRTmIxj6QJ')
          .then((result) => {
              console.log(result.text);
            setDone(true)
          }, (error) => {
              console.log(error.text);
          });
      };


        setTimeout(() => {
            setDone(false)
        }, 3000)

      

    return (
        <div className="sidebar">
            <div className="about">
                <div className="about-title">About</div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis obcaecati vitae aliquid itaque cumque eius dolorum enim, velit numquam maxime deserunt odit. Suscipit debitis quisquam aliquid autem modi, maiores dolorem.</p>
            </div>
            <div className="subscription">
                <h2>Subscribe For Latest Articles</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <input type="email" id="" name="user_email" className="subInput" placeholder="Enter Email" />
                    <button type="submit" className="subInputButton">Subscribe</button>
                </form>
                {done && <span style={{color:"green", fontWeight: "bold", fontSize: "1.5rem"}}>Email successfully sent</span>}
            </div>
            <div className="category">
                <h3>Categories</h3>
                <ul>
                    <li>Music</li>
                    <li>Life</li>
                    <li>Programming</li>
                    <li>Health</li>
                    <li>Politics</li>
                </ul>
            </div>
            <div className="social-media">
                <h3>Follow us</h3>
                <ul>
                    <li><i className="fa fa-twitter twitter"></i></li>
                    <li><i className="fa fa-facebook facebook"></i></li>
                    <li><i className="fa fa-instagram instagram"></i></li>
                    <li><i className="fa fa-github"></i></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
