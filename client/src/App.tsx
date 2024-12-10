import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import Header from "./components/Header";

// Lazy load the home page for better performance
const Home = lazy(() => import("./pages/Home"));

// Custom 404 component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist.</p>
      <a href="/" className="text-primary hover:underline">Return to Home</a>
    </div>
  </div>
);

function App() {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }>
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
