import React from 'react';
import { parseISO, formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import vars from '../../config/vars';
import ShortenerService from '../../services/shortenerService';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsBox, StatsBoxTitle, StatsContainer, StatsRow } from './styles';

class StatsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      shortenedURL: {},
      errorMessage: '',
    }
  }

  async componentDidMount() {
    const { code } = this.props.match.params;

    try {
      const service = new ShortenerService();
      const shortenedURL = await service.getStats(code);

      const parsedDate = parseISO(shortenedURL.updatedAt);
      const currentDate = new Date();
      
      const relativeDate = formatRelative(parsedDate, currentDate, {
        locale: enUS,
      });

      shortenedURL.relativeDate = relativeDate;

      this.setState({ isLoading: false, shortenedURL });

    } catch (err) {
      this.setState({ isLoading: false, errorMessage: 'Uups, the requested URL does not exist' });
    }
  }

  render() {
    const { errorMessage, shortenedURL } = this.state;

    return (
      <Container>
        <Header>Statistics</Header>

        {errorMessage ? (
          <StatsContainer className="text-center">
            <FontAwesomeIcon size="3x" color="#c53030" icon="exclamation-triangle" />
            <p clasName="m-3">{errorMessage}</p>
            <a className="btn btn-primary" href="/">Shorten new URL</a>
          </StatsContainer>
        ) : (
          <StatsContainer className="text-center">
            <p><b>{vars.HOST_APP + shortenedURL.code}</b></p>
            <p>Redirects to:<br/>{shortenedURL.url}</p>
            <StatsRow>
              <StatsBox>
                <b>{shortenedURL.hits}</b>
                <StatsBoxTitle>Visits</StatsBoxTitle>
              </StatsBox>

              <StatsBox>
                <b>{shortenedURL.relativeDate}</b>
                <StatsBoxTitle>Last Visits</StatsBoxTitle>
              </StatsBox>
            </StatsRow>

            <a className="btn btn-primary" href="/">Shorten new URL</a>
          </StatsContainer>
        )}
      </Container>
    );
  }
}

export default StatsPage;