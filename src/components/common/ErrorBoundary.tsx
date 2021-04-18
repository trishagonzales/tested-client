import React from 'react';
import styled from 'styled-components';
import If from './If';
import { Center, Container } from './Layout';

export interface ErrorBoundaryProps {}
export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return (
      <If condition={this.state.hasError} elseRender={this.props.children}>
        <Container>
          <Div>
            <Center>
              <h1>UNEXPECTED ERROR OCCURRED</h1>
            </Center>
          </Div>
        </Container>
      </If>
    );
  }
}

export default ErrorBoundary;

const Div = styled.div`
  width: 100%;
  height: 70vh;

  h1 {
    font-size: 28px;
    color: var(--grey);
  }
`;
