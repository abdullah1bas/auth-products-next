'use client'
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import { store } from "../_RTKQ/store";

function App({ childrenData }) {
  return (
    <Provider store={store}>
        <div className="App">
          <Navbar />
          <div className="row">
            <div className="col-2 sidebar">
              <Sidebar />
            </div>
            <div className="col-10">{childrenData}</div>
          </div>
        </div>
    </Provider>
  );
}

export default App;
