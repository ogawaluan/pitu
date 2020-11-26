import React from 'react';

import ShortenerService from '../../services/shortenerService';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer } from './styles';

class RedirectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: '',
      errorMessage: '',
    }
  }
  
  async componentDidMount() {
    const { code } = this.props.match.params;

    try {
      const service = new ShortenerService();
      const { url } = await service.getLink(code);

      window.location = url;

    } catch (err) {
      this.setState({ isLoading: false, errorMessage: 'Uups, the requested URL does not exist' });
    }
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <Container>
        {errorMessage ? (
          <>
            <StatsContainer className="text-center">
              <FontAwesomeIcon size="3x" color="#c53030" icon="exclamation-triangle" />
              <p clasName="m-3">{errorMessage}</p>
              <a className="btn btn-primary" href="/">Shorten new URL</a>
            </StatsContainer>
          </>
        ) : (
          <p className="text-center">Redirecionando...</p>
        )}
      </Container>
    );
  }
}

export default RedirectPage;