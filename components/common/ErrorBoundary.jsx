/**
 * Global error boundary for Next.js applications
 */

'use client';

import { Component } from 'react';
import Link from 'next/link';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-xl-6">
              <div className="text-center pt-80">
                <div className="mb-20">
                  <h1 className="text-40 fw-600">Oops! Something went wrong</h1>
                  <p className="text-15 text-light-1 mt-5">
                    {this.state.error?.message || 'An unexpected error occurred'}
                  </p>
                </div>
                
                <div className="d-flex justify-center gap-10">
                  <button
                    onClick={() => this.setState({ hasError: false, error: null })}
                    className="btn btn-primary btn-md px-4 py-2"
                    style={{ borderRadius: '8px' }}
                  >
                    Try Again
                  </button>
                  
                  <Link 
                    href="/" 
                    className="btn btn-outline-primary btn-md px-4 py-2"
                    style={{ borderRadius: '8px' }}
                  >
                    Go Home
                  </Link>
                </div>
                
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-20 text-left">
                    <summary className="cursor-pointer text-danger fw-500">
                      Error Details (Development Only)
                    </summary>
                    <pre className="mt-10 p-20 bg-light rounded-4 text-12 overflow-auto border">
                      {this.state.error?.stack}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
