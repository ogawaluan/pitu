import React from 'react';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';

import ShortenerService from '../../services/shortenerService';
import Header from '../../components/Header';
import { ContentContainer, Form, AdsBlock } from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: '',
      code: '',
      errorMessage: '',
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { url } = this.state;

    this.setState({ isLoading: true, errorMessage: '' });

    if (!url) {
      this.setState({ isLoading: false, errorMessage: 'Enter a URL to shorten' });
    } else {
      try {
        const service = new ShortenerService();
        const results = await service.generate({ url });

        this.setState({ isLoading: false, code: results.code });

      } catch(err) {
        this.setState({ isLoading: false, errorMessage: 'Uups, there was an error trying to shorten the URL' });
      }
    }
  }

  copyToClipboard = () => {
    const element = this.inputURL;

    element.select();

    document.execCommand('copy');
  }

  render() {
    const { isLoading, errorMessage, code } = this.state;

    return (
      <Container>
        <Header>Your new URL shortener. :)</Header>
          <ContentContainer>
            <Form onSubmit={this.handleSubmit}>
              <InputGroup className="mb-3" >
                <FormControl 
                  placeholder="Enter the URL to shorten"
                  defaultValue=""
                  onChange={e => this.setState({ url: e.target.value })}
                />

                <InputGroup.Append>
                  <Button variant="primary" type="submit" >Shorten</Button>
                </InputGroup.Append>
              </InputGroup>

              {isLoading ? (
                <Spinner animation="border" />
              ) : (
                code && (
                  <>
                    <InputGroup className="mb-3" >
                      <FormControl 
                        autoFocus={true}
                        defaultValue={`https://pitu.tk/${code}`}
                        ref={(input) => this.inputURL = input}
                      />

                      <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={() => this.copyToClipboard()} >Copy</Button>
                      </InputGroup.Append>
                    </InputGroup>
                    <p>To follow the statistics, visit https://pitu.tk/{code}</p>
                  </>
                )
              )}
              {errorMessage && <Alert variant="danger" >{errorMessage}</Alert>}
            </Form>
          </ContentContainer>
          <ContentContainer>
            <AdsBlock>AdSense</AdsBlock>
          </ContentContainer>
      </Container>
    );
  }
}

export default Home;