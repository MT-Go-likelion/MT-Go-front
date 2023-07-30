import React, { useEffect } from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

import close from '../../assets/images/close.png';

const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.grayWithOpacity};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainter = styled.div`
  width: 37rem;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.img`
  margin-left: auto;
  width: 1.2rem;
  height: 1.2rem;
  color: black;
  cursor: pointer;
`;

const ModalLayout = styled.div`
  width: 100%;
  height: 70%;
  z-index: 999;
  background-color: ${COLOR.white};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  padding: 2rem 1rem;
  font-size: 0.9rem;
  overflow-y: scroll;
  margin-top: 1rem;
`;

const TermsTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TermsSubTitle = styled.div``;

const TermsContent = styled.div`
  margin-bottom: 2rem;
`;

const TermsModal = ({ setTermsModalOpen }) => {
  const closeModal = () => {
    setTermsModalOpen(false);
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalContainter onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={close} onClick={closeModal} />
        <ModalLayout>
          <TermsTitle>제 1 장 총 칙</TermsTitle>
          <TermsSubTitle>제 1 조 (목적)</TermsSubTitle>
          <TermsContent>
            이 약관은 (이하 사이트라 합니다)에서 제공하는 인터넷서비스(이하 서비스라 합니다)의 이용
            조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.
          </TermsContent>

          <TermsSubTitle>제 2 조 (약관의 효력 및 변경) </TermsSubTitle>
          <TermsContent>
            ① 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게 공지함으로써 효력을
            발생합니다.② 사이트는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은
            방법으로 공지 또는 통지함으로써 효력을 발생합니다.
          </TermsContent>

          <TermsSubTitle>제 3 조 (용어의 정의) </TermsSubTitle>
          <TermsContent>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다. ① 회원 : 사이트와 서비스 이용계약을
            체결하거나 이용자 아이디(ID)를 부여받은 개인 또는 단체를 말합니다.② 신청자 : 회원가입을
            신청하는 개인 또는 단체를 말합니다. ③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여
            회원이 정하고 사이트가 승인하는 문자와 숫자의 조합을 말합니다. ④ 비밀번호 : 회원이 부여
            받은 아이디(ID)와 일치된 회원임을 확인하고, 회원 자신의 비밀을 보호하기 위하여 회원이
            정한 문자와 숫자의 조합을 말합니다. ⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을
            취소하는 것을 말합니다.
          </TermsContent>

          <TermsTitle>제 2 장 서비스 이용계약</TermsTitle>
          <TermsSubTitle> 제 4 조 (이용계약의 성립) </TermsSubTitle>
          <TermsContent>
            ① 이용약관 하단의 동의 버튼을 누르면 이 약관에 동의하는 것으로 간주됩니다. ② 이용계약은
            서비스 이용희망자의 이용약관 동의 후 이용 신청에 대하여 사이트가 승낙함으로써 성립합니다
          </TermsContent>

          <TermsSubTitle> 제 5 조 (이용신청) </TermsSubTitle>
          <TermsContent>
            ① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의 가입신청 양식에서 요구하는 이용자
            정보를 기록하여 제출해야 합니다. ② 가입신청 양식에 기재하는 모든 이용자 정보는 모두 실제
            데이터인 것으로 간주됩니다. 실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를
            받을 수 없으며, 서비스의 제한을 받을 수 있습니다.
          </TermsContent>

          <TermsSubTitle> 제 6 조 (이용신청의 승낙)</TermsSubTitle>
          <TermsContent>
            ① 사이트는 신청자에 대하여 제2항, 제3항의 경우를 예외로 하여 서비스 이용신청을
            승낙합니다.② 사이트는 다음에 해당하는 경우에 그 신청에 대한 승낙 제한사유가 해소될
            때까지 승낙을 유보할 수 있습니다.가. 서비스 관련 설비에 여유가 없는 경우나. 기술상
            지장이 있는 경우다. 기타 사이트가 필요하다고 인정되는 경우③ 사이트는 신청자가 다음에
            해당하는 경우에는 승낙을 거부할 수 있습니다.가. 다른 개인(사이트)의 명의를 사용하여
            신청한 경우나. 이용자 정보를 허위로 기재하여 신청한 경우다. 사회의 안녕질서 또는
            미풍양속을 저해할 목적으로 신청한 경우라. 기타 사이트 소정의 이용신청요건을 충족하지
            못하는 경우
          </TermsContent>

          <TermsSubTitle> 제 7 조 (이용자정보의 변경)</TermsSubTitle>
          <TermsContent>
            회원은 이용 신청시에 기재했던 회원정보가 변경되었을 경우에는, 온라인으로 수정하여야 하며
            변경하지 않음으로 인하여 발생되는 모든 문제의 책임은 회원에게 있습니다.
          </TermsContent>
        </ModalLayout>
      </ModalContainter>
    </ModalBackdrop>
  );
};

export default TermsModal;
