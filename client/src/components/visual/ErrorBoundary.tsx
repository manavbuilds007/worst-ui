import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Anti-UX ErrorBoundary caught an anomaly:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 bg-zinc-950 border-2 border-red-500/80 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <span className="text-6xl mb-4 block">💀</span>
            <h1 className="text-2xl font-black text-red-400 mb-2 font-mono">CRITICAL CHAOS EVENT</h1>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              The interface became so excessively terrible that reality itself stuttered.
              Don't worry, your browser is safe.
            </p>
            <div className="bg-zinc-900 p-3 rounded text-left font-mono text-xs text-red-300 mb-6 overflow-x-auto border border-red-900/50">
              {this.state.error?.message || 'Unknown anti-UX perturbation'}
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              Restore Sanity & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
