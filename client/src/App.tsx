import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="pt-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route>404 Page Not Found</Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
