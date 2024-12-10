import { Switch, Route } from "wouter";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" component={Home} />
        <Route>404 Page Not Found</Route>
      </Switch>
    </div>
  );
}

export default App;
