
import './PasswordModal.scss';

const PasswordModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  

  const fetchChangePassword =  async() => {
    const $email = document.getElementById('cpEmail');
    const $phoneNumber = document.getElementById('cpPhoneNumber');
  
   
    
   
  
const res = await fetch('http://localhost:8181/api/user/sendEmail', {
  method: 'POST',
  headers: { 'content-type' : 'application/json' },
  body: JSON.stringify({
      email: $email.value,
      phoneNumber: $phoneNumber.value
})
  
  });

  if (res.status === 400) {
    const text = await res.text();
    alert(text);
    return;
}

const answer = await res.text();
console.log(answer);
alert(`${answer}`);

  }

  //비번변경 요청 핸들러
  const changePasswordHandler = e => {
    e.preventDefault();

    

    // 서버에 아이디찾기 요청 전송
    fetchChangePassword();

  }

 
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal userModal' : 'userModal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main><div className='Search_div'>
                <div>  
                  <h5> 가입하신 이메일 </h5>
                  <input type='email' id='cpEmail' />
                </div>

                <div>  
                  <h5> 전화번호 </h5>
                <input type='text' maxLength='11' placeholder="- 제외한 숫자만 입력" id='cpPhoneNumber' />
                 
                </div>

               
                <div>
                  <input type='button' value='임시비밀번호 발급' id='cpSubmit' onClick={changePasswordHandler} />
                </div>

              </div></main>
        
        </section>
      ) : null}
    </div>
  );
      }
      
    

export default PasswordModal;