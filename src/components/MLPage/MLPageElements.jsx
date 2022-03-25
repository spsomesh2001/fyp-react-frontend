import { Divider } from "antd";
import styled from "styled-components";

export const BgCon = styled.img`
  width: 100%;
  height: 100%;
  z-index: -2;
  object-fit: cover;
  position: fixed;
  filter: brightness(40%);
`;

export const MCon = styled.div`
  padding: 35px 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InCon = styled.div`
  padding: 10px 30px 20px;
  width: 55%;
  min-width: 450px;
  min-height: 600px;
  background-color: #fff;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  border-radius: 5px;
`;

export const HeadDivd = styled(Divider)`
  margin-bottom: 25px !important;
  border-color: #1890ff !important;
  color: #1890ff !important;
  font-size: 1.4rem !important;
  font-weight: bold !important;
`;

export const ResCon = styled.div`
  width: 100%;
`;

export const UpImg = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

export const ResSH = styled.h2`
  font-weight: bold;
`;

export const TmpCon = styled.div`
  width: 80%;
  max-width: 450px;
  margin-bottom: 15px;
`;

export const Label = styled.p`
  margin: 0;
  font-weight: bold;
`;
