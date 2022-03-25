import React, { useState } from "react";
import {
  BgCon,
  HeadDivd,
  InCon,
  Label,
  MCon,
  ResCon,
  ResSH,
  TmpCon,
  UpImg,
} from "./MLPageElements";
import axios from "axios";
import { Button, Form, Progress, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../styles.css";
import bg from "../../media/bg.jpg";

const init_vals = {
  loading: { pred: false },
  disabled: { pred: false },
};

const MLPage = () => {
  const { Option } = Select;

  const [file, setFile] = useState([]);
  const [mlOp, setMlOp] = useState(null);
  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(init_vals.loading);
  const [disabled, setDisabled] = useState(init_vals.disabled.pred);

  const [mLForm] = Form.useForm();

  const predictImg = async (values) => {
    if (!mlOp) {
      alert("Please select option!");
      return;
    }
    console.log(values);
    setLoading({ pred: true });

    try {
      var url = null;
      console.log(mlOp);
      if (mlOp === "1") {
        url = "http://127.0.0.1:5000/pndetect";
      } else if (mlOp === "2") {
        url = "http://127.0.0.1:5000/skdetect";
      }
      const formData = new FormData();
      formData.append("img", file[0]);
      formData.append("predictType", mlOp);
      formData.append("fileName", file.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      console.log(url);
      const res = await axios.post(url, formData, config);

      console.log("Success => ", res.data);
      setTimeout(() => {
        setResponse(res.data);
        setLoading({ pred: false });
        setDisabled(true);
      }, 2000);
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  return (
    <>
      <BgCon src={bg} alt="bg" />
      <MCon>
        <InCon>
          <HeadDivd orientation="left">Healthcare Diagonsis Support</HeadDivd>
          <Form form={mLForm} onFinish={predictImg}>
            <Form.Item
              label="Select To Diagnose"
              name="predictType"
              rules={[{ required: true, message: "Please select option!" }]}
            >
              <Select
                onChange={(value) => {
                  setMlOp(value);
                  setFile([]);
                }}
                placeholder="- - Select Option - -"
                disabled={loading.pred || disabled}
              >
                <Option value="1">Pneumonia Detection</Option>
                <Option value="2">Skin Cancer Detection</Option>
              </Select>
            </Form.Item>
            {mlOp && (
              <>
                <Form.Item
                  name="file"
                  label="Upload Image"
                  rules={[{ required: true, message: "Please select image!" }]}
                >
                  <Upload
                    beforeUpload={(file) => {
                      setFile([file]);
                      return false;
                    }}
                    onRemove={(file) => setFile([])}
                    maxCount={1}
                    fileList={file}
                    disabled={loading.pred || disabled}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      disabled={loading.pred || disabled}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading.pred}
                    disabled={loading.pred || disabled}
                  >
                    Predict
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>

          <ResCon>
            {response && (
              <>
                {mlOp === "1" && (
                  <HeadDivd orientation="left">Pneumonia Detection</HeadDivd>
                )}
                {mlOp === "2" && (
                  <HeadDivd orientation="left">Skin Cancer Detection</HeadDivd>
                )}

                <UpImg src={URL.createObjectURL(file[0])} alt="pimg" />

                <ResSH>Confidence Levels</ResSH>

                <TmpCon>
                  {mlOp === "1" && <Label>Normal:</Label>}
                  {mlOp === "2" && <Label>Benign:</Label>}
                  <Progress
                    percent={parseFloat(response.level[0])}
                    trailColor="#d7d7d7"
                  ></Progress>
                </TmpCon>

                <TmpCon>
                  {mlOp === "1" && <Label>Pneumonia:</Label>}
                  {mlOp === "2" && <Label>Malignant:</Label>}
                  <Progress
                    percent={parseFloat(response.level[1])}
                    trailColor="#d7d7d7"
                  ></Progress>
                </TmpCon>
                {/* <p style={{ width: "100%" }}>
                {JSON.stringify(response, null, 5)}
              </p> */}

                <Button
                  onClick={() => {
                    setResponse(null);
                    setMlOp(null);
                    mLForm.resetFields();
                    setFile([]);
                    setDisabled(false);
                  }}
                  // style={{marginTop: "20px"}}
                >
                  Clear
                </Button>
              </>
            )}
          </ResCon>
        </InCon>
      </MCon>
    </>
  );
};

export default MLPage;
