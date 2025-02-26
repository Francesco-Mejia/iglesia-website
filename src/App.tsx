import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Header } from './Components/Header';
import { Presentacion } from './Components/Presentacion';
import { LiveStream } from './Components/LiveStream';
import { Schedule } from './Components/Schedule';
import { Map } from './Components/Map';
import { Footer } from './Components/Footer';
import { Events } from './Components/Events';
import { News } from './Components/News';

function App() 
{
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Presentacion />
        </Col>
      </Row>
      <Row>
        <Col>
          <Schedule />
        </Col>
      </Row>
      <Row>
        <Col>
          <Map />
        </Col>
      </Row>
      <Row>
        <Col>
          <Events/>
        </Col>
      </Row>
      <Row>
        <Col>
          <News />
        </Col>
      </Row>
      <Row>
        <Col>
          <LiveStream/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </>
      
    
  );
}

export default App;
