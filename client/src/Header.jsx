import React, {useRef, useState} from 'react';
import emailjs from 'emailjs-com';

const Header = () => {
    const form = useRef();
    const [done, setDone] = useState(false)
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
        <> 
            <div className="headerTitle">
            <span className="headerTitleSM">Swan's Blog</span>
            <span className="headerTitleLG">A blog about programming, web development and testing</span>
          
          <img
                className="headerImg"
                src="https://images.unsplash.com/7/Top_view.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                alt=""
              />
        </div>
    

    <div className="email">
        <div className="emailHeader">
        <div className="email-header">Get updated here.</div>
        <div className="email-header-sm">I'm here to help you build full stack websites.</div>
    </div>
        <div className="email-form">
            <form ref={form} onSubmit={sendEmail}>
                <input className="emailInput" type="email" name="user_email" placeholder="Enter your email"/>
                <button className="emailSubmitInput" type="submit">Subscribe</button>
            </form>
        </div>
    </div>
    {done && <div className="done-popup">Email successfully sent</div>}
        </>
    );
}

export default Header;
