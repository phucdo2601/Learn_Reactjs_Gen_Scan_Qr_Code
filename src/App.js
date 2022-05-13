import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import QRCode from "qrcode";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

function App() {
  const classes = useStyles();

  /**
   * Dat bien useState cho input text for generating qr code
   */
  const [text, setText] = useState("");

  /**
   * Dat bien useState cho image for generating qr code
   */
  const [image, setImage] = useState("");

  const [scanResultFile, setScanResultFile] = useState("");

  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const qrRef = React.useRef(null);
  /**
   * ham bat su thay doi cua input text for generating qr code
   */
  const handleChangInput = (event) => {
    setText(event.target.value);
  };

  /**
   * ham generate qr code from input text
   */
  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImage(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * ham scan qr code
   */
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  /**
   * ham xu ly khi scan bi loi
   */
  const handleErrorFile = (error) => {
    console.log(error);
  };

  /**
   * ham xu ly nut scan file
   */
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <>
      <Container className={classes.container}>
        <Card>
          <h2 className={classes.title}>
            Generate Download &amp; Scan QR code with Reactjs
          </h2>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <TextField
                  label="Enter Text Here"
                  onChange={(e) => handleChangInput(e)}
                />
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  onClick={() => generateQrCode()}
                >
                  Generate Qr Code
                </Button>
                <br />
                <br />
                <br />
                {/* them chu download sau a de khi nhan duong link se tai xuong dc file */}
                {image ? (
                  <a href={image} download>
                    <img src={image} alt="Image" />
                  </a>
                ) : null}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                  onClick={onScanFile}
                >
                  Scan Qr Code
                </Button>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{
                    width: "100%",
                  }}
                  onScan={handleScanFile}
                  onError={handleErrorFile}
                />
                <h3>Scanned Code: {scanResultFile}</h3>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <h3>Qr Code Scan by Web Cam</h3>
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      setScanResultWebCam(result?.text);
                    }

                    if (!!error) {
                      console.info(error);
                    }
                  }}
                  style={{ width: "100%" }}
                />
                <p>
                  Scanned Code on Web Cam:
                  <a href={scanResultWebCam}>{scanResultWebCam}</a>
                </p>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
