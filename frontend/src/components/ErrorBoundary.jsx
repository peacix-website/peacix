import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Log to error tracking service (e.g., Sentry)
    // if (import.meta.env.VITE_SENTRY_DSN) {
    //   Sentry.captureException(error, { contexts: { react: errorInfo } });
    // }
    
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center space-y-6">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-muted-foreground">
                We're sorry for the inconvenience. Please try again.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={this.handleRetry}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button
                onClick={this.handleReset}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-muted-foreground">
              If the problem persists, please contact our support team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
