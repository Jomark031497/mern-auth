import { useEffect } from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import { useDispatch } from "react-redux";
import { login } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login("juju@gmail.com", "juju123"));
  }, [dispatch]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
